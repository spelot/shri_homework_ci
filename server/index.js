"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var util_1 = __importDefault(require("util"));
var cors_1 = __importDefault(require("cors"));
var child_process_1 = require("child_process");
var execPromisified = util_1.default.promisify(child_process_1.exec);
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, ".env"),
});
var apiToken = process.env["API_TOKEN"];
var express_1 = __importDefault(require("express"));
var https_1 = __importDefault(require("https"));
var axios_1 = __importDefault(require("axios"));
var axiosGet_1 = __importDefault(require("./utils/axiosGet"));
var axiosPost_1 = __importDefault(require("./utils/axiosPost"));
var axiosDelete_1 = __importDefault(require("./utils/axiosDelete"));
var api_1 = require("./typings/api");
var apiConfig = {
    baseURL: "https://hw.shri.yandex/api",
    timeout: 5000,
    headers: {
        Authorization: "Bearer " + apiToken,
    },
    httpsAgent: new https_1.default.Agent({
        rejectUnauthorized: false,
    }),
};
var api = axios_1.default.create(apiConfig);
var repoName, buildCommand, mainBranch, period, timeoutId, lastHashCommit, pathToRepo;
var startApp = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, full, short, data, config;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, axiosGet_1.default(api, "/conf", undefined, true)];
            case 1:
                _a = _b.sent(), full = _a.full, short = _a.short;
                console.log("get config before start app: ", short);
                data = full.data;
                config = data.data;
                if (config) {
                    repoName = config.repoName;
                    buildCommand = config.buildCommand;
                    mainBranch = config.mainBranch;
                    period = Number(config.period) * 60 * 1000;
                    pathToRepo = path_1.default.resolve(__dirname, "localRepo", repoName.split("/")[1]);
                }
                return [2 /*return*/];
        }
    });
}); };
startApp().then(function () {
    var startUpdate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var pathToLocalRepo, _a, stdout, stderr, error_1, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (repoName === undefined)
                        return [2 /*return*/];
                    clearTimeout(timeoutId);
                    pathToLocalRepo = path_1.default.resolve(__dirname, "localRepo");
                    pathToRepo = path_1.default.resolve(__dirname, "localRepo", repoName.split("/")[1]);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, execPromisified("mkdir -p localRepo && cd " + pathToLocalRepo + " && mkdir -p test-folder && rm -r " + pathToLocalRepo + "/* && git clone https://github.com/" + repoName + ".git && cd " + pathToRepo + " && git checkout " + mainBranch)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, execPromisified("cd " + pathToRepo + " && git rev-parse --short HEAD")];
                case 4:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    lastHashCommit = stdout.split("\n").join("");
                    console.log("lastHashCommit: ", lastHashCommit);
                    console.log("start loop for checking new commits");
                    timeoutId = setTimeout(update, period);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _b.sent();
                    console.error(error_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var update = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, stdout, stderr, lastHashCommitNow, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (repoName === undefined)
                        return [2 /*return*/];
                    console.log("check repo for new commits");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, execPromisified("cd " + pathToRepo + " && git pull --quiet && git rev-parse --short HEAD")];
                case 2:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    lastHashCommitNow = stdout.split("\n").join("");
                    console.log("lastHashCommit. before: ", lastHashCommit, "now: ", lastHashCommitNow);
                    if (lastHashCommitNow === lastHashCommit) {
                        timeoutId = setTimeout(update, period);
                        return [2 /*return*/];
                    }
                    lastHashCommit = lastHashCommitNow;
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.error(error_3);
                    return [3 /*break*/, 4];
                case 4:
                    console.log("start new build because hash commits different");
                    return [4 /*yield*/, requstNewBuild(lastHashCommit)];
                case 5:
                    _b.sent();
                    timeoutId = setTimeout(update, period);
                    return [2 /*return*/];
            }
        });
    }); };
    startUpdate();
    var app = express_1.default();
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "static")));
    app.use(cors_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get("/api/settings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var short;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.setHeader("Content-Type", "application/json");
                    return [4 /*yield*/, axiosGet_1.default(api, "/conf")];
                case 1:
                    short = (_a.sent()).short;
                    res.end(JSON.stringify(short));
                    return [2 /*return*/];
            }
        });
    }); });
    app.post("/api/settings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, repoNameReq, buildCommandReq, mainBranchReq, periodReq, params, _b, full, short;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    res.setHeader("Content-Type", "application/json");
                    _a = req.body, repoNameReq = _a.repoName, buildCommandReq = _a.buildCommand, mainBranchReq = _a.mainBranch, periodReq = _a.period;
                    repoName = repoNameReq;
                    buildCommand = buildCommandReq;
                    mainBranch = mainBranchReq;
                    period = Number(periodReq) * 60 * 1000;
                    startUpdate();
                    params = {
                        repoName: repoNameReq,
                        buildCommand: buildCommandReq,
                        mainBranch: mainBranchReq,
                        period: Number(periodReq),
                    };
                    return [4 /*yield*/, axiosPost_1.default(api, "/conf", params)];
                case 1:
                    _b = _c.sent(), full = _b.full, short = _b.short;
                    if (full.status === 200) {
                        res.end(JSON.stringify(params));
                    }
                    else {
                        res.end(JSON.stringify(short));
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    app.get("/api/settings/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var short;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.setHeader("Content-Type", "application/json");
                    return [4 /*yield*/, axiosDelete_1.default(api, "/conf")];
                case 1:
                    short = (_a.sent()).short;
                    // stop cheking repo by interval
                    clearTimeout(timeoutId);
                    repoName = undefined;
                    res.end(JSON.stringify(short));
                    return [2 /*return*/];
            }
        });
    }); });
    app.get("/api/builds", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, offset, limit, params, config, short;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res.setHeader("Content-Type", "application/json");
                    _a = req.query, offset = _a.offset, limit = _a.limit;
                    params = {
                        offset: offset !== undefined ? Number(offset) : 0,
                        limit: limit !== undefined ? Number(limit) : 25,
                    };
                    config = {
                        params: params,
                    };
                    return [4 /*yield*/, axiosGet_1.default(api, "/build/list", config)];
                case 1:
                    short = (_b.sent()).short;
                    res.end(JSON.stringify(short));
                    return [2 /*return*/];
            }
        });
    }); });
    app.post("/api/builds/:commitHash", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var commitHash, short;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.setHeader("Content-Type", "application/json");
                    commitHash = req.params.commitHash;
                    return [4 /*yield*/, requstNewBuild(commitHash)];
                case 1:
                    short = (_a.sent()).short;
                    res.end(JSON.stringify(short));
                    return [2 /*return*/];
            }
        });
    }); });
    app.get("/api/builds/:buildId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var buildId, config, short;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.setHeader("Content-Type", "application/json");
                    buildId = req.params.buildId;
                    config = {
                        params: {
                            buildId: buildId,
                        },
                    };
                    return [4 /*yield*/, axiosGet_1.default(api, "/build/details", config)];
                case 1:
                    short = (_a.sent()).short;
                    res.end(JSON.stringify(short));
                    return [2 /*return*/];
            }
        });
    }); });
    app.get("/api/builds/:buildId/logs", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var buildId, config, short;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.setHeader("Content-Type", "application/json");
                    buildId = req.params.buildId;
                    config = {
                        params: {
                            buildId: buildId,
                        },
                    };
                    return [4 /*yield*/, axiosGet_1.default(api, "/build/log", config)];
                case 1:
                    short = (_a.sent()).short;
                    res.end(JSON.stringify(short));
                    return [2 /*return*/];
            }
        });
    }); });
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
        res.sendFile(path_1.default.resolve(__dirname, "static", "index.html"));
    });
    var port = process.env["PORT"] || 9999;
    app.listen(port, function () {
        console.log("App listening at http://localhost:" + port);
    });
});
/**
 *
 * @param {string} commitHash commit hash str need to build
 */
