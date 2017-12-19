Project started from "Modern Backbone Starter-kit".
https://github.com/sabarasaba/modern-backbone-starterkit

I added support for Sass just for fun but later I discovered that Stylus is better.
To restore it just create src/sass folder, main.scss file and transform code in main.styl to sass syntax.

To run the project (it should also watch for changes in js, hbs, css):
gulp

If images or data in notebook.json are changed:
gulp build