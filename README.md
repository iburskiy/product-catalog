Project started from "Modern Backbone Starter-kit".
https://github.com/sabarasaba/modern-backbone-starterkit

### To run the project (it should also watch for changes in js, hbs, styl):
gulp

### If images or data in notebook.json are changed:
gulp build

### Features of the project:
- all text data is from static/json/notebook.json
- all images are from static/images
- initial responsive design
- Stylus is used as dynamic CSS tool (for possible future growth of the project)
- Sass support (see below)
- ESLint support
- Gulp task runner

### UML-like diagram of Home Page:
Open "Product Catalog UML schema.xml" in https://www.draw.io/

### ESLint:
To provide ESLint support I did the following:
1) npm install eslint --save-dev
2) I decided to use eslint airbnb syntax. For this I opened https://www.npmjs.com/package/eslint-config-airbnb and run a command from there to install necessary packages
3) Created .eslintrc file and added "extends": "airbnb" as stated in eslint-config-airbnb instructions.
4) Configured Eslint in Webstorm settings.

### Sass:
I added support for Sass just for fun but later I discovered that Stylus is better.
To restore it just create src/sass folder, main.scss file and transform code in main.styl to sass syntax.

### Tests:
Mocha is used as JS testing framework. Tests are run automatically while starting the project with 'gulp' in 'test-run' task.
See comments in gulpfile for details of configuration.
Karma lets run tests in Chrome and debug it. Even though it's not too necessary, I decided to leave it for now in the project.

### gulp-load-plugins:
It simplifies the usage of gulp-... plugins in gulpfile such as gulp-autoprefixer, gulp-eslint, gulp-mocha
and the rest of similar ones. But there is an issue with gulp-eslint and gulp-mocha.

### Getting rid of Webpack:
I tried to exclude Webpack to use just Babel to transform ES6 code into ES5. Even though I discovered that import/export is already supported by Chrome 61
(the only thing you need to export files with .js extension like this: import exper2 from './exper2.js'; ), it's not yet possible to bundle files together
and still being able to use import/export.

### Underscore templates:
I made also experiments if it's possible to use Underscore templates with Webpack and created a patch. In short, it's necessary
1) to rename current .hbs files to .html
2) to install "underscore-template-loader" npm package
3) to add it as a loader to webpack loader
