import './index.less'
import 'ant-design-vue/es/tree/style/index.less'

import * as VueTypes from 'vue-types'
import { defineComponent, SetupContext, reactive } from 'vue'
import { Key, DataNode } from 'ant-design-vue/es/vc-tree/interface'
import ATree from 'ant-design-vue/es/tree'
import SIcon, { isIconType } from '@/S-Icon/index'
import SEllipsis from '@/S-Ellipsis/index'
import helper from '@/helper'

interface STreeSourceNode extends Omit<DataNode, 'key'> {
  key?: Key;
  title?: Key;
  children?: STreeSourceNode[];
}

interface STreeTargetNode extends STreeSourceNode {
  key: Key;
  title: Key;
  icon: string;
  isLeaf: boolean;
  disabled: boolean;
  checkable: boolean;
  selectable: boolean;
  disableCheckbox: boolean;
  children?: STreeTargetNode[];
  _reference_node_: STreeSourceNode;
}

interface STreeFieldNames {
  key?: string;
  title?: string;
  children?: string;
}

interface STreeLoadData {
  (treeNode: STreeSourceNode): Promise<void>
}

interface STreeMethoder {
  renderSwitcher: (node: STreeTargetNode) => string;
  triggerSwitcher: (node: STreeTargetNode) => void;
  cleanTreeNodes: (nodes: STreeTargetNodes) => STreeSourceNodes;

  doTreeExpand: (keys: SKeys | { expanded: SKeys }) => void;
  doTreeSelect: (keys: SKeys | { selected: SKeys }) => void;
  doTreeCheck: (keys: SKeys | { checked: SKeys }) => void;
}

interface STreeTargeter {
  loadKeys: SKeys;
  loadedKeys: SKeys;
  expandedKeys: SKeys;

  selectedKeys: SKeys;
  selectedNode: SPartTargetNode;
  selectedNodes: STreeTargetNodes;

  selectedLinkKeys: SKeys;
  selectedLinkNode: SPartTargetNode;
  selectedLinkNodes: STreeTargetNodes;

  checkedKeys: SKeys;
  checkedNode: SPartTargetNode;
  checkedNodes: STreeTargetNodes;

  checkedHalfKeys: SKeys;
  checkedHalfNode: SPartTargetNode;
  checkedHalfNodes: STreeTargetNodes;

  checkedLinkKeys: SKeys;
  checkedLinkNode: SPartTargetNode;
  checkedLinkNodes: STreeTargetNodes;

  sourceTreeNodes: STreeSourceNodes;
  targetTreeNodes: STreeTargetNodes;
  parentTreeNodes: Record<string, STreeTargetNodes>;
  childTreeNodes: Record<string, STreeTargetNodes>;
  flatTreeNodes: STreeTargetNodes;
}

interface STreeSourcer {
  loadKeys: SKeys;
  loadedKeys: SKeys;
  expandedKeys: SKeys;

  selectedKeys: SKeys;
  selectedNode: SPartSourceNode;
  selectedNodes: STreeSourceNodes;

  selectedLinkKeys: SKeys;
  selectedLinkNode: SPartSourceNode;
  selectedLinkNodes: STreeSourceNodes;

  checkedKeys: SKeys;
  checkedNode: SPartSourceNode;
  checkedNodes: STreeSourceNodes;

  checkedHalfKeys: SKeys;
  checkedHalfNode: SPartSourceNode;
  checkedHalfNodes: STreeSourceNodes;

  checkedLinkKeys: SKeys;
  checkedLinkNode: SPartSourceNode;
  checkedLinkNodes: STreeSourceNodes;

  sourceTreeNodes: STreeSourceNodes;
  targetTreeNodes: STreeTargetNodes;
  parentTreeNodes: Record<string, STreeSourceNodes>;
  childTreeNodes: Record<string, STreeSourceNodes>;
  flatTreeNodes: STreeSourceNodes;
}

export type SKeys = Key[]
export type STreeSourceNodes = STreeSourceNode[]
export type STreeTargetNodes = STreeTargetNode[]
export type SPartSourceNode = STreeSourceNode | null
export type SPartTargetNode = STreeTargetNode | null

