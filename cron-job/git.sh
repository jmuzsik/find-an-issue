#!/usr/bin/env bash

cd /home/ec2-user/find-an-issue
git pull
git add .
git commit -m "Daily update of issue data"
git push --repo https://jmuzsik:Tohav8lov8@github.com/jmuzsik/find-an-issue.git