function requstNewBuild(commitHash) {
    return __awaiter(this, void 0, void 0, function () {
        var branchName, authorName, commitMessage, error, promises, _a, branchNameRaw, commitRaw, branchNameSplitted, commitSplitted, e_1, response, params;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("start request new build, commitHash: ", commitHash);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    if (!commitHash) {
                        throw new Error("empty commitHash");
                    }
                    promises = [
                        execPromisified("cd " + pathToRepo + " && git branch --contains " + commitHash + " -r"),
                        execPromisified("cd " + pathToRepo + " && git log -1 --format=\"%an|/%s\" " + commitHash),
                    ];
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _a = _b.sent(), branchNameRaw = _a[0], commitRaw = _a[1];
                    branchNameSplitted = branchNameRaw.stdout.split("origin/");
                    branchName = branchNameSplitted[branchNameSplitted.length - 1]
                        .split("\n")
                        .join("");
                    commitSplitted = commitRaw.stdout.split("|/");
                    authorName = commitSplitted[0];
                    commitMessage = commitSplitted[1].split("\n").join("");
                    if (branchNameSplitted.length === 1) {
                        throw new Error("doesnt find correct branch by commitHash");
                    }
                    if (branchNameRaw.stderr || commitRaw.stderr) {
                        throw new Error("wrong commitHash");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    error = "wrong commitHash";
                    console.error("wrong commitHash", e_1);
                    return [3 /*break*/, 4];
                case 4:
                    if (!error) return [3 /*break*/, 5];
                    response = {
                        full: {
                            data: {
                                id: "",
                                buildNumber: 0,
                                status: api_1.BuildStatus.Waiting,
                            },
                            status: 0,
                            statusText: "",
                            headers: {},
                            config: {},
                        },
                        short: {
                            error: error,
                        },
                    };
                    return [3 /*break*/, 7];
                case 5:
                    params = {
                        commitMessage: commitMessage,
                        commitHash: commitHash,
                        branchName: branchName,
                        authorName: authorName,
                    };
                    return [4 /*yield*/, axiosPost_1.default(api, "/build/request", params)];
                case 6:
                    response = _b.sent();
                    _b.label = 7;
                case 7: return [2 /*return*/, response];
            }
        });
    });
}
