const gulp                 = require( 'gulp' );
const del                  = require('del');
const sass                 = require( 'gulp-sass' );
const { src, dest, watch } = require( 'gulp' );
const sourcemaps           = require( 'gulp-sourcemaps' );
const autoprefixer         = require( 'gulp-autoprefixer' );
const uglify               = require( 'gulp-uglify' );
const wpPot                = require( 'gulp-wp-pot' );

gulp.task('clean', function () {
  return del([
    'assets/css/**/*',
		'assets/js/**/*',
  ]);
});

gulp.task(
	'styles',
	() => {
    return gulp.src( 'assets/src/scss/blueprint-extras.scss', { base: 'assets/src/scss'} )
		.pipe( sourcemaps.init() )
		.pipe( autoprefixer() )
		.pipe( sass( {outputStyle: 'compressed'} ).on( 'error', sass.logError ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( 'assets/css/' ) );
	}
);

gulp.task(
	'scripts',
	function() {
		return gulp.src( 'assets/src/js/**/*.js', { base: 'assets/src/js'} )
		.pipe( uglify() )
		.pipe( gulp.dest( 'assets/js/' ) )
	}
);

gulp.task(
	'translate',
	function () {
		return gulp.src( ['**/*.php', '!node_modules/**'] )
		.pipe(
			wpPot(
				{
					domain: 'blueprint-blocks',
					package: 'Blueprint_Blocks'
				}
			)
		)
		.pipe( gulp.dest( 'languages/blueprint-blocks.pot' ) );
	}
);

gulp.task( 'default', gulp.series( ['styles', 'translate', 'scripts' ] ) );

gulp.task(
	'watch',
	function(){
		gulp.watch( 'src/sass/**/*', gulp.series( ['styles'] ) );
		gulp.watch( 'src/js/**/*', gulp.series( ['scripts'] ) );
	}
);
