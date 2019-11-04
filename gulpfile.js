const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const concat = require("gulp-concat");

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "public/"
    }
  });
});

// HTML
gulp.task('pug', function () {
  return gulp.src('views/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('public/pages/'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', function() {
	return gulp.src('src/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('public/js'));
});