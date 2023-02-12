'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('./S-Icon/index.cjs');
var index$2 = require('./S-IconSelect/index.cjs');
var index$3 = require('./S-Ellipsis/index.cjs');

var index = {
    install(app) {
        app.component('SIconSelect', index$2.SIconSelect);
        app.component('SEllipsis', index$3.SEllipsis);
        app.component('SIcon', index$1.SIcon);
    }
};

exports.SIcon = index$1.SIcon;
exports.isIconType = index$1.isIconType;
exports.SIconSelect = index$2.SIconSelect;
exports.SEllipsis = index$3.SEllipsis;
exports.default = index;
