import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

const basePath = './',
  srcPath = 'es6',
  dstPath = 'es5',
  ignoreFolders = [
    '.bin',
    '.git',
    'conf',
    'examples',
    'lib',
    'node_modules'
  ];

function getFolders (dir) {

  /*
  return fs.readdirSync(dir)
    .filter(function(file) {
      return
        ignoreFolders.indexOf(file) === -1 &&
        fs.statSync(path.join(dir, file)).isDirectory();
    });
  */
 
  return ['AreaChart', 'ItemSelector', 'OffsetAreaChart'];

}

gulp.task('buildComponents', () => {

  let folderNames = getFolders(basePath);

  // build components
  folderNames.forEach(folder => {

    rimraf(path.join(basePath, folder, dstPath), () => {

      gulp.src(path.join(basePath, folder, srcPath, '/**'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(basePath, folder, dstPath)));

    });

  });

});

gulp.task('default', ['buildComponents']);