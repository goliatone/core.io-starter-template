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
//
module.exports = [
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
            return 'MIT';
        }
    },
    {
        type: 'input',
        name: 'descripton',
        message: 'Short project descripton'
    }
];
