// Load Gulp Plugins
var gulp        = require('gulp'),
    path        = require('path');
    sass        = require('gulp-ruby-sass'),
    rename      = require('gulp-rename'),
    minifycss   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    notify      = require('gulp-notify')

// Compile scss Files
gulp.task('scss', function() {
    return gulp.src('sources/scss/theme.scss')
        .pipe(sass({style: 'expanded', quiet: true, cacheLocation: 'sources/scss/.sass-cache'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(notify({message: 'SCSS Files Compiled Successfully'}));
});

// Concat JS Files
gulp.task('concat', function() {
    return gulp.src([
            'sources/framework/foundation/js/vendor/modernizr.js',
            'sources/framework/foundation/js/foundation/foundation.js',
            'sources/framework/foundation/js/foundation/foundation.alert.js',
            'sources/framework/foundation/js/foundation/foundation.offcanvas.js',
            'sources/framework/foundation/js/foundation/foundation.reveal.js',
            'sources/framework/foundation/js/foundation/foundation.tooltip.js',
            'sources/js/*.js'])
        .pipe(concat('theme.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/js'))
        .pipe(notify({message: 'JavaScript Files Compiled & Compressed Successfully'}));
});

// Watch scss and JS Files
gulp.task('watch', function() {
    gulp.watch('sources/scss/**/*.scss', ['scss']);
    gulp.watch('sources/js/*.js', ['concat']);
});

// Clean tmp Files
gulp.task('clean_tmp', function() {
    gulp.src('dev/tmp', {read: false})
        .pipe(clean());
});

// Main Task: Develop
gulp.task('develop', function() {
    gulp.start('scss', 'concat', 'watch');
});

// Main Task: Release
gulp.task('release', function() {
    gulp.start('scss', 'concat');
});