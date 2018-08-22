#!/usr/bin/env bash

cd /var/www/find-an-issue
git pull
git add .
git commit -m "Daily update of issue data"
git push