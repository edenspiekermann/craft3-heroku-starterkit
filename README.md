# Craft 3 Boilerplate
This repository is a boilerplate with which you can install Craft 3 locally and on Heroku as well. It has some Plugins already preinstalled, so you don't have to take care of the basics.

## Just want to give it a quick try?
Click this button and directly deploy this repository to a new instance on your Heroku account. 

Go ahead and try:<br>
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/edenspiekermann/craft-heroku-boilerplate/tree/master)

After the install process, visit the URL of your app and add `/admin/install` to it:
<br>`https://HERE-GOES-YOUR-URL.herokuapp.com/admin/install`

Fill out all details and you are good to go!

## Set up a new project
#### Clone the Repo into a local folder
```bash
$ git clone git@github.com:edenspiekermann/craft-heroku-boilerplate.git
```

#### Connect with your own Git Repo
```bash
$ cd craft-heroku-boilerplate
$ rm -rf .git
$ git init
$ git add .
$ git commit -m '🎈 project start 🎈'
$ git remote add origin YOUR-REMOTE-PROJECT-URL
$ git push --set-upstream origin master
```
**Make sure you create an empty git repository (no `.git` or `README.md` or similar)***

### Use it

#### Locally
* Create a `.env` file in the root of your project
* Copy over all dummy content from `.env.example`. These are all the details Craft needs for installation.
* Install all dependencies
```bash
$ composer install
```
* In Mamp, make `web` the root path you project
![MAMP](https://res.cloudinary.com/dsteinel/image/upload/v1532511859/Screen_Shot_2018-07-25_at_11.43.20.png)
* Go to `localhost:8888/admin/install`
* Follow the Craft install guide
* With your right hand, make a fist (not a tight one) 
* Smoothly extend both your pinky and your thumb
* Lightly shake your hand (too fast makes you like a tourist, and too slow make you look stupid)
* Softly but confident vocalise the word "Shaka"
* Now let's start coding 🎈

##### Known Issue with PHP on OSX
I would recommend using php with [homebrew](https://brew.sh/index_de).
Install a specific php version with brew. For example: `brew install php@7.1`. Like this you will be also able to install packages with PECL. To switch between PHP Versions, a very nice helper is the **php switcher** which is described [here](https://getgrav.org/blog/macos-sierra-apache-multiple-php-versions). Jump to the section: "PHP Switcher Script" and instsall it. 
If you encounter an issue during the install process with pkg-config, install it with homebrew: `brew install pkg-config`. 
Now you can install imagemagick with PECL as well: `pecl install imagick`, which is the recommended way to have it native with your php version.

#### Optional: Deploy to Heroku
This step is optional. If you want to deploy the project to Heroku then read on. If you only want to work locally, skip the section and jump to [Start working with the project](#start-working-with-the-project).
To make your repository work on Heroku, we first have to update the reference URL with your freshly created repository.
Heroku reads all the deploy details from the [app.json](https://devcenter.heroku.com/articles/app-json-schema) file. So we need to go there and replace the `"repository"` URL with your repository URL. Push the changed `app.json` and go to the Heroku deploy URL: 
https://heroku.com/deploy?template=https://github.com/edenspiekermann/craft3-heroku-starterkit/tree/master

for example: `https://heroku.com/deploy?template=https://github.com/edenspiekermann/craft3-heroku-starterkit/tree/master`

You will see a Heroku page for creating a new instance. Please fill out all the details and don't forget to choose the region. If you are in Europe, please use Europe and US if you are in the US or nearby. If you chose the wrong region, it could be that your website is slower than it could be.
![Heroku create new app screen](https://res.cloudinary.com/dsteinel/image/upload/v1532511156/Screen_Shot_2018-07-25_at_11.32.07.png)

If you have multiple Users, it is recommended, that you upgrade at least the database to a paid plan. It can happen, that the `max_connections` of the free database plan is used up, when you had too much database traffic. This means, that you can not access the website anymore (Error 500 on both, local environment and Heroku as well) and you have to upgrade the database plan.

Depending on the traffic, you also may have to upgrade the Heroku servers to a paid plan.

##### Optional: Heroku Post install
After the deployment process is successful, go to your new created website and add `/admin/install` to the URL. Craft will help you to make the setup complete.
![Craft CMS install screen](https://res.cloudinary.com/dsteinel/image/upload/v1532511530/Screen_Shot_2018-07-25_at_11.36.45.png)

### Start working with the project
* Use the recommended node version with `nvm use` ([read more](https://github.com/creationix/nvm))
* Install all dependencies with `yarn install`
* Start MAMP
* Run `yarn watch` from the Terminal. This will start a webserver and proxy port :8888 (MAMP) to :3000 (webpack)
* Go to `localhost:3000` and enjoy hot reloading
* If you want to make the bundle production ready, do `yarn build`

All bundled files will live in the `web` folder. I would recommend to not change the name of the folder. 
If you feel like changing it, please read the [Docs](https://docs.craftcms.com/v3/directory-structure.html#web) and don't forget to change the folder path after the bootscript in the `Procfile` as wella s in the webpack files.


## Additional content
**You can safely skip that part if you are not interested in CSS and JS guidelines.**

### Guidelines
#### JS
We are using Semistandard as our JavaScript style guide.
To make sure we all write in the same manor, we lint our code with eslint.

#### CSS
[Sass Guidelines](http://sass-guidelin.es/) are the way we write our CSS.
To enforce consistency, we use the tool [stylelint](https://stylelint.io/) with the configuration from sass-guidelines which you can find in the `.stylelintrc` file.

#### Workflow
* Start the webserver and watch JS and SCSS files with `yarn watch`
* The `postinstall` task is mainly for Heroku, after the installing the dependencies
* Lint all JS files with `yarn run lint:js`
* Lint all SCSS files with `yarn run lint:styles`
* If you want to fix some easy js linting errors, go with `yarn run lint:js:fix`. This will fix for example double quote to single.
* `precommit` is the default task which runs before commiting. If this task fails, you can not commit
* `watch` runs the webserver on `localhost:3000` and has a hot reload on JS and SCSS files
* `build` bundles all JS and SCSS files and minifies the. Output path is the main Craft folder, `/web/`

#### Webpack
All webpack settings for development are in the `webpack.dev.config.js`. There is no minification/uglify of the code.
All webpack settings  for production are in the `webpack.prod.config.js`. A minified JS and CSS file will be generated.

### Important notice
#### Folder Structure
```js
|--config ⭐           // Here are the basic configs for CraftCMS ([read more here](https://craftcms.com/docs/folder-structure))
|--modules             // Holds any [Yii modules](https://www.yiiframework.com/doc/guide/2.0/en/structure-modules) your site might be using.
|--src ⭐              // Asset folder for styling and scripting
|  |--js               // All the .js files
|  |--scss             // All the .scss files
|--storage             // This is where Craft stores a bunch of files that get dynamically saved during use.[read more here](https://docs.craftcms.com/v3/directory-structure.html)
|  |--logs             // Stores Craft’s logs and PHP error logs.
|  |--rebrand          // Stores the custom Login Page Logo and Site Icon files, if you’ve uploaded them.
|  |--runtime          // Pretty much everything in here is there for caching and logging purposes. Nothing that Craft couldn’t live without, if the folder happened to get deleted.
|--templates ⭐        // CraftCMS templates 
|--vendor              // CraftCMS plugin folder
|--web ⭐              // All files for production will go here (js, css, fonts, ...)
```

**All folder you will most likly have to touch are marked with ⭐**

#### Database
If you want to develop locally, I can highly recommend you to use a local database, otherwise the website will be quite slow.
To change the database, head over to you `.env` variable, change the value of `JAWSDB_MARIA_URL` and restart the server.

#### Procfile
Craft has its main folder not in the root directory (in this project it is the `web` folder), so we need to do some adjustments on the Heroku web server settings. Heroku provides optional configurations in the [Procfile](https://devcenter.heroku.com/articles/deploying-php#the-procfile). 
In this project we need to start an Nginx as a web server and make `web` the root diretory of the server.

## Database
This project is using MariaDB instead of MySQL. MariaDB is a complete drop-in-replacement for MySQL. If you need to migrate some datas, you should not have problems here. If you do, you can change the database connection at any time in the Heroku interface by replacing the `JAWSDB_MARIA_URL` URL with your database URL (`settings --> config vars`).


## Plugins

### Cloudinary
[Craft3 Cloudinary](https://github.com/timkelty/craft3-cloudinary) is an integration of the cloud-based image managment [cloudinary](https://cloudinary.com/) to your Craft3 project. 

### Blitz
The [Blitz Plugin](https://github.com/putyourlightson/craft-blitz) is only for production. It is a intelligent static file caching for creating lightning-fast sites. If you enable this, your site will be very fast, but you will not see the debugger toolbar. So make sure to disable it in development from the admin panel.

### Redactor
Most projects do need a wysiwyg editor. [Redactor](https://imperavi.com/redactor/) claims to be the most advanced and human-friendly one. Well ... it is a very nice and customizable editor.
[GitHub](https://github.com/craftcms/redactor)

### Gatekeeper
If the page is still under construction, it is a good idea to password protect it. Therefore we use [Gatekeeper](https://github.com/tomdiggle/craft-gatekeeper).


## Cloudinary
### Why Cloudinary?
* 10GB is for free
* Has Image transforms and is able to minify your images
* Super Fast
* Easy to use
* No access issues like AWS S3

### Get your credentials
1. Create a cloudinary account
2. After you are logged in, go to your cloudinary dashboard
3. On top you can see your credentials (Cloud Name, API Key and API Secret). Copy them

### Set up Cloudinary in Craft
1. Go to your Admin -> Settings -> Assets
2. Create a new Volume
3. Type in a name you like (f.e. `Cloud Images`)
4. Enable `Assets in this volume have public URLs`
5. You can decide on your Base URL (f.e. `@web` is the root of your website but you can also go with `@web/images` if you want to have `http://yourwebsite.com/images/` as your public image path)
6. Volume Type must be `Cloudinary`
7. Now fill in the Cloudinary credentials
8. Go to the Assets and upload the first image
