'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function itType(val) {
    return Object.prototype.toString.call(val).replace(/^\[[^\s\]]+\s*([^\s\]]+)]$/, '$1');
}
function isArray(arr) {
    return Array.isArray(arr);
}
function isObject(obj) {
    return itType(obj) === 'Object';
}
function isString(str) {
    return itType(str) === 'String';
}
function isNumber(num) {
    return itType(num) === 'Number';
}
function isRegExp(reg) {
    return itType(reg) === 'RegExp';
}
function isBoolean(bool) {
    return itType(bool) === 'Boolean';
}
function isFunction(func) {
    return itType(func) === 'Function';
}
function isNotEmptyArray(arr) {
    return isArray(arr) && arr.length > 0;
}
function isNotEmptyObject(obj) {
    return isObject(obj) && Object.keys(obj).length > 0;
}
function isNotEmptyString(str) {
    return isString(str) && !!str.trim();
}
function isNotFiniteNumber(num) {
    return isNumber(num) && !isFinite(num);
}
function isFiniteNumber(num) {
    return isNumber(num) && isFinite(num);
}
function isEmptyString(str) {
    return isString(str) && !str.trim();
}
function isEmptyObject(obj) {
    return isObject(obj) && Object.keys(obj).length === 0;
}
function isEmptyArray(arr) {
    return isArray(arr) && arr.length === 0;
}
function toDeepClone(source, ...reset) {
    const keys = (own) => {
        return isObject(own) ? Object.keys(own) : isArray(own) ? own.keys() : [];
    };
    const clone = (i, o) => {
        for (const key of keys(o)) {
            const iIsArray = isArray(i[key]);
            const oIsArray = isArray(o[key]);
            const iIsObject = isObject(i[key]);
            const oIsObject = isObject(o[key]);
            const ioIsArray = iIsArray && oIsArray;
            const ioIsObject = iIsObject && oIsObject;
            if (ioIsArray || ioIsObject) {
                clone(i[key], o[key]);
                continue;
            }
            if (oIsObject) {
                clone((i[key] = {}), o[key]);
                continue;
            }
            if (oIsArray) {
                clone((i[key] = []), o[key]);
                continue;
            }
            i[key] = o[key];
        }
    };
    let input;
    let inArgs;
    if (!isObject(source) && !isArray(source)) {
        return source;
    }
    if (isObject(source)) {
        input = {};
        inArgs = [source, ...reset];
    }
    if (isArray(source)) {
        input = [];
        inArgs = [source, ...reset];
    }
    if (inArgs) {
        for (const output of inArgs) {
            const iIsArray = isArray(input);
            const oIsArray = isArray(output);
            const iIsObject = isObject(input);
            const oIsObject = isObject(output);
            const ioIsArray = iIsArray && oIsArray;
            const ioIsObject = iIsObject && oIsObject;
            ioIsObject && clone(input, output);
            ioIsArray && clone(input, output);
        }
    }
    return input;
}
var base = {
    itType,
    isArray,
    isObject,
    isString,
    isNumber,
    isRegExp,
    isBoolean,
    isFunction,
    isEmptyArray,
    isEmptyObject,
    isEmptyString,
    isNotEmptyArray,
    isNotEmptyObject,
    isNotEmptyString,
    isNotFiniteNumber,
    isFiniteNumber,
    toDeepClone
};

exports.default = base;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isEmptyArray = isEmptyArray;
exports.isEmptyObject = isEmptyObject;
exports.isEmptyString = isEmptyString;
exports.isFiniteNumber = isFiniteNumber;
exports.isFunction = isFunction;
exports.isNotEmptyArray = isNotEmptyArray;
exports.isNotEmptyObject = isNotEmptyObject;
exports.isNotEmptyString = isNotEmptyString;
exports.isNotFiniteNumber = isNotFiniteNumber;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isRegExp = isRegExp;
exports.isString = isString;
exports.itType = itType;
exports.toDeepClone = toDeepClone;
