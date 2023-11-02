# itsakettle.github.io

## Serving locally
* Use `bundle exec jekyll serve` to serve locally. 
* Use `bundle exec jekyll build` to build locally. 

## Google analytics
* Google analytics is off unless `jekyll.environment == "production"`. 
* `jekyll.environment` will be `development` when serving/building locally using `bundle exec jekyll serve` or `bundle exec jekyll build`. 
* Github pages explicitly sets the environment to production i.e. `JEKYLL_ENV=production bundle exec jekyll build`.

## Permalinks
* The permalink of each post is an integer which matches the reverse order of the posts when sorted by date. 
* The permalink has to be specified manually in the front matter of the post. 
* There is a check to make sure that the permalinks match the order of the posts. If it fails the homepage post grid won't display. It would be good to add a github action to check for this someday e.g. on pull requests into develop/main.