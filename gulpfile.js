var gulp = require('gulp'), fs = require('fs');
$ = require('gulp-load-plugins')(); // Note the extra parens

gulp.task('minify', ['clean'], function() {
	return gulp.src('Tpl/index.htm')
		.pipe($.usemin({
			assetsDir: '.',
			css: [$.minifyCss, 'concat'],
			js: [$.uglify, 'concat'],
		}))
		.pipe(gulp.dest('.'));
});

gulp.task('fix-paths', ['minify'], function() {
	gulp.src('bower_components/**/fonts/*')
		.pipe($.rename({dirname: ''}))
		.pipe(gulp.dest('fonts'));
});

gulp.task('default', ['minify', 'fix-paths']);

gulp.task('clean', function() {
	var generated = ['js/site.js', 'js/appli.js', 'css/site.css', 'fonts/*'];
	return gulp.src(generated)
		.pipe($.rimraf());
});

gulp.task('dev', ['clean'], function() {
	gulp.src('Tpl/index.htm')
		.pipe(gulp.dest('.'));
});

