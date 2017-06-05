'use strict';

/*
 * http://patorjk.com/software/taag/#p=display&h=2&v=2&c=bash&w=.&f=ANSI%20Shadow&t=%{name}%
 */
const banner = require('fs').readFileSync('./config/app.banner.txt', 'utf-8');

module.exports = {
    banner,
    name: '%{name}%',
    basepath: __dirname,
    environment: process.env.NODE_ENV || 'development',
};
