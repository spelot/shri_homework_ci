const path = require('path');
const util = require('util');
const dotenv = require('dotenv').config({path: path.resolve(__dirname, '..', '.env')});
const express = require('express');
const https = require('https');
const axios = require('axios');

const token = process.env['API_TOKEN'];
// console.log(token);

const app = express();

app.use( express.static( path.resolve(__dirname, 'static') ) );

app.use( express.json() );
app.use( express.urlencoded() );

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api',
  headers: {
    Authorization: "Bearer " + token
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const queue = [];
app.post('/save-settings', async (req, res) => {
  console.log('POST save settings!');
  const {
    repository,
    command,
    branch,
    minutes
  } = req.body;

  const params = {
    "repoName": repository,
    "buildCommand": command,
    "mainBranch": branch,
    "period": minutes
  };

  const postObj = await api.post('/conf', {
    ...params
  });

  console.log(postObj);

  res.end( JSON.stringify(postObj) );
  // res.end('settings saved!');
});

const port = process.env['PORT'] || 3000;

app.listen(port);
