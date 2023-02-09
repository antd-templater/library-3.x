'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('./lib/S-Icon/index.cjs');

var index = {
    install(app) {
        app.component('SIcon', index$1.default);
    }
};

exports.default = index;
