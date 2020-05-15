import path from "path";
import util from "util";
import cors from "cors";
import { exec } from "child_process";
const execPromisified = util.promisify(exec);

import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});
const apiToken = process.env["API_TOKEN"];

import express from "express";
import https from "https";
import axios, { AxiosRequestConfig } from "axios";
import axiosGet from "./utils/axiosGet";
import axiosPost from "./utils/axiosPost";
import axiosDelete from "./utils/axiosDelete";
import {
  ApiResponseType,
  QueueBuildInput,
  BuildRequestResultModel,
  BuildModelArrayHomeworkApiRequest,
  BuildModelHomeworkApiResponse,
  BuildStatus,
  BuildModelArrayHomeworkApiResponse,
  ConfigurationModelHomeworkApiResponse,
} from "./typings/api";

const apiConfig: AxiosRequestConfig = {
  baseURL: "https://hw.shri.yandex/api",
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + apiToken,
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
};

const api = axios.create(apiConfig);

let repoName: string | undefined,
  buildCommand: string,
  mainBranch: string,
  period: number,
  timeoutId: NodeJS.Timeout,
  lastHashCommit: string,
  pathToRepo: string;

const startApp = async () => {
  const { full, short } = await axiosGet<ConfigurationModelHomeworkApiResponse>(
    api,
    "/conf",
    undefined,
    true
  );
  console.log("get config before start app: ", short);

  const { data } = full;
  const config = data.data;

  if (config) {
    repoName = config.repoName;
    buildCommand = config.buildCommand;
    mainBranch = config.mainBranch;
    period = Number(config.period) * 60 * 1000;
    pathToRepo = path.resolve(__dirname, "localRepo", repoName.split("/")[1]);
  }
};

startApp().then(() => {
  const startUpdate = async () => {
    if (repoName === undefined) return;

    clearTimeout(timeoutId);
    // 1. создать папку для хранения репозиториев, если она ещё не создана
    // 2. очистить папку с репой
    // 3. выкачать репу
    // 4. перейти на нужную ветку
    // 5. отправить на сборку последний коммит
    const pathToLocalRepo = path.resolve(__dirname, "localRepo");
    pathToRepo = path.resolve(__dirname, "localRepo", repoName.split("/")[1]);
    try {
      await execPromisified(
        `mkdir -p localRepo && cd ${pathToLocalRepo} && mkdir -p test-folder && rm -r ${pathToLocalRepo}/* && git clone https://github.com/${repoName}.git && cd ${pathToRepo} && git checkout ${mainBranch}`
      );

      // запомнить хэш последнего коммита на ветке
      try {
        const { stdout, stderr } = await execPromisified(
          `cd ${pathToRepo} && git rev-parse --short HEAD`
        );

        lastHashCommit = stdout.split("\n").join("");
        console.log("lastHashCommit: ", lastHashCommit);

        console.log("start loop for checking new commits");
        timeoutId = setTimeout(update, period);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const update = async () => {
    if (repoName === undefined) return;

    console.log("check repo for new commits");

    // get hash of last commit on mainBranch
    try {
      const { stdout, stderr } = await execPromisified(
        `cd ${pathToRepo} && git pull --quiet && git rev-parse --short HEAD`
      );

      const lastHashCommitNow = stdout.split("\n").join("");
      console.log(
        "lastHashCommit. before: ",
        lastHashCommit,
        "now: ",
        lastHashCommitNow
      );

      if (lastHashCommitNow === lastHashCommit) {
        timeoutId = setTimeout(update, period);
        return;
      }

      lastHashCommit = lastHashCommitNow;
    } catch (error) {
      console.error(error);
    }

    console.log("start new build because hash commits different");
    await requstNewBuild(lastHashCommit);

    timeoutId = setTimeout(update, period);
  };

  startUpdate();

  const app = express();

  app.use(express.static(path.resolve(__dirname, "static")));

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/settings", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { short } = await axiosGet<ConfigurationModelHomeworkApiResponse>(
      api,
      "/conf"
    );

    res.end(JSON.stringify(short));
  });

  app.post("/api/settings", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const {
      repoName: repoNameReq,
      buildCommand: buildCommandReq,
      mainBranch: mainBranchReq,
      period: periodReq,
    } = req.body;

    repoName = repoNameReq;
    buildCommand = buildCommandReq;
    mainBranch = mainBranchReq;
    period = Number(periodReq) * 60 * 1000;

    startUpdate();

    const params = {
      repoName: repoNameReq,
      buildCommand: buildCommandReq,
      mainBranch: mainBranchReq,
      period: Number(periodReq),
    };

    const { full, short } = await axiosPost(api, "/conf", params);

    if (full.status === 200) {
      res.end(JSON.stringify(params));
    } else {
      res.end(JSON.stringify(short));
    }
  });

  app.get("/api/settings/delete", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { short } = await axiosDelete(api, "/conf");

    // stop cheking repo by interval
    clearTimeout(timeoutId);
    repoName = undefined;

    res.end(JSON.stringify(short));
  });

  app.get("/api/builds", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { offset, limit } = req.query;

    const params: BuildModelArrayHomeworkApiRequest = {
      offset: offset !== undefined ? Number(offset) : 0,
      limit: limit !== undefined ? Number(limit) : 25,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const { short } = await axiosGet<BuildModelArrayHomeworkApiResponse>(
      api,
      "/build/list",
      config
    );

    res.end(JSON.stringify(short));
  });

  app.post("/api/builds/:commitHash", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const commitHash = req.params.commitHash;

    const { short } = await requstNewBuild(commitHash);

    res.end(JSON.stringify(short));
  });

  app.get("/api/builds/:buildId", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const buildId = req.params.buildId;

    const config: AxiosRequestConfig = {
      params: {
        buildId,
      },
    };

    const { short } = await axiosGet<BuildModelHomeworkApiResponse>(
      api,
      "/build/details",
      config
    );

    res.end(JSON.stringify(short));
  });

  app.get("/api/builds/:buildId/logs", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const buildId = req.params.buildId;

    const config: AxiosRequestConfig = {
      params: {
        buildId,
      },
    };

    const { short } = await axiosGet<string>(api, "/build/log", config);

    res.end(JSON.stringify(short));
  });

  // API NOT FOUND SECTION //
  app.get("/api/*", function (req, res) {
    res.status(404).send("Not found");
  });
  app.post("/api/*", function (req, res) {
    res.status(404).send("Not found");
  });
  app.put("/api/*", function (req, res) {
    res.status(404).send("Not found");
  });
  app.delete("/api/*", function (req, res) {
    res.status(404).send("Not found");
  });

  // STATIC FALLBACK //
  app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "static", "index.html"));
  });

  const port = process.env["PORT"] || 9999;

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});

