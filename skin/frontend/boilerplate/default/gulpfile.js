var gulp = require('gulp');

var less      = require('gulp-less');
var minifycss = require('gulp-minify-css');
var bless = require('gulp-bless');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var notify     = require('gulp-notify');
var clean      = require('gulp-clean');
var livereload = require('gulp-livereload');

// LESS
gulp.task('less', function() {
    return gulp.src('less/style.less')
        .pipe(less().on('error', notify.onError(function (error) {
            return 'Error compiling LESS: ' + error.message;
        })))
        .pipe(minifycss())
        .pipe(bless({
            imports: true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Successfully compiled LESS'
        }));
});

// Linting
gulp.task('lint', function() {
    return gulp.src('js/script.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(livereload());
});

// JavaScript
gulp.task('js', function() {
    return gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/js/transition.js',
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/carousel.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/bootstrap/js/modal.js',
            'js/script.js'
        ])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Successfully compiled JS'
        }));
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/css', 'dist/js'], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('less', 'lint', 'js');
});

// Watch
gulp.task('watch', function() {

    // Watch .less files
    gulp.watch('less/**/*.less', ['less']);

    // Watch .js files
    gulp.watch('js/**/*.js', ['lint', 'js']);
});
