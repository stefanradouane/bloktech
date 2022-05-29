const {
	src,
	series,
	dest,
	watch
} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");

const styleSrc = "./public/scss/*.scss";
const styleDist = "./public/dist/css";

function style() {
	return src(styleSrc)
		.pipe(sass())
		.pipe(prefix("last 2 versions"))
		.pipe(minify())
		.pipe(dest(styleDist));
}

function watchTask() {
	watch(["public/scss/**/*.scss"], style);
}

exports.watch = watchTask;

exports.default = series(style, watchTask);