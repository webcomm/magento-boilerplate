// Load plugins
var
  gulp         = require('gulp'),
  less         = require('gulp-less'),
  minifycss    = require('gulp-minify-css'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  notify       = require('gulp-notify'),
  cache        = require('gulp-cache'),
  livereload   = require('gulp-livereload');

var config = {

  // If you do not have the live reload extension installed,
  // set this to true. We will include the script for you,
  // just to aid with development.
  appendLiveReload: true,

  // Should CSS & JS be compressed?
  minifyCss: true,
  uglifyJS: true

}

// CSS
gulp.task('css', function() {
  var stream = gulp
    .src('src/less/style.less')
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(gulp.dest('css'));

  if (config.minifyCss === true) {
    stream.pipe(minifycss());
  }

  return stream
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

  if (config.appendLiveReload === true) {
    scripts.push('src/js/livereload.js');
  }

  var stream = gulp
    .src(scripts)
    .pipe(concat('script.js'));

  if (config.uglifyJS === true) {
    stream.pipe(uglify());
  }

  return stream
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Successfully compiled JavaScript' }));
});

// Images
gulp.task('images', function() {
  return gulp
    .src('src/images/**/*')
    .pipe(gulp.dest('images'))
    .pipe(notify({ message: 'Successfully processed image' }));
});

// Fonts
gulp.task('fonts', function() {
  return gulp
    .src([
      'bower_components/bootstrap/fonts/**/*',
      'bower_components/font-awesome/fonts/**/*'
    ])
    .pipe(gulp.dest('fonts'))
    .pipe(notify({ message: 'Successfully processed font' }));
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
