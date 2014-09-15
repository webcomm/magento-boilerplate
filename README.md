# Magento Boilerplate
### A HTML5 Twitter Bootstrap 3.1 Magento 1.8 Boilerplate Template

Read the [blog post](http://www.webcomm.com.au/blog/2013/09/introducing-magento-boilerplate-a-twitter-bootstrap-3-powered-html5-mobile-first-starter-theme) or checkout the [demo](http://magentoboilerplate.webcomm.com.au) for more information.

---

## Installation

There are three ways to install this boilerplate. [Composer](http://getcomposer.org) is by far the easiest to maintain.

### Composer

> A prerequisite for using this method is that you have Composer [installed](http://getcomposer.org/doc/00-intro.md#installation-nix) in your system.

Begin by creating a `composer.json` in the root of Magento, and ensure it has the following:

```json
{
    "repositories": [
        {
           "type": "vcs",
           "url": "https://github.com/magento-hackathon/magento-composer-installer"
        }
    ],
    "require": {
        "magento-hackathon/magento-composer-installer": "*",
        "webcomm/magento-boilerplate": "dev-master"
    },
    "extra": {
        "magento-root-dir": "./",
        "magento-deploystrategy": "copy"
    },
    "config": {
        "preferred-install": "dist"
    }
}

```

Finish by installing Composer dependencies and a couple of optional enhancements:

```bash
cd your-project/
composer install

# If you wish to autoload composer files
cp vendor/webcomm/magento-boilerplate/index.php .

# If you wish to automatically set *.dev domains to developer mode
cp vendor/webcomm/magento-boilerplate/.htaccess .

# If you wish to run your own theme, replace "mytheme" with the name of your theme
cp -Rf vendor/webcomm/magento-boilerplate/app/design/frontend/boilerplate app/design/frontend/mytheme
cp -Rf vendor/webcomm/magento-boilerplate/skin/frontend/boilerplate skin/frontend/mytheme
```

> Now you should have a new folder `vendor/webcomm/magento-boilerplate` with our repository and new symbolic links in Magento. You can update to each new version with `composer update`.

### Git

Firstly, clone our repo down to a folder:

```bash
git clone git@github.com:webcomm/magento-boilerplate.git your-project
```

Secondly, copy in a supported Magento version over the top of the reop:

```bash
wget http://www.magentocommerce.com/downloads/assets/1.8.1.0/magento-1.8.1.0.tar.gz
tar -zxvf magento-1.8.1.0.tar.gz
mv -f magento/* your-project/
```

> You may update to each new version with `git pull`.

### ZIP downloads

1. Download Magento from [http://www.magentocommerce.com/download](http://www.magentocommerce.com/download).
2. Download our repo from [https://github.com/webcomm/magento-boilerplate/archive/master.zip](https://github.com/webcomm/magento-boilerplate/archive/master.zip).

Merge the folders, and you're good to go.

----

## Developing

Developing in our boilerplate theme is rather easy. There are basically two general possibilities:

1. Copy or rename the boilerplate theme and start editing it.
2. Build a new "child" theme under the `boilerplate` package and only edit the things you need to edit.

The second approach has the advantage that updating the boilerplate theme is quite easy. You would just replace the files under `boilerplate/default` with the new ones and check if you need to copy some changes to the files you edited. Updating the theme with the first approach is a nightmare. The advantage of the first approach is that you can still build custom child themes like `mytheme/xmas`. Anyway, this is also still possible with the second approach by using [Aoe_DesignFallback](https://github.com/fbrnc/Aoe_DesignFallback).

### Copy / Rename the Boilerplate Theme

To begin, you should either copy our theme or rename our theme to something useful by doing:

```bash
cp -Rf app/design/frontend/boilerplate app/design/frontend/mytheme
cp -Rf skin/frontend/boilerplate skin/frontend/mytheme
```

Once you've copied or renamed the theme, you will need to add it to the bottom of the `.gitignore` file:

```ini
!/app/design/frontend/mytheme
!/skin/frontend/mytheme
```

From here, you'll want to install the site and enable the theme through Magento's design configuration. Firstly, install your site like any other Magento installation. There's plenty of guides out there on that. Then, visit `System > Configuration > Design > Package` and change the package from `default` to whatever you named your theme (such as `mytheme`).

### Build a New "Child" Theme under the `boilerplate` Package

To begin, you should create a new folder with your new theme name (e.g. `mytheme`) under `app/design/frontend/boilerplate/mytheme` and `skin/frontend/boilerplate/mytheme`.

From here, you'll want to install the site and enable the theme through Magento's design configuration. Firstly, install your site like any other Magento installation. There's plenty of guides out there on that. Then, visit `System > Configuration > Design` and change the package from `default` to `boilerplate`. Additionally, change the translations, templates, skin, layout and default to  whatever you named your theme (such as `mytheme`).

----

The process we like to stick with when developing is have our dependencies managed for us, and use a task runner to compile them into CSS / JavaScript files which are served to the user. You don't have to do this, however it's a great way to save time down the track, even if there's a bit of a learning curve to begin with.

### Asset Dependency Management and Automatic Compilation

The first thing to do this is install [Bower](http://bower.io) and [gulp.js](http://gulpjs.com) (both are NodeJS applications).

To install Bower dependencies (not included in the theme becuase they're simply not required for everybody), you'll need to use Bower.

```bash
cd skin/frontend/mytheme/default
bower install
```

Once you have gulp.js installed globally, open up your terminal and change directory into your theme and execute `gulp`:

```bash
cd skin/frontend/mytheme/default
npm install
gulp
```

That's it. From now on, your changes you make to LESS files will automatically compile into CSS, and the same with JavaScript. Refresh your page to see changes!

### Adding New Bootstrap Components

This theme does not ship with all Bootstrap CSS and JavaScript. The reason is, most sites don't **need** all the components and therefore you're bloating a site by providing more than required. We're including only the files required to get this boilerplate theme running.

To add new Bootstrap styles, simply open up `less/style.less`. From there, you may directly import Bootstrap files, or your own files which in turn import Bootstrap's. For example, add the following into `less/style.less`:

```css
@import "media.less"; /* Relative to less/style.less */
```

Then, in `less/media.less`:

```css
/* In less/media.less */
@import "../bower_components/bootstrap/less/media.less"; /* Relative to less/media.less */

.media {
    /* Your custom overrides go below the call to Bootstrap's styles */
}
```

> You may choose to import more than just Bootstrap's LESS / CSS files. Feel free to import anything this way, it's good practice.

To add new JavaScript files, open up `gulpfile.js`. gulp.js is seperated into a number of tasks. One of them is the `js` task. Inside it, you'll see a bunch of JavaScript files listed out. If you require more Bootstrap files (or indeed any JavaScript files), simply add them to the list.

```javascript
// ...
.src([
    'bower_components/jquery/jquery.js',
    'bower_components/bootstrap/js/transition.js',
    'bower_components/bootstrap/js/collapse.js',
    'bower_components/bootstrap/js/carousel.js',
    'bower_components/bootstrap/js/dropdown.js',
    'bower_components/bootstrap/js/modal.js',
    // Add new files here
    'js/script.js'
])
// ...
```

### FAQs

1. **Notify isn't working?** - check you are not running `gulp` on a headless (command-line only) server, such as a remote webserver or Vagrant box. Windows may need [modification](https://github.com/webcomm/magento-boilerplate/issues/48) of your `gulpfile.js` and `package.json` files to work properly.

### Manual Development (No gulp.js)

Feel free to edit any of the files under `dist/css` and `dist/js` if you'd like to manually develop your site. There's no harm in doing this, if you don't want to use gulp.js in the future. Keep in mind that, if you decide to compile with gulp.js that you will lose your manual changes.

----

## Contributing

The git repo for this project can be found at [http://github.com/webcomm/magento-boilerplate](http://github.com/webcomm/magento-boilerplate), and a demo can be found at [http://magentoboilerplate.webcomm.com.au](http://magentoboilerplate.webcomm.com.au).

We feel that we've done a pretty decent job at creating a great starter theme for developing up a Magento site. We chose Twitter Bootstrap 3 not because we want all sites to look like Bootstrap, we hate that too. Bootstrap creates a great foundation of reusable components which you can use to create something truly unique.

The reason Boilerplate themes exist is so you can spend less time on getting ready to start productive work by removing the repetitive first steps. We've taken care of the boring, so you may focus on the unique.

If you like our work, we're not after your money, but rather, we'd love to see a [pull request](http://github.com/webcomm/magento-boilerplate/pulls), or even an [issue](http://github.com/webcomm/magento-boilerplate/issues), on your vision for how this can be improved! At the end of the day, if we can all create something truly useful to a lot of people, everybody wins and we can all go home earlier.
