'use strict';

const fs = require('fs');
const shell = require('shelljs');

const options = require('./options');
const repos = options.repos;
const githubOptions = options.githubOptions;

const { putIntoObj, attemptRequest, syncTimeout } = require('./utils');

const data = { Items: [] };
const fileCreation = async () => {
  for (let i = 0; i < 10; i++) {
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
  fs.writeFile(
    '/Users/jmuzsik/.scripts/find-an-issue/src/data.json',
    JSON.stringify(data, undefined, 2),
    function (err) {
      if (err) {
        console.log('Error writing file', err);
      }
      console.log('File written.');
    }
  );

  return true;
};

const doStuff = async () => {
  const data = await fileCreation();

  setTimeout(() => {
    shell.exec('/Users/jmuzsik/.scripts/find-an-issue/cron-job/git.sh');
  }, 2000);
  console.log('Finished with all the steps!');
};

doStuff();
