

### Install Craft on Heroku
BUTTON GOES HERE

after the intall process, visit the url of your app and add `/admin/install` to it:
`https://one-click-tester.herokuapp.com/admin/install`

Fill out all details and you are good to go!

## Basic Plugins

### Cloudinary
[Craf3 Cloudinary](https://github.com/timkelty/craft3-cloudinary) is an integration of the cloud-based image managment [cloudinary](https://cloudinary.com/) to your Craft3 project. 

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
9. 
### Give the team access
* give everybody heroku access and richard bausek and michael boerner
* transfer the account to either CI_bot (if you can run on a free plan) or michael boerner's account (if you need to have paid plugins or a paid heroku plan)
