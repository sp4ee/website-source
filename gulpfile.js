/// <binding BeforeBuild='default' Clean='clean' ProjectOpened='watch' />
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var terser = require('gulp-terser');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var fs = require("fs");

// Compile all .less files to .css
gulp.task('less', function () {
  return gulp.src('./src/*.less')
    .pipe(plumber())
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./src-comp/'));
});

// Minify and bundle CSS files
gulp.task('styles', gulp.series('less', function () {
  return gulp.src(['./src-comp/*.css', '!./src-comp/bundle.css'])
    .pipe(minifyCSS())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./public/'))
    .pipe(gulp.dest('./static/'));
}));

// Browserify scripts
gulp.task('browserify', () => {
  var b = browserify({
    entries: './src/index.js',
    debug: true
  });
  return b.bundle()
    .pipe(source('./bundle.js'))
    .pipe(buffer())
    // .pipe(terser())
    // .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(sourcemaps.init({ loadMaps: true }))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/'))
    .pipe(gulp.dest('./static/'));
});

// Delete all compiled and bundled files
gulp.task('clean', function () {
  return del(['./src-comp/*.css', './public/bundle.*', './static/bundle.*']);
});

// Default task: full clean+build.
gulp.task('default', gulp.series('browserify', 'styles', function (done) { done(); }));

// Watch: recompile less on changes
gulp.task('watch', function () {
  gulp.watch(['./src/*.less'], gulp.series('styles'));
  gulp.watch(['./src/*.js'], gulp.series('browserify'));
});
