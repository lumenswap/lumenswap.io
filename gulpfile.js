/* eslint-disable */

const gulp = require('gulp');
const del = require('del');
const lint = require('gulp-eslint');
const replace = require('gulp-replace');

gulp.task('clean', cb =>
  del([
    'build/**',
    '!build',
  ],
    cb,
  )
);

gulp.task('copy', gulp.series('clean', (cb) => {
  gulp.src(
    'src/static/**/*',
  )
  .pipe(gulp.dest('build'));

  gulp.src([
    'template/**',
    '!template/index.html',
  ])
  .pipe(gulp.dest('build'));

  gulp.src(
    'template/index.html',
  )
  .pipe(replace('@@CDN@@', process.env.CDN_PATH))
  .pipe(gulp.dest('build'));

  cb();
}));

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'src/**/*.jsx'])
  .pipe(lint())
  .pipe(lint.format())
);

gulp.task('dev', gulp.series('copy'));
gulp.task('prod', gulp.series('lint', 'copy'));
