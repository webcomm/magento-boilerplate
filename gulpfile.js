// TODO: build json file for theme setting such as theme name and bootstrap components
var customTheme  = '';

var gulp         = require('gulp'),
    less         = require('gulp-less'),
    minifycss    = require('gulp-minify-css'),
    bless        = require('gulp-bless'),
    jshint       = require('gulp-jshint'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    notify       = require('gulp-notify'),
    clean        = require('gulp-clean'),
    livereload   = require('gulp-livereload');

var oPath        = {
    basePath: "src/skin/frontend/boilerplate/",
    defaultTheme: "default/",
    parts: {
        less: "less/style.less",
        js: "js/script.js",
        dist: "dist/"
    }
};

/**
 * function to deliver correct file paths to tasks
 * according to path object oPath
 *
 * TODO: if custom theme is set and asked for js deliver path to theme js folder, too.
 *
 * @param {string} part - choose between less, js and dist
 */
var getPath = function (part) {
    var theme = (customTheme !== '') ? customTheme : oPath.defaultTheme;
    return oPath.basePath + theme + oPath.parts[part];
};

// LESS
// TODO: check if it's possible to have default and theme path to join less files
gulp.task('less', function() {
    return gulp.src(getPath('less'))
        .pipe(less().on('error', notify.onError(function (error) {
            return 'Error compiling LESS: ' + error.message;
        })))
        .pipe(minifycss())
        .pipe(bless({
            imports: true
        }))
        .pipe(gulp.dest(getPath('dist') + 'css'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Successfully compiled LESS'
        }));
});

// JavaScript
gulp.task('js', function() {
    return gulp.src([
            getPath('js')
        ])
        .pipe(concat('script.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(gulp.dest(getPath('dist') + 'js'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Successfully compiled JS'
        }));
});

// Bootstrap JavaScript
gulp.task('bootstrapJs', function() {
    return gulp.src([
            'bower_components/bootstrap/js/transition.js',
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/carousel.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/bootstrap/js/modal.js'
        ])
        .pipe(concat('bootstrap.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/bootstrap'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Successfully compiled Bootstrap JS'
        }));
});

// modernizr
gulp.task('modernizr', function () {
    gulp.src([
            'bower_components/modernizr/modernizr.js',

            // add here feature detects:
            'bower_components/modernizr/feature-detects/css-filters.js'
        ])
        .pipe(concat('modernizr.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/modernizr'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Successfully compiled Modernizr JS'
        }));
});

// jQuery
gulp.task('jQuery', function(){
    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('src/js/jquery'));
});

// Bootstrap Fonts
gulp.task('bootstrapFonts', function(){
    gulp.src('bower_components/bootstrap/fonts/*')
        .pipe(gulp.dest(getPath('dist') + 'fonts/bootstrap/'));

    gulp.src('bower_components/bootstrap/fonts/*')
        .pipe(gulp.dest(getPath('dist') + 'fonts/font-awesome/'));
});

// Task section:
// --------------------------------------

// Clean
gulp.task('clean', function() {
    return  gulp.src([
                getPath('dist') + 'css',
                getPath('dist') + 'js'
                ],{read: false}
            )
            .pipe(clean());
});

// Init task to have working bootstrap js parts, jquery and bootstrap fonts
gulp.task('init', ['clean', 'jQuery', 'bootstrapFonts', 'bootstrapJs', 'less', 'js', 'modernizr']);

// Watch
gulp.task('watch', function() {
    // Watch .less files
    gulp.watch('less/**/*.less', ['less']);
    // Watch .js files
    gulp.watch('js/**/*.js', ['js']);
});

// Default task
gulp.task('default', ['clean', 'less', 'js']);