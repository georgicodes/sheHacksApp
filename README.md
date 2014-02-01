sheHacksApp
==========================

## Purpose
The project has been cloned from ionic-angular-cordova-seed. Additionally, both the ionic and angular libs have been
updated to reflect master as of 6th Jan 2014, this includes an update to angular 1.2.7

## Running the app
For development purposes it's easiest to run with: 
```bash
$ cd www
$ python -m SimpleHTTPServer
```
Alternatively, run it with phonegap:
```bash
$ phonegap run ios
```

## Cordova/PhoneGap notes
Install the following plugins in your local dev environment. You will need Cordova 3.3.1 for the statusbar plugin to work.

```
$ phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git
$ cordova plugin add org.apache.cordova.inappbrowser
$ cordova plugin add org.apache.cordova.statusbar
$ cordova plugin add org.apache.cordova.network-information
```
## Getting icons into IOS
Copy `app_asset/icons` and `app_assets/splash` to the `platforms/ios/Resource/` directory. Replace what's in `icons` and `splash`. 
Then remove app from phone, select Program > Clean from XCode and then deploy to phone.

## Icon & SplashScreen Generation
See app_assets folder for PSDs

Websites: http://ticons.fokkezb.nl/

## Grunt

Install grunt first. [More Info](http://gruntjs.com/getting-started)
```
$ npm install -g grunt-cli
```

### Install Grunt Plugins

The --save-dev part updates package.json

```
$ npm install grunt-contrib-cssmin --save-dev
```

### Running Grunt
From base dir:

```
$ grunt cssmin 
```

This will minify the css in the /www/css dir

