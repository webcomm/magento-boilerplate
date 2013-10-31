# Magento Boilerplate
### A HTML5 Twitter Bootstrap 3.0 Magento Boilerplate Template

---

Next time you create a Magento site that needs to boast great styling and utilises the features of modern browsers, such as responsive, CSS3-based design, or you just want to get up and running with your own Magento theme for your client, go no further! We have an open source solution to help you.

A demo be found over at [http://magentoboilerplate.webcomm.com.au](http://magentoboilerplate.webcomm.com.au) and the git repo at [http://github.com/webcomm/magento-boilerplate](http://github.com/webcomm/magento-boilerplate).

#### What This Is

- Boilerplate, "starter" theme for your next Magento site, powered by Twitter Bootstrap 3!
- Mobile first theme (through Bootstrap 3's CSS3 responsive media queries), to better target the growing market of mobile devices.
- Tested with Magento 1.6.x, 1.7.x and 1.8.x. It's probably compatible with as far back as 1.4.x (if you have tested it, please [Let us know](http://github.com/webcomm/magento-boilerplate/pulls)).

#### What This Is Not

- A "one size fits all", production-ready template.

----

#### History

We found that through our development of Magento themes, that we often repeated the same tasks for the first 10-20 hours of developing a Magento theme. We typically:

1. Switch the doctype from xHTML over to HTML5
2. Strip out the support in the default Magento theme for IE6
3. Decouple the CSS into LESS files so that management of colouring was much easier.
4. Strip out the default Magento images as nobody uses them in this day and age.
5. Pull our hair out at what we've spent the last few hours doing
6. Implement a much more flexible layout system than magento's simplistic `col2-set` and `col3-set` layouts.

We began running our own boilerplate theme (running Twitter Bootstrap 2) in mid 2012, but kept it closed-source. When Bootstrap 3 came to the table, we felt it was an appropriate time to rewrite our theme utilising it's much better layout model (the way it switches to the much more flexible `box-sizing: border-box` model).

In doing this, we felt there must be a whole lot of other development agencies running their own boilerplate themes which they use to begin their client work, so why not open source ours and we can all work together to create something very special? So, that's what we did.

We're massive advocate's of a number of things, here at Webcomm:

1. [Composer](http://getcomposer.org) for code-management.
2. [Code interoperability](http://www.php-fig.org), so that code may be shared and more readily available (on distribution platforms such as Composer).
3. Best [coding practices in general](http://www.phptherightway.com).
4. CSS preprocessors, such as [LESS](http://lesscss.org).
5. [Twitter Bootstrap 3](http://getbootstrap.com).
6. Asset [dependency management](http://bower.io).

When we created our boilerplate theme, we went about incorporating the technologies and methodologies we are so passionate about.

We've addressed a number of concerns that often come with boilerplate themes (or any third-party themes in general).

#### Upgradability

This is probably the number one concern we have with themes we develop, that often gets overlooked, especially in the plug-and-play purchasable themes realm.

To overcome this, we took a couple of fundemental design decisions:

1. Override as little template files as possible - these files, in newer versions of Magento, may receive little changes (such as a new `$this->getChildHtml()` call). If you've overridden these, you're bound to lose out on any changes introduced during an upgrade.
2. Override **no layout xml files**. This is a very strict rule we live by. There is never a need to override any layout XML files (such as `catalog.xml`), because these files do not cascade back. Newer versions of Magento nearly always introduce large changes in these files (as with the template files). All layout modifications can (and should be) done through `local.xml` only.

The rationale behind the above decisions can be found over at [Magento: the Right Way](http://magentotherightway.com) and we encourage you to follow these.

In addition to Magento's upgradability, we focused on the upgradability of our assets. We fell in love with [Bower](http://bower.io) as the best (for it's simplicity) asset package manager. We're using Bower to manage our asset dependencies of our theme. While it's not at all required to use our theme, if you have Bower installed, simply open a terminal window up in your assets directory (in the default installation this would be `skin/frontend/boilerplate/default`) and you can update all dependencies by running `bower update --save`. No more manual managing of your dependencies!

#### Frontend developer friendly

Magento, by it's very nature, is a complex system. This leads for a large learning curve for frontend developers. By utilising Twitter Bootstrap 3 and LESS, we were able to make something which becomes very easy to manage and configure - through Bootstrap 3's well-engineered plethora of configuration options (which are miles ahead of those present in Twitter Bootstrap 2).

How have we handled integrating Twitter Bootstrap 3? We have **not** simply included the entire library and then written another file to override it. That bloats everything way too much.

Firstly, like bootstrap, we follow religiously [SMACSS](https://smacss.com) principles. Each component (whether it be a base style, module, state) is separated into it's own LESS file. Then, if that component supersedes a Bootstrap 3 component (such as navbar or modal), within that file, we firstly include the Bootstrap 3 file.

So, in `style.less`, we may have:

    @import "navbars.less";

Then, in our `navbars.less` module component, we will have:

    @import "../components/bootstrap/less/navbars.less";

    .navbar {
        // Any custom navbar overrides specific to your Magento store
    }

This allows us to include only the functionality we require, while utilising the amazing frontend developer environment it establishes.

> Our `variables.less` file inherits from Bootstrap's and therefore your variable configuration will cascade back to Bootstrap; you only include the variable overrides specific to your template!

#### Conventions suck

The issue that many boilerplate templates put you as a developer in, is that you must conform to their rules and guidelines.

Naturally, by providing a boilerplate template, there are conventions present. We've aimed at utilising the conventions provided by the Twitter Bootstrap 3 framework rather than running our own, as it is extremely well-maintained and proven to be quite stable and additionally, developers know and understand it.

#### Performance

To increase performance, we've concatenated all of our asset files into one CSS file (preprocessed by LESS) and one JavaScript file. We've also reduced the number of images to just a couple (and remove all those horrible gif icons Magento ships with).

We love [CodeKit](http://incident57.com/codekit/). This theme has been built using CodeKit to compile LESS and concatenate and uglify the JavaScript. We've included our CodeKit config file in the theme's asset directory so that, if you're using CodeKit, everything will be setup for you.

You may also use any other LESS or JavaScript compilers that you choose. We use CodeKit because we're all on macs and it's awesome to deal with. However, there's a number of asset compilation plugins available for [GruntJS](http://gruntjs.com) (a nifty little JavaScript task runner). Feel free to sub that in and send through a pull request with the config file you used!

By removing the number of images Magento ships with, and replacing them with either nothing (giving you the freedom to use the ones needed in your theme) or using Bootstrap 3's Glyphicons (you may also use Font Awesome), we've reduced the number of HTTP requests that will be made with Magento. This will decrease page load time, which is a major concern with any Magento site.

Our compiled CSS file weighs in at around `200KB` when not minified. When minified it sits on around `~170KB`. While this is larger than the default Magento CSS (which is around `100KB`), it's not a big deal. By reducing the number of other assets loaded and especially if you GZIP your HTTP responses), the load time will be much lower under this boilerplate theme.

As a comparison, when our CSS file is compressed with the GZIP algorithm, it weighs in at about `25KB`, as opposed to `18KB` for the default CSS. That's a difference of a mere `7KB`, but you're also saving on up to 60 extra HTTP requests for individual icon images! Bliss.

----

#### Installing

Installation of our theme is very straight-forward. Essentially, there are only 2 steps:

##### Git

1. Clone our repo:

        git clone git@github.com:webcomm/magento-boilerplate.git your-project
2. Merge in the Magento files from your version of choice:

        wget http://www.magentocommerce.com/downloads/assets/1.8.0.0/magento-1.8.0.0.tar.gz
        tar -zxvf magento-1.8.0.0.tar.gz
        mv -f magento/* your-project/ # Yes, we skipped on .htaccess as it's already present

##### ZIP downloads

1. Download Magento from [http://www.magentocommerce.com/download](http://www.magentocommerce.com/download).
2. Download our repo from [https://github.com/webcomm/magento-boilerplate/archive/master.zip](https://github.com/webcomm/magento-boilerplate/archive/master.zip).

Merge the folders, and you're good to go.

##### Composer

1. [Install composer](http://getcomposer.org/doc/00-intro.md#installation-nix)

2. Create a `composer.json` in the root of Magento, and ensure it has the following:

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
                "magento-root-dir": "./"
            }
        }

3. Run composer in the root of Magento:

        cd your-project/
        php composer.phar install # run "composer install" if you're running Composer globally

4. Optionally copy `mytheme`, `index.php` and/or `.htaccess` in the root of Magento:

        cd your-project/
        mv index.php index.php.bak
        mv .htaccess .htaccess.bak
        cp vendor/webcomm/magento-boilerplate/index.php .
        cp vendor/webcomm/magento-boilerplate/.htaccess .
        cd vendor/webcomm/magento-boilerplate/skin/frontend/mytheme skin/frontend/<yourthemename>

Now you should have a new folder "vendor/webcomm/magento-boilerplate" with our repository and new symbolic links in Magento to can use our theme.
You can update to each new version with ```composer update```.

----

### Developing

Developing in our boilerplate theme is rather easy. To begin, you should either copy our theme or rename our theme to something useful.

To do this, you'll need to either copy or rename:

    app/design/frontend/boilerplate
    skin/frontend/boilerplate

Once you've copied or renamed the theme, you will need to add it to the bottom of the `.gitignore` file:

    !/app/design/frontend/mytheme
    !/skin/frontend/mytheme

From here, you'll want to install the site and enable the theme through Magento's design configuration. Firstly, install your site like any other Magento installation. There's plenty of guides out there on that. Then, visit `System > Configuration > Design > Package` and change the package from `default` to whatever you named your theme (such as `mytheme`).

You'll then want to setup [CodeKit](http://incident57.com/codekit/) or [GruntJS](http://gruntjs.com) to work with your asset files. We've explaine that above under **Performance**.

And develop like you normally would! Happy days!

----

#### Contributing

The git repo for this project can be found at [http://github.com/webcomm/magento-boilerplate](http://github.com/webcomm/magento-boilerplate), and a demo can be found at [http://magentoboilerplate.webcomm.com.au](http://magentoboilerplate.webcomm.com.au).

We feel that we've done a pretty decent job at creating a great starter theme for developing up a Magento site. We chose Twitter Bootstrap 3 not because we want all sites to look like Bootstrap, we hate that too. Bootstrap creates a great foundation of reusable components which you can use to create something truly unique.

The reason Boilerplate themes exist is so you can spend less time on getting ready to start productive work by removing the repetitive first steps. We've taken care of the boring, so you may focus on the unique.

If you like our work, we're not after your money, but rather, we'd love to see a [pull request](http://github.com/webcomm/magento-boilerplate/pulls), or even an [issue](http://github.com/webcomm/magento-boilerplate/issues), on your vision for how this can be improved! At the end of the day, if we can all create something truly useful to a lot of people, everybody wins and we can all go home earlier.
