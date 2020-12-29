/*jshint esversion:6, node:true*/
'use strict';

let header = require('fs').readFileSync('./config/repl-banner.txt', 'utf-8');

module.exports = {
    enabled: true,
    metadata: {
        name: '${app.name}',
        header: header,
        version: '${package.version}',
        environment: '${app.environment}'
    },
    options: {
        prompt: '\u001b[33m ${app.name} > \u001b[39m',
    },
    port: process.env.NODE_REPL_PORT || %{ replPort | randomPortNumber }% ,
};