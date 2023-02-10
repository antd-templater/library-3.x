'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var AllIcons = require('@ant-design/icons-vue');

function _interopNamespaceDefault(e) {
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return Object.freeze(n);
}

var AllIcons__namespace = /*#__PURE__*/_interopNamespaceDefault(AllIcons);

const SIcon = (props, context) => vue.h(AllIcons__namespace[props.type], context.attrs, context.slots);
const isSIcon = type => !!AllIcons__namespace[type];

exports.SIcon = SIcon;
exports.default = SIcon;
exports.isSIcon = isSIcon;
