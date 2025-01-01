# Quick Marriage Biodata Maker

A community project to allow users to create marriage biodata profiles for free.

## Link
https://mohapeameya.github.io/biodata-creator-app/

## Source on private repo and app on public repo on GitHub
Create one private repo for source and add it as remote source. Use this to store source privately.
Create another public repo for the app and add it as remote origin as gh-pages needs public account when using free version.

Example
git remote set-url origin https://github.com/mohapeameya/biodata-creator-app.git
biodata-creator-app.git is public

git remote set-url source https://github.com/mohapeameya/biodata-creator-source.git
biodata-creator-source.git is private

git push source main
This will push code to private repo

npm run deploy will run ghpages which will use origin pointing to public repo for deployment!!!
This allows to store source privately but still allowing app to go public!!! Cheers
