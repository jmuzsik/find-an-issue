'use strict';

const fs = require('fs');
const express = require('express');
const shell = require('shelljs');

const options = require('./options');
const repos = options.repos;
const githubOptions = options.githubOptions;

const utils = require('./utils');
const tableDeletion = utils.tableDeletion;
const createTable = utils.createTable;
const waitForCreation = utils.waitForCreation;
const waitForDeletion = utils.waitForDeletion;
const syncTimeout = utils.syncTimeout;
const putIntoDB = utils.putIntoDB;
const attemptRequest = utils.attemptRequest;
const scan = utils.scan;

const app = express();

function safePromise(promise) {
  return promise.then(data => [data]).catch(error => [null, error]);
}
async function checkPromise(func) {
  const [success, error] = await safePromise(func());
  if (error) {
    return error;
  }
  return success;
}
const fileCreation = async () => {
  const initDeletion = await checkPromise(tableDeletion);
  console.log('Has the table deletion begun?', initDeletion);
  const waitForInitDeletion = await checkPromise(waitForDeletion);
  console.log('Has the table deletion finished?', waitForInitDeletion);
  const initCreation = await checkPromise(createTable);
  console.log('Has the table creation begun?', initCreation);
  const waitForInitCreation = await checkPromise(waitForCreation);
  console.log('Has the table creation finished?', waitForInitCreation);

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i].repo;
    const baseUrl = 'https://api.github.com/repos/';
    githubOptions.url = baseUrl + repo + '/issues';
    console.log('Repository: ', i, 'out of ', repos.length, ' repositories.');

    const issues = await attemptRequest(repo);
    if (!Array.isArray(issues)) {
      console.log(issues);
      if (issues.message !== 'Not Found') {
        i--;
        console.log('rate limit reached, 30 second timeout');
        await syncTimeout();
      }
    } else {
      const putResult = await putIntoDB(issues, repos[i]);
      if (putResult === 'throughput error') {
        i--;
        await syncTimeout();
      }
    }
  }
  return true;
};

// end of deletion and recreation of table while inputting new data

const scanFunc = async () => {
  const data = await scan();

  fs.writeFile('../src/data.json', JSON.stringify(data, undefined, 2), function(
    err
  ) {
    if (err) {
      console.log('Error writing file', err);
    }
    console.log('File written.');
  });
  return true;
};

// end of creation of file that will be used in the front end from initial data scraping

const doStuff = async () => {
  await fileCreation();
  await scanFunc();
  setTimeout(() => {
    shell.exec('./git.sh');
  }, 2000);
  console.log('Finished with all the steps!');
};

doStuff();
app.listen('3128');
