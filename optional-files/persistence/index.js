'use strict';


module.exports.injectContext = function(context) {
    context.config.dependencies['sails-disk'] = '0.10.10';

    return context;
};