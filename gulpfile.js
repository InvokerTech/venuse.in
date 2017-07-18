var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
/* var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var babel = require('gulp-babel'); */
gulp.task('sass', function () {

  return gulp.src('public/scss/**/*.scss')

    .pipe(sass())
    //.pipe(concat('css/*.css'))
    .pipe(gulp.dest('public/css/'));

});

gulp.task('scripts', function () {
  return gulp.src('public/app/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/'));
   // .pipe(babel())
   // .pipe(uglify())
   // .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
   // .pipe(gulp.dest('public/'));
});

gulp.task('default', ['sass', 'scripts'], function () {
  gulp.watch('public/scss/**/*.scss', ['sass']);
  gulp.watch('public/app/**/*.js', ['scripts']);
});


