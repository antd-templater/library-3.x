'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ATooltip = require('ant-design-vue/es/tooltip');
require('ant-design-vue/es/tooltip/style/index.less');

var SEllipsis = vue.defineComponent({
  name: 'SEllipsis',
  props: {
    ...ATooltip.tooltipProps(),
    limit: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    sheared: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  setup(props) {
    const {
      limit,
      title,
      tooltip,
      sheared,
      placement,
      ...tooltipProps
    } = vue.toRefs(props);
    const getFullLength = (title = '') => {
      return title.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0);
        const isSingleChar = charCode >= 0 && charCode <= 128;
        return isSingleChar ? pre + 1 : pre + 2;
      }, 0);
    };
    const cutFullLength = (title = '', max = Infinity) => {
      let len = 0;
      return title.split('').reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0);
        const isSingleChar = charCode >= 0 && charCode <= 128;
        isSingleChar ? len = len + 1 : len = len + 2;
        return len <= max ? pre + cur : pre;
      }, '');
    };
    const RenderTextNode = ({
      title = '',
      length = 0
    }) => {
      if (limit.value > 0 && sheared) {
        const content = cutFullLength(title, limit.value);
        const expand = length > limit.value ? '...' : '';
        return vue.createVNode("span", null, [content + expand]);
      }
      return vue.createVNode("span", null, [title]);
    };
    const RenderTooltip = ({
      title = '',
      length = 0
    }) => {
      return vue.createVNode(ATooltip, vue.mergeProps(vue.reactive(tooltipProps), {
        "placement": placement.value,
        "title": title
      }), {
        default: () => [vue.createVNode(RenderTextNode, {
          "title": title,
          "length": length
        }, null)]
      });
    };
    const length = getFullLength(title.value);
    return () => tooltip && length > limit.value ? vue.createVNode(RenderTooltip, {
      "title": title.value,
      "length": length
    }, null) : vue.createVNode(RenderTextNode, {
      "title": title.value,
      "length": length
    }, null);
  }
});

exports.default = SEllipsis;
