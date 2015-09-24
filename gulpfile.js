var gulp    		= require('gulp'),
    takana  		= require('takana'),
    sass    		= require('gulp-sass'),
    jade 			= require('gulp-jade-php'),
    autoprefixer 	= require('gulp-autoprefixer'),
    browserSync 	= require('browser-sync');


// run takana
gulp.task('takana', function() {
  takana.run({
    path: __dirname,    // run from the current working directory
    includePaths: []    // optional include paths
  });
});

// Compile the Sass
gulp.task('sass', function() {
    gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/unprefixed'));
});

//Autoprefix the outputted css
gulp.task('autoprefix', function() {
	return gulp.src('./css/unprefixed/*.css')
	.pipe(autoprefixer({
		browsers: ['last 10 versions', 'ie 10'],
		cascade: false
	}))
	.pipe(gulp.dest('./css'));
});

// Compile the Jade
gulp.task('jade', function() {
	return gulp.src('./jade/*.jade')
	.pipe(jade())
	.pipe(gulp.dest('./'))
});

// Browser-sync
gulp.task('sync', function() {
    browserSync({
        proxy: "localhost:8888/project",
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Watch
gulp.task('watch', function (){
    gulp.watch(['./css/*.css', 'js/*.js', 'index.php'], ['bs-reload']);
    gulp.watch(['./scss/**/*.scss', './scss/**/*.sass', './scss/*.scss', './scss/*.sass'], ['sass']);
    gulp.watch('./css/unprefixed/main.css', ['autoprefix']);
    gulp.watch('./jade/*.jade', ['jade']);
});


gulp.task('default', ['sass', 'watch', 'jade', 'sync', 'takana', 'autoprefix']);