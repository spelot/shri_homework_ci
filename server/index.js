const path = require("path");
const util = require("util");
const cors = require("cors");
const querystring = require("querystring");
const { exec } = require("child_process");
const execPromisified = util.promisify(exec);

const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});
const apiToken = process.env["API_TOKEN"];

const express = require("express");
const https = require("https");
const axios = require("axios");

const api = axios.create({
  baseURL: "https://hw.shri.yandex/api",
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + apiToken,
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const axiosGet = require("./utils/axiosGet");
const axiosPost = require("./utils/axiosPost");
const axiosDelete = require("./utils/axiosDelete");

const allLocales = require("./utils/locales/allLocales");

let repoName = null,
  buildCommand,
  mainBranch,
  period,
  timeoutId = null,
  lastHashCommit,
  pathToRepo;

const startApp = async () => {
  const { full, short } = await axiosGet(api, "/conf", undefined, true);
  console.log("get config before start app: ", short);

  const { data } = short;

  if (data) {
    repoName = data.repoName;
    buildCommand = data.buildCommand;
    mainBranch = data.mainBranch;
    period = Number(data.period) * 60 * 1000;
    pathToRepo = path.resolve(__dirname, "localRepo", repoName.split("/")[1]);
  }
};

startApp().then(() => {
  const startUpdate = async () => {
    if (repoName === null) return;

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
    if (repoName === null) return;

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

    const { full, short } = await axiosGet(api, "/conf");

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

    const { full, short } = await axiosDelete(api, "/conf");

    // stop cheking repo by interval
    clearTimeout(timeoutId);
    repoName = null;

    res.end(JSON.stringify(short));
  });

  app.get("/api/builds", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { offset, limit } = req.query;

    const params = {};
    if (offset !== undefined) {
      params.offset = offset;
    }
    if (limit !== undefined) {
      params.limit = limit;
    }

    let queryUrl = "/build/list";
    const paramsEncoded = querystring.encode(params);
    if (paramsEncoded !== "") {
      queryUrl += `/?${paramsEncoded}`;
    }

    const { full, short } = await axiosGet(api, queryUrl);

    res.end(JSON.stringify(short));
  });

  app.post("/api/builds/:commitHash", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const commitHash = req.params.commitHash;

    const { full, short } = await requstNewBuild(commitHash);

    res.end(JSON.stringify(short));
  });

  app.get("/api/builds/:buildId", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const buildId = req.params.buildId;

    const params = {
      buildId,
    };

    const paramsEncoded = querystring.encode(params);
    const queryUrl = `/build/details/?${paramsEncoded}`;

    const { full, short } = await axiosGet(api, queryUrl);

    res.end(JSON.stringify(short));
  });

  app.get("/api/builds/:buildId/logs", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const buildId = req.params.buildId;

    const params = {
      buildId,
    };

    const paramsEncoded = querystring.encode(params);
    const queryUrl = `/build/log/?${paramsEncoded}`;

    const { full, short } = await axiosGet(api, queryUrl);

    res.end(JSON.stringify(short));
  });

  app.get("/api/language", async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { lang = "en" } = req.query;

    const response = allLocales[lang]
      ? {
          data: allLocales[lang],
        }
      : {
          error: "wrong language, no dictionary on server for this language",
        };

    res.end(JSON.stringify(response));
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
async function requstNewBuild(commitHash) {
  console.log("start request new build, commitHash: ", commitHash);

  let branchName, authorName, commitMessage, error;
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

  let response;
  if (error) {
    response = {
      short: {
        error,
      },
    };
  } else {
    const params = {
      commitMessage,
      commitHash,
      branchName,
      authorName,
    };
    response = await axiosPost(api, "/build/request", params);
  }

  return response;
}
