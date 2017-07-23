// source files
themeName = 'jalan-jalan',
localWpAddress = "klepon/_wp-theme-builder/",

// ========= leave below code alone =============
src = {
	styles 			:	['_src/assets/styles/*.scss'],
	adminStyles :	['_src/assets/admin-styles/*.scss'],
	react	 			:	['_src/assets/react/*.js'],
	reactWatch	:	['_src/assets/scripts/*.js', '_src/assets/react/*.js', '_src/assets/react/**/*.js'],
	reactEntry	: './_src/assets/react/index.js'
},

// dist files
dist = {
	main			: 'dist',
	styles		: 'dist/assets/styles/',
	adminStyle: 'dist/assets/styles/',
	scripts		: 'dist/assets/js/',
	wpAssets	: '../themes/'+ themeName +'/assets/'
},

// files name
fileName = {
	style	: 'style.css',
	adminStyle	: 'admin-style.css',
	scripts: 'script.js'
};

// include required plugin
const	clean = require('gulp-clean'),
	gulp = require('gulp'),
	gulpWatch = require('gulp-watch'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cssnano = require('gulp-cssnano'),
	copy = require('gulp-copy'),
	cmq = require('gulp-combine-mq'),
	browserSync = require('browser-sync'),
	webpackStream = require('webpack-stream'),
	webpack = require("webpack"),
	path = require('path');

// production build
gulp.task('build', ['clean-build'], function(){
	return gulp.start('rebuild');
});

gulp.task('rebuild', ['styles', 'admin-styles', 'webpack-build'], function(){
	return gulp.start('copy-wp-assets');
});

// default is dev env
gulp.task('default', ['styles', 'admin-styles', 'webpack-stream'], function(){
	return gulp.start('copy-wp-assets');
});

gulp.task('clean-build', function(){
	return gulp.src([dist.main, dist.wpAssets], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('copy-wp-assets', ['copy-assets-style', 'copy-assets-react'], function(){
	return gulp.start('serve-and-watch');
});

gulp.task('serve-and-watch', ['server'], function(){
	gulpWatch(dist.scripts +'*.js', function() {
		gulp.start('copy-assets-react');
	});

	gulpWatch(dist.styles +'*.css', function() {
			gulp.start('copy-assets-style');
	});

	gulpWatch(src.styles, function() {
		gulp.start('styles');
	});

	gulpWatch(src.adminStyles, function() {
		gulp.start('admin-styles');
	});

	gulpWatch(src.reactWatch, function() {
		gulp.start('webpack-stream');
	});
});

// build react for production
gulp.task("webpack-build", function(callback) {
	let myConfig = {
		module : {
			loaders: [
				{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
			]
		},
		output: {
			path: path.resolve(dist.scripts),
			filename: fileName.scripts
		},
		entry: src.reactEntry,
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.DedupePlugin()
		]
	}

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) {
			console.log("Error build prod react");
		}
		callback();
	});
});

// compile react
gulp.task('webpack-stream', function(){
	return gulp.src(src.react)
	  .pipe(webpackStream( {
			module : {
		    loaders: [
		      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
		    ]
		  },
			output: {
		    filename: fileName.scripts
		  },
			devtool: 'source-map'
		} ))
	  .pipe(gulp.dest(dist.scripts));
});

// compile styles
gulp.task('styles', function(){
	let handleError = function (error) {
		notify().write("ERROR: Compile styles\n");
		console.log(error.message);
		this.emit('end');
	},

	supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
	];

	return gulp.src(src.styles)
    .pipe(sass({outputStyle: 'compressed'})
		.on('error', sass.logError))
    .on('error', handleError)
		.pipe(cmq())
    .pipe(cssnano({
			// sourcemap: true,
    	safe: true,
    	autoprefixer: {browsers: supported, add: true},
      discardComments: {removeAll: true}
    }))
    .pipe(concat(fileName.style))
    .pipe(gulp.dest(dist.styles));;
});

// compile admin styles
gulp.task('admin-styles', function(){
	let handleError = function (error) {
		notify().write("ERROR: Compile styles\n");
		console.log(error.message);
		this.emit('end');
	},

	supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 10',
    'ff >= 20',
    'ios 6',
    'android 4'
	];

	return gulp.src(src.adminStyles)
    .pipe(sass({outputStyle: 'compressed'})
		.on('error', sass.logError))
    .on('error', handleError)
		.pipe(cmq())
    .pipe(cssnano({
			// sourcemap: true,
    	safe: true,
    	autoprefixer: {browsers: supported, add: true},
      discardComments: {removeAll: true}
    }))
    .pipe(concat(fileName.adminStyle))
    .pipe(gulp.dest(dist.adminStyle));
});

gulp.task('copy-assets-style', function(){
	return gulp.src(dist.styles +"**")
	  .pipe(copy(dist.wpAssets, {prefix: 2}))
		.pipe(notify("Style copied to WP theme."));
});

gulp.task('copy-assets-react', function(){
	return gulp.src(dist.scripts +"**")
	  .pipe(copy(dist.wpAssets, {prefix: 2}))
		.pipe(notify("React copied to WP theme."));
});

// run local server
gulp.task("server", function(){
	browserSync.init({
    proxy: localWpAddress,
    online: true
 	});

	gulpWatch(dist.wpAssets +"**/*.css").on('change', function(file) {
		browserSync.reload(file.path);
	});

	gulpWatch(dist.wpAssets +"**/*.js").on('change', browserSync.reload);
});