'use strict';
const slug = require('slug');
slug.defaults.mode ='rfc3986';
slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    symbols: true,         // replace unicode symbols or not
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};

//We need to add sub-prompts for application specifics:
//- node app port
//- node app id
//- node repl port
//- node repl enabled
//Then ask for modules:
//We should pull list from NPM? Or freehand? should each
//plugin bring it's own prompt?

//persistence?
    //data-manager
    //filesync
//express?
    //auth?

let packages = {
    'server': 'core.io-express-server',
    'authentication': 'core.io-express-auth',
    'persistence': 'core.io-persistence',
    'filesync': 'core.io-filesync',
    'data-manager': 'core.io-data-manager',
};

let questions = [
    {
        type: 'directory',
        name: 'target',
        message: 'Where you like to put create this project?',
        //this should be relative to the application
        //we should be able to inject
        basePath: './'
    },
    {
        type: 'input',
        name: 'nodeVersion',
        default: function(answer) {
            return process.version;
        },
        message: 'What node version do you want to use?'
    },
    {
        type: 'input',
        name: 'name',
        default: function(answer) {
            return answer.target;
        },
        message: 'What\'s the project\'s name'
    },
    {
        type: 'input',
        name: 'moduleName',
        default: function(answer) {
            return slug(answer.name);
        },
        message: 'What\'s the module\'s name?'
    },
    {
        type: 'input',
        name: 'license',
        message: 'What\'s is the license',
        default: function () {
            //Look into generating a license file:
            //https://github.com/Daniel1of1/license
            return 'MIT';
        }
    },
    {
        type: 'input',
        name: 'descripton',
        message: 'Short project descripton',
        default: function () {
            return 'Awesome souce';
        }
    },
    {
        type: 'confirm',
        name: 'versions',
        message: 'Do you want to specify package versions? If not we use the latest "*"'
    },
    {
        type: 'confirm',
        name: 'server',
        message: 'Do you need an express server?'
    },
    {
        type: 'input',
        name: 'server-version',
        message: 'What version of core.io-express-server?',
        default: '*',
        when: function (answers) {
            return answers.versions && answers.server;
        }
    },
    {
        type: 'confirm',
        name: 'authentication',
        message: 'Do you need authentication support?',
        when: function (answers) {
            return answers.versions && answers.server;
        }
    },
    {
        type: 'input',
        name: 'authentication-version',
        message: 'What version of core.io-express-auth?',
        default: '*',
        when: function (answers) {
            return answers.versions && answers.authentication;
        }
    },
    {
        type: 'confirm',
        name: 'persistence',
        message: 'Do you need an waterline persistence?'
    },
    {
        type: 'input',
        name: 'persistence-version',
        message: 'What version of core.io-persistence?',
        default: '*',
        when: function (answers) {
            return answers.versions && answers.persistence;
        }
    },
    {
        type: 'confirm',
        name: 'data-manager',
        message: 'Do you want to ingreate data manager?',
        when: function (answers) {
            return answers.versions && answers.persistence;
        }
    },
    {
        type: 'input',
        name: 'data-manager-version',
        message: 'What version of core.io-data-manager?',
        default: '*',
        when: function (answers) {
            return answers.versions && answers['data-manager'];
        }
    },
    {
        type: 'confirm',
        name: 'filesync',
        message: 'Do you want to update your data store when seed files change?',
        when: function (answers) {
            return answers.versions && answers['data-manager'] && answers.persistence;
        }
    },
    {
        type: 'input',
        name: 'filesync-version',
        message: 'What version of core.io-filesync?',
        default: '*',
        when: function (answers) {
            return answers.versions && answers.filesync;
        }
    },
];

module.exports = questions;

module.exports.postprocess = function(context, answers) {
    answers.optionals = {};
    answers.dependencies = {};
    /*
     *
     */
    Object.keys(answers).map((key)=>{
        if(!packages[key]) return;

        let vkey = `${key}-version`;
        let value = answers[key];

        if(value === false) return;

        let pkg = packages[key];
        let version = answers[vkey];

        delete answers[key];
        delete answers[vkey];

        answers.dependencies[pkg] = version || '*';
    });

    return answers;
};

/**
 * List of optional packages
 */
module.exports.optionals = packages;
