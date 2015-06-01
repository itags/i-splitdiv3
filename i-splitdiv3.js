module.exports = function (window) {
    "use strict";

    require('./css/i-splitdiv3.css'); // <-- define your own css filename here

    require('itags.core')(window);

    var pseudoName = 'threedivs', // <-- define your own pseudo-name here
        superClassName = 'i-splitdiv', // <-- define the itag-name of the superClass here
        itagName = superClassName+'#'+pseudoName, // <-- define the itag-name of the superClass here
        DOCUMENT = window.document,
        ITSA = window.ITSA,
        Itag, ISuperClass;

    if (!window.ITAGS[itagName]) {

        ISuperClass = require(superClassName)(window);

        Itag = ISuperClass.pseudoClass(pseudoName, {
            attrs: {
            },

            init: function() {
                var element = this,
                    designNode = element.getItagContainer();

                // when initializing: make sure NOT to overrule model-properties that already
                // might have been defined when modeldata was boundend. Therefore, use `defineWhenUndefined`
                // element.defineWhenUndefined('someprop', somevalue); // sets element.model.someprop = somevalue; when not defined yet

            },

            render: function() {
                // set the content:
                // element.setHTML('');
            },

            sync: function() {
            },

            destroy: function() {
            }
        });

        window.ITAGS[itagName] = Itag;
    }

    return window.ITAGS[itagName];
};
