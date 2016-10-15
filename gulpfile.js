var gulp        = require('gulp'),
browserSync = require('browser-sync'),
sass        = require('gulp-sass'),
prefix      = require('gulp-autoprefixer'),
cp          = require('child_process'),
jade        = require('gulp-jade');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/*---------------
Jekyll
---------------*/
/**
* Build the Jekyll Site
*/
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
  .on('close', done);
});

/**
* Rebuild Jekyll & do page reload
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/*---------------
BrowserSync
---------------*/
/**
* Wait for jekyll-build, then launch the Server
*/
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    },
    notify: false
  });
});

/*---------------
Styles
---------------*/
/**
* Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('sass', function () {
  return gulp.src('_scss/main.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('_site/css'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('css'));
});

/*---------------
Scripts
---------------*/
/**
* Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('scripts', function () {
  return gulp.src('_scss/main.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('_site/css'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('css'));
});

/*---------------
Jade
---------------*/
gulp.task('jade', function(){
  return gulp.src('_jade/*.jade')
  .pipe( jade() )
  .pipe( gulp.dest('includes') );
});

/*---------------
Images
---------------*/

/*---------------
Watch
---------------*/
/**
* Watch scss files for changes & recompile
* Watch html/md files, run jekyll & reload BrowserSync
*/
gulp.task('watch', function () {
  gulp.watch('_scss/*.scss', ['sass']);
  gulp.watch('_jade/*.jade', ['jade']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/*---------------
Default
---------------*/
/**
* Default task, running just `gulp` will compile the sass,
* compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('default', ['browser-sync', 'watch']);
