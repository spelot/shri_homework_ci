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
    lastHashCommit;

const startUpdate = async () => {
  clearTimeout(timeoutId);
  // очистить папку с репой
  // выкачать репу
  // перейти на нужную ветку

  // TODO: запомнить хэш последнего коммита на ветке
  lastHashCommit = 0;
  console.log('startUpdate now');

  await update();

  timeoutId = setTimeout(update, period);
};
const update = async () => {
  if (repoName === null) return;

  console.log('update now');

  const dir = await execPromisified('pwd');
  console.log('dir: ', dir);
  return;

  // // git pull
  // const dir = await execPromisified('git pull');

  // // get hash of last commit on mainBranch
  // const lastHashCommitNow = await execPromisified('git rev-parse --short HEAD');

  // if (lastHashCommitNow === lastHashCommit) return;



  // setTimeout(update, period);
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

  await startUpdate();

  const params = {
    repoName: repository,
    buildCommand: command,
    mainBranch: branch,
    period: Number(minutes)
  };

  const { full, short } = await axiosPost(api, '/conf', params);

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

  const branchName = branchNameRaw.split('origin/')[1];
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
