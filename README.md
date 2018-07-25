# Craft 3 Boilerplate
This repository is a boilerplate with which you can install Craft 3 locally and on Heroku as well. 

### Just want to give it a quick try?
Click this button and direktly deploy this repository to a new instance on your Heroku account. 

Go ahead and try:
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/dsteinel/craft-heroku-test-project/tree/master)

After the intall process, visit the URL of your app and add `/admin/install` to it:
`https://HERE-GOES-YOUR-URL.herokuapp.com/admin/install`

Fill out all details and you are good to go!

## Set up a new project
##### Clone the Repo into a local folder
```bash
$ git clone git@github.com:edenspiekermann/craft-heroku-boilerplate.git
```

##### Rename the folder
```bash 
$ mv craft-heroku-boilerplate craft-heroku-boilerplate
```

##### Connect with your own Git Repo
```bash
$ cd craft-heroku-boilerplate
$ rm -rf .git
$ git init
$ git add .
$ git commit -m '🎈 project start 🎈'
$ git remote add origin YOUR-REMOTE-PROJECT-URL
$ git push --set-upstream origin master
```

##### Deploy to Heroku
To make your repository work on Heroku, we first have to update the reference URL with your freshly created repository.
Heroku reads all the deploy details from the [app.json](https://devcenter.heroku.com/articles/app-json-schema) file. So we need to go there and replace the `"repository"` URL with your repository URL.

#### Important notice
##### Folder Structure
```js
|--config ⭐           // Here are the basic configs for CraftCMS ([read more here](https://craftcms.com/docs/folder-structure))
|--modules             // Holds any [Yii modules](https://www.yiiframework.com/doc/guide/2.0/en/structure-modules) your site might be using.
|--storage             // This is where Craft stores a bunch of files that get dynamically saved during use.[read more here](https://docs.craftcms.com/v3/directory-structure.html)
|  |--logs             // Stores Craft’s logs and PHP error logs.
|  |--rebrand          // Stores the custom Login Page Logo and Site Icon files, if you’ve uploaded them.
|  |--runtime          // Pretty much everything in here is there for caching and logging purposes. Nothing that Craft couldn’t live without, if the folder happened to get deleted.
|--templates ⭐        // CraftCMS templates 
|--vendor              // CraftCMS plugin folder
|--web ⭐              // All files for production will go here (js, css, fonts, ...)
```

**All folder you will most likly have to touch are marked with ⭐**

##### Procfile
Craft has its main folder not in the root directory (in this project it is the `web` folder), so we need to do some adjustments on the Heroku web server settings. Heroku provides optional configurations in the [Procfile](https://devcenter.heroku.com/articles/deploying-php#the-procfile). 
In this project we need to start an Nginx as a web server and make `web` the root diretory of the server.

I would recommend to not change the name of the `web` folder. 
If you feel like changing it, please read the [Docs](https://docs.craftcms.com/v3/directory-structure.html#web) and don't forget to change the folder path after the bootscript in the `Procfile`.

### Database
This project is using MariaDB instead of MySQL. MariaDB is a complete drop-in-replacement for MySQL. If you need to migrate some datas, you should not have problems here. If you do, you can change the database connection at any time in the Heroku interface by replacing the `JAWSDB_MARIA_URL` URL with your database URL (`settings --> config vars`).


### Plugins

### Cloudinary
[Craft3 Cloudinary](https://github.com/timkelty/craft3-cloudinary) is an integration of the cloud-based image managment [cloudinary](https://cloudinary.com/) to your Craft3 project. 

### Blitz
The [Blitz Plugin](https://github.com/putyourlightson/craft-blitz) is only for production. It is a intelligent static file caching for creating lightning-fast sites. If you enable this, your site will be very fast, but you will not see the debugger toolbar. So make sure to disable it in development from the admin panel.

### Redactor
Most projects do need a wysiwyg editor. [Redactor](https://imperavi.com/redactor/) claims to be the most advanced and human-friendly one. Well ... it is a very nice and customizable editor.
[GitHub](https://github.com/craftcms/redactor)

### Gatekeeper
If the page is still under construction, it is a good idea to password protect it. Therefore we use [Gatekeeper](https://github.com/tomdiggle/craft-gatekeeper).


### Cloudinary
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
9. 
### Give the team access
* give everybody heroku access and richard bausek and michael boerner
* transfer the account to either CI_bot (if you can run on a free plan) or michael boerner's account (if you need to have paid plugins or a paid heroku plan)
