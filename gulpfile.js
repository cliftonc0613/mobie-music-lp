// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync  = require('browser-sync').create();


gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            base: "./"
            // Use a specific port (instead of the one auto-detected by Browsersync).

        },
        port: 7000

    });

    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("*.html").on("change", browserSync.reload({stream: true}));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(browserSync.reload({stream: true})); // prompts a reload after compilation

});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream: true})); // prompts a reload after compilation

});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('asset/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'serve' ]);