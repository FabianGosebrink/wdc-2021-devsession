'use strict';

const shell = require('shelljs');
const chalk = require('chalk');

const BASE_HREF = './';
const OUTPUT_TEMP_PATH = '.temp/desktop';
const OUTPUT_DIST_PATH = 'dist/apps/desktop';
const ICON_PATH = 'assets/desktop/icon';
const DESKTOP_ASSETS = 'assets/desktop/*';
const ELECTRON_VERSION = '11.1.1';

shell.echo('Start building desktop');

// DELETE TEMP FOLDER
shell.rm('-rf', `${OUTPUT_TEMP_PATH}`);
shell.rm('-rf', `${OUTPUT_DIST_PATH}`);
shell.echo('Deleted temp and dist folders...');

// BUILD ANGULAR
console.log(chalk.green('build angular'));
const angularBuildCommand = `ng build --prod --base-href ${BASE_HREF} --output-path=${OUTPUT_TEMP_PATH}`;
shell.exec(angularBuildCommand);

// COPY ASSETS
console.log(chalk.green('copy desktop assets'));
shell.cp('-r', `${DESKTOP_ASSETS}`, `${OUTPUT_TEMP_PATH}`);

// BUILD DESKTOP
console.log(chalk.green('build desktop'));
shell.exec(
  `electron-packager ${OUTPUT_TEMP_PATH} --electronVersion=${ELECTRON_VERSION} --overwrite --icon=${ICON_PATH} --platform=win32,linux --out=${OUTPUT_DIST_PATH}`
);

console.log(chalk.green('DONE'));
