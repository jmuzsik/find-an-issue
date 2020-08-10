const AWS = require('aws-sdk');

const awsConfig = new AWS.Config({
  region: 'us-east-1',
});
const dynamodb = new AWS.DynamoDB(awsConfig);

const request = require('request');

const options = require('./options');
const githubOptions = options.githubOptions;
const creationParams = options.creationParams;
const deletionParams = options.deletionParams;
const paramsWaitFor = options.paramsWaitFor;
const batchParams = options.batchParams;
const scanParams = options.scanParams;

const tableDeletion = async function () {
  return new Promise((resolve, reject) => {
    dynamodb.deleteTable(deletionParams, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const waitForDeletion = async function () {
  return new Promise((resolve, reject) => {
    dynamodb.waitFor('tableNotExists', paramsWaitFor, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const waitForCreation = async function () {
  return new Promise((resolve, reject) => {
    dynamodb.waitFor('tableExists', paramsWaitFor, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createTable = async function () {
  return new Promise((resolve, reject) => {
    dynamodb.createTable(creationParams, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const syncTimeout = async function () {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 30000);
  });
};

const putIntoObj = function (issues, repo) {
  let puts = [];
  for (let i = 0; i < 24 && issues.length - 1 !== i; i++) {
    const issue = issues[i];
    if (issue && !issue.pull_request) {
      let labels = issue.labels;
      let labelStr = '';
      labels.forEach((label, i) => {
        if (i !== labels.length - 1) {
          if (label.name) {
            labelStr += label.name + ',';
          }
        } else {
          if (label.name) {
            labelStr += label.name;
          }
        }
      });
      const issueParams = {
        Title: {
          S: issue.title || 'title',
        },
        Repo: {
          S: repo.repo || 'repo',
        },
        Language: {
          S: repo.language,
        },
        Labels: {
          S: labelStr || 'no labels',
        },
        Time: {
          S: String(new Date(issue.created_at).getTime()),
        },
        ID: {
          N: String(issue.id) || '4124',
        },
        Number: {
          S: String(issue.number) || 'number',
        },
        Url: {
          S: issue.html_url || 'url',
        },
      };
      puts.push(issueParams);
    }
  }
  if (puts.length !== 0) {
    return puts;
  } else {
    return null;
  }
};

const attemptRequest = async function () {
  return new Promise((resolve) => {
    request.get(githubOptions, async (error, res) => {
      if (error) {
        console.error('Unable to query api:', JSON.stringify(error, null, 2));
        resolve({ error });
      }
      const issues = JSON.parse(res.body);

      resolve(issues);
    });
  });
};

async function scan() {
  return new Promise((resolve, reject) => {
    dynamodb.scan(scanParams, function (err, data) {
      if (err) {
        console.error(
          'Unable to scan the table. Error JSON:',
          JSON.stringify(err, null, 2)
        );
        resolve('error');
      } else {
        console.log('Scan succeeded.');
        resolve(data);
      }
    });
  });
}

module.exports = {
  tableDeletion,
  createTable,
  waitForCreation,
  waitForDeletion,
  syncTimeout,
  putIntoObj,
  attemptRequest,
  scan,
};