export const STree = defineComponent({
  name: 'STree',
  inheritAttrs: false,
  props: {
    loadData: VueTypes.func<STreeLoadData>().def(undefined),
    treeData: VueTypes.array<STreeSourceNode>().def(undefined),
    replaceFields: VueTypes.object<STreeFieldNames>().def({}),
    allowCheckedLevel: VueTypes.any<number | Function>().def(1),
    allowSelectedLevel: VueTypes.any<number | Function>().def(1),
    allowSelectToCheck: VueTypes.bool().def(false),
    allowMultiExpanded: VueTypes.bool().def(true),
    allowAutoCollapsed: VueTypes.bool().def(true),
    allowAutoExpanded: VueTypes.bool().def(true),
    allowUnSelected: VueTypes.bool().def(false),
    allowUnChecked: VueTypes.bool().def(true),
    selectable: VueTypes.bool().def(true),
    checkable: VueTypes.bool().def(false),
    disabled: VueTypes.bool().def(false),
    showIcon: VueTypes.bool().def(false),
    showLine: VueTypes.bool().def(false),
    loading: VueTypes.bool().def(false),
    virtual: VueTypes.bool().def(true),
    tooltip: VueTypes.number().def(-1)
  },
  setup(props, context) {
    const Methoder: STreeMethoder = {
      renderSwitcher(node) {
        const isLeafedNode = node.isLeaf === true
        const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
        const isLoadedNode = Targeter.loadedKeys.includes(node.key)
        const isLoadNode = Targeter.loadKeys.includes(node.key)

        if (isAsyncNode && isLoadNode) {
          return 'loading'
        }

        if (props.showLine) {
          if (helper.isNotEmptyArray(node.children) || (isAsyncNode && !isLoadedNode)) {
            return !Targeter.expandedKeys.includes(node.key) ? 'plus-square' : 'minus-square'
          }
          return 'file'
        }

        if (helper.isNotEmptyArray(node.children) || (isAsyncNode && !isLoadedNode)) {
          return 'caret-down'
        }

        return ''
      },

      triggerSwitcher(node) {
        if (Targeter.flatTreeNodes.some(every => every.key === node.key)) {
          Methoder.doTreeExpand(
            Targeter.expandedKeys.includes(node.key)
              ? Targeter.expandedKeys.filter(key => key !== node.key)
              : [...Targeter.expandedKeys, node.key]
          )
        }
      },

      cleanTreeNodes: nodes => {
        return nodes
      },

      doTreeExpand: keys => {},
      doTreeSelect: keys => {},
      doTreeCheck: keys => {}
    }

    const Targeter: STreeTargeter = reactive({
      loadKeys: [],
      loadedKeys: [],
      expandedKeys: [],

      selectedKeys: [],
      selectedNode: null,
      selectedNodes: [],

      selectedLinkKeys: [],
      selectedLinkNode: null,
      selectedLinkNodes: [],

      checkedKeys: [],
      checkedNode: null,
      checkedNodes: [],

      checkedHalfKeys: [],
      checkedHalfNode: null,
      checkedHalfNodes: [],

      checkedLinkKeys: [],
      checkedLinkNode: null,
      checkedLinkNodes: [],

      sourceTreeNodes: [],
      targetTreeNodes: [],
      parentTreeNodes: {},
      childTreeNodes: {},
      flatTreeNodes: []
    })

    const Sourcer: STreeSourcer = reactive({
      loadKeys: [],
      loadedKeys: [],
      expandedKeys: [],

      selectedKeys: [],
      selectedNode: null,
      selectedNodes: [],

      selectedLinkKeys: [],
      selectedLinkNode: null,
      selectedLinkNodes: [],

      checkedKeys: [],
      checkedNode: null,
      checkedNodes: [],

      checkedHalfKeys: [],
      checkedHalfNode: null,
      checkedHalfNodes: [],

      checkedLinkKeys: [],
      checkedLinkNode: null,
      checkedLinkNodes: [],

      sourceTreeNodes: [],
      targetTreeNodes: [],
      parentTreeNodes: {},
      childTreeNodes: {},
      flatTreeNodes: []
    })

    const RenderTreeContainer = (_: any, ctx: SetupContext) => {
      return (
        <section class='s-tree-container'>
          <a-spin spinning={props.loading}>
            <RenderTreeComponent v-slots={ctx.slots}/>
          </a-spin>
        </section>
      )
    }

    const RenderTreeComponent = (_: any, ctx: SetupContext) => {
      const slots = {
        ...ctx.slots,
        switcherIcon: helper.isFunction(ctx.slots.switcherIcon) ? ctx.slots.switcherIcon : (node: STreeTargetNode) => RenderTreeSwitcherIcon(node, ctx),
        title: helper.isFunction(ctx.slots.title) ? ctx.slots.title : (node: STreeTargetNode) => RenderTreeNodeTitle(node, ctx),
        icon: helper.isFunction(ctx.slots.icon) ? ctx.slots.icon : (node: STreeTargetNode) => RenderTreeNodeIcon(node, ctx)
      }

      return (
        <ATree
          treeData={Targeter.targetTreeNodes}
          expandedKeys={Targeter.expandedKeys}
          selectedKeys={Targeter.selectedKeys}
          checkedKeys={Targeter.checkedKeys}
          onExpand={Methoder.doTreeExpand}
          onSelect={Methoder.doTreeSelect}
          onCheck={Methoder.doTreeCheck}
          selectable={props.selectable}
          checkable={props.checkable}
          disabled={props.disabled}
          showIcon={props.showIcon}
          showLine={props.showLine}
          virtual={props.virtual}
          draggable={false}
          multiple={false}
          v-slots={slots}
        />
      )
    }

    const RenderTreeSwitcherIcon = (node: STreeTargetNode, ctx: SetupContext) => {
      const onClick = (event: MouseEvent) => {
        Methoder.triggerSwitcher(node)
        event.stopPropagation()
      }
      const icon = Methoder.renderSwitcher(node)
      return isIconType(icon) ? <SIcon type={icon} style='cursor: pointer;' onClick={onClick}/> : null
    }

    const RenderTreeNodeIcon = (node: STreeTargetNode, ctx: SetupContext) => {
      if (node.icon === 'iconRoot') {
        return helper.isFunction(ctx.slots.iconRoot) ? ctx.slots.iconRoot(node) : <SIcon type='AppstoreOutlined'/>
      }

      if (node.icon === 'iconChild') {
        return helper.isFunction(ctx.slots.iconChild) ? ctx.slots.iconChild(node) : <SIcon type='ApartmentOutlined'/>
      }
    }

    const RenderTreeNodeTitle = (node: STreeTargetNode, ctx: SetupContext) => {
      const RenderTreeNodeTitleRootLabel = (node: STreeTargetNode, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleRootLabel)) {
          return (
            <span class='s-tree-title-label'>
              { ctx.slots.titleRootLabel(node) }
            </span>
          )
        }

        return (
          <span class='s-tree-title-label'>
            <SEllipsis
              limit={props.tooltip}
              tooltip={props.tooltip > -1}
            >
              { node.label }
            </SEllipsis>
          </span>
        )
      }

      const RenderTreeNodeTitleRootButton = (node: STreeTargetNode, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleRootButton)) {
          return (
            <span class='s-tree-title-button'>
              { ctx.slots.titleRootButton(node) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      const RenderTreeNodeTitleChildLabel = (node: STreeTargetNode, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleChildLabel)) {
          return (
            <span class='s-tree-title-label'>
              { ctx.slots.titleChildLabel(node) }
            </span>
          )
        }

        return (
          <span class='s-tree-title-label'></span>
        )
      }

      const RenderTreeNodeTitleChildButton = (node: STreeTargetNode, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleChildButton)) {
          return (
            <span class='s-tree-title-button'>
              { ctx.slots.titleChildButton(node) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      if (node.icon === 'titleRoot') {
        return helper.isFunction(ctx.slots.titleRoot) ? ctx.slots.titleRoot(node) : (
          <span class='spans-tree-title-container'>
            <RenderTreeNodeTitleRootLabel { ...node } v-slots={ctx.slots}/>
            <RenderTreeNodeTitleRootButton { ...node } v-slots={ctx.slots}/>
          </span>
        )
      }

      if (node.icon === 'titleChild') {
        return helper.isFunction(ctx.slots.titleChild) ? ctx.slots.titleChild(node) : (
          <span class='spans-tree-title-container'>
            <RenderTreeNodeTitleChildLabel { ...node } v-slots={ctx.slots}/>
            <RenderTreeNodeTitleChildButton { ...node } v-slots={ctx.slots}/>
          </span>
        )
      }
    }

    context.expose({
      loadKeys: Targeter.loadKeys,
      loadedKeys: Targeter.loadedKeys,
      expandedKeys: Targeter.expandedKeys,

      selectedKeys: Sourcer.selectedKeys,
      selectedNode: Sourcer.selectedNode,
      selectedNodes: Sourcer.selectedNodes,
      selectedLinkKeys: Sourcer.selectedLinkKeys,
      selectedLinkNode: Sourcer.selectedLinkNode,
      selectedLinkNodes: Sourcer.selectedLinkNodes,

      checkedKeys: Sourcer.checkedKeys,
      checkedNode: Sourcer.checkedNode,
      checkedNodes: Sourcer.checkedNodes,
      checkedHalfKeys: Sourcer.checkedHalfKeys,
      checkedHalfNode: Sourcer.checkedHalfNode,
      checkedHalfNodes: Sourcer.checkedHalfNodes,
      checkedLinkKeys: Sourcer.checkedLinkKeys,
      checkedLinkNode: Sourcer.checkedLinkNode,
      checkedLinkNodes: Sourcer.checkedLinkNodes,

      parentTreeNodes: Sourcer.parentTreeNodes,
      childTreeNodes: Sourcer.childTreeNodes,
      flatTreeNodes: Sourcer.flatTreeNodes,

      cleanTreeNodes: Methoder.cleanTreeNodes
    })

    return () => <RenderTreeContainer v-slots={context.slots} />
  }
})

export default STree
