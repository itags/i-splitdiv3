module.exports = function (window) {
    "use strict";

    require('./css/i-splitdiv3.css'); // <-- define your own css filename here

    require('itags.core')(window);

    var pseudoName = 'threesections', // <-- define your own pseudo-name here
        superClassName = 'i-splitdiv', // <-- define the itag-name of the superClass here
        itagName = superClassName+'#'+pseudoName, // <-- define the itag-name of the superClass here
        DOCUMENT = window.document,
        ITSA = window.ITSA,
        Itag, ISuperClass;

    if (!window.ITAGS[itagName]) {

        ISuperClass = require('i-splitdiv')(window);  // <-- define the itag-name of the superClass here NOT by variable, for browserify wouldn't load it

        Itag = ISuperClass.pseudoClass(pseudoName, {
            attrs: {
                divider2: 'string',
                'divider2-min': 'string',
                'divider2-max': 'string',
                resizable2: 'boolean'
            },

            render: function() {
                var element = this,
                    designNode, section3, container, divider, node;
                element.$superProp('render');
                designNode = element.getItagContainer();
                section3 = designNode.getAll('>section')[2];
                container = element.getElement('>section');
                if (section3) {
                    section3.setAttr('section', 'third', true);
                    node = container.append('<section container="third">'+section3.getOuterHTML(null, true)+'</section>');
                    element.setData('_section3', node);
                     // add the divider2:
                    divider = container.addSystemElement('<section class="resize-handle second"></section>');
                    divider.setData('_section', 3);
                    divider.setData('_reverse', true);
                    divider.setData('_borderNode', node);
                    element.setData('_divider2', divider);
                }
            },

            sync: function() {
                var element = this,
                    model = element.model,
                    section1 = element.getData('_section1'),
                    section2 = element.getData('_section2'),
                    section3 = element.getData('_section3'),
                    divider2Node = element.getData('_divider2'),
                    divider2 = model.divider2,
                    size, removeSize, value, indent;
                element.$superProp('sync');
                if (section1 && section2 && section3) {
                    if (model.horizontal) {
                        size = 'width';
                        removeSize = 'height';
                        indent = 'right';
                    }
                    else {
                        size = 'height';
                        removeSize = 'width';
                        indent = 'bottom';
                    }
                    value = model['divider2-min'];
                    if (value) {
                        section3.setInlineStyle('min-'+size, value);
                    }
                    else {
                        section3.removeInlineStyle('min-'+size);
                    }
                    value = model['divider2-max'];
                    if (value) {
                        section3.setInlineStyle('max-'+size, value);
                    }
                    else {
                        section3.removeInlineStyle('max-'+size);
                    }
                    section3.removeInlineStyle('min-'+removeSize);
                    section3.removeInlineStyle('max-'+removeSize);
                    section3.removeInlineStyle(removeSize);
                    value = divider2;
                    section3.setInlineStyle(size, value);
                    // divider2Node.setInlineStyle(indent, (element[size] - section1[size] - section2[size] - Math.round((divider2Node[size])/2))+'px');
                    divider2Node.setInlineStyle(indent, (section3[size] - Math.round(divider2Node[size]/2))+'px');
                }
            },

            destroy: function() {
            }
        });

        window.ITAGS[itagName] = Itag;
    }

    return window.ITAGS[itagName];
};
