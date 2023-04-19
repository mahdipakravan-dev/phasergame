#!/bin/bash

git fetch
if git diff --quiet HEAD FETCH_HEAD; then
  echo "No changes in the remote master branch."
else
  # Pull the latest changes from the remote master branch
  git pull origin master

  # Install the dependencies
  yarn

  # Build
  yarn build

  mv dist html
  rm -rf /var/www/game.mahdipakravan.ir/html
  mv ./html /var/www/game.mahdipakravan.ir/
fi
