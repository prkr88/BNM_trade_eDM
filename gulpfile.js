var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var notify 		= require('gulp-notify');
var inlineCss 	= require('gulp-inline-css');
var jade		= require('gulp-jade');
var Imagemin = require('imagemin');
var pngcrush = require('imagemin-pngcrush');
var email 		= require('gulp-email');
var ghPages		= require('gulp-gh-pages');
var browserSync = require('browser-sync');
var reload 		= browserSync.reload;

var options = {
	user: 'api:key-a51cf11f46a793c555e2447cdd681e8f',
	url: 'https://api.mailgun.net/v3/sandbox954d5f24aa234124a8545deb66a02b4f.mailgun.org/messages',
	form: {
		// from: 'Gulp Automator <postmaster@sandbox954d5f24aa234124a8545deb66a02b4f.mailgun.org>',
		from: 'Parker <postmaster@sandbox954d5f24aa234124a8545deb66a02b4f.mailgun.org>',
		to: [
		// 'Michael Parker <redharvestredharvest@gmail.com>',
		// 'Michael Parker <mparker@brandnewmedia.com>',
		// 'web-0GQeiB <web-0GQeiB@mail-tester.com>'
		// 'Tom Garton <tgarton@brandnewmedia.com.au>',
		// 'Parker <p88@me.com>'
		// 'Aron Du-Shane <adushane@brandnewmedia.com.au>'
		// 'Dawn Jeremiah <DJeremiah@brandnewmedia.asia>',
		// 'Claudia Holmes <cholmes@brandnewmedia.com.au>',
		// 'Nick Fawbert <NickF@brandnewmedia.asia>',
		// 'Emill Marlinda <EMarlinda@brandnewmedia.asia>'
		'Natalie Johnson <NJohnson@brandnewmedia.com.au>'
		],
		cc:[
			
			// 'Tom Garton <TGarton@brandnewmedia.com.au>',
			'Natalie Johnson <NJohnson@brandnewmedia.com.au>'
			// 'Magdalena Trajkoska <mtrajkoska@brandnewmedia.com.au>'
		],
		subject: 'BNM Trade eDM'
	}
};
	
//test the eDM
gulp.task('send', function(){
	return gulp.src('./public/index.html')
		.pipe(email(options));
});

gulp.task('move', function(){
	return gulp.src('./build/img/*.png')
	.pipe(gulp.dest('./public/assets/'))
})

//compile jade, catch errors before compile. 
gulp.task('jade',['move'], function () {
	var j = jade({
		pretty: true
	});
	j.on('error', function(err){
		console.log(err);
		notify().write("jade error");
		j.end();
		gulp.watch();
	})
	return gulp.src('./build/jade/*.jade')
	.pipe(j)
	.pipe(gulp.dest('./build/temp/'))
});

//compile scss to css
gulp.task('build', ['jade'], function(){
	return gulp.src('./build/scss/*.scss')
		.pipe(sass({
			style: 'compressed',
			errLogToConsole: false,
			onError: function(err){
				return notify().write(err);
			}
		}))
		.pipe(gulp.dest('./build/temp/css/'));
});

//move css inline
gulp.task('inline', ['build'], function(){
	return gulp.src('./build/temp/index.html')
		.pipe(inlineCss({
			removeStyleTags: false,
			removeLinkTags: false
		}))
		.pipe(gulp.dest('./public/'))
		.pipe(reload({stream: true}));
});


gulp.task('compile', ['inline'], function(){
	return gulp.src('./build/fonts/*')
		.pipe(gulp.dest('./public/assets/'))
		.pipe(reload({stream: true}));

})

//compile on change
gulp.task('watch', function(){
	gulp.watch(['./build/scss/*.scss', './build/jade/*'], ['compile']);
});

//serve to the browser
gulp.task('serve', function(){
	browserSync({
		server: {
			baseDir: "./public"
		},
		open: false
	})
});

//the dafault task
gulp.task('default', ['watch', 'serve', 'compile']);

//deploy to github-pages
gulp.task('deploy', function(){
	return gulp.src('./public/**/*')
	.pipe(ghPages());
});

gulp.task('compress', function(){
	return gulp.src('./build/img/**/*.png')
	.pipe(pngcrush({ reduce: true })())
	.pipe(gulp.dest('./public/assets/'))
})