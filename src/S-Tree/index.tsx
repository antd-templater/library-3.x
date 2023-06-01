import './index.less'
import 'ant-design-vue/es/tree/style/index.less'
import 'ant-design-vue/es/spin/style/index.less'

import * as VueTypes from 'vue-types'
import { defineComponent, SetupContext, ShallowReactive, ShallowRef, shallowReactive, shallowRef, watch, unref, toRaw } from 'vue'
import { Key, DataNode } from 'ant-design-vue/es/vc-tree/interface'
import SIcon, { isIconType } from '@/S-Icon/index'
import SEllipsis from '@/S-Ellipsis/index'
import ATree from 'ant-design-vue/es/tree'
import ASpin from 'ant-design-vue/es/spin'
import helper from '@/helper'

export interface STreeSourceNode extends Omit<DataNode, 'key'> {
  key?: Key;
  title?: Key;
  children?: STreeSourceNode[];
  forceApplyDisableCheckbox?: boolean;
  alwaysShowTitleButton?: boolean;
  forceApplyDisabled?: boolean;
}

export interface STreeTargetNode extends STreeSourceNode {
  scopedSlots: {
    icon: string;
    title: string;
  };
  title: any;
  key: Key;
  icon: string;
  level: number;
  isLeaf: boolean;
  disabled: boolean;
  checkable: boolean;
  selectable: boolean;
  isSelectable: boolean;
  disableCheckbox: boolean;
  forceApplyDisabled: boolean;
  alwaysShowTitleButton: boolean;
  forceApplyDisableCheckbox: boolean;
  referenceSourceNode: STreeSourceNode;
  parentNode: STreeTargetNode | null;
  children: STreeTargetNode[];
}

export interface STreeFieldNames {
  key?: string;
  icon?: string;
  title?: string;
  children?: string;
  disabled?: string;
  disableCheckbox?: string;
  forceApplyDisabled?: string;
  alwaysShowTitleButton?: string;
  forceApplyDisableCheckbox?: string;
}

export interface STreeLoadData {
  (treeNode: STreeSourceNode, options?: { checkedKeys?: STreeKeys; selectedKeys?: STreeKeys; expandedKeys?: STreeKeys }): Promise<STreeSourceNodes>;
}

export interface STreeMethoder {
  renderSwitcher: (node: STreeTargetNode) => string;
  triggerSwitcher: (node: STreeTargetNode) => void;

  cleanTreeStater: (force?: boolean) => void;
  resetTreeStater: (force?: boolean) => void;

  resetTreeNodes: (nodes?: STreeSourceNodes) => void;
  reloadTreeNodes: (nodes: STreeSourceNodes, parent?: { key: STreeKey } | null) => STreeTargetNodes;
  appendTreeNodes: (nodes: STreeSourceNodes, parent?: { key: STreeKey } | null) => STreeTargetNodes;
  removeTreeNodes: (nodes: STreeSourceNodes, parent?: { key: STreeKey } | null) => STreeTargetNodes;
  compileTreeNodes: (nodes: STreeSourceNodes, parent?: STreeTargetNode | null) => STreeTargetNodes;
  lookupTreeNodes: <T extends STreeKeys | STreeKey> (nodes: T) => T extends any[] ? Array<STreeSourceNode | null> : STreeSourceNode | null;
  spreadTreeNodes: <T extends STreeSpreadNodes> (nodes: T) => T;

  expandTreeNodes: (keys: STreeKeys) => void;
  collapseTreeNodes: (keys: STreeKeys) => void;

  doTreeAllExpanded: () => void;
  doTreeAllCollapsed: () => void;
  doTreeToggleExpand: (keys: STreeKeys) => void;
  doTreeOnlyExpand: (keys: STreeKeys) => void;
  doTreePushExpand: (keys: STreeKeys) => void;
  doTreePopExpand: (keys: STreeKeys) => void;
  doTreeToggleChecked: (keys: STreeKeys) => void;
  doTreeOnlyChecked: (keys: STreeKeys) => void;
  doTreePushChecked: (keys: STreeKeys) => void;
  doTreePopChecked: (keys: STreeKeys) => void;
  doTreeSelect: (keys: STreeKeys) => void;

  doEventExpand: (keys: STreeKeys | { expanded: STreeKeys }) => void;
  doEventSelect: (keys: STreeKeys | { selected: STreeKeys }) => void;
  doEventCheck: (keys: STreeKeys | { checked: STreeKeys }) => void;

  doTreeLoad: (keys: STreeKeys) => Promise<void[]>;

  forceUpdate: () => void;
}

export interface STreeTransformer {
  resetPropTreeData: () => void;
  resetPropCheckedKeys: () => void;
  resetPropSelectedKeys: () => void;
  resetPropExpandedKeys: () => void;

  resetStaterCheckedKeys: () => void;
  resetStaterSelectedKeys: () => void;
  resetStaterExpandedKeys: () => void;
  resetStaterLinkTreeNodes: () => void;
}

export interface STreeTargeter {
  selectedNode: ShallowRef<SPartTargetNode>;
  selectedLinkNode: ShallowRef<SPartTargetNode>;
  checkedLinkNode: ShallowRef<SPartTargetNode>;
  checkedHalfNode: ShallowRef<SPartTargetNode>;
  checkedNode: ShallowRef<SPartTargetNode>;

  selectedNodes: ShallowReactive<STreeTargetNodes>;
  selectedLinkNodes: ShallowReactive<STreeTargetNodes>;
  checkedLinkNodes: ShallowReactive<STreeTargetNodes>;
  checkedHalfNodes: ShallowReactive<STreeTargetNodes>;
  checkedNodes: ShallowReactive<STreeTargetNodes>;
}

export interface STreeSourcer {
  selectedNode: ShallowRef<SPartSourceNode>;
  selectedLinkNode: ShallowRef<SPartSourceNode>;
  checkedLinkNode: ShallowRef<SPartSourceNode>;
  checkedHalfNode: ShallowRef<SPartSourceNode>;
  checkedNode: ShallowRef<SPartSourceNode>;

  selectedNodes: ShallowReactive<STreeSourceNodes>;
  selectedLinkNodes: ShallowReactive<STreeSourceNodes>;
  checkedLinkNodes: ShallowReactive<STreeSourceNodes>;
  checkedHalfNodes: ShallowReactive<STreeSourceNodes>;
  checkedNodes: ShallowReactive<STreeSourceNodes>;
}

export interface STreeStater {
  loadKeys: ShallowReactive<STreeKeys>;
  loadedKeys: ShallowReactive<STreeKeys>;

  checkedKeys: ShallowReactive<STreeKeys>;
  selectedKeys: ShallowReactive<STreeKeys>;
  expandedKeys: ShallowReactive<STreeKeys>;
  outCheckedKeys: ShallowReactive<STreeKeys>;
  selfCheckedKeys: ShallowReactive<STreeKeys>;
  halfCheckedKeys: ShallowReactive<STreeKeys>;

  parentTreeNodes: ShallowRef<Record<string, STreeTargetNodes>>;
  childTreeNodes: ShallowRef<Record<string, STreeTargetNodes>>;
  flatTreeNodes: ShallowReactive<STreeTargetNodes>;
  linkTreeNodes: ShallowReactive<STreeTargetNodes>;
  propTreeNodes: ShallowReactive<STreeSourceNodes>;
}

export interface STreeEmiterCheck {
  checkedKeys: STreeKeys;
  delCheckedKeys: STreeKeys;
  addCheckedKeys: STreeKeys;
}

export interface STreeEmiterSelect {
  selectedKeys: STreeKeys;
  delSelectedKeys: STreeKeys;
  addSelectedKeys: STreeKeys;
}

export interface STreeEmiterExpand {
  expandedKeys: STreeKeys;
  delExpandedKeys: STreeKeys;
  addExpandedKeys: STreeKeys;
}

export type STreeKey = Key
export type STreeKeys = Key[]
export type STreeSourceNodes = STreeSourceNode[]
export type STreeTargetNodes = STreeTargetNode[]
export type STreeSpreadNodes = STreeTargetNodes | STreeSourceNodes
export type SPartTargetNode = STreeTargetNode | null
export type SPartSourceNode = STreeSourceNode | null

