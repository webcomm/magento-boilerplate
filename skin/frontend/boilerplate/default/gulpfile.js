// Load plugins
var
  gulp         = require('gulp'),
  less         = require('gulp-less'),
  minifycss    = require('gulp-minify-css'),
  uglify       = require('gulp-uglify'),
  imagemin     = require('gulp-imagemin'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  notify       = require('gulp-notify'),
  cache        = require('gulp-cache'),
  livereload   = require('gulp-livereload');

var config = {

  // If you do not have the live reload extension installed,
  // set this to false. We will include the script for you,
  // just to aid with development.
  liveReloadPlugin: false

}

// CSS
gulp.task('css', function() {
  return gulp
    .src('src/less/style.less')
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(gulp.dest('css'))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Successfully compiled LESS' }));
});

// JS
gulp.task('js', function() {
  var scripts = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/js/transition.js',
    'bower_components/bootstrap/js/collapse.js',
    'bower_components/bootstrap/js/carousel.js',
    'bower_components/bootstrap/js/dropdown.js',
    'bower_components/bootstrap/js/modal.js',
    'src/js/script.js'
  ];

  if (config.liveReloadPlugin === false) {
    scripts.push('src/js/livereload.js');
  }

  return gulp
    .src(scripts)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Successfully compiled JavaScript' }));
});

// Images
gulp.task('images', function() {
  return gulp
    .src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('images'))
    .pipe(notify({ message: 'Successfully processed images' }));
});

// Fonts
gulp.task('fonts', function() {
  return gulp
    .src([
      'bower_components/bootstrap/fonts/**/*',
      'bower_components/font-awesome/fonts/**/*'
    ])
    .pipe(gulp.dest('fonts'))
    .pipe(notify({ message: 'Successfully processed fonts' }));
})

// Rimraf
gulp.task('rimraf', function() {
  return gulp
    .src(['css', 'js', 'images'], {read: false})
    .pipe(rimraf());
});

// Default task
gulp.task('default', ['rimraf'], function() {
    gulp.start('css', 'js', 'images', 'fonts');
});

// Watch
gulp.task('watch', function() {

  // Watch .less files
  gulp.watch('src/less/**/*.less', ['css']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['js']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch fonts
  gulp.watch('bower_components/bootstrap/fonts/**/*', ['fonts']);

  // Create LiveReload server
  var server = livereload();

  // Watch any files in , reload on change
  gulp.watch(['css/style.css', 'js/script.js', 'images/**/*', 'fonts/**/*']).on('change', function(file) {
    server.changed(file.path);
  });

});
