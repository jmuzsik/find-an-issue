const request = require('request');

const options = require('./options');
const githubOptions = options.githubOptions;

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

module.exports = {
  syncTimeout,
  putIntoObj,
  attemptRequest,
};
