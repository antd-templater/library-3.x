'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$3 = require('./S-IconSelect/index.cjs');
var index$2 = require('./S-Ellipsis/index.cjs');
var index$1 = require('./S-Icon/index.cjs');

var index = {
    install(app) {
        app.component('SIconSelect', index$3.default);
        app.component('SEllipsis', index$2.default);
        app.component('SIcon', index$1.default);
    }
};

exports.SEllipsis = index$2.default;
exports.SIcon = index$1.default;
exports.default = index;