export const STree = defineComponent({
  name: 'STree',
  props: {
    checkedKeys: VueTypes.array<string | number>().def([]),
    selectedKeys: VueTypes.array<string | number>().def([]),
    expandedKeys: VueTypes.array<string | number>().def([]),
    checkedMode: VueTypes.string<'link' | 'default'>().def('default'),
    selectedMode: VueTypes.string<'link' | 'default'>().def('default'),
    loadData: VueTypes.func<STreeLoadData>().def(undefined),
    treeData: VueTypes.array<STreeSourceNode>().def(undefined),
    treeStyle: VueTypes.any<string | Record<string, string>>().def(undefined),
    replaceFields: VueTypes.object<STreeFieldNames>().def({}),
    allowCheckedLevel: VueTypes.any<number | Function>().def(1),
    allowSelectedLevel: VueTypes.any<number | Function>().def(1),
    alwaysShowTitleButton: VueTypes.bool().def(false),
    forceCleanWhenNotInTreeNodes: VueTypes.bool().def(false),
    forceCleanWhenRemoveTreeNode: VueTypes.bool().def(true),
    forceApplyDisableCheckbox: VueTypes.bool().def(false),
    forceApplyDisabled: VueTypes.bool().def(false),
    allowSelectToCheck: VueTypes.bool().def(false),
    allowMultiExpanded: VueTypes.bool().def(true),
    allowAutoCollapsed: VueTypes.bool().def(true),
    allowAutoExpanded: VueTypes.bool().def(true),
    allowUnExpanded: VueTypes.bool().def(false),
    allowUnSelected: VueTypes.bool().def(false),
    allowUnChecked: VueTypes.bool().def(true),
    selectable: VueTypes.bool().def(true),
    checkable: VueTypes.bool().def(false),
    blockNode: VueTypes.bool().def(false),
    disabled: VueTypes.bool().def(false),
    showIcon: VueTypes.bool().def(false),
    showLine: VueTypes.bool().def(false),
    loading: VueTypes.bool().def(false),
    virtual: VueTypes.bool().def(true),
    tooltip: VueTypes.number().def(-1)
  },
  emits: {
    'check': (emiter: STreeEmiterCheck) => true,
    'select': (emiter: STreeEmiterSelect) => true,
    'expand': (emiter: STreeEmiterExpand) => true,
    'update:treeData': (trees: STreeSourceNode) => true,
    'update:expandedKeys': (keys: STreeKeys) => true,
    'update:selectedKeys': (keys: STreeKeys) => true,
    'update:checkedKeys': (keys: STreeKeys) => true
  },
  setup(props, context) {
    const Stater: STreeStater = {
      loadKeys: shallowReactive([]),
      loadedKeys: shallowReactive([]),

      checkedKeys: shallowReactive([]),
      selectedKeys: shallowReactive([]),
      expandedKeys: shallowReactive([]),
      outCheckedKeys: shallowReactive([]),
      selfCheckedKeys: shallowReactive([]),
      halfCheckedKeys: shallowReactive([]),

      parentTreeNodes: shallowRef({}),
      childTreeNodes: shallowRef({}),
      flatTreeNodes: shallowReactive([]),
      linkTreeNodes: shallowReactive([]),
      propTreeNodes: shallowReactive([])
    }

    const Sourcer: STreeSourcer = {
      selectedNode: shallowRef(null),
      selectedLinkNode: shallowRef(null),
      checkedLinkNode: shallowRef(null),
      checkedHalfNode: shallowRef(null),
      checkedNode: shallowRef(null),

      selectedNodes: shallowReactive([]),
      selectedLinkNodes: shallowReactive([]),
      checkedLinkNodes: shallowReactive([]),
      checkedHalfNodes: shallowReactive([]),
      checkedNodes: shallowReactive([])
    }

    const Targeter: STreeTargeter = {
      selectedNode: shallowRef(null),
      selectedLinkNode: shallowRef(null),
      checkedLinkNode: shallowRef(null),
      checkedHalfNode: shallowRef(null),
      checkedNode: shallowRef(null),

      selectedNodes: shallowReactive([]),
      selectedLinkNodes: shallowReactive([]),
      checkedLinkNodes: shallowReactive([]),
      checkedHalfNodes: shallowReactive([]),
      checkedNodes: shallowReactive([])
    }

    const Methoder: STreeMethoder = {
      renderSwitcher(node) {
        const loadKeys = Stater.loadedKeys
        const loadedKeys = Stater.loadedKeys
        const expandedKeys = Stater.expandedKeys

        const isLeafedNode = node.isLeaf === true
        const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
        const isLoadedNode = loadedKeys.includes(node.key)
        const isLoadNode = loadKeys.includes(node.key)

        if (isAsyncNode && isLoadNode) {
          return 'LoadingOutlined'
        }

        if (props.showLine) {
          if (helper.isNotEmptyArray(node.children) || (isAsyncNode && !isLoadedNode)) {
            return !expandedKeys.includes(node.key) ? 'PlusSquareOutlined' : 'MinusSquareOutlined'
          }
          return 'FileOutlined'
        }

        if (helper.isNotEmptyArray(node.children) || (isAsyncNode && !isLoadedNode)) {
          return 'CaretDownOutlined'
        }

        return ''
      },

      triggerSwitcher(node) {
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes

        if (flatTreeNodes.some(every => every.key === node.key)) {
          const childNodes = childTreeNodes.value[node.key] || []
          const childKeys = childNodes.map(node => node.key)

          Methoder.doTreeOnlyExpand(
            expandedKeys.includes(node.key)
              ? expandedKeys.filter(key => key !== node.key && !childKeys.includes(key))
              : [...expandedKeys, node.key]
          )
        }
      },

      cleanTreeStater(force) {
        if (force === true) {
          // Stater
          Stater.loadKeys.splice(0, Stater.loadKeys.length)
          Stater.loadedKeys.splice(0, Stater.loadedKeys.length)
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length)
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length)
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length)
          Stater.outCheckedKeys.splice(0, Stater.outCheckedKeys.length)
          Stater.selfCheckedKeys.splice(0, Stater.selfCheckedKeys.length)
          Stater.halfCheckedKeys.splice(0, Stater.halfCheckedKeys.length)

          // Targeter
          Targeter.selectedNodes.splice(0, Targeter.selectedNodes.length)
          Targeter.selectedLinkNodes.splice(0, Targeter.selectedLinkNodes.length)
          Targeter.checkedLinkNodes.splice(0, Targeter.checkedLinkNodes.length)
          Targeter.checkedHalfNodes.splice(0, Targeter.checkedHalfNodes.length)
          Targeter.checkedNodes.splice(0, Targeter.checkedNodes.length)

          Targeter.selectedNode.value = null
          Targeter.selectedLinkNode.value = null
          Targeter.checkedLinkNode.value = null
          Targeter.checkedHalfNode.value = null
          Targeter.checkedNode.value = null

          // Sourcer
          Sourcer.selectedNodes.splice(0, Sourcer.selectedNodes.length)
          Sourcer.selectedLinkNodes.splice(0, Sourcer.selectedLinkNodes.length)
          Sourcer.checkedLinkNodes.splice(0, Sourcer.checkedLinkNodes.length)
          Sourcer.checkedHalfNodes.splice(0, Sourcer.checkedHalfNodes.length)
          Sourcer.checkedNodes.splice(0, Sourcer.checkedNodes.length)

          Sourcer.selectedNode.value = null
          Sourcer.selectedLinkNode.value = null
          Sourcer.checkedLinkNode.value = null
          Sourcer.checkedHalfNode.value = null
          Sourcer.checkedNode.value = null
        }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const checkedKeys = Stater.checkedKeys
        const selectedKeys = Stater.selectedKeys
        const expandedKeys = Stater.expandedKeys
        const outCheckedKeys = Stater.outCheckedKeys
        const selfCheckedKeys = Stater.selfCheckedKeys
        const halfCheckedKeys = Stater.halfCheckedKeys
        const allCheckedKeys = [...checkedKeys, ...outCheckedKeys]
        const flatTreeNodes = Stater.flatTreeNodes

        // 清理
        if (!props.forceCleanWhenNotInTreeNodes) {
          outCheckedKeys.splice(0, outCheckedKeys.length, ...allCheckedKeys.filter(key => !flatTreeNodes.some(every => every.key === key)))
        }
        loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => flatTreeNodes.some(every => every.key === key && every.isLeaf === false)))
        loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => flatTreeNodes.some(every => every.key === key && every.isLeaf === false)))
        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNotEmptyArray(every.children))))
        checkedKeys.splice(0, checkedKeys.length, ...allCheckedKeys.filter(key => flatTreeNodes.some(every => every.key === key && (every.disabled || every.disableCheckbox || every.checkable))))
        selectedKeys.splice(0, selectedKeys.length, ...selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key && (!every.disabled && every.isSelectable))))
        selfCheckedKeys.splice(0, selfCheckedKeys.length)
        halfCheckedKeys.splice(0, halfCheckedKeys.length)

        // 去重
        loadKeys.splice(0, loadKeys.length, ...Array.from(new Set(loadKeys)))
        loadedKeys.splice(0, loadedKeys.length, ...Array.from(new Set(loadedKeys)))
        expandedKeys.splice(0, expandedKeys.length, ...Array.from(new Set(expandedKeys)))
        outCheckedKeys.splice(0, outCheckedKeys.length, ...Array.from(new Set(outCheckedKeys)))
        selectedKeys.splice(0, selectedKeys.length, ...Array.from(new Set(selectedKeys)))
        checkedKeys.splice(0, checkedKeys.length, ...Array.from(new Set(checkedKeys)))

        // 排序
        loadKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        loadedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        expandedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        selectedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        checkedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
      },

      resetTreeStater(force) {
        const checkedKeys = Stater.checkedKeys
        const selectedKeys = Stater.selectedKeys
        const expandedKeys = Stater.expandedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const selfCheckedKeys = Stater.selfCheckedKeys
        const halfCheckedKeys = Stater.halfCheckedKeys

        const selectedNodes = Targeter.selectedNodes
        const selectedLinkNodes = Targeter.selectedLinkNodes
        const checkedLinkNodes = Targeter.checkedLinkNodes
        const checkedHalfNodes = Targeter.checkedHalfNodes
        const checkedNodes = Targeter.checkedNodes

        selectedNodes.splice(0, selectedNodes.length)
        selectedLinkNodes.splice(0, selectedLinkNodes.length)
        checkedLinkNodes.splice(0, checkedLinkNodes.length)
        checkedHalfNodes.splice(0, checkedHalfNodes.length)
        checkedNodes.splice(0, checkedNodes.length)

        selfCheckedKeys.splice(0, selfCheckedKeys.length)
        halfCheckedKeys.splice(0, halfCheckedKeys.length)
        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        selectedKeys.splice(0, selectedKeys.length, ...selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))

        selectedNodes.push(...selectedKeys.map(key => flatTreeNodes.find(every => every.key === key)!))
        checkedNodes.push(...checkedKeys.map(key => flatTreeNodes.find(every => every.key === key)!))

        // 是否展开
        if (helper.isEmptyArray(expandedKeys)) {
          if (!props.allowUnExpanded && linkTreeNodes.length === 1) {
            Methoder.expandTreeNodes(linkTreeNodes.map(every => every.key).slice(0, 1))
          }
        }

        // 是否必选
        if (helper.isEmptyArray(selectedNodes)) {
          if (props.selectable && !props.allowUnSelected && (!props.checkable || !props.allowSelectToCheck) && linkTreeNodes.length === 1) {
            selectedNodes.push(...flatTreeNodes.filter(every => every.level === 1 || every.level === 2).filter(item => item.isSelectable && !item.disabled).slice(0, 1))
          }

          if (props.selectable && !props.allowUnSelected && (!props.checkable || !props.allowSelectToCheck) && linkTreeNodes.length > 1) {
            selectedNodes.push(...flatTreeNodes.filter(every => every.level === 1).filter(item => item.isSelectable && !item.disabled).slice(0, 1))
          }
        }

        if (helper.isEmptyArray(checkedNodes)) {
          if (props.checkable && !props.allowUnChecked) {
            checkedNodes.push(...flatTreeNodes.filter(item => !item.disabled && !item.disableCheckbox && item.checkable).slice(0, 1))
          }
        }

        // 核心逻辑
        if (helper.isNotEmptyArray(selectedNodes)) {
          if (props.checkable && props.allowSelectToCheck) {
            selectedNodes.splice(0, selectedNodes.length)
          }

          if (!props.checkable || !props.allowSelectToCheck) {
            const upHandleNode = flatTreeNodes.find(every => !every.disabled && every.isSelectable && selectedNodes.some(node => node.key === every.key))
            const parentNodes = upHandleNode && (parentTreeNodes.value[upHandleNode.key] || []).filter(every => !every.disabled && every.isSelectable)

            if (upHandleNode && helper.isNotEmptyArray(parentNodes)) {
              selectedLinkNodes.push(...parentNodes, upHandleNode)
            }
          }
        }

        if (helper.isNotEmptyArray(checkedNodes)) {
          let upHandleNodes = [...checkedNodes]
          let downHandleNodes = [...checkedNodes]

          // 向下处理
          if (helper.isNotEmptyArray(downHandleNodes)) {
            while (downHandleNodes.length > 0) {
              const downNode = downHandleNodes.shift()!
              const childNodes = childTreeNodes.value[downNode.key] || []
              !downNode.disabled && !downNode.disableCheckbox && upHandleNodes.push(...childNodes.filter(child => !child.disabled && !child.disableCheckbox && child.checkable && !upHandleNodes.some(node => node.key === child.key)))
              downHandleNodes = downHandleNodes.filter(node => !childNodes.some(child => node.key === child.key))
            }
          }

          // 向上处理
          if (helper.isNotEmptyArray(upHandleNodes)) {
            let tempUpNodes: STreeTargetNodes = []
            let tempUpNode: STreeTargetNode | undefined

            checkedNodes.splice(0, checkedNodes.length, ...upHandleNodes)
            upHandleNodes.sort((a, b) => a.level - b.level)
            tempUpNode = upHandleNodes.pop()

            tempUpNodes = upHandleNodes.filter(node => node.level === tempUpNode!.level)
            upHandleNodes = upHandleNodes.filter(node => node.level !== tempUpNode!.level)

            while (tempUpNode) {
              if (tempUpNode.parentNode) {
                const parent = tempUpNode.parentNode
                const children = tempUpNode.parentNode.children || []
                const childNodes = (childTreeNodes.value[parent.key] || []).filter(child => !child.disabled && !child.disableCheckbox && child.checkable)
                const parentNodes = (parentTreeNodes.value[tempUpNode.key] || []).filter(node => !node.disabled && !node.disableCheckbox && node.checkable)
                const parentKeys = parentNodes.map(node => node.key) || []

                if (childNodes.every(child => checkedNodes.some(node => node.key === child.key))) {
                  if (!parent.disabled && !parent.disableCheckbox && parent.checkable && !checkedNodes.some(node => node.key === parent.key)) {
                    checkedNodes.push(parent)
                  }
                } else {
                  if (childNodes.some(child => checkedNodes.some(node => node.key === child.key))) {
                    checkedHalfNodes.push(...parentNodes.filter(node => !checkedHalfNodes.some(half => node.key === half.key)))
                  }
                  checkedNodes.splice(0, checkedNodes.length, ...checkedNodes.filter(node => node.disabled || node.disableCheckbox || (node.checkable && !parentKeys.includes(node.key))))
                }

                if (!upHandleNodes.some(node => node.key === parent.key)) {
                  upHandleNodes.push(parent)
                }

                tempUpNodes = tempUpNodes.filter(temp => !children.some(child => child.key === temp.key))
              }

              if (helper.isNotEmptyArray(tempUpNodes)) {
                tempUpNode = tempUpNodes.pop()
              } else if (helper.isNotEmptyArray(upHandleNodes)) {
                tempUpNode = upHandleNodes.pop()
                tempUpNodes = upHandleNodes.filter(node => node.level === tempUpNode!.level)
                upHandleNodes = upHandleNodes.filter(node => node.level !== tempUpNode!.level)
              } else {
                tempUpNode = undefined
              }
            }
          }
        }

        // 排序逻辑
        if (helper.isArray(expandedKeys)) {
          expandedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        }

        if (helper.isArray(selectedNodes)) {
          selectedNodes.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key))
        }

        if (helper.isArray(selectedLinkNodes)) {
          selectedLinkNodes.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key))
        }

        if (helper.isArray(checkedNodes)) {
          checkedNodes.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key))
        }

        if (helper.isArray(checkedHalfNodes)) {
          checkedHalfNodes.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key))
        }

        if (helper.isArray(checkedLinkNodes)) {
          checkedLinkNodes.push(...checkedNodes, ...checkedHalfNodes)
          checkedLinkNodes.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key))
        }

        // Stater
        Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...checkedNodes.map(node => node.key))
        Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...selectedNodes.map(node => node.key))
        Stater.selfCheckedKeys.splice(0, Stater.selfCheckedKeys.length, ...checkedNodes.map(node => node.key))
        Stater.halfCheckedKeys.splice(0, Stater.halfCheckedKeys.length, ...checkedHalfNodes.map(node => node.key))

        // Targeter
        Targeter.selectedNode.value = selectedNodes[0] || null
        Targeter.selectedLinkNode.value = selectedLinkNodes[0] || null
        Targeter.checkedLinkNode.value = checkedLinkNodes[0] || null
        Targeter.checkedHalfNode.value = checkedHalfNodes[0] || null
        Targeter.checkedNode.value = checkedNodes[0] || null

        // Sourcer
        Sourcer.selectedNodes.splice(0, Sourcer.selectedNodes.length, ...selectedNodes.map(node => node.referenceSourceNode))
        Sourcer.selectedLinkNodes.splice(0, Sourcer.selectedLinkNodes.length, ...selectedLinkNodes.map(node => node.referenceSourceNode))
        Sourcer.checkedLinkNodes.splice(0, Sourcer.checkedLinkNodes.length, ...checkedLinkNodes.map(node => node.referenceSourceNode))
        Sourcer.checkedHalfNodes.splice(0, Sourcer.checkedHalfNodes.length, ...checkedHalfNodes.map(node => node.referenceSourceNode))
        Sourcer.checkedNodes.splice(0, Sourcer.checkedNodes.length, ...checkedNodes.map(node => node.referenceSourceNode))

        Sourcer.selectedNode.value = selectedNodes[0] && selectedNodes[0].referenceSourceNode || null
        Sourcer.selectedLinkNode.value = selectedLinkNodes[0] && selectedLinkNodes[0].referenceSourceNode || null
        Sourcer.checkedLinkNode.value = checkedLinkNodes[0] && checkedLinkNodes[0].referenceSourceNode || null
        Sourcer.checkedHalfNode.value = checkedHalfNodes[0] && checkedHalfNodes[0].referenceSourceNode || null
        Sourcer.checkedNode.value = checkedNodes[0] && checkedNodes[0].referenceSourceNode || null
      },

      resetTreeNodes(nodes) {
        if (!helper.isArray(nodes)) {
          nodes = Stater.propTreeNodes
        }

        if (nodes !== Stater.propTreeNodes) {
          Stater.propTreeNodes = nodes
        }

        Methoder.reloadTreeNodes(nodes, null)
      },

      reloadTreeNodes(nodes, parent) {
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNode = helper.isNotEmptyObject(parent) ? flatTreeNodes.find(every => parent.key === every.key) : undefined
        const noReloadTreeNode = helper.isNotEmptyObject(parent) && !parentTreeNode

        if (noReloadTreeNode) {
          return []
        }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const referencedNodes = helper.isNotEmptyArray(nodes) ? nodes : undefined
        const resultTreeNodes = Methoder.compileTreeNodes(nodes, parentTreeNode)
        const flatResultNodes = Methoder.spreadTreeNodes(resultTreeNodes)

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          if (nodes !== Stater.propTreeNodes) {
            Stater.propTreeNodes = nodes
          }

          loadKeys.splice(0, loadKeys.length)
          loadedKeys.splice(0, loadedKeys.length)
          linkTreeNodes.splice(0, linkTreeNodes.length)
          flatTreeNodes.splice(0, flatTreeNodes.length)
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          if (loadKeys.includes(parentTreeNode.key)) {
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentTreeNode.key))
          }

          const isLeafedNode = parentTreeNode.isLeaf = false
          const isLoadedNode = loadedKeys.includes(parentTreeNode.key)
          const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
          const childrenKey = props.replaceFields.children || 'children'

          isAsyncNode && !isLoadedNode && loadedKeys.push(parentTreeNode.key)
          parentTreeNode.referenceSourceNode[childrenKey] = referencedNodes
          parentTreeNode.children = resultTreeNodes

          parentTreeNode.scopedSlots = {
            icon: parentTreeNode.level === 1 ? 'iconRoot' : helper.isNotEmptyArray(parentTreeNode.children) ? 'iconParent' : 'iconLeaf',
            title: parentTreeNode.level === 1 ? 'titleRoot' : helper.isNotEmptyArray(parentTreeNode.children) ? 'titleParent' : 'titleLeaf'
          }
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !childTreeNodes.value[parentTreeNode.key].some(child => child.key === every.key)))
          flatTreeNodes.splice(flatTreeNodes.findIndex(every => every.key === parentTreeNode.key) + 1, 0, ...flatResultNodes)
        }

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatResultNodes)

          const rootTreeNodes = flatTreeNodes.filter(node => node.level === 1)
          const rootEverySameNode = rootTreeNodes.every((root, index) => linkTreeNodes[index] === root)
          const linkEverySameNode = linkTreeNodes.every((link, index) => rootTreeNodes[index] === link)

          if (!rootEverySameNode || !linkEverySameNode) {
            linkTreeNodes.splice(0, linkTreeNodes.length, ...rootTreeNodes)
          }
        }

        childTreeNodes.value = {}
        parentTreeNodes.value = {}

        for (const every of flatTreeNodes) {
          let parent = every.parentNode

          if (!parentTreeNodes.value[every.key]) {
            parentTreeNodes.value[every.key] = []
          }

          if (!childTreeNodes.value[every.key]) {
            childTreeNodes.value[every.key] = []
          }

          while (parent) {
            parentTreeNodes.value[every.key].unshift(parent)
            childTreeNodes.value[parent.key].push(every)
            parent = parent.parentNode
          }
        }

        if (props.forceCleanWhenRemoveTreeNode !== false) {
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...Stater.checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...Stater.selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length, ...Stater.expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        }

        Methoder.cleanTreeStater()
        Methoder.resetTreeStater()

        return parentTreeNode ? parentTreeNode.children : resultTreeNodes
      },

      appendTreeNodes(nodes, parent) {
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNode = helper.isNotEmptyObject(parent) ? flatTreeNodes.find(every => parent.key === every.key) : undefined
        const noReloadTreeNode = helper.isNotEmptyObject(parent) && !parentTreeNode

        nodes = nodes.filter(node => !flatTreeNodes.some(every => every.key === node[props.replaceFields.key || 'key']))

        if (!helper.isNotEmptyArray(nodes)) {
          return []
        }

        if (noReloadTreeNode) {
          return []
        }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const resultTreeNodes = Methoder.compileTreeNodes(nodes, parentTreeNode)
        const flatResultNodes = Methoder.spreadTreeNodes(resultTreeNodes)

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          Stater.propTreeNodes = [...Stater.propTreeNodes, ...nodes]
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          if (loadKeys.includes(parentTreeNode.key)) {
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentTreeNode.key))
          }

          const isLeafedNode = parentTreeNode.isLeaf = false
          const isLoadedNode = loadedKeys.includes(parentTreeNode.key)
          const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
          const childrenKey = props.replaceFields.children || 'children'

          isAsyncNode && !isLoadedNode && loadedKeys.push(parentTreeNode.key)
          parentTreeNode.referenceSourceNode[childrenKey] = parentTreeNode.referenceSourceNode[childrenKey] || []
          parentTreeNode.referenceSourceNode[childrenKey].push(...nodes)
          parentTreeNode.children.push(...resultTreeNodes)

          parentTreeNode.scopedSlots = {
            icon: parentTreeNode.level === 1 ? 'iconRoot' : helper.isNotEmptyArray(parentTreeNode.children) ? 'iconParent' : 'iconLeaf',
            title: parentTreeNode.level === 1 ? 'titleRoot' : helper.isNotEmptyArray(parentTreeNode.children) ? 'titleParent' : 'titleLeaf'
          }
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          const presetTreeNodes = childTreeNodes.value[parentTreeNode.key] || []
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !presetTreeNodes.some(child => child.key === every.key)))
          flatTreeNodes.splice(flatTreeNodes.findIndex(every => every.key === parentTreeNode.key) + 1, 0, ...presetTreeNodes, ...flatResultNodes)
        }

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.push(...flatResultNodes)

          const rootTreeNodes = flatTreeNodes.filter(node => node.level === 1)
          const rootEverySameNode = rootTreeNodes.every((root, index) => linkTreeNodes[index] === root)
          const linkEverySameNode = linkTreeNodes.every((link, index) => rootTreeNodes[index] === link)

          if (!rootEverySameNode || !linkEverySameNode) {
            linkTreeNodes.splice(0, linkTreeNodes.length, ...rootTreeNodes)
          }
        }

        childTreeNodes.value = {}
        parentTreeNodes.value = {}

        for (const every of flatTreeNodes) {
          let parent = every.parentNode

          if (!parentTreeNodes.value[every.key]) {
            parentTreeNodes.value[every.key] = []
          }

          if (!childTreeNodes.value[every.key]) {
            childTreeNodes.value[every.key] = []
          }

          while (parent) {
            parentTreeNodes.value[every.key].unshift(parent)
            childTreeNodes.value[parent.key].push(every)
            parent = parent.parentNode
          }
        }

        if (props.forceCleanWhenRemoveTreeNode !== false) {
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...Stater.checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...Stater.selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length, ...Stater.expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        }

        Methoder.cleanTreeStater()
        Methoder.resetTreeStater()

        return parentTreeNode ? parentTreeNode.children : resultTreeNodes
      },

      removeTreeNodes(nodes, parent) {
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNode = helper.isNotEmptyObject(parent) ? flatTreeNodes.find(every => parent.key === every.key) : undefined
        const noReloadTreeNode = helper.isNotEmptyObject(parent) && !parentTreeNode

        nodes = nodes.filter(node => flatTreeNodes.some(every => every.key === node[props.replaceFields.key || 'key']))

        if (!helper.isNotEmptyArray(nodes)) {
          return []
        }

        if (noReloadTreeNode) {
          return []
        }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const filterRemoveNodes = nodes.map(node => flatTreeNodes.find(every => every.key === node[props.replaceFields.key || 'key'])!)
        const flatRemoveNodes = Methoder.spreadTreeNodes(filterRemoveNodes)
        const childrenKey = props.replaceFields.children || 'children'

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          Stater.propTreeNodes = Stater.propTreeNodes.filter(every => !filterRemoveNodes.some(node => node.key === every.key))
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          if (loadKeys.includes(parentTreeNode.key)) {
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentTreeNode.key))
          }

          if (loadedKeys.includes(parentTreeNode.key)) {
            loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => key !== parentTreeNode.key))
          }

          if (helper.isNotEmptyArray(parentTreeNode.referenceSourceNode[childrenKey])) {
            parentTreeNode.referenceSourceNode[childrenKey] = parentTreeNode.referenceSourceNode[childrenKey].filter((child: any) => !filterRemoveNodes.some(node => node.key === child.key))
          }

          if (!helper.isNotEmptyArray(parentTreeNode.referenceSourceNode[childrenKey])) {
            if (Object.hasOwn(parentTreeNode.referenceSourceNode, childrenKey)) {
              delete parentTreeNode.referenceSourceNode[childrenKey]
            }
          }

          parentTreeNode.children.splice(0, parentTreeNode.children.length, ...parentTreeNode.children.filter(every => !filterRemoveNodes.some(node => node.key === every.key)))
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !flatRemoveNodes.some(remove => remove.key === every.key)))

          const rootTreeNodes = flatTreeNodes.filter(node => node.level === 1)
          const rootEverySameNode = rootTreeNodes.every((root, index) => linkTreeNodes[index] === root)
          const linkEverySameNode = linkTreeNodes.every((link, index) => rootTreeNodes[index] === link)

          if (!rootEverySameNode || !linkEverySameNode) {
            linkTreeNodes.splice(0, linkTreeNodes.length, ...rootTreeNodes)
          }
        }

        childTreeNodes.value = {}
        parentTreeNodes.value = {}

        for (const every of flatTreeNodes) {
          let parent = every.parentNode

          if (!parentTreeNodes.value[every.key]) {
            parentTreeNodes.value[every.key] = []
          }

          if (!childTreeNodes.value[every.key]) {
            childTreeNodes.value[every.key] = []
          }

          while (parent) {
            parentTreeNodes.value[every.key].unshift(parent)
            childTreeNodes.value[parent.key].push(every)
            parent = parent.parentNode
          }
        }

        if (props.forceCleanWhenRemoveTreeNode !== false) {
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...Stater.checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...Stater.selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length, ...Stater.expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        }

        Methoder.cleanTreeStater()
        Methoder.resetTreeStater()

        return parentTreeNode ? parentTreeNode.children : []
      },

      compileTreeNodes(nodes, parent) {
        const level = helper.isNotEmptyObject(parent) && parent.level + 1 || 1
        const parentNode = helper.isNotEmptyObject(parent) ? parent : null
        const currentNodes: STreeTargetNodes = []

        if (!helper.isNotEmptyArray(nodes)) {
          return currentNodes
        }

        for (const node of nodes) {
          const key: Key = node[props.replaceFields.key || 'key']
          const icon: string = node[props.replaceFields.icon || 'icon']
          const title: string = node[props.replaceFields.title || 'title']
          const children: STreeSourceNodes = node[props.replaceFields.children || 'children']
          const alwaysShowTitleButton: boolean = node[props.replaceFields.alwaysShowTitleButton || 'alwaysShowTitleButton'] === true
          const forceApplyDisableCheckbox: boolean = node[props.replaceFields.forceApplyDisableCheckbox || 'forceApplyDisableCheckbox'] === true
          const forceApplyDisabled: boolean = node[props.replaceFields.forceApplyDisabled || 'forceApplyDisabled'] === true
          const disableCheckbox: boolean = node[props.replaceFields.disableCheckbox || 'disableCheckbox'] === true
          const disabled: boolean = node[props.replaceFields.disabled || 'disabled'] === true
          const isLeaf: boolean = !helper.isNotEmptyArray(children) || node.isLeaf === true

          const newNode: STreeTargetNode = {
            scopedSlots: {
              icon: level === 1 ? 'iconRoot' : !isLeaf ? 'iconParent' : 'iconLeaf',
              title: level === 1 ? 'titleRoot' : !isLeaf ? 'titleParent' : 'titleLeaf'
            },
            key: key,
            icon: icon,
            title: title,
            level: level,
            isLeaf: isLeaf,
            parentNode: parentNode,
            alwaysShowTitleButton: alwaysShowTitleButton,
            forceApplyDisabled: forceApplyDisabled || props.forceApplyDisabled === true || parent?.forceApplyDisabled === true,
            forceApplyDisableCheckbox: forceApplyDisabled || forceApplyDisableCheckbox || props.forceApplyDisabled === true || parent?.forceApplyDisableCheckbox === true,
            checkable: helper.isBoolean(node.checkable) ? node.checkable : helper.isFunction(props.allowCheckedLevel) ? props.allowCheckedLevel(level, node) !== false : level >= props.allowCheckedLevel,
            isSelectable: helper.isBoolean(node.selectable) ? node.selectable : helper.isFunction(props.allowSelectedLevel) ? props.allowSelectedLevel(level, node) !== false : level >= props.allowSelectedLevel,
            disableCheckbox: disabled || disableCheckbox || forceApplyDisabled || forceApplyDisableCheckbox || (props.forceApplyDisabled || props.forceApplyDisableCheckbox || parent?.forceApplyDisabled || parent?.forceApplyDisableCheckbox ? parentNode?.disableCheckbox === true : false),
            disabled: disabled || forceApplyDisabled || (props.forceApplyDisabled || parent?.forceApplyDisabled ? parentNode?.disabled === true : false),
            referenceSourceNode: node,
            selectable: true, // use isSelectable, because call doEventSelect when selectable is false
            children: []
          }

          if (helper.isNotEmptyArray(children)) {
            newNode.children = Methoder.compileTreeNodes(children, newNode)
          }

          currentNodes.push(newNode)
        }

        return currentNodes
      },

      lookupTreeNodes(nodes) {
        const keys = helper.isArray(nodes) ? nodes : [nodes]
        const trees: any = []

        for (const key of keys) {
          const node = Stater.flatTreeNodes[key]
          const source = node ? node.referenceSourceNode : null
          trees.push(source)
        }

        return helper.isArray(nodes) ? trees : trees[0]
      },

      spreadTreeNodes(nodes) {
        const spreadNodes: any = []

        if (!helper.isNotEmptyArray(nodes)) {
          return spreadNodes
        }

        for (const node of nodes) {
          const childrenKey = !Object.hasOwn(node, 'referenceSourceNode')
            ? props.replaceFields.children || 'children'
            : 'children'

          helper.isNotEmptyArray(node[childrenKey])
            ? spreadNodes.push(node, ...Methoder.spreadTreeNodes(node[childrenKey]))
            : spreadNodes.push(node)
        }

        return spreadNodes
      },

      expandTreeNodes(keys) {
        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes

        if (helper.isNotEmptyArray(keys)) {
          for (const key of keys) {
            const expandedNode = flatTreeNodes.find(every => key === every.key)
            const isLeafedNode = !expandedNode || expandedNode.isLeaf === true
            const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
            const isLoadedNode = loadedKeys.includes(key)

            if (expandedNode && (helper.isNotEmptyArray(expandedNode.children) || (isAsyncNode && !isLoadedNode))) {
              if (!expandedKeys.includes(expandedNode.key)) {
                expandedKeys.push(expandedNode.key)
              }
            }
          }
        }

        if (helper.isNotEmptyArray(expandedKeys)) {
          expandedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(node => node.key === a) -
            flatTreeNodes.findIndex(node => node.key === b)
          ))

          if (helper.isFunction(props.loadData)) {
            const keys = expandedKeys.filter(
              key => (
                !loadKeys.includes(key) &&
                !loadedKeys.includes(key) &&
                !helper.isNotEmptyArray(flatTreeNodes.find(node => node.key === key)?.children) &&
                flatTreeNodes.find(node => node.key === key)?.isLeaf === false
              )
            )
            helper.isNotEmptyArray(keys) && Methoder.doTreeLoad(keys)
          }
        }

        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNotEmptyArray(every.children))))
      },

      collapseTreeNodes(keys) {
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes

        if (helper.isNotEmptyArray(keys)) {
          for (const key of keys) {
            const collapsedNode = flatTreeNodes.find(every => key === every.key)

            if (expandedKeys.includes(key)) {
              if (helper.isNotEmptyArray(expandedKeys) && helper.isNotEmptyObject(collapsedNode) && helper.isNotEmptyArray(collapsedNode.children)) {
                expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(expanded => !childTreeNodes.value[collapsedNode.key].some(child => child.key === expanded)))
              }
              expandedKeys.splice(expandedKeys.findIndex(expanded => key === expanded), 1)
            }
          }
        }

        if (helper.isNotEmptyArray(expandedKeys)) {
          expandedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        }

        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNotEmptyArray(every.children))))
      },

      doTreeAllExpanded() {
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const addExpandedKeys = flatTreeNodes.filter(node => !expandedKeys.includes(node.key) && helper.isNotEmptyArray(node.children)).map(node => node.key)

        if (addExpandedKeys.length > 0) {
          expandedKeys.push(...addExpandedKeys)

          context.emit('expand', {
            expandedKeys: Stater.expandedKeys,
            delExpandedKeys: [],
            addExpandedKeys: addExpandedKeys
          })
        }
      },

      doTreeAllCollapsed() {
        if (Stater.expandedKeys.length > 0) {
          const expandedKeys = Stater.expandedKeys
          const linkTreeNodes = Stater.linkTreeNodes
          const delExpandedKeys = Stater.expandedKeys.filter(key => props.allowUnExpanded || linkTreeNodes.length !== 1 || !linkTreeNodes.some(node => node.key === key))

          expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => !delExpandedKeys.includes(key)))

          if (delExpandedKeys.length > 0) {
            context.emit('expand', {
              expandedKeys: expandedKeys,
              delExpandedKeys: delExpandedKeys,
              addExpandedKeys: []
            })
          }
        }
      },

      doTreeToggleExpand(keys) {
        if (helper.isNotEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const expandedKeys = [...Stater.expandedKeys]
        const childTreeNodes = Stater.childTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes

        const delExpandedNodes = flatTreeNodes.filter(every => computeKeys.some(key => every.key === key) && expandedKeys.some(key => every.key === key))
        const addExpandedNodes = flatTreeNodes.filter(every => computeKeys.some(key => every.key === key) && !expandedKeys.some(key => every.key === key))
        const delExpandedKeys = delExpandedNodes.map(node => node.key)
        const addExpandedKeys = addExpandedNodes.map(node => node.key)

        if (helper.isNotEmptyArray(delExpandedNodes)) {
          for (const delKey of delExpandedKeys) {
            expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => key !== delKey && (childTreeNodes.value[delKey] && !childTreeNodes.value[delKey].some(child => child.key === key))))
          }
        }

        if (helper.isNotEmptyArray(addExpandedNodes)) {
          expandedKeys.push(...addExpandedKeys)
        }

        Methoder.doTreeOnlyExpand(expandedKeys)
      },

      doTreeOnlyExpand(keys) {
        if (helper.isNotEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const loadedKeys = Stater.loadedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes

        const keepExpandedNodes = flatTreeNodes.filter(every => Stater.expandedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const addExpandedNodes = flatTreeNodes.filter(every => !Stater.expandedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const delExpandedNodes = flatTreeNodes.filter(every => Stater.expandedKeys.some(key => every.key === key) && !computeKeys.some(key => every.key === key))
        const keepExpandedKeys = keepExpandedNodes.map(node => node.key)
        const addExpandedKeys = addExpandedNodes.map(node => node.key)
        const delExpandedKeys = delExpandedNodes.map(node => node.key)
        const allExpandedKeys = [...keepExpandedKeys, ...addExpandedKeys]

        for (const delKey of delExpandedKeys) {
          const childNodes = childTreeNodes.value[delKey] || []
          const childKeys = childNodes.map(node => node.key)
          allExpandedKeys.splice(0, allExpandedKeys.length, ...allExpandedKeys.filter(key => !childKeys.includes(key) || !!parentTreeNodes.value[key]?.map(node => node.key === key)))
        }

        for (const addKey of allExpandedKeys) {
          const parentNodes = parentTreeNodes.value[addKey] || []
          const parentKeys = parentNodes.map(node => node.key)
          allExpandedKeys.push(...parentKeys.filter(key => !allExpandedKeys.includes(key)))
        }

        Stater.expandedKeys.splice(0, Stater.expandedKeys.length)

        allExpandedKeys.sort((a, b) => (
          flatTreeNodes.findIndex(node => node.key === a) -
          flatTreeNodes.findIndex(node => node.key === b)
        ))

        if (helper.isNotEmptyArray(allExpandedKeys)) {
          if (!props.allowMultiExpanded) {
            const expandKeys: STreeKeys = []
            const firstKey = allExpandedKeys[0]
            const firstNode = flatTreeNodes.find(node => node.key === firstKey)
            const isLeafedNode = !firstNode || firstNode.isLeaf === true
            const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
            const isLoadedNode = loadedKeys.includes(firstKey)
            const parents = parentTreeNodes.value[firstKey]
            const childs = childTreeNodes.value[firstKey]

            if (helper.isNotEmptyArray(parents)) {
              expandKeys.push(...parents.map(node => node.key))
            }

            if (helper.isNotEmptyArray(childs) || (isAsyncNode && !isLoadedNode)) {
              expandKeys.push(firstKey)
              expandKeys.push(
                ...childs
                  .filter(child => allExpandedKeys.includes(child.key))
                  .filter(child => helper.isNotEmptyArray(child.children))
                  .filter(child => !expandKeys.includes(child.key))
                  .map(child => child.key)
              )
            }

            expandKeys.sort((a, b) => (
              flatTreeNodes.findIndex(node => node.key === a) -
              flatTreeNodes.findIndex(node => node.key === b)
            ))

            Methoder.expandTreeNodes(expandKeys)
          }

          if (props.allowMultiExpanded) {
            const expandKeys: STreeKeys = []

            for (const key of allExpandedKeys) {
              const firstNode = flatTreeNodes.find(node => node.key === key)
              const isLeafedNode = !firstNode || firstNode.isLeaf === true
              const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
              const isLoadedNode = loadedKeys.includes(key)
              const parents = parentTreeNodes.value[key]
              const childs = childTreeNodes.value[key]

              if (helper.isNotEmptyArray(parents)) {
                expandKeys.push(...parents.filter(node => !expandKeys.includes(node.key)).map(node => node.key))
              }

              if (helper.isNotEmptyArray(childs) || (isAsyncNode && !isLoadedNode)) {
                if (!expandKeys.includes(key)) {
                  expandKeys.push(key)
                }

                expandKeys.push(
                  ...childs
                    .filter(child => allExpandedKeys.includes(child.key))
                    .filter(child => helper.isNotEmptyArray(child.children))
                    .filter(child => !expandKeys.includes(child.key))
                    .map(child => child.key)
                )
              }
            }

            expandKeys.sort((a, b) => (
              flatTreeNodes.findIndex(node => node.key === a) -
              flatTreeNodes.findIndex(node => node.key === b)
            ))

            Methoder.expandTreeNodes(expandKeys)
          }
        }

        if (helper.isNotEmptyArray(Stater.expandedKeys)) {
          Stater.expandedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(node => node.key === a) -
            flatTreeNodes.findIndex(node => node.key === b)
          ))
        }

        if (helper.isEmptyArray(Stater.expandedKeys)) {
          if (!props.allowUnExpanded && linkTreeNodes.length === 1) {
            Stater.expandedKeys.push(linkTreeNodes[0].key!)
          }
        }

        const defExpandedKeys = Stater.expandedKeys.filter(() => true)
        const propExpandedKeys = props.expandedKeys.filter(() => true)

        propExpandedKeys.sort((a, b) => (
          flatTreeNodes.findIndex(node => node.key === a) -
          flatTreeNodes.findIndex(node => node.key === b)
        ))

        const nowExpandedKeys = [...Stater.expandedKeys]
        const nowDelExpandedKeys = propExpandedKeys.filter(key => !defExpandedKeys.includes(key))
        const nowAddExpandedKeys = defExpandedKeys.filter(key => !propExpandedKeys.includes(key))

        if (nowDelExpandedKeys.length > 0 || nowAddExpandedKeys.length > 0) {
          context.emit('expand', {
            expandedKeys: nowExpandedKeys,
            delExpandedKeys: nowDelExpandedKeys,
            addExpandedKeys: nowAddExpandedKeys
          })
        }
      },

      doTreePushExpand(keys) {
        if (helper.isNotEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const loadedKeys = Stater.loadedKeys
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes

        const addExpandedNodes = flatTreeNodes.filter(every => !expandedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const addExpandedKeys = addExpandedNodes.map(node => node.key)

        if (helper.isNotEmptyArray(addExpandedNodes)) {
          if (!props.allowMultiExpanded) {
            if (helper.isNotEmptyArray(expandedKeys)) {
              Methoder.collapseTreeNodes([...expandedKeys])
            }

            addExpandedKeys.sort((a, b) => (
              flatTreeNodes.findIndex(node => node.key === a) -
              flatTreeNodes.findIndex(node => node.key === b)
            ))

            const expandKeys: STreeKeys = []
            const firstKey = addExpandedKeys[0]
            const firstNode = flatTreeNodes.find(node => node.key === firstKey)
            const isLeafedNode = !firstNode || firstNode.isLeaf === true
            const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
            const isLoadedNode = loadedKeys.includes(firstKey)
            const parents = parentTreeNodes.value[firstKey]
            const childs = childTreeNodes.value[firstKey]

            if (helper.isNotEmptyArray(parents)) {
              expandKeys.push(...parents.map(node => node.key))
            }

            if (helper.isNotEmptyArray(childs) || (isAsyncNode && !isLoadedNode)) {
              expandKeys.push(firstKey)
              expandKeys.push(
                ...childs
                  .filter(child => addExpandedKeys.includes(child.key))
                  .filter(child => helper.isNotEmptyArray(child.children))
                  .filter(child => !expandKeys.includes(child.key))
                  .map(child => child.key)
              )
            }

            expandKeys.sort((a, b) => (
              flatTreeNodes.findIndex(node => node.key === a) -
              flatTreeNodes.findIndex(node => node.key === b)
            ))

            Methoder.expandTreeNodes(expandKeys)
          }

          if (props.allowMultiExpanded) {
            const expandKeys: STreeKeys = []

            for (const key of addExpandedKeys) {
              const firstNode = flatTreeNodes.find(node => node.key === key)
              const isLeafedNode = !firstNode || firstNode.isLeaf === true
              const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
              const isLoadedNode = loadedKeys.includes(key)
              const parents = parentTreeNodes.value[key]
              const childs = childTreeNodes.value[key]

              if (helper.isNotEmptyArray(parents)) {
                expandKeys.push(...parents.filter(node => !expandKeys.includes(node.key)).map(node => node.key))
              }

              if (helper.isNotEmptyArray(childs) || (isAsyncNode && !isLoadedNode)) {
                if (!expandKeys.includes(key)) {
                  expandKeys.push(key)
                }

                expandKeys.push(
                  ...childs
                    .filter(child => addExpandedKeys.includes(child.key))
                    .filter(child => helper.isNotEmptyArray(child.children))
                    .filter(child => !expandKeys.includes(child.key))
                    .map(child => child.key)
                )
              }
            }

            expandKeys.sort((a, b) => (
              flatTreeNodes.findIndex(node => node.key === a) -
              flatTreeNodes.findIndex(node => node.key === b)
            ))

            Methoder.expandTreeNodes(expandKeys)
          }
        }

        const defExpandedKeys = Stater.expandedKeys.filter(() => true)
        const propExpandedKeys = props.expandedKeys.filter(() => true)

        propExpandedKeys.sort((a, b) => (
          flatTreeNodes.findIndex(node => node.key === a) -
          flatTreeNodes.findIndex(node => node.key === b)
        ))

        const nowExpandedKeys = [...Stater.expandedKeys]
        const nowAddExpandedKeys = defExpandedKeys.filter(key => !propExpandedKeys.includes(key))

        if (nowAddExpandedKeys.length > 0) {
          context.emit('expand', {
            expandedKeys: nowExpandedKeys,
            addExpandedKeys: nowAddExpandedKeys,
            delExpandedKeys: []
          })
        }
      },

      doTreePopExpand(keys) {
        if (helper.isNotEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes

        const delExpandedNodes = flatTreeNodes.filter(every => expandedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const delExpandedKeys = delExpandedNodes.map(node => node.key)

        if (helper.isNotEmptyArray(delExpandedNodes)) {
          Methoder.collapseTreeNodes(delExpandedKeys)
        }

        const defExpandedKeys = Stater.expandedKeys.filter(() => true)
        const propExpandedKeys = props.expandedKeys.filter(() => true)

        propExpandedKeys.sort((a, b) => (
          flatTreeNodes.findIndex(node => node.key === a) -
          flatTreeNodes.findIndex(node => node.key === b)
        ))

        const nowExpandedKeys = [...Stater.expandedKeys]
        const nowDelExpandedKeys = propExpandedKeys.filter(key => !defExpandedKeys.includes(key))

        if (nowDelExpandedKeys.length > 0) {
          context.emit('expand', {
            expandedKeys: nowExpandedKeys,
            delExpandedKeys: nowDelExpandedKeys,
            addExpandedKeys: []
          })
        }
      },

      doTreeToggleChecked(keys) {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const checkedKeys = [...Stater.checkedKeys]
        const childTreeNodes = Stater.childTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes

        const delCheckedNodes = flatTreeNodes.filter(every => computeKeys.some(key => every.key === key) && checkedKeys.some(key => every.key === key))
        const addCheckedNodes = flatTreeNodes.filter(every => computeKeys.some(key => every.key === key) && !checkedKeys.some(key => every.key === key))
        const delCheckedKeys = delCheckedNodes.map(node => node.key)
        const addCheckedKeys = addCheckedNodes.map(node => node.key)

        for (const delKey of delCheckedKeys) {
          checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => key !== delKey && (childTreeNodes.value[delKey] && !childTreeNodes.value[delKey].some(child => child.key === key))))
        }

        for (const addKey of addCheckedKeys) {
          checkedKeys.push(addKey, ...(childTreeNodes.value[addKey] || []).map(child => child.key).filter(key => !checkedKeys.includes(key)))
        }

        Methoder.doTreeOnlyChecked(checkedKeys)
      },

      doTreeOnlyChecked(keys) {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        if (helper.isNotEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const checkedKeys = Stater.checkedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes

        const keepCheckedNodes = flatTreeNodes.filter(every => checkedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const delCheckedNodes = flatTreeNodes.filter(every => checkedKeys.some(key => every.key === key) && !computeKeys.some(key => every.key === key))
        const addCheckedNodes = flatTreeNodes.filter(every => !checkedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const keepCheckedKeys = keepCheckedNodes.map(node => node.key)
        const delCheckedKeys = delCheckedNodes.map(node => node.key)
        const addCheckedKeys = addCheckedNodes.map(node => node.key)

        // push child delKey
        if (helper.isNotEmptyArray(delCheckedKeys)) {
          const delKeys = [...delCheckedKeys]

          while (delKeys.length > 0) {
            const delKey = delKeys.pop()!
            const childNodes = childTreeNodes.value[delKey] ?? []
            const childKeys = childNodes.map(node => node.key)

            delCheckedKeys.push(...childNodes.map(node => node.key).filter(key => checkedKeys.includes(key)))
            delKeys.splice(0, delKeys.length, ...delKeys.filter(key => !childKeys.includes(key)))
          }

          delCheckedKeys.splice(0, delCheckedKeys.length, ...Array.from(new Set(delCheckedKeys)))
        }

        if (helper.isNotEmptyArray(delCheckedKeys)) {
          for (const delKey of [...delCheckedKeys]) {
            const delNode = flatTreeNodes.find(node => node.key === delKey)!

            if (delNode.disabled || delNode.disableCheckbox) {
              delCheckedKeys.splice(0, delCheckedKeys.length, ...delCheckedKeys.filter(key => key !== delKey))
            }
          }

          checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => !delCheckedKeys.includes(key)))
        }

        // push parent delKey
        if (helper.isNotEmptyArray(delCheckedKeys)) {
          const delKeys = [...delCheckedKeys]

          while (delKeys.length > 0) {
            const delKey = delKeys.pop()!
            const parentNodes = parentTreeNodes.value[delKey] ?? []
            const parentKeys = parentNodes.map(node => node.key)

            delCheckedKeys.push(...parentNodes.map(node => node.key).filter(key => checkedKeys.includes(key)))
            delKeys.splice(0, delKeys.length, ...delKeys.filter(key => !parentKeys.includes(key)))
          }

          delCheckedKeys.splice(0, delCheckedKeys.length, ...Array.from(new Set(delCheckedKeys)))
        }

        if (helper.isNotEmptyArray(delCheckedKeys)) {
          for (const delKey of [...delCheckedKeys]) {
            const delNode = flatTreeNodes.find(node => node.key === delKey)!

            if (delNode.disabled || delNode.disableCheckbox) {
              delCheckedKeys.splice(0, delCheckedKeys.length, ...delCheckedKeys.filter(key => key !== delKey))
            }
          }

          checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => !delCheckedKeys.includes(key)))
        }

        // keep current keep
        if (helper.isNotEmptyArray(keepCheckedKeys)) {
          checkedKeys.push(...checkedKeys.filter(key => !checkedKeys.includes(key)))
        }

        // push child addKey
        if (helper.isNotEmptyArray(addCheckedKeys)) {
          const addKeys = [...addCheckedKeys]

          while (addKeys.length > 0) {
            const addKey = addKeys.pop()!
            const childNodes = childTreeNodes.value[addKey] ?? []
            const childKeys = childNodes.map(node => node.key)

            addCheckedKeys.push(...childNodes.map(node => node.key).filter(key => !checkedKeys.includes(key)))
            addKeys.splice(0, addKeys.length, ...addKeys.filter(key => !childKeys.includes(key)))
          }

          addCheckedKeys.splice(0, addCheckedKeys.length, ...Array.from(new Set(addCheckedKeys)))
        }

        if (helper.isNotEmptyArray(addCheckedKeys)) {
          for (const addKey of [...addCheckedKeys]) {
            const addNode = flatTreeNodes.find(node => node.key === addKey)!

            if (addNode.disabled || addNode.disableCheckbox || !addNode.checkable) {
              addCheckedKeys.splice(0, addCheckedKeys.length, ...addCheckedKeys.filter(key => key !== addKey))
            }
          }

          checkedKeys.push(...addCheckedKeys)
        }

        Methoder.cleanTreeStater()
        Methoder.resetTreeStater()

        const defCheckedKeys = Targeter.checkedNodes.map(node => node.key)
        const linkCheckedKeys = Targeter.checkedLinkNodes.map(node => node.key)
        const propCheckedKeys = props.checkedKeys.filter(() => true)

        propCheckedKeys.sort((a, b) => (
          flatTreeNodes.findIndex(node => node.key === a) -
          flatTreeNodes.findIndex(node => node.key === b)
        ))

        const nowCheckedKeys = props.checkedMode === 'link' ? Targeter.checkedLinkNodes.map(node => node.key) : Targeter.checkedNodes.map(node => node.key)
        const nowDelCheckedKeys = props.selectedMode === 'link' ? propCheckedKeys.filter(key => !linkCheckedKeys.includes(key)) : propCheckedKeys.filter(key => !defCheckedKeys.includes(key))
        const nowAddCheckedKeys = props.selectedMode === 'link' ? linkCheckedKeys.filter(key => !propCheckedKeys.includes(key)) : defCheckedKeys.filter(key => !propCheckedKeys.includes(key))

        if (nowDelCheckedKeys.length > 0 || nowAddCheckedKeys.length > 0) {
          context.emit('check', {
            checkedKeys: nowCheckedKeys,
            delCheckedKeys: nowDelCheckedKeys,
            addCheckedKeys: nowAddCheckedKeys
          })
        }
      },

      doTreePushChecked(keys) {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        if (helper.isNotEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const checkedKeys = Stater.checkedKeys
        const flatTreeNodes = Stater.flatTreeNodes

        const addCheckedNodes = flatTreeNodes.filter(every => !checkedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const addCheckedKeys = addCheckedNodes.map(node => node.key)

        Methoder.doTreeOnlyChecked([...checkedKeys, ...addCheckedKeys])
      },

      doTreePopChecked(keys) {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        if (helper.isNotEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const checkedKeys = Stater.checkedKeys
        const flatTreeNodes = Stater.flatTreeNodes

        const delCheckedNodes = flatTreeNodes.filter(every => checkedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const delCheckedKeys = delCheckedNodes.map(node => node.key)

        Methoder.doTreeOnlyChecked(checkedKeys.filter(key => !delCheckedKeys.includes(key)))
      },

      doTreeSelect(keys) {
        if (props.disabled === true) {
          return
        }

        if (helper.isNotEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const computeKeys = keys
        const checkedKeys = Stater.checkedKeys
        const selectedKeys = Stater.selectedKeys
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const delSelectedNodes = flatTreeNodes.filter(every => selectedKeys.some(key => every.key === key) && !computeKeys.some(key => every.key === key))
        const addSelectedNodes = flatTreeNodes.filter(every => !selectedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const delSelectedKeys = delSelectedNodes.map(node => node.key)
        const addSelectedKeys = addSelectedNodes.map(node => node.key)
        const oldSelectedNode = delSelectedNodes[0]
        const newSelectedNode = addSelectedNodes[0]
        const oldSelectedKey = delSelectedKeys[0]
        const newSelectedKey = addSelectedKeys[0]

        if (props.checkable && props.allowSelectToCheck) {
          if (newSelectedKey && newSelectedNode && (newSelectedNode.disabled || newSelectedNode.disableCheckbox || !newSelectedNode.checkable)) {
            const childNodes = childTreeNodes.value[newSelectedKey] || []
            const childKeys = childNodes.map(node => node.key)

            expandedKeys.includes(newSelectedKey)
              ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpand(expandedKeys.filter(key => key !== newSelectedKey && !childKeys.includes(key)))
              : props.allowAutoExpanded && Methoder.doTreeOnlyExpand([...expandedKeys, newSelectedKey])
          }

          if (newSelectedKey && newSelectedNode && !newSelectedNode.disabled && !newSelectedNode.disableCheckbox && newSelectedNode.checkable) {
            checkedKeys.includes(newSelectedKey)
              ? Methoder.doTreeOnlyChecked(checkedKeys.filter(key => {
                const children = childTreeNodes.value[newSelectedKey].filter(child => !child.disabled && !child.disableCheckbox).map(child => child.key)
                const parents = parentTreeNodes.value[newSelectedKey].filter(parent => !parent.disabled && !parent.disableCheckbox).map(parent => parent.key)
                return key !== newSelectedKey && !parents.includes(key) && !children.includes(key)
              }))
              : Methoder.doTreeOnlyChecked([
                newSelectedKey,
                ...checkedKeys,
                ...childTreeNodes.value[newSelectedKey].filter(child => !child.disabled && !child.disableCheckbox && child.checkable).map(child => child.key)
              ])
          }

          return
        }

        if (!props.selectable && !newSelectedKey) {
          if (oldSelectedKey) {
            const childNodes = childTreeNodes.value[oldSelectedKey] || []
            const childKeys = childNodes.map(node => node.key)

            expandedKeys.includes(oldSelectedKey)
              ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpand(expandedKeys.filter(key => key !== oldSelectedKey && !childKeys.includes(key)))
              : props.allowAutoExpanded && Methoder.doTreeOnlyExpand([...expandedKeys, oldSelectedKey])
          }

          return
        }

        if (!props.selectable && newSelectedKey) {
          const childNodes = childTreeNodes.value[newSelectedKey] || []
          const childKeys = childNodes.map(node => node.key)

          expandedKeys.includes(newSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpand(expandedKeys.filter(key => key !== newSelectedKey && !childKeys.includes(key)))
            : props.allowAutoExpanded && Methoder.doTreeOnlyExpand([...expandedKeys, newSelectedKey])

          return
        }

        if (newSelectedKey && (newSelectedNode.isSelectable === false || newSelectedNode.disabled === true)) {
          const childNodes = childTreeNodes.value[newSelectedKey] || []
          const childKeys = childNodes.map(node => node.key)

          expandedKeys.includes(newSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpand(expandedKeys.filter(key => key !== newSelectedKey && !childKeys.includes(key)))
            : props.allowAutoExpanded && Methoder.doTreeOnlyExpand([...expandedKeys, newSelectedKey])

          return
        }

        if (!newSelectedKey && oldSelectedKey && (oldSelectedNode.isSelectable === false || oldSelectedNode.disabled === true)) {
          const childNodes = childTreeNodes.value[oldSelectedKey] || []
          const childKeys = childNodes.map(node => node.key)

          expandedKeys.includes(oldSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpand(expandedKeys.filter(key => key !== oldSelectedKey && !childKeys.includes(key)))
            : props.allowAutoExpanded && Methoder.doTreeOnlyExpand([...expandedKeys, oldSelectedKey])

          return
        }

        if (newSelectedKey) {
          !props.allowUnSelected || oldSelectedKey !== newSelectedKey
            ? selectedKeys.splice(0, selectedKeys.length, newSelectedKey)
            : selectedKeys.splice(0, selectedKeys.length)
        }

        if (!newSelectedKey) {
          !props.allowUnSelected && oldSelectedKey
            ? selectedKeys.splice(0, selectedKeys.length, oldSelectedKey)
            : selectedKeys.splice(0, selectedKeys.length)
        }

        const nowFirstSelectedKey = selectedKeys[0]
        const nowSameSelectedKey = oldSelectedKey === nowFirstSelectedKey

        if (nowFirstSelectedKey) {
          const childNodes = childTreeNodes.value[nowFirstSelectedKey] || []
          const childKeys = childNodes.map(node => node.key)

          expandedKeys.includes(nowFirstSelectedKey)
            ? props.allowAutoCollapsed && nowSameSelectedKey && Methoder.doTreeOnlyExpand(expandedKeys.filter(key => key !== nowFirstSelectedKey && !childKeys.includes(key)))
            : props.allowAutoExpanded && Methoder.doTreeOnlyExpand([...expandedKeys, nowFirstSelectedKey])
        }

        if (!nowFirstSelectedKey) {
          if (oldSelectedKey && expandedKeys.includes(oldSelectedKey)) {
            const childNodes = childTreeNodes.value[oldSelectedKey] || []
            const childKeys = childNodes.map(node => node.key)

            props.allowAutoCollapsed && Methoder.doTreeOnlyExpand(expandedKeys.filter(key => key !== oldSelectedKey && !childKeys.includes(key)))
          }
        }

        Methoder.cleanTreeStater()
        Methoder.resetTreeStater()

        const defSelectedKeys = Targeter.selectedNodes.map(node => node.key)
        const linkSelectedKeys = Targeter.selectedLinkNodes.map(node => node.key)
        const propSelectedKeys = props.selectedKeys.filter(() => true)

        propSelectedKeys.sort((a, b) => (
          flatTreeNodes.findIndex(node => node.key === a) -
          flatTreeNodes.findIndex(node => node.key === b)
        ))

        const nowSelectedKeys = props.selectedMode === 'link' ? Targeter.selectedLinkNodes.map(node => node.key) : Targeter.selectedNodes.map(node => node.key)
        const nowDelSelectedKeys = props.selectedMode === 'link' ? propSelectedKeys.filter(key => !linkSelectedKeys.includes(key)) : propSelectedKeys.filter(key => !defSelectedKeys.includes(key))
        const nowAddSelectedKeys = props.selectedMode === 'link' ? linkSelectedKeys.filter(key => !propSelectedKeys.includes(key)) : defSelectedKeys.filter(key => !propSelectedKeys.includes(key))

        if (nowDelSelectedKeys.length > 0 || nowAddSelectedKeys.length > 0) {
          context.emit('select', {
            selectedKeys: nowSelectedKeys,
            delSelectedKeys: nowDelSelectedKeys,
            addSelectedKeys: nowAddSelectedKeys
          })
        }
      },

      doEventExpand(keys) {
        if (helper.isNotEmptyObject(keys)) {
          keys = keys.expanded
        }

        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes

        const computeKeys = keys
        const delExpandedNodes = flatTreeNodes.filter(every => expandedKeys.some(key => every.key === key) && !computeKeys.some(key => every.key === key))
        const delExpandedKeys = delExpandedNodes.map(node => node.key)

        for (const delKey of delExpandedKeys) {
          const childNodes = childTreeNodes.value[delKey] || []
          const childKeys = childNodes.map(node => node.key)
          keys.splice(0, keys.length, ...keys.filter(key => !childKeys.includes(key)))
        }

        Methoder.doTreeOnlyExpand(Array.from(new Set(keys)))
      },

      doEventSelect(keys) {
        if (props.disabled === true) {
          return
        }

        if (helper.isNotEmptyObject(keys)) {
          keys = keys.selected
        }

        Methoder.doTreeSelect(keys)
      },

      doEventCheck(keys) {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        if (helper.isNotEmptyObject(keys)) {
          keys = keys.checked
        }

        const computeKeys = keys
        const checkedKeys = Stater.checkedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes

        const delCheckedNodes = flatTreeNodes.filter(every => !every.disabled && !every.disableCheckbox && every.checkable && checkedKeys.some(key => every.key === key) && !computeKeys.some(key => every.key === key))
        const addCheckedNodes = flatTreeNodes.filter(every => !every.disabled && !every.disableCheckbox && every.checkable && !checkedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const delCheckedKeys = delCheckedNodes.map(node => node.key)
        const addCheckedKeys = addCheckedNodes.map(node => node.key)

        for (const delKey of delCheckedKeys) {
          computeKeys.splice(0, computeKeys.length, ...computeKeys.filter(key => !childTreeNodes.value[delKey] || !childTreeNodes.value[delKey].some(child => child.key === key)))
        }

        for (const addKey of addCheckedKeys) {
          computeKeys.push(0, computeKeys.length, ...(childTreeNodes.value[addKey] || []).map(child => child.key).filter(key => !computeKeys.includes(key)))
        }

        Methoder.doTreeOnlyChecked(computeKeys)
      },

      doTreeLoad(keys) {
        const promises = []
        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const loadTreeNodes = helper.isFunction(props.loadData) ? props.loadData : null
        const tempKeys = keys.filter(key => flatTreeNodes.some(every => every.key === key))

        if (!helper.isFunction(loadTreeNodes)) {
          return Promise.resolve([])
        }

        if (helper.isNotEmptyArray(tempKeys)) {
          tempKeys.sort((a, b) => (
            flatTreeNodes.findIndex(node => node.key === a) -
            flatTreeNodes.findIndex(node => node.key === b)
          ))

          while (tempKeys.length > 0) {
            const temp = tempKeys.shift()
            const exist = keys.includes(temp!)

            if (exist) {
              keys.splice(0, keys.length, ...keys.filter(key => !childTreeNodes.value[temp!].some(child => child.key === key)))
              tempKeys.splice(0, tempKeys.length, ...tempKeys.filter(key => !childTreeNodes.value[temp!].some(child => child.key === key)))
            }
          }
        }

        if (helper.isNotEmptyArray(keys)) {
          for (const key of keys) {
            const filter = (loadKey: Key) => loadKey !== key
            const findNode = (every: STreeTargetNode) => every.key === key
            const loadNode = flatTreeNodes.find(findNode)

            if (!loadNode) {
              expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(filter))
              loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(filter))
              loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(filter))
              continue
            }

            if (loadKeys.includes(key)) {
              continue
            }

            if (!loadKeys.includes(key)) {
              loadKeys.push(key)
            }

            if (loadedKeys.includes(key)) {
              loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(filter))
            }

            const doSuccess = () => {
              loadKeys.includes(key) && loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(filter))
              loadedKeys.includes(key) || loadedKeys.push(key)
            }

            const doError = () => {
              expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(filter))
              loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(filter))
              loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(filter))
            }

            promises.push(
              Promise.resolve(loadTreeNodes(loadNode))
                .then(nodes => {
                  const parentTrees = parentTreeNodes.value
                  const parentKeys = helper.isArray(parentTrees[key]) ? parentTrees[key] : []

                  if (parentKeys.every(node => expandedKeys.includes(node.key))) {
                    Methoder.doTreeOnlyExpand([key, ...expandedKeys])
                  }

                  doSuccess()
                })
                .catch(() => {
                  doError()
                })
            )
          }
        }

        return Promise.all(promises)
      },

      forceUpdate() {
        Methoder.resetTreeNodes()
      }
    }

    const Transformer: STreeTransformer = {
      resetPropTreeData: () => {
        if (Stater.propTreeNodes !== props.treeData) {
          context.emit('update:treeData', Stater.propTreeNodes)
        }
      },
      resetPropCheckedKeys: () => {
        const checkedKeys = props.checkedMode === 'link'
          ? [...Targeter.checkedLinkNodes.map(node => node.key)]
          : [...Targeter.checkedNodes.map(node => node.key)]

        if (!checkedKeys.every((key, index) => props.checkedKeys[index] === key) || !props.checkedKeys.every((key, index) => checkedKeys[index] === key)) {
          context.emit('update:checkedKeys', Array.from(new Set([...checkedKeys, ...Stater.outCheckedKeys])))
        }
      },
      resetPropSelectedKeys: () => {
        const selectedKeys = props.selectedMode === 'link'
          ? [...Targeter.selectedLinkNodes.map(node => node.key)]
          : [...Targeter.selectedNodes.map(node => node.key)]

        if (!selectedKeys.every((key, index) => props.selectedKeys[index] === key) || !props.selectedKeys.every((key, index) => selectedKeys[index] === key)) {
          context.emit('update:selectedKeys', Array.from(new Set(selectedKeys)))
        }
      },
      resetPropExpandedKeys: () => {
        if (!Stater.expandedKeys.every((key, index) => props.expandedKeys[index] === key) || !props.expandedKeys.every((key, index) => Stater.expandedKeys[index] === key)) {
          context.emit('update:expandedKeys', Array.from(new Set(Stater.expandedKeys)))
        }
      },

      resetStaterCheckedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const outCheckedKeys = props.checkedKeys.filter(key => !flatTreeNodes.some(node => node.key === key))
        const propCheckedKeys = props.checkedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const helpCheckedKeys = props.checkedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const propCheckedNodes = propCheckedKeys.map(key => flatTreeNodes.find(node => node.key === key)!)
        const helpCheckedNodes = helpCheckedKeys.map(key => flatTreeNodes.find(node => node.key === key)!)

        helpCheckedNodes.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key)))
        propCheckedNodes.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key)))
        Stater.outCheckedKeys.splice(0, Stater.outCheckedKeys.length, ...outCheckedKeys)

        if (props.checkedMode === 'link') {
          while (helpCheckedNodes.length > 0) {
            const helpNode = helpCheckedNodes.pop()!
            const childNodes = (childTreeNodes.value[helpNode.key] || []).filter(node => !node.disabled && !node.disableCheckbox && node.checkable)
            const parentNodes = (parentTreeNodes.value[helpNode.key] || []).filter(node => !node.disabled && !node.disableCheckbox && node.checkable)
            const parentKeys = parentNodes.map(node => node.key)

            if (helper.isNotEmptyArray(childNodes) && !childNodes.every(node => propCheckedNodes.some(prop => node.key === prop.key))) {
              propCheckedNodes.splice(0, propCheckedNodes.length, ...propCheckedNodes.filter(node => node.disabled || node.disableCheckbox || (node.checkable && node.key !== helpNode.key && !parentKeys.includes(node.key))))
              helpCheckedNodes.splice(0, helpCheckedNodes.length, ...helpCheckedNodes.filter(node => node.disabled || node.disableCheckbox || (node.checkable && node.key !== helpNode.key && !parentKeys.includes(node.key))))
            }
          }
        }

        if (props.checkedMode !== 'link') {
          propCheckedNodes.push(...props.checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)).map(key => flatTreeNodes.find(every => every.key === key)!))
        }

        if (!propCheckedNodes.every((prop, index) => Stater.checkedKeys[index] === prop.key) || !Stater.checkedKeys.every((key, index) => propCheckedNodes[index]?.key === key)) {
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...propCheckedNodes.map(node => node.key))
        }
      },
      resetStaterSelectedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const propSelectedKeys = props.selectedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const helpSelectedKeys = props.selectedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const propSelectedNodes = propSelectedKeys.map(key => flatTreeNodes.find(node => node.key === key)!)
        const helpSelectedNodes = helpSelectedKeys.map(key => flatTreeNodes.find(node => node.key === key)!)

        helpSelectedNodes.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key)))
        propSelectedNodes.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key)))

        if (props.selectedMode === 'link') {
          while (helpSelectedNodes.length > 0) {
            const helpNode = helpSelectedNodes.pop()!
            const childNodes = (childTreeNodes.value[helpNode.key] || []).filter(node => !node.disabled && node.isSelectable)
            const parentNodes = (parentTreeNodes.value[helpNode.key] || []).filter(node => !node.disabled && node.isSelectable)
            const parentKeys = parentNodes.map(node => node.key)

            if (helper.isNotEmptyArray(childNodes) && childNodes.some(node => propSelectedNodes.some(prop => node.key === prop.key))) {
              propSelectedNodes.splice(0, propSelectedNodes.length, ...propSelectedNodes.filter(node => node.disabled || node.key !== helpNode.key))
              helpSelectedNodes.splice(0, helpSelectedNodes.length, ...helpSelectedNodes.filter(node => node.disabled || node.key !== helpNode.key))
            }

            propSelectedNodes.splice(0, propSelectedNodes.length, ...propSelectedNodes.filter(node => node.disabled || !parentKeys.includes(node.key)))
            helpSelectedNodes.splice(0, helpSelectedNodes.length, ...helpSelectedNodes.filter(node => node.disabled || !parentKeys.includes(node.key)))
          }
        }

        if (props.selectedMode !== 'link') {
          propSelectedNodes.push(...props.selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)).map(key => flatTreeNodes.find(every => every.key === key)!))
        }

        if (!propSelectedNodes.every((prop, index) => Stater.selectedKeys[index] === prop.key) || !Stater.selectedKeys.every((key, index) => propSelectedNodes[index]?.key === key)) {
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...propSelectedNodes.map(node => node.key))
        }
      },
      resetStaterExpandedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const propExpandedKeys = props.expandedKeys.filter(key => flatTreeNodes.some(node => node.key === key))

        propExpandedKeys.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b)))

        if (!propExpandedKeys.every((key, index) => Stater.expandedKeys[index] === key) || !Stater.expandedKeys.every((key, index) => propExpandedKeys[index] === key)) {
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length, ...propExpandedKeys)
        }
      },
      resetStaterLinkTreeNodes: () => {
        if (props.treeData !== Stater.propTreeNodes) {
          Stater.propTreeNodes = props.treeData
          Methoder.resetTreeNodes(Stater.propTreeNodes)
        }
      }
    }

    const RenderTreeContainer = (_: any, ctx: SetupContext) => {
      return (
        <section class='s-tree-container'>
          <ASpin spinning={props.loading}>
            <RenderTreeComponent v-slots={ctx.slots}/>
          </ASpin>
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
          treeData={[...Stater.linkTreeNodes]}
          expandedKeys={[...Stater.expandedKeys]}
          selectedKeys={[...Stater.selectedKeys]}
          checkedKeys={{ checked: Stater.selfCheckedKeys, halfChecked: Stater.halfCheckedKeys }}
          onExpand={Methoder.doEventExpand}
          onSelect={Methoder.doEventSelect}
          onCheck={Methoder.doEventCheck}
          selectable={props.selectable}
          checkable={props.checkable}
          blockNode={props.blockNode}
          disabled={props.disabled}
          showIcon={props.showIcon}
          showLine={props.showLine}
          virtual={props.virtual}
          style={props.treeStyle}
          checkStrictly={true}
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
      return isIconType(icon) ? <SIcon type={icon} style='cursor: pointer;' class={{ 'ant-tree-switcher-icon': icon === 'CaretDownOutlined' }} onClick={onClick}/> : null
    }

    const RenderTreeNodeIcon = (node: STreeTargetNode, ctx: SetupContext) => {
      if (node.scopedSlots.icon === 'iconRoot') {
        return helper.isFunction(ctx.slots.iconRoot) ? ctx.slots.iconRoot(toRaw(unref(node.referenceSourceNode))) : <SIcon type={isIconType(node.icon) ? node.icon : 'AppstoreOutlined'}/>
      }

      if (node.scopedSlots.icon === 'iconParent') {
        return helper.isFunction(ctx.slots.iconParent) ? ctx.slots.iconParent(toRaw(unref(node.referenceSourceNode))) : <SIcon type={isIconType(node.icon) ? node.icon : 'ApartmentOutlined'}/>
      }

      if (node.scopedSlots.icon === 'iconLeaf') {
        return helper.isFunction(ctx.slots.iconLeaf) ? ctx.slots.iconLeaf(toRaw(unref(node.referenceSourceNode))) : <SIcon type={isIconType(node.icon) ? node.icon : 'ApartmentOutlined'}/>
      }
    }

    const RenderTreeNodeTitle = (node: STreeTargetNode, ctx: SetupContext) => {
      const RenderTreeNodeTitleRootLabel = (node: Omit<STreeTargetNode, 'key'>, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleRootLabel)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                limit={props.tooltip}
                tooltip={props.tooltip > -1}
              >
                { ctx.slots.titleRootLabel(toRaw(unref(node.referenceSourceNode))) }
              </SEllipsis>
            </span>
          )
        }

        return (
          <span class='s-tree-title-label'>
            <SEllipsis
              limit={props.tooltip}
              tooltip={props.tooltip > -1}
            >
              { helper.isString(node.title) ? node.title : '' }
            </SEllipsis>
          </span>
        )
      }

      const RenderTreeNodeTitleRootButton = (node: Omit<STreeTargetNode, 'key'>, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleRootButton)) {
          return (
            <span class={['s-tree-title-button', { 'always-show-title-button': props.alwaysShowTitleButton === true || node.alwaysShowTitleButton === true }]}>
              { ctx.slots.titleRootButton(toRaw(unref(node.referenceSourceNode))) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      const RenderTreeNodeTitleParentLabel = (node: Omit<STreeTargetNode, 'key'>, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleParentLabel)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                limit={props.tooltip ? props.tooltip - node.level * 2 : 0}
                tooltip={props.tooltip > -1}
              >
                { ctx.slots.titleParentLabel(toRaw(unref(node.referenceSourceNode))) }
              </SEllipsis>
            </span>
          )
        }

        return (
          <span class='s-tree-title-label'>
            <SEllipsis
              limit={props.tooltip ? props.tooltip - node.level * 2 : 0}
              tooltip={props.tooltip > -1}
            >
              { helper.isString(node.title) ? node.title : '' }
            </SEllipsis>
          </span>
        )
      }

      const RenderTreeNodeTitleParentButton = (node: Omit<STreeTargetNode, 'key'>, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleParentButton)) {
          return (
            <span class={['s-tree-title-button', { 'always-show-title-button': props.alwaysShowTitleButton === true || node.alwaysShowTitleButton === true }]}>
              { ctx.slots.titleParentButton(toRaw(unref(node.referenceSourceNode))) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      const RenderTreeNodeTitleLeafLabel = (node: Omit<STreeTargetNode, 'key'>, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleLeafLabel)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                limit={props.tooltip ? props.tooltip - node.level * 2 : 0}
                tooltip={props.tooltip > -1}
              >
                { ctx.slots.titleLeafLabel(toRaw(unref(node.referenceSourceNode))) }
              </SEllipsis>
            </span>
          )
        }

        return (
          <span class='s-tree-title-label'>
            <SEllipsis
              limit={props.tooltip ? props.tooltip - node.level * 2 : 0}
              tooltip={props.tooltip > -1}
            >
              { helper.isString(node.title) ? node.title : '' }
            </SEllipsis>
          </span>
        )
      }

      const RenderTreeNodeTitleLeafButton = (node: Omit<STreeTargetNode, 'key'>, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleLeafButton)) {
          return (
            <span class={['s-tree-title-button', { 'always-show-title-button': props.alwaysShowTitleButton === true || node.alwaysShowTitleButton === true }]}>
              { ctx.slots.titleLeafButton(toRaw(unref(node.referenceSourceNode))) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      if (node.scopedSlots.title === 'titleRoot') {
        return helper.isFunction(ctx.slots.titleRoot) ? ctx.slots.titleRoot(toRaw(unref(node.referenceSourceNode))) : (
          <span class='s-tree-title-container'>
            <RenderTreeNodeTitleRootLabel { ...node } key={undefined} v-slots={ctx.slots}/>
            <RenderTreeNodeTitleRootButton { ...node } key={undefined} v-slots={ctx.slots}/>
          </span>
        )
      }

      if (node.scopedSlots.title === 'titleParent') {
        return helper.isFunction(ctx.slots.titleParent) ? ctx.slots.titleParent(toRaw(unref(node.referenceSourceNode))) : (
          <span class='s-tree-title-container'>
            <RenderTreeNodeTitleParentLabel { ...node } key={undefined} v-slots={ctx.slots}/>
            <RenderTreeNodeTitleParentButton { ...node } key={undefined} v-slots={ctx.slots}/>
          </span>
        )
      }

      if (node.scopedSlots.title === 'titleLeaf') {
        return helper.isFunction(ctx.slots.titleLeaf) ? ctx.slots.titleLeaf(toRaw(unref(node.referenceSourceNode))) : (
          <span class='s-tree-title-container'>
            <RenderTreeNodeTitleLeafLabel { ...node } key={undefined} v-slots={ctx.slots}/>
            <RenderTreeNodeTitleLeafButton { ...node } key={undefined} v-slots={ctx.slots}/>
          </span>
        )
      }
    }

    watch([
      () => props.treeData,
      () => props.checkable,
      () => props.checkedMode,
      () => props.selectedMode,
      () => props.checkedKeys,
      () => props.selectedKeys,
      () => props.expandedKeys
    ], (
      [newTreeNodes, newCheckable, newCheckedMode, newSelectedMode, newCheckedKeys, newSelectedKeys, newExpandedKeys]: [STreeSourceNodes, boolean, 'link' | 'default', 'link' | 'default', STreeKeys, STreeKeys, STreeKeys],
      [oldTreeNodes, oldCheckable, oldCheckedMode, oldSelectedMode, oldCheckedKeys, oldSelectedKeys, oldExpandedKeys]: [STreeSourceNodes, boolean, 'link' | 'default', 'link' | 'default', STreeKeys, STreeKeys, STreeKeys]
    ) => {
      let isReloadTreeNodes = false
      let isReloadTreeStater = false
      let isForcedCleanStater = false

      let isChangeCheckable = false
      let isChangeCheckedMode = false
      let isChangeSelectedMode = false

      let isChangeCheckedKeys = false
      let isChangeSelectedKeys = false
      let isChangeExpandedKeys = false

      if (!isReloadTreeNodes) {
        isReloadTreeNodes = (
          !newTreeNodes.every((newNode, index) => oldTreeNodes[index] === newNode) ||
          !oldTreeNodes.every((propNode, index) => newTreeNodes[index] === propNode)
        )
      }

      if (!isReloadTreeStater) {
        isChangeCheckable = newCheckable !== oldCheckable
        isChangeCheckedMode = newCheckedMode !== oldCheckedMode
        isChangeSelectedMode = newSelectedMode !== oldSelectedMode
        isChangeCheckedKeys = newCheckedKeys.length !== oldCheckedKeys.length || !newCheckedKeys.every(key => oldCheckedKeys.includes(key))
        isChangeSelectedKeys = newSelectedKeys.length !== oldSelectedKeys.length || !newSelectedKeys.every(key => oldSelectedKeys.includes(key))
        isChangeExpandedKeys = newExpandedKeys.length !== oldExpandedKeys.length || !newExpandedKeys.every(key => oldExpandedKeys.includes(key))
        isReloadTreeStater = isChangeCheckable || isChangeCheckedMode || isChangeSelectedMode || isChangeCheckedKeys || isChangeSelectedKeys || isChangeExpandedKeys
        isForcedCleanStater = isChangeCheckable
      }

      if (isReloadTreeNodes) {
        Transformer.resetStaterLinkTreeNodes()
      }

      if (isReloadTreeStater) {
        isChangeCheckedKeys && Transformer.resetStaterCheckedKeys()
        isChangeSelectedKeys && Transformer.resetStaterSelectedKeys()
        isChangeExpandedKeys && Transformer.resetStaterExpandedKeys()
        Methoder.cleanTreeStater(isForcedCleanStater)
        Methoder.resetTreeStater()
      }
    })

    watch(Stater.propTreeNodes, () => Transformer.resetPropTreeData())
    watch(Stater.expandedKeys, () => Transformer.resetPropExpandedKeys())
    watch(Stater.selectedKeys, () => Transformer.resetPropSelectedKeys())
    watch(Stater.checkedKeys, () => Transformer.resetPropCheckedKeys())

    context.expose({
      loadKeys: Stater.loadKeys,
      loadedKeys: Stater.loadedKeys,

      checkedKeys: Stater.checkedKeys,
      selectedKeys: Stater.selectedKeys,
      expandedKeys: Stater.expandedKeys,
      outCheckedKeys: Stater.outCheckedKeys,
      selfCheckedKeys: Stater.selfCheckedKeys,
      halfCheckedKeys: Stater.halfCheckedKeys,

      selectedNode: Sourcer.selectedNode,
      selectedNodes: Sourcer.selectedNodes,
      selectedLinkNode: Sourcer.selectedLinkNode,
      selectedLinkNodes: Sourcer.selectedLinkNodes,

      checkedNode: Sourcer.checkedNode,
      checkedNodes: Sourcer.checkedNodes,
      checkedHalfNode: Sourcer.checkedHalfNode,
      checkedHalfNodes: Sourcer.checkedHalfNodes,
      checkedLinkNode: Sourcer.checkedLinkNode,
      checkedLinkNodes: Sourcer.checkedLinkNodes,

      reloadTreeNodes: Methoder.reloadTreeNodes,
      appendTreeNodes: Methoder.appendTreeNodes,
      removeTreeNodes: Methoder.removeTreeNodes,
      lookupTreeNodes: Methoder.lookupTreeNodes,
      spreadTreeNodes: Methoder.spreadTreeNodes,

      doTreeAllExpanded: Methoder.doTreeAllExpanded,
      doTreeAllCollapsed: Methoder.doTreeAllCollapsed,

      doTreeToggleExpand: Methoder.doTreeToggleExpand,
      doTreeOnlyExpand: Methoder.doTreeOnlyExpand,
      doTreePushExpand: Methoder.doTreePushExpand,
      doTreePopExpand: Methoder.doTreePopExpand,

      doTreeToggleChecked: Methoder.doTreeToggleChecked,
      doTreeOnlyChecked: Methoder.doTreeOnlyChecked,
      doTreePushChecked: Methoder.doTreePushChecked,
      doTreePopChecked: Methoder.doTreePopChecked,

      doTreeSelect: Methoder.doTreeSelect,

      forceUpdate: Methoder.forceUpdate
    })

    Transformer.resetStaterLinkTreeNodes()
    Transformer.resetStaterExpandedKeys()
    Transformer.resetStaterSelectedKeys()
    Transformer.resetStaterCheckedKeys()
    Methoder.cleanTreeStater()
    Methoder.resetTreeStater()

    return () => <RenderTreeContainer v-slots={context.slots}/>
  }
})

export default STree
