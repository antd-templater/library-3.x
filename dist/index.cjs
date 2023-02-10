'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('./S-Icon/index.cjs');
var index$2 = require('./S-Ellipsis/index.cjs');

var index = {
    install(app) {
        app.component('SIcon', index$1.SIcon);
        app.component('SEllipsis', index$2.SEllipsis);
    }
};

exports.SIcon = index$1.SIcon;
exports.SEllipsis = index$2.SEllipsis;
exports.default = index;
