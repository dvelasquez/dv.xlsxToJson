/**
 * Created by admin on 27-07-2015.
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    annotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify');

var config = {
    path: {
        dev: 'xlsxToJson.js',
        dist: 'dist/'
    },
    compress: {
        compress: true,
        sourceMap: true
    }
};

gulp.task('copy', function () {
    return gulp.src([config.path.dev])
        .pipe(rename('xlsxToJson.min.js'))
        .pipe(gulp.dest(config.path.dist))
});

gulp.task('build', function () {

    return gulp.src([config.path.dist + '**/*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(annotate())
        .pipe(uglify(config.compress))
        .pipe(gulp.dest(config.path.dist));
});

gulp.task('default', ['copy', 'build']);