# Magento Boilerplate
### A HTML5 Twitter Bootstrap Magento Boilerplate Template

Hint: This is a custom version of [Magento Boilerplate](https://github.com/webcomm/magento-boilerplate) see section changes for detail information.

There are some TODO left so feel free to contribute.

---

## Changes:
- Package folders such as node_modules and bower_components are now on root level
- Fonts from bower_components folder will install to theme/dist/ folder
- Default theme boilerplate/default is now usable as fallback if you want to create a custom theme
- You don't have to copy the whole default skin folder for a custom theme
- Gulpfile is now on root level and can handle custom themes, too
- All Magento stuff is now located under src folder
- Gitignore files are now smaller
- Added [modernizr](http://modernizr.com/) for feature detection

---

# How to work with:

### Step 1:
Go to root dir and make sure that npm is installed on you machine ` npm -v ` if not, install [npm](https://www.npmjs.org/). After your npm is working fine write ` npm install ` to install all dependencies listed in package.json.

### Step 2:
Still in the root dir make sure that you've bower installed by ` bower -v `. If you have no global bower installed don't worry it was installed local by step 1. Once you're ready with bower write ` bower install ` if global installed or ` node_modules/bower/bin/bower install ` to install dependencies listed in bower.json.

### Step 3:
TODO: Add detailed information

Run ` gulp init ` and ` gulp watch `

---

## Installation

There are three ways to install this boilerplate.

### Git

Firstly, clone our repo down to a folder:

```bash
git clone git@github.com:sitewards/magento-boilerplate.git your-project
```

Secondly, copy in a supported Magento version in the src folder of reop:

```bash
wget http://www.magentocommerce.com/downloads/assets/1.8.1.0/magento-1.8.1.0.tar.gz
tar -zxvf magento-1.8.1.0.tar.gz
mv -f magento/* your-project/src/
```

> You may update to each new version with `git pull`.

### ZIP downloads

1. Download our repo from [https://github.com/sitewards/magento-boilerplate/archive/master.zip](https://github.com/sitewards/magento-boilerplate/archive/master.zip).
2. Download Magento from [http://www.magentocommerce.com/download](http://www.magentocommerce.com/download).

Drop all magento stuff into src folder, and you're good to go.

### Adding New Bootstrap Components

This theme does not ship with all Bootstrap CSS and JavaScript. The reason is, most sites don't **need** all the components and therefore you're bloating a site by providing more than required. We're including only the files required to get this boilerplate theme running.

To add new Bootstrap styles, simply open up `less/style.less`. From there, you may directly import Bootstrap files, or your own files which in turn import Bootstrap's. For example, add the following into `less/style.less`:

```css
@import "media.less";
```

Then, in `less/media.less`:

```css
/* In less/media.less */
@import "/bower_components/bootstrap/less/media.less";

.media {
    /* Your custom overrides go below the call to Bootstrap's styles */
}
```

> You may choose to import more than just Bootstrap's LESS / CSS files. Feel free to import anything this way, it's good practice.

To add new JavaScript files, open up `gulpfile.js`. gulp.js is seperated into a number of tasks. One of them is the `bootstrapJs` task. Inside it, you'll see a bunch of JavaScript files listed out. If you require more Bootstrap files (or indeed any JavaScript files), simply add them to the list.

```javascript
// ...
.src([
    'bower_components/bootstrap/js/transition.js',
    'bower_components/bootstrap/js/collapse.js',
    'bower_components/bootstrap/js/carousel.js',
    'bower_components/bootstrap/js/dropdown.js',
    'bower_components/bootstrap/js/modal.js',
    // Add new files here
])
// ...
```

### FAQs

1. **Notify isn't working?** - check you are not running `gulp` on a headless (command-line only) server, such as a remote webserver or Vagrant box. Windows may need [modification](https://github.com/webcomm/magento-boilerplate/issues/48) of your `gulpfile.js` and `package.json` files to work properly.
