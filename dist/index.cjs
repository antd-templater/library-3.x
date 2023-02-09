'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('./lib/S-Form/index.cjs');
var index$2 = require('./lib/S-Table/index.cjs');

var index = {
    install(app) {
        app.component('SForm', index$1.default);
        app.component('STable', index$2.default);
    }
};

exports.default = index;
