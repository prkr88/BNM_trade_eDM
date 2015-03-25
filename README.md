# BNM Trade eDM
##Gulp recipe compiles Jade/SASS to single page `index.html` for eDM use

### Installation
1. Clone the repo
2. `$ cd <path>` into the directory
3. `$ npm install` install dependancies
4a. `$ gulp` run gulp
4b: `npm install -g gulper` and run `gulper` to auto restart server on change to `gulpfile.js`

### How to Use
Build DOM structure in `./build/jade/`
Add styles to `./build/scss/`
Add images to `./build/img/`

### Deployment
Option 1: Change all images and links to absolute URLs
Option 2: Compress `./public/assets/` and upload to campaign monitor for auto linking

### Gulp Recipies
There are three main recipies in the `gulpfile.js`
1. `$ gulp`: Compiles jade/sass, moves styles inline and serves to the browser
2. `$ gulp send`: Send a preview email to the addresses listed in the `gulpfile.js`
3. `$ gulp deploy`: Uploads the `./public` folder to gh-pages for preview and distribution


###Troubleshooting

##### Gulp command not recognised
Make sure gulp is installed by running `$ npm install gulp -g`

##### Gulp-sass throws an error
At time of writing, Gulp sass is only supported upto v0.12 of node. run `$ node -v` to check the version installed