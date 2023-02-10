import { createVNode, mergeProps } from 'vue';
import ATooltip from 'ant-design-vue/es/tooltip';
import 'ant-design-vue/es/tooltip/style/index.less';

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
      return createVNode("span", null, [content + expand]);
    }
    return createVNode("span", null, [title]);
  };
  const RenderTooltip = ({
    title = '',
    length = 0
  }) => {
    return createVNode(ATooltip, mergeProps(props, {
      "title": title,
      "placement": placement
    }), {
      default: () => [createVNode(RenderTextNode, {
        "title": title,
        "length": length
      }, null)]
    });
  };
  const length = getFullLength(title);
  return tooltip && length > limit ? createVNode(RenderTooltip, {
    "title": title,
    "length": length
  }, null) : createVNode(RenderTextNode, {
    "title": title,
    "length": length
  }, null);
};

export { SEllipsis, SEllipsis as default };
