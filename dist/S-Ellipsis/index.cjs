'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ATooltip = require('ant-design-vue/es/tooltip');
require('ant-design-vue/es/tooltip/style/index.less');

const SEllipsis = ({
  limit = 0,
  title = '',
  tooltip = false,
  sheared = true,
  placement = 'top',
  ...props
}, context) => {
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
    if (limit > 0 && sheared) {
      const content = cutFullLength(title, limit);
      const expand = length > limit ? '...' : '';
      return vue.createVNode("span", null, [content + expand]);
    }
    return vue.createVNode("span", null, [title]);
  };
  const RenderTooltip = ({
    title = '',
    length = 0
  }) => {
    return vue.createVNode(ATooltip, vue.mergeProps(props, {
      "title": title,
      "placement": placement
    }), {
      default: () => [vue.createVNode(RenderTextNode, {
        "title": title,
        "length": length
      }, null)]
    });
  };
  const length = getFullLength(title);
  return tooltip && length > limit ? vue.createVNode(RenderTooltip, {
    "title": title,
    "length": length
  }, null) : vue.createVNode(RenderTextNode, {
    "title": title,
    "length": length
  }, null);
};

exports.SEllipsis = SEllipsis;
exports.default = SEllipsis;
