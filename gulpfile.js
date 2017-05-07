// Defining base paths
var basePaths = {
    node: './node_modules/',
    asset: './assets/scripts/'
};

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    concatCss = require('gulp-concat-css'),
    runSequence = require('run-sequence'),
    babel = require('gulp-babel');



// Styles

gulp.task('styles', function(done) {
    runSequence('comp-sass', 'concat-styles', function(){
        done();
    });
});

gulp.task('comp-sass', function() {
    return sass('assets/style/main.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./assets/style'))
        .pipe(notify({message: 'SASS task complete'}));
});


gulp.task('comp-sass', function() {
    return sass('assets/style/main.scss', {style: 'expanded'})
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./assets/style'))
        .pipe(notify({message: 'SASS task complete'}));
});


gulp.task('concat-styles', function() {

    var styles = [
        'assets/style/main.css'
    ];

    return gulp.src(styles)
        .pipe(concatCss('bee-wacker.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('assets/dist/css/'))
        .pipe(notify({ message: 'Styles task complete' }));

});






// Scripts
gulp.task('scripts', function() {
    var scripts = [
        basePaths.asset + 'script-es5.js'
    ];
    gulp.src('./assets/scripts/script.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('script-es5.js'))
        .pipe(gulp.dest('./assets/scripts/'));

    return gulp.src(scripts)
        .pipe(concat('bee-wacker.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/dist/js/'))
        .pipe(notify({ message: 'Scripting task complete' }));

});




// Clean
gulp.task('clean', function() {
    return del(['assets/dist/css', 'assets/dist/js']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('assets/style/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('assets/scripts/**/*.js', ['scripts']);

});