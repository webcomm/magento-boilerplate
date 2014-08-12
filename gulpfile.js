var config       = require('./boilerplate.json');

var gulp         = require('gulp'),
    less         = require('gulp-less'),
    minifycss    = require('gulp-minify-css'),
    bless        = require('gulp-bless'),
    jshint       = require('gulp-jshint'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    notify       = require('gulp-notify'),
    rimraf       = require('gulp-rimraf');

var oPath        = {
    basePath: "src/skin/frontend/boilerplate/",
    defaultTheme: "default/",
    parts: {
        less: "less/style.less",
        js: "js/*.js",
        dist: "dist/"
    }
};

/**
 * custom reporter for notify to get rid
 * of errors if to growl is used
 */
var customNotify = notify.withReporter(function (options, callback) {
    callback();
});

/**
 * function to deliver correct file paths to tasks
 * according to path object oPath
 *
 * @param {string} part - choose between less, js and dist
 * @return {array}
 */
var getPath = function (part) {
    var theme = (config.theme !== '') ? config.theme : oPath.defaultTheme;

    // for part js we have to return custom theme and default theme folder
    if(config.theme !== '' && part === 'js') {
        return [
            oPath.basePath + theme + '/' + oPath.parts[part],
            oPath.basePath + oPath.defaultTheme + oPath.parts[part]
        ];
    }

    return [oPath.basePath + theme + '/' + oPath.parts[part]];
};

// LINT
gulp.task('lint', function() {
    return gulp.src(getPath('js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// LESS
gulp.task('less', function() {
    return gulp.src(getPath('less'))
        .pipe(less().on('error', customNotify.onError(function (error) {
            return 'Error compiling LESS: ' + error.message;
        })))
        .pipe(minifycss())
        .pipe(bless({
            imports: true
        }))
        .pipe(gulp.dest(getPath('dist') + 'css'))
        .pipe(customNotify({
            message: 'Successfully compiled LESS'
        }));
});

// JavaScript
gulp.task('js', function() {
    return gulp.src(getPath('js'))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(getPath('dist') + 'js'))
        .pipe(customNotify({
            message: 'Successfully compiled JS'
        }));
});

// Bootstrap JavaScript
gulp.task('bootstrapJs', function() {
    return gulp.src(config.bootstrap.js)
        .pipe(concat('bootstrap.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/bootstrap'))
        .pipe(customNotify({
            message: 'Successfully compiled Bootstrap JS'
        }));
});

// modernizr
var modernizrModules = ['bower_components/modernizr/modernizr.js'];
gulp.task('modernizr', function () {
    gulp.src(modernizrModules.concat(config.modernizr.detectors))
        .pipe(concat('modernizr.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/modernizr'))
        .pipe(customNotify({
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
    return  gulp.src(
                getPath('dist/*')
                ,{read: false}
            )
            .pipe(rimraf({force: true}));
});

// Init task to have working bootstrap js parts, jquery and bootstrap fonts
gulp.task('init', ['clean', 'jQuery', 'bootstrapFonts', 'bootstrapJs', 'less', 'js', 'modernizr']);

// Watch
gulp.task('watch', function() {
    // Watch .less files
    gulp.watch('less/**/*.less', ['clean','less']);
    // Watch .js files
    gulp.watch('js/**/*.js', ['clean','lint','js']);
});

// Default task
gulp.task('default', ['clean', 'less', 'lint', 'js']);