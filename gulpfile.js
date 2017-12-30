const gulp = require('gulp');
const del = require('del');
// var sass = require('gulp-sass');
const $ = require('gulp-load-plugins')({
  pattern: '*',
});

const environment = $.util.env.type || 'development';
const isProduction = environment === 'production';
const webpackConfig = require('./webpack.config.js')[environment];

const port = $.util.env.port || 1337;
const src = 'src/';
const dist = 'dist/';

const autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10',
];


gulp.task('scripts', () => gulp.src(webpackConfig.entry)
  .pipe($.webpackStream(webpackConfig))
  .on('error', function (error) {
    $.util.log($.util.colors.red(error.message));
    this.emit('end');
  })
  .pipe(gulp.dest(`${dist}js/`))
  .pipe($.size({ title: 'js' }))
  .pipe($.connect.reload()));

gulp.task('html', () => gulp.src(`${src}index.html`)
  .pipe(gulp.dest(dist))
  .pipe($.size({ title: 'html' }))
  .pipe($.connect.reload()));

/*
I added support for Sass just for fun but later I discovered that Stylus is better.
To restore it just create src/sass folder, main.scss file and
transform code in main.styl to sass syntax.
gulp.task('styles', function () {
  return gulp.src(src + 'sass/!**!/!*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());
}); */

gulp.task('styles', () => gulp.src(`${src}stylus/main.styl`)
  .pipe($.stylus({
    compress: isProduction,
    'include css': true,
  }))
  .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
  .pipe(gulp.dest(`${dist}css/`))
  .pipe($.size({ title: 'css' }))
  .pipe($.connect.reload()));

gulp.task('serve', () => {
  $.connect.server({
    root: dist,
    port,
    livereload: {
      port: 35728,
    },
  });
});

gulp.task('static', () => gulp.src(`${src}static/**/*`)
  .pipe($.size({ title: 'static' }))
  .pipe(gulp.dest(`${dist}static/`)));

gulp.task('eslint', () => gulp.src(['**/*.js', '!./node_modules/**', '!./dist/**/*.js'])
  .pipe($.eslint({ quiet: true })) // 'quiet': true - filters warnings from ESLint results
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError()));

gulp.task('test-run', () =>
  gulp.src('tests/service.spec.js', { read: false })
    .pipe($.mocha({
      reporter: 'spec', // I found it the best reporter among others in node_modules/mocha/lib/reporters
      compilers: [
        'js:babel-core/register', // the way to let mocha not fail with ES6 syntax by using Babel compiler
      ],
    }))
    .once('error', (err) => { // the way to stop running the project with console.error if tests failed
      console.error(err);
      process.exit(1);
    }));

gulp.task('watch', () => {
  gulp.watch(`${src}stylus/*.styl`, ['styles']);
  // gulp.watch(src + 'sass/**/*.scss', ['styles']);
  gulp.watch(`${src}index.html`, ['html']);
  gulp.watch([`${src}app/**/*.js`, `${src}app/**/*.hbs`], ['scripts', 'eslint']);
});

gulp.task('clean', (cb) => {
  del([dist], cb);
});


// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], () => {
  gulp.start(['static', 'html', 'scripts', 'styles', 'eslint', 'test-run']);
});
