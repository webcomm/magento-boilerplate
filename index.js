'use strict';

module.exports = function (config, callback) {

  // Load modules
  var gulp = require('gulp');
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;
  var tempWrite = require('temp-write');
  var _ = require('underscore');

  // Gulp plugins
  var $ = require('gulp-load-plugins')();

  // A list of all available components, mapping any additional assets required.
  // It's a simple way of ensuring only required assets are loaded.
  var availableComponents = {
    'grid':             { javascripts: ['interchange'] },
    'accordion':        { javascripts: ['accordian'] },
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
    'block-grid',
    'forms'
  ];

  // Prepare configuration (defaults plus user overrides)
  config = _.extend({

    // Whether we are in production mode or not
    production: false,

    // Each frontend separation of Magento is just considered
    // a site within the context of the Boilerplate
    sites: [
      {
        // The package and theme respectively represent the
        // location of both template files and skin files
        package: 'boilerplate',
        theme: 'default',

        // Below you may specify any components that you would like to include
        // with your site. This will ensure that the required JavaScripts and
        // stylesheets are available. Only choose the ones you need to
        // include, and no more. There are a number of required
        // components which, whether you include or not,
        // will be compiled.
        //
        // Available:
        //     accordion, alert-boxes, breadcrumbs, button-groups, buttons, clearing, dropdown, dropdown-buttons, equalizer, flex-video, icon-bar, inline-lists, joyride, keystrokes, labels, magellan, orbit, pagination, panels, pricing-tables, progress-bars, range-slider, reveal, side-nav, split-buttons, sub-nav, switches, tables, tabs, thumbs, tooltips, top-bar, type, offcanvas, visibility.
        //
        // Required:
        //     grid, block-grid, forms
        components: [],

        // BrowserSync server configuration details. These
        // options are passed directly into BrowserSync.
        browserSync: {
          proxy: 'magentoboilerplate.dev',
          port: 3000
        }
      }
    ]
  }, config);

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
        sassVariables.push('$include-'+component+': true !default;');
      });

      // We then declare all components are not included, but because of the "!default" flag,
      // these variables are only recognised if they weren't previously defined. This
      // means that we're effectively making sure all the variables are defined
      // so that the SASS file does not error out (see magento-boilerplate.scss)
      _.each(availableComponents, function (noop, component) {
        sassVariables.push('$include-'+component+': false !default;');
      });

      gulp
        .src([
          tempWrite.sync(sassVariables.join('\n')), // Temporary file made up of concatenated variables
          skinPath(site)+'/assets/stylesheets/styles.scss'
        ])
        .pipe($.concat('styles.scss'))
        .pipe($.sass({
          outputStyle: config.production ? 'compressed' : 'nested',
          includePaths: [
            'bower_components/foundation/scss',
            'bower_components/magento-boilerplate/stylesheets'
          ]
        }))
        .on('error', $.notify.onError())
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(reload({stream:true}))
        .pipe(gulp.dest(skinPath(site)+'/css'))
        .pipe($.notify('Compiled stylesheets.'));
    });
  });

  // JavaScripts
  gulp.task('javascripts', function () {
    _.each(config.sites, function (site) {

      // By default, we will load jQuery and the core Foundation library
      var javascripts = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/foundation/js/foundation/foundation.js'
      ];

      // Because Magento uses Prototype, we need to put jQuery into noconflict mode
      javascripts.push(tempWrite.sync('jQuery.noConflict();'));

      // Now we will loop through all required components as well as user-defined
      // components to create a list of JavaScripts that we need to include.
      _.each(requiredComponents.slice(0).concat(site.components), function (component) {
        _.each(availableComponents[component].javascripts, function (javascript) {
          javascripts.push('bower_components/foundation/js/foundation/foundation.'+javascript+'.js');
        });
      });

      // Finally, we'll compile all JavaScripts located in the skin path for the site
      javascripts.push(skinPath(site)+'/assets/javascripts/**/*.js');

      gulp
        .src(_.uniq(javascripts)) // Avoid duplicates
        .pipe($.concat('scripts.js'))
        .pipe($.if(config.production, $.uglify()))
        .pipe(gulp.dest(skinPath(site)+'/js'))
        .pipe(reload({stream:true}))
        .pipe($.notify('Compiled scripts.'));
    });
  });

  // Images
  gulp.task('images', function () {
    _.each(config.sites, function (site) {
      gulp
        .src([
          'bower_components/magento-boilerplate/images/**/*',
          skinPath(site)+'/assets/images/**/*',
        ])
        .pipe($.cache($.imagemin({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        })))
        .pipe(gulp.dest(skinPath(site)+'/images'))
        .pipe(reload({stream:true}));
    });
  });

  // Clean out compiled files
  gulp.task('clean', function () {
    _.each(config.sites, function (site) {
      gulp
        .src([
          skinPath(site)+'/css',
          skinPath(site)+'/js'
        ], { read: false })
        .pipe($.rimraf());
    })
  })

  // Serve the website with live reloading
  gulp.task('serve', function() {
    _.each(config.sites, function (site) {
      browserSync(site.browserSync);
    });
  });

  // Custom tasks
  gulp.task('custom', function () {
    if (typeof callback === 'function') {
      callback.apply(this, [gulp]);
    }
  });

  // Build process
  gulp.task('build', ['stylesheets', 'javascripts', 'images', 'custom']);

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
      gulp.watch(skinPath(site)+'/assets/javascripts/**/*.js', ['javascripts']);

      // @todo Remove once initial development is concluded
      gulp.watch('bower_components/magento-boilerplate/stylesheets/**/*.scss', ['stylesheets']);
      gulp.watch('bower_components/magento-boilerplate/images/**/*', ['images']);
    });
  });
};
