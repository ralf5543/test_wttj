'use strict';

// Required
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var responsive = require('gulp-responsive');

// ======================------------------ TASKS

gulp.task('css', function () {
  return gulp.src('./src/assets/css/styles.scss')
      .pipe(sass().on('error', sass.logError))//Convert sass files to css files
      .pipe(autoprefixer())//adds prefix for old browsers
      .pipe(gulp.dest('./dist/assets/css'));
});

//Update css files each time a sass file is modified
gulp.task('csswatch', function () {
  gulp.watch('./src/assets/css/**/*.scss', ['css']);
});

//Generates images at different sizes
gulp.task('images', function () {

  return gulp.src('./sources/*.{jpg,png}')
      .pipe(responsive({

        // Resize all images to three different sizes: 200, 400, 900 and 1280 pixels, eventually with their retina version (pixel ratio x2 or x3)
        '*': [{
          width: 420,
          rename: { suffix: '-420px' }
        }, {
          width: 420 * 2,
          rename: { suffix: '-420px_2x' }
        }, {
          width: 420 * 3,
          rename: { suffix: '-420px_3x' }
        }, {
          // Compress, strip metadata, and rename original image
          rename: { suffix: '-original' }
        }],
      }, {
        // Global configuration for all images
        // The output quality for JPEG, WebP and TIFF output formats
        quality: 70,
        // Use progressive (interlace) scan for JPEG and PNG output
        progressive: true,
        // Strip all metadata
        withMetadata: false,
        withoutEnlargement: true,
        skipOnEnlargement: true, // that option copy original file with/without renaming
        errorOnEnlargement: false,
        crop: 'center'
      }))
      .pipe(gulp.dest('./src/assets/img'));
});

// Build task
gulp.task('build', ['css']);

// Prod task = Build + minify
gulp.task('prod', ['build',  'minify']);

// Defaukt task
gulp.task('default', ['build', 'csswatch']);