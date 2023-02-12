'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('./S-IconSelect/index.cjs');
var index$2 = require('./S-Ellipsis/index.cjs');
var index$3 = require('./S-Icon/index.cjs');

var index = {
    install(app) {
        app.component('SIconSelect', index$1.SIconSelect);
        app.component('SEllipsis', index$2.SEllipsis);
        app.component('SIcon', index$3.SIcon);
    }
};

exports.SIconSelect = index$1.SIconSelect;
exports.SEllipsis = index$2.SEllipsis;
exports.SIcon = index$3.SIcon;
exports.default = index;
