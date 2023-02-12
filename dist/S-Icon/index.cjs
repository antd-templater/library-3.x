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

const isIconType = type => {
  return type !== 'default' && type !== 'getTwoToneColor' && type !== 'setTwoToneColor' && type !== 'createFromIconfontCN' && type && AllIcons__namespace[type] && true || false;
};
const SIcon = vue.defineComponent({
  name: 'SIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    rotate: {
      type: Number,
      default: undefined
    },
    twoToneColor: {
      type: [String, Array],
      default: undefined
    }
  },
  setup(props) {
    const Icon = AllIcons__namespace[props.type];
    const binds = {
      ...props,
      type: undefined
    };
    return () => isIconType(props.type) ? vue.createVNode(Icon, binds, null) : null;
  }
});

exports.SIcon = SIcon;
exports.default = SIcon;
exports.isIconType = isIconType;
