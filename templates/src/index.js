'use strict';
require('module-alias/register');

const Application = require('application-core').Application;

const loaderOptions = {};

/**
 * Load configuration from config folder
 */
const config = Application.loadConfig(loaderOptions);

const app = new Application({
    config
});

/**
 * Once the application has bootstraped
 * then we can start the application.
 * - coreplugins.ready (commands and plugins not loaded)
 * - modules.ready
 * - commands.ready
 */
app.once('modules.ready', _ => {
    app.run();
});