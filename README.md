# precompile for wp theme, support scss, js and react
1. create wp theme as normal

2. put this folder under wp-content

3. edit 2 first line of gulpfile.js

  themeName = 'jalan-jalan', // your theme folder

  localWpAddress = "klepon/_wp-theme-builder/", // wp url for auto reload, remove http://

4. open terminal/command line, got to this folder

5. install node module

  $ npm install

For mac user, use sudo and agreeing xcode t&c may require on install, read all blocker message on fail installing node modules

# build and running server for development

$ npm start

# build for production

$ npm run build

compiled js and css will be put on themeName/assets
don put any file manually inside themeName/assets folder, on build this folder will be recreate
