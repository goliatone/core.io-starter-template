'use strict';

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
    'passport': 'core.io-express-auth',
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
        name: 'name',
        default: function(answer){
            return answer.target;
        },
        message: 'What\'s the project\'s name'
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
        name: 'passport',
        message: 'Do you need passport integration?',
        when: function (answers) {
            return answers.versions && answers.server;
        }
    },
    {
        type: 'input',
        name: 'passport-version',
        message: 'What version of core.io-express-auth?',
        default: '*',
        when: function (answers) {
            return answers.versions && answers.passport;
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

module.exports.postprocess = function(answers) {
    answers.dependencies = {};

    /*
     *
     */
    Object.keys(answers).map((key)=>{
        if(!packages[key]) return;
        let value = answers[key];
        delete answers[key];
        if(!value) return;
        let pkg = packages[key];
        let version = answers[`${key}-version`];
        answers.dependencies[pkg] = version || '*';
    });

    return answers;
};

module.exports = questions;
