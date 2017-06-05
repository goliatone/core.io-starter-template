'use strict';

const Command = require('core.io-data-manager').command;

/**
 * dataSync: Sincronize models after file updates.
 *
 * Commands execute in the context of the app,
 * meaning this === app.
 */
module.exports = Command;
