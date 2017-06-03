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
//data-manager?
//express?
    //auth?

module.exports = [
    {
        type: 'directory',
        name: 'target',
        message: 'Where you like to put create this project?',
        // basePath: './src'
    },
    {
        type: 'input',
        name: 'name',
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

];
