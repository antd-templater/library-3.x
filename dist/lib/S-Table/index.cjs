'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var STable = vue.defineComponent({
  name: 'STable',
  props: {
    type: {
      type: String,
      default: 'input'
    }
  },
  setup(props) {
    return vue.createVNode("div", null, [vue.createTextVNode("STable: "), props.type]);
  }
});

exports.default = STable;
