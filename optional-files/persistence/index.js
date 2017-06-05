'use strict';


module.exports.injectContext = function(context) {
    context.config.dependencies['sails-disk'] = '*';
    
    return context;
}
