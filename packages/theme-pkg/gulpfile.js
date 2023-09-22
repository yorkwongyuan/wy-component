const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// 编译 SCSS 到 CSS
function compileSass() {
  return gulp
    .src('src/**/*.scss') // 源文件路径
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('../dist/css')); // 输出路径
}
// 监听 SCSS 文件的变化
function watchFiles() {
  gulp.watch('src/**/*.scss', compileSass);
}
// 默认任务
gulp.task('default', gulp.series(compileSass, watchFiles));