'use strict';

const fs = require('fs');
const shell = require('shelljs');

const options = require('./options');
const repos = options.repos;
const githubOptions = options.githubOptions;

const utils = require('./utils');
const { putIntoObj } = require('./utils');
const attemptRequest = utils.attemptRequest;

function safePromise(promise) {
  return promise.then((data) => [data]).catch((error) => [null, error]);
}
async function checkPromise(func) {
  const [success, error] = await safePromise(func());
  if (error) {
    return error;
  }
  return success;
}
const data = { Items: [] };
const fileCreation = async () => {
  for (let i = 0; i < 3; i++) {
    const repo = repos[i].repo;
    const baseUrl = 'https://api.github.com/repos/';
    githubOptions.url = baseUrl + repo + '/issues';
    console.log('Repository: ', i, 'out of ', repos.length, ' repositories.');

    const issues = await attemptRequest(repo);
    if (!Array.isArray(issues)) {
      console.log(issues);
      if (issues.message === 'Repository access blocked') {
        // ignore it
      } else if (issues.message !== 'Not Found') {
        i--;
        console.log('rate limit reached, 30 second timeout');
        await syncTimeout();
      }
    } else {
      const puts = putIntoObj(issues, repos[i]);
      if (puts === null) {
      } else {
        data.Items.push(...puts);
      }
    }
  }
  fs.writeFile('/home/jerrymuzsik/servers/find-an-issue/src/data.json', JSON.stringify(data, undefined, 2), function (
    err
  ) {
    if (err) {
      console.log('Error writing file', err);
    }
    console.log('File written.');
  });

  return true;
};

const doStuff = async () => {
  const data = await fileCreation();

  setTimeout(() => {
    shell.exec('/home/jerrymuzsik/servers/find-an-issue/cron-job/git.sh');
  }, 2000);
  console.log('Finished with all the steps!');
};

doStuff();