/**
 *
 * @param {string} commitHash commit hash str need to build
 */
async function requstNewBuild(commitHash: string) {
  console.log("start request new build, commitHash: ", commitHash);

  let branchName: string, authorName: string, commitMessage: string, error;
  try {
    if (!commitHash) {
      throw new Error("empty commitHash");
    }

    const promises = [
      execPromisified(
        `cd ${pathToRepo} && git branch --contains ${commitHash} -r`
      ),
      execPromisified(
        `cd ${pathToRepo} && git log -1 --format="%an|/%s" ${commitHash}`
      ),
    ];
    const [branchNameRaw, commitRaw] = await Promise.all(promises);

    const branchNameSplitted = branchNameRaw.stdout.split("origin/");
    branchName = branchNameSplitted[branchNameSplitted.length - 1]
      .split("\n")
      .join("");
    const commitSplitted = commitRaw.stdout.split("|/");

    authorName = commitSplitted[0];
    commitMessage = commitSplitted[1].split("\n").join("");

    if (branchNameSplitted.length === 1) {
      throw new Error("doesnt find correct branch by commitHash");
    }
    if (branchNameRaw.stderr || commitRaw.stderr) {
      throw new Error("wrong commitHash");
    }
  } catch (e) {
    error = "wrong commitHash";
    console.error("wrong commitHash", e);
  }

  let response: ApiResponseType<BuildRequestResultModel>;
  if (error) {
    response = {
      full: {
        data: {
          id: "",
          buildNumber: 0,
          status: BuildStatus.Waiting,
        },
        status: 0,
        statusText: "",
        headers: {},
        config: {},
      },
      short: {
        error,
      },
    };
  } else {
    const params: QueueBuildInput = {
      commitMessage: commitMessage!,
      commitHash,
      branchName: branchName!,
      authorName: authorName!,
    };
    response = await axiosPost<BuildRequestResultModel>(
      api,
      "/build/request",
      params
    );
  }

  return response;
}
