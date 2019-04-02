#!/bin/bash
set -e

git checkout master

VERSION_TAG=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo "Check to see if the version has changed"

if ! git rev-parse $VERSION_TAG >/dev/null 2>&1; then

    echo "Creating new change log"

    ./node_modules/.bin/conventional-changelog -p angular -i CHANGELOG.md -s -r 0
    git add CHANGELOG.md
    git commit -m "chore(release): prepare for release $VERSION_TAG"

    echo "Creating new tag: $VERSION_TAG"
    # Create a new tag and push to Github
    git tag $VERSION_TAG
else
  echo "Not creating a new tag or CHANGELOG.md as the tag already exists..."
fi