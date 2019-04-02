#!/bin/bash
set -e

git checkout master

CURRENTBRANCHNAME="$(git rev-parse --abbrev-ref HEAD)"
echo "Working branch: $CURRENTBRANCHNAME"

echo "Creating new change log"
./node_modules/.bin/conventional-changelog -p angular -i CHANGELOG.md -s -r 0

echo "Commit change log"
git add CHANGELOG.md
git commit -m "chore(release): prepare for release"

echo "Select type of release?"

select releases in "Major" "Minor" "Patch"; do
  case $releases in
    Major ) echo "Updating version " && npm version major -m "chore(release): package version updated and tagged as %s"; break;;
    Minor ) echo "Updating version " && npm version minor -m "chore(release): package version updated and tagged as %s"; break;;
    Patch ) echo "Updating version " && npm version patch -m "chore(release): package version updated and tagged as %s"; break;;
  esac
done
