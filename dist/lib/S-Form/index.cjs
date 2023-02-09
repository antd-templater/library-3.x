'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var SForm = vue.defineComponent({
  name: 'SForm',
  props: {
    type: {
      type: String,
      default: 'input'
    }
  },
  setup(props) {
    return vue.createVNode("div", null, [vue.createTextVNode("SForm: "), props.type]);
  }
});

exports.default = SForm;
