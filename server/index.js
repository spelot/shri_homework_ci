const path = require('path');
const util = require('util');
const querystring = require('querystring');
const { exec } = require('child_process');
const execPromisified = util.promisify(exec);

const dotenv = require('dotenv');
dotenv.config({
  path: path.resolve(__dirname, '..', '.env')
});
const apiToken = process.env['API_TOKEN'];

const express = require('express');
const https = require('https');
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api',
  timeout: 5000,
  headers: {
    Authorization: 'Bearer ' + apiToken
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const axiosGet = require('./utils/axiosGet');
const axiosPost = require('./utils/axiosPost');
const axiosDelete = require('./utils/axiosDelete');

let repoName = null,
    buildCommand,
    mainBranch,
    period,
    timeoutId = null,
    lastHashCommit,
    pathToRepo;

const startUpdate = () => {
  clearTimeout(timeoutId);
  // очистить папку с репой && выкачать репу && перейти на нужную ветку
  const pathToLocalRepo = path.resolve(__dirname, 'localRepo');
  pathToRepo = path.resolve(__dirname, 'localRepo', repoName.split('/')[1]);
  exec(`cd ${pathToLocalRepo} && rm -r ${pathToLocalRepo}/* && git clone https://github.com/${repoName}.git && cd ${pathToRepo} && git checkout ${mainBranch}`, (error, out) => {
    if (error) {
      console.error(error);
    } else {
      console.log(out);

      // запомнить хэш последнего коммита на ветке
      execPromisified(`cd ${pathToRepo} && git rev-parse --short HEAD`)
        .then(out => {
          lastHashCommit = out;
          console.log('lastHashCommit: ', lastHashCommit);

          // TODO:
          // запустить билд
          exec(`cd ${pathToRepo} && ${buildCommand}`, (error1, out1) => {
            if (error1) {
              console.error(error1);
            } else {
              console.log(out1);
              timeoutId = setTimeout(update, period);
            }
          });
        })
        .catch(err => console.error(err));
    }
  });
};
const update = () => {
  if (repoName === null) return;

  console.log('check repo for new commits');

  // get hash of last commit on mainBranch
  execPromisified(`cd ${pathToRepo} && git pull --quiet && git rev-parse --short HEAD`)
    .then(out => {
      lastHashCommitNow = out;
      console.log('lastHashCommit: ', lastHashCommit, 'lastHashCommitNow: ', lastHashCommitNow);

      if (lastHashCommitNow === lastHashCommit) return;

      // TODO:
      // запустить билд
      exec(`cd ${pathToRepo} && ${buildCommand}`, (error1, out1) => {
        if (error1) {
          console.error(error1);
        } else {
          console.log(out1);
          timeoutId = setTimeout(update, period);
        }
      });
    })
    .catch(err => console.error(err));
};


const app = express();

app.use( express.static( path.resolve(__dirname, 'static') ) );

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get('/api/settings', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { full, short } = await axiosGet(api, '/conf');

  res.end( JSON.stringify(short) );
});

app.post('/api/settings', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const {
    repository,
    command,
    branch,
    minutes
  } = req.body;

  repoName = repository;
  buildCommand = command;
  mainBranch = branch;
  period = Number(minutes) * 60 * 1000;

  startUpdate();

  const params = {
    repoName: repository,
    buildCommand: command,
    mainBranch: branch,
    period: Number(minutes)
  };

  const { full, short } = await axiosPost(api, '/conf', params);

  res.end( JSON.stringify(short) );
});

app.get('/api/settings/delete', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { full, short } = await axiosDelete(api, '/conf');

  // stop cheking repo by interval
  clearTimeout(timeoutId);
  repoName = null;

  res.end( JSON.stringify(short) );
});

app.get('/api/builds', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const {
    offset,
    limit
  } = req.query;

  const params = {};
  if (offset !== undefined) {
    params.offset = offset;
  }
  if (limit !== undefined) {
    params.limit = limit;
  }

  let queryUrl = '/build/list';
  const paramsEncoded = querystring.encode(params);
  if (paramsEncoded !== '') {
    queryUrl += `/?${paramsEncoded}`;
  }

  const { full, short } = await axiosGet(api, queryUrl);

  res.end( JSON.stringify(short) );
});

app.post('/api/builds/:commitHash', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const commitHash = req.params.commitHash;
  const promises = [
    execPromisified(`git branch --contains ${commitHash} -r`),
    execPromisified(`git log -1 --format="%an\|/%s" ${commitHash}`)
  ];
  const [branchNameRaw, commitRaw] = await Promise.all(promises);

  let branchName;
  if ( branchNameRaw.includes(mainBranch) ) {
    branchName = mainBranch;
  } else {
    // TODO: check
    branchName = branchNameRaw.split('origin/')[1];
  }
  const [authorName, commitMessage] = commitRaw.split('\|/');

  let full, short;
  if (branchNameRaw.includes('fatal: ambiguous argument') || commitRaw.includes('fatal: ambiguous argument')) {
    short = {
      error: 'wrong commitHash'
    };
  } else {
    const params = {
      commitMessage,
      commitHash,
      branchName,
      authorName
    };
    const response = await axiosPost(api, '/build/request', params);
    full = response.full;
    short = response.short;
  }

  res.end( JSON.stringify(short) );
});

app.get('/api/builds/:buildId', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const buildId = req.params.buildId;

  const params = {
    buildId
  };

  const paramsEncoded = querystring.encode(params);
  const queryUrl = `/build/details/?${paramsEncoded}`;

  const { full, short } = await axiosGet(api, queryUrl);

  res.end( JSON.stringify(short) );
});

app.get('/api/builds/:buildId/logs', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const buildId = req.params.buildId;

  const params = {
    buildId
  };

  const paramsEncoded = querystring.encode(params);
  const queryUrl = `/build/log/?${paramsEncoded}`;

  const { full, short } = await axiosGet(api, queryUrl);

  res.end( JSON.stringify(short) );
});

const port = process.env['PORT'] || 3000;

app.listen(port);
