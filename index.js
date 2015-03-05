/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2011-2015 Webcomm Pty Ltd
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

module.exports = function (config, callback) {

  // Load modules
  var gulp = require('gulp');
  var browserSync = require('browser-sync');
  var del = require('del');
  var reload = browserSync.reload;
  var tempWrite = require('temp-write');
  var _ = require('underscore');

  // Gulp plugins
  var $ = require('gulp-load-plugins')();

  // Prepare configuration (defaults plus user overrides).
  // See config.example.json for documentation.
  config = _.extend({
    production: false,
    sites: []
  }, config);

  // A list of all available components, mapping any additional assets required.
  // It's a simple way of ensuring only required assets are loaded.
  var availableComponents = {
    'grid':             { javascripts: ['interchange'] },
    'accordion':        { javascripts: ['accordion'] },
    'alert-boxes':      { javascripts: ['alert'] },
    'block-grid':       { javascripts: [] },
    'breadcrumbs':      { javascripts: [] },
    'button-groups':    { javascripts: [] },
    'buttons':          { javascripts: [] },
    'clearing':         { javascripts: ['clearing'] },
    'dropdown':         { javascripts: ['dropdown'] },
    'dropdown-buttons': { javascripts: [] },
    'equalizer':        { javascripts: ['equalizer'] },
    'flex-video':       { javascripts: [] },
    'forms':            { javascripts: ['abide'] },
    'icon-bar':         { javascripts: [] },
    'inline-lists':     { javascripts: [] },
    'joyride':          { javascripts: ['joyride'] },
    'keystrokes':       { javascripts: [] },
    'labels':           { javascripts: [] },
    'magellan':         { javascripts: ['magellan'] },
    'orbit':            { javascripts: ['orbit'] },
    'pagination':       { javascripts: [] },
    'panels':           { javascripts: [] },
    'pricing-tables':   { javascripts: [] },
    'progress-bars':    { javascripts: [] },
    'range-slider':     { javascripts: ['slider'] },
    'reveal':           { javascripts: ['reveal'] },
    'side-nav':         { javascripts: [] },
    'split-buttons':    { javascripts: ['dropdown'] },
    'sub-nav':          { javascripts: [] },
    'switches':         { javascripts: [] },
    'tables':           { javascripts: [] },
    'tabs':             { javascripts: ['tab'] },
    'thumbs':           { javascripts: [] },
    'tooltips':         { javascripts: ['tooltip'] },
    'top-bar':          { javascripts: ['topbar'] },
    'type':             { javascripts: [] },
    'offcanvas':        { javascripts: ['offcanvas'] },
    'visibility':       { javascripts: [] },
  };

  // Components which are required for the boilerplate and must be included at all times
  var requiredComponents = [
    'grid',
    'alert-boxes',
    'breadcrumbs',
    'equalizer',
    'forms',
    'inline-lists',
    'pagination',
    'tables',
    'top-bar',
    'type',
    'visibility'
  ];

  function templatePath(site) {
    return 'app/design/frontend/'+site.package+'/'+site.theme;
  }

  function skinPath(site) {
    return 'skin/frontend/'+site.package+'/'+site.theme;
  }

  // Compile stylesheets for every site
  gulp.task('stylesheets', function () {
    _.each(config.sites, function (site) {

      // We're going to create a temporary file for each site, which is a valid
      // SASS stylesheet that defines variables. We'll then prepend this to
      // our SASS compilation so that variables defined in a configuration
      // file can lead to conditional inclusion of components.
      var sassVariables = [];

      // We begin by declaring all of our included components (both required and user-defined)
      _.each(requiredComponents.slice(0).concat(site.components), function (component) {
        sassVariables.push('$include-'+component+'-component: true !default;');
      });

      // We then declare all components are not included, but because of the "!default" flag,
      // these variables are only recognised if they weren't previously defined. This
      // means that we're effectively making sure all the variables are defined
      // so that the SASS file does not error out (see magento-boilerplate.scss)
      _.each(availableComponents, function (noop, component) {
        sassVariables.push('$include-'+component+'-component: false !default;');
      });

      // Create an array of stylesheets
      var stylesheets = [
        tempWrite.sync(sassVariables.join('\n')) // Temporary file made up of concatenated variables
      ];

      // Attach any site-specific stylesheets
      _.each(site.compilation.stylesheets, function (stylesheet) {
        stylesheets.push(stylesheet);
      });

      // Finally, attach the stylesheet in the skin path
      stylesheets.push(skinPath(site)+'/assets/stylesheets/styles.scss');

      // Create an array of default include paths
      var includePaths = [
        'bower_components/foundation/scss',
        'bower_components/font-awesome/scss',
        'bower_components/magento-boilerplate/assets/stylesheets'
      ];

      // Attach any site-specific include paths
      _.each(site.compilation.includePaths, function (includePath) {
        includePaths.push(includePath);
      });

      gulp
        .src(_.uniq(stylesheets))
        .pipe($.concat('styles.scss'))
        .pipe($.sass({
          outputStyle: config.production ? 'compressed' : 'nested',
          includePaths: _.uniq(includePaths)
        }))
        .on('error', $.notify.onError())
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(reload({stream:true}))
        .pipe(gulp.dest(skinPath(site)+'/css'))
        .pipe($.notify('Compiled Stylesheets.'));
    });
  });

  // JavaScripts
  gulp.task('javascripts', function () {
    _.each(config.sites, function (site) {

      // By default, we will load jQuery and the core Foundation library
      var javascripts = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/magento-boilerplate/assets/javascripts/no-conflict.js',
        'bower_components/foundation/js/foundation/foundation.js'
      ];

      // Now we will loop through all required components as well as user-defined
      // components to create a list of JavaScripts that we need to include.
      _.each(requiredComponents.slice(0).concat(site.components), function (component) {
        _.each(availableComponents[component].javascripts, function (javascript) {
          javascripts.push('bower_components/foundation/js/foundation/foundation.'+javascript+'.js');
        });
      });

      // Now, include any site-specific javascripts
      _.each(site.compilation.javascripts, function (javascript) {
        javascripts.push(javascript);
      });

      // Finally, we'll compile all JavaScripts located in the skin path for the site
      javascripts.push('bower_components/magento-boilerplate/assets/javascripts/magento-boilerplate.js');
      javascripts.push(skinPath(site)+'/assets/javascripts/**/*.js');

      gulp
        .src(_.uniq(javascripts)) // Avoid duplicates
        .pipe($.concat('scripts.js'))
        .pipe($.if(config.production, $.uglify()))
        .pipe(gulp.dest(skinPath(site)+'/js'))
        .pipe(reload({stream:true}))
        .pipe($.notify('Compiled JavaScripts.'));
    });
  });

  // Modernizr is a little different becuase it sits in the head of Magento rather
  // than at the end of hte page
  gulp.task('modernizr', function () {
    _.each(config.sites, function (site) {

      gulp
        .src('bower_components/modernizr/modernizr.js')
        .pipe($.if(config.production, $.uglify()))
        .pipe(gulp.dest(skinPath(site)+'/js'))
        .pipe(reload({stream:true}))
        .pipe($.notify('Compiled Modernizr.'));
    });
  });

  // Images
  gulp.task('images', function () {
    _.each(config.sites, function (site) {

      // Build array of images
      var images = [
        'bower_components/magento-boilerplate/assets/images/**/*'
      ];

      // Attach site-specific images
      _.each(site.compilation.images, function (image) {
        images.push(image);
      });

      // Add skin images
      images.push(skinPath(site)+'/assets/images/**/*');

      gulp
        .src(images)
        .pipe($.imagemin({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        }))
        .pipe(gulp.dest(skinPath(site)+'/images'))
        .pipe(reload({stream:true, once:true}));
    });
  });

  gulp.task('fonts', function () {
    _.each(config.sites, function (site) {
      gulp
        .src('bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff}')
        .pipe(gulp.dest(skinPath(site)+'/fonts'))
        .pipe(reload({stream:true}));
    });
  });

  // Clean out compiled files synchronously (so errors are not raised in other tasks)
  gulp.task('clean', function () {
    _.each(config.sites, function (site) {
      del.sync([
        skinPath(site)+'/css',
        skinPath(site)+'/fonts',
        skinPath(site)+'/images',
        skinPath(site)+'/js'
      ]);
    });
  });

  // Serve the website with live reloading
  gulp.task('serve', function() {
    _.each(config.sites, function (site) {
      browserSync(site.server);
    });
  });

  // Custom tasks
  gulp.task('custom', function () {
    if (typeof callback === 'function') {
      callback.apply(this, [gulp]);
    }
  });

  // Build process
  gulp.task('build', ['stylesheets', 'javascripts', 'modernizr', 'images', 'fonts', 'custom']);

  // Our default task will clean and build
  gulp.task('default', ['clean'], function () {
    gulp.start('build');
  });

  // Watching assets will start a build in web server that will
  // automatically synchronise browsers and reload assets
  gulp.task('watch', ['serve'], function () {
    _.each(config.sites, function (site) {

      // Watch template files for changes
      gulp.watch(templatePath(site)+'/**/*', reload);

      gulp.watch(skinPath(site)+'/assets/stylesheets/**/*.scss', ['stylesheets']);
      gulp.watch(skinPath(site)+'/assets/images/**/*', ['images']);
      gulp.watch(skinPath(site)+'/assets/javascripts/**/*.js', ['javascripts', 'modernizr']);

      // @todo Remove once initial development is concluded
      gulp.watch('bower_components/magento-boilerplate/assets/stylesheets/**/*.scss', ['stylesheets']);
      gulp.watch('bower_components/magento-boilerplate/assets/javascripts/**/*', ['javascripts', 'modernizr']);
      gulp.watch('bower_components/magento-boilerplate/assets/images/**/*', ['images']);
    });
  });
};
