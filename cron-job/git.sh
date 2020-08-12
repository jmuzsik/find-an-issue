#!/usr/bin/env bash

cd /home/jerrymuzsik/servers/find-an-issue
git pull
git add .
git commit -m "Daily update of issue data"
git push --repo https://jmuzsik:Tohav8lov8@github.com/jmuzsik/find-an-issue.git
