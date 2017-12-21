Project started from "Modern Backbone Starter-kit".
https://github.com/sabarasaba/modern-backbone-starterkit

To run the project (it should also watch for changes in js, hbs, styl):
gulp

If images or data in notebook.json are changed:
gulp build

Features of the project:
- all text data is from static/json/notebook.json
- all images are from static/images
- initial responsive design
- Stylus is used as dynamic CSS tool (for possible future growth of the project)
- Sass support (see below)
- ESLint support
- Gulp task runner

ESLint:
To provide Eslint support I did the following:
1) npm install eslint --save-dev
2) I decided to use eslint airbnb syntax. For this I opened https://www.npmjs.com/package/eslint-config-airbnb and run a command from there to install necessary packages
3) Created .eslintrc file and added "extends": "airbnb" as stated in eslint-config-airbnb instructions.
4) Configured Eslint in Webstorm settings.

Sass:
I added support for Sass just for fun but later I discovered that Stylus is better.
To restore it just create src/sass folder, main.scss file and transform code in main.styl to sass syntax.