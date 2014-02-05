var gulp = require('gulp');

var less = require('gulp-less');
var minifycss = require('gulp-minify-css');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var notify = require('gulp-notify');

gulp.task('less', function() {
	gulp
		.src('less/style.less')
		.pipe(less().on("error", notify.onError(function (error) {
			return "Error compiling LESS: " + error.message;
		})))
		// .pipe(minifycss())
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({
			message: 'Successfully compiled LESS'
		}));
});

gulp.task('lint', function() {
	gulp
		.src('js/script.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
	gulp
		.src([
			'bower_components/jquery/jquery.js',
			'bower_components/bootstrap/js/transition.js',
			'bower_components/bootstrap/js/collapse.js',
			'bower_components/bootstrap/js/carousel.js',
			'bower_components/bootstrap/js/dropdown.js',
			'bower_components/bootstrap/js/modal.js',
			'js/script.js'
		])
		.pipe(concat('script.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({
			message: 'Successfully compiled JS'
		}));
});

gulp.task('default', ['less', 'lint', 'js'], function() {

	gulp.watch('less/**/*.less', function() {
		gulp.run('less');
	});

	gulp.watch('js/**/*.js', function() {
		gulp.run('lint');
		gulp.run('js');
	});
});
