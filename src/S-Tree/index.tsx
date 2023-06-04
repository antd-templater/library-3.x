import './index.less'
import 'ant-design-vue/es/tree/style/index.less'
import 'ant-design-vue/es/spin/style/index.less'

import * as VueTypes from 'vue-types'
import { defineComponent, SetupContext, ShallowReactive, ShallowRef, shallowReactive, shallowRef, readonly, watch, onMounted, toRaw } from 'vue'
import { Key, DataNode } from 'ant-design-vue/es/vc-tree/interface'
import SIcon, { isIconType } from '@/S-Icon/index'
import SEllipsis from '@/S-Ellipsis/index'
import ATree from 'ant-design-vue/es/tree'
import ASpin from 'ant-design-vue/es/spin'
import helper from '@/helper'

export interface STreeSourceNode extends Omit<DataNode, 'key'> {
  key?: Key;
  icon?: string;
  title?: string;
  disabled?: boolean;
  disableCheckbox?: boolean;
  forceApplyDisableCheckbox?: boolean;
  alwaysShowTitleButton?: boolean;
  forceApplyDisabled?: boolean;
  children?: STreeSourceNode[];
}

export interface STreeTargetNode extends STreeSourceNode {
  scopedSlots: {
    icon: string;
    title: string;
  };
  key: Key;
  icon: any;
  title: string;
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
  (treeNode: STreeSourceNode, options: { checkedKeys: STreeKeys; outCheckedKeys: STreeKeys; selectedKeys: STreeKeys; expandedKeys: STreeKeys; }): Promise<STreeSourceNodes>;
}

export interface STreeMethoder {
  renderSwitcher: (node: STreeTargetNode) => string;
  triggerSwitcher: (node: STreeTargetNode) => void;

  cleanTreeStater: (force?: boolean, types?: Array<'checked' | 'selected' | 'expanded'>) => void;
  resetTreeStater: (force?: boolean, types?: Array<'checked' | 'selected' | 'expanded'>) => void;

  resetTreeNodes: (nodes?: STreeSourceNodes, force?: boolean) => void;
  reloadTreeNodes: (nodes: STreeSourceNodes, parent?: { key: STreeKey } | null, force?: boolean) => void;
  appendTreeNodes: (nodes: STreeSourceNodes, parent?: { key: STreeKey } | null, force?: boolean) => void;
  removeTreeNodes: (nodes: STreeSourceNodes, parent?: { key: STreeKey } | null, force?: boolean) => void;
  compileTreeNodes: (nodes: STreeSourceNodes, parent?: STreeTargetNode | null) => STreeTargetNodes;
  lookupTreeNodes: <T extends STreeKeys | STreeKey> (nodes: T) => T extends any[] ? Array<STreeSourceNode | null> : STreeSourceNode | null;
  spreadTreeNodes: <T extends STreeSpreadNodes> (nodes: T) => T;

  expandTreeNodes: (keys: STreeKeys) => void;
  collapseTreeNodes: (keys: STreeKeys) => void;

  doTreeAllExpanded: () => void;
  doTreeAllCollapsed: () => void;
  doTreeToggleExpanded: (keys: STreeKeys) => void;
  doTreeOnlyExpanded: (keys: STreeKeys) => void;
  doTreePushExpanded: (keys: STreeKeys) => void;
  doTreePopExpanded: (keys: STreeKeys) => void;

  doTreeAllChecked: () => void;
  doTreeAllUnChecked: () => void;
  doTreeToggleChecked: (keys: STreeKeys) => void;
  doTreeOnlyChecked: (keys: STreeKeys) => void;
  doTreePushChecked: (keys: STreeKeys) => void;
  doTreePopChecked: (keys: STreeKeys) => void;
  doTreeSelected: (keys: STreeKeys) => void;

  doEventExpand: (keys: STreeKeys | { expanded: STreeKeys }) => void;
  doEventSelect: (keys: STreeKeys | { selected: STreeKeys }) => void;
  doEventCheck: (keys: STreeKeys | { checked: STreeKeys }) => void;

  doTreeLoad: (keys: STreeKeys) => Promise<void[]>;

  forceUpdate: (clean?: boolean) => void;
}

export interface STreeTransformer {
  resetPropTreeData: () => void;
  resetPropCheckedKeys: () => void;
  resetPropSelectedKeys: () => void;
  resetPropExpandedKeys: () => void;

  resetStaterCheckedKeys: () => void;
  resetStaterSelectedKeys: () => void;
  resetStaterExpandedKeys: () => void;
  resetStaterLinkTreeNodes: (force?: boolean) => void;
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

export interface STreeCacher {
  treeData: ShallowReactive<STreeSourceNodes>;
  checkedKeys: ShallowReactive<STreeKeys>;
  selectedKeys: ShallowReactive<STreeKeys>;
  expandedKeys: ShallowReactive<STreeKeys>;
  treeContainer: ShallowRef<HTMLElement | null>;
}

export interface STreeStater {
  loadKeys: ShallowReactive<STreeKeys>;
  loadedKeys: ShallowReactive<STreeKeys>;

  checkedKeys: ShallowReactive<STreeKeys>;
  selectedKeys: ShallowReactive<STreeKeys>;
  expandedKeys: ShallowReactive<STreeKeys>;
  outCheckedKeys: ShallowReactive<STreeKeys>;
  halfCheckedKeys: ShallowReactive<STreeKeys>;

  parentTreeNodes: ShallowRef<Record<string, STreeTargetNodes>>;
  childTreeNodes: ShallowRef<Record<string, STreeTargetNodes>>;
  flatTreeNodes: ShallowReactive<STreeTargetNodes>;
  linkTreeNodes: ShallowReactive<STreeTargetNodes>;
  propTreeNodes: ShallowReactive<STreeSourceNodes>;
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
  inheritAttrs: true,
  props: {
    bgColor: VueTypes.string().def('transparent'),
    checkedKeys: VueTypes.array<string | number>().def([]),
    selectedKeys: VueTypes.array<string | number>().def([]),
    expandedKeys: VueTypes.array<string | number>().def([]),
    loadData: VueTypes.func<STreeLoadData>().def(undefined),
    treeData: VueTypes.array<STreeSourceNode>().def(undefined),
    checkedMode: VueTypes.string<'link' | 'default'>().def('default'),
    selectedMode: VueTypes.string<'link' | 'default'>().def('default'),
    replaceFields: VueTypes.object<STreeFieldNames>().def({}),
    allowCheckedLevel: VueTypes.any<number | Function>().def(1),
    allowSelectedLevel: VueTypes.any<number | Function>().def(1),
    forceCleanWhenNotInTreeNodes: VueTypes.bool().def(false),
    forceCleanWhenRemoveTreeNode: VueTypes.bool().def(true),
    forceApplyDisableCheckbox: VueTypes.bool().def(false),
    forceApplyDisabled: VueTypes.bool().def(false),
    alwaysShowTitleButton: VueTypes.bool().def(false),
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
    tooltip: VueTypes.bool().def(true),
    sticky: VueTypes.bool().def(false)
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
    const Cacher: STreeCacher = {
      treeData: shallowReactive([]),
      checkedKeys: shallowReactive([]),
      selectedKeys: shallowReactive([]),
      expandedKeys: shallowReactive([]),
      treeContainer: shallowRef(null)
    }

    const Stater: STreeStater = {
      loadKeys: shallowReactive([]),
      loadedKeys: shallowReactive([]),

      checkedKeys: shallowReactive([]),
      selectedKeys: shallowReactive([]),
      expandedKeys: shallowReactive([]),
      outCheckedKeys: shallowReactive([]),
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
        const loadKeys = Stater.loadKeys
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

          Methoder.doTreeOnlyExpanded(
            expandedKeys.includes(node.key)
              ? expandedKeys.filter(key => key !== node.key && !childKeys.includes(key))
              : [...expandedKeys, node.key]
          )
        }
      },

      cleanTreeStater(force, types) {
        if (force === true) {
          // Stater
          Stater.loadKeys.splice(0, Stater.loadKeys.length)
          Stater.loadedKeys.splice(0, Stater.loadedKeys.length)
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length)
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length)
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length)
          Stater.outCheckedKeys.splice(0, Stater.outCheckedKeys.length)
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

        const checkedKeys = Stater.checkedKeys
        const selectedKeys = Stater.selectedKeys
        const expandedKeys = Stater.expandedKeys
        const outCheckedKeys = Stater.outCheckedKeys
        const halfCheckedKeys = Stater.halfCheckedKeys
        const linkAllCheckedKeys = [...checkedKeys, ...halfCheckedKeys, ...outCheckedKeys]
        const selfAllCheckedKeys = [...checkedKeys, ...outCheckedKeys]
        const flatTreeNodes = Stater.flatTreeNodes

        if (!types || types.includes('checked')) {
          halfCheckedKeys.splice(0, halfCheckedKeys.length)
          outCheckedKeys.splice(0, outCheckedKeys.length, ...linkAllCheckedKeys.filter(key => !props.forceCleanWhenNotInTreeNodes && !flatTreeNodes.some(every => every.key === key)))
          checkedKeys.splice(0, checkedKeys.length, ...selfAllCheckedKeys.filter(key => flatTreeNodes.some(every => every.key === key && (every.disabled || every.disableCheckbox || every.checkable))))

          outCheckedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          checkedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          outCheckedKeys.splice(0, outCheckedKeys.length, ...Array.from(new Set(outCheckedKeys)))
          checkedKeys.splice(0, checkedKeys.length, ...Array.from(new Set(checkedKeys)))
        }

        if (!types || types.includes('selected')) {
          selectedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          selectedKeys.splice(0, selectedKeys.length, ...selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key && (!every.disabled && every.isSelectable))))
          selectedKeys.splice(0, selectedKeys.length, ...Array.from(new Set(selectedKeys)))
        }

        if (!types || types.includes('expanded')) {
          expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNotEmptyArray(every.children))))
          expandedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          expandedKeys.splice(0, expandedKeys.length, ...Array.from(new Set(expandedKeys)))
        }
      },

      resetTreeStater(force, types) {
        const checkedKeys = Stater.checkedKeys
        const selectedKeys = Stater.selectedKeys
        const expandedKeys = Stater.expandedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const halfCheckedKeys = Stater.halfCheckedKeys

        const selectedNodes = Targeter.selectedNodes
        const selectedLinkNodes = Targeter.selectedLinkNodes
        const checkedLinkNodes = Targeter.checkedLinkNodes
        const checkedHalfNodes = Targeter.checkedHalfNodes
        const checkedNodes = Targeter.checkedNodes

        if (!types || types.includes('checked')) {
          // 初始化
          checkedNodes.splice(0, checkedNodes.length)
          checkedLinkNodes.splice(0, checkedLinkNodes.length)
          checkedHalfNodes.splice(0, checkedHalfNodes.length)
          halfCheckedKeys.splice(0, halfCheckedKeys.length)
          checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          checkedNodes.push(...checkedKeys.map(key => flatTreeNodes.find(every => every.key === key)!))

          // 是否必选
          if (helper.isEmptyArray(checkedNodes)) {
            if (props.checkable && !props.allowUnChecked) {
              checkedNodes.push(...flatTreeNodes.filter(item => !item.disabled && !item.disableCheckbox && item.checkable).slice(0, 1))
            }
          }

          // 核心逻辑
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
          Stater.halfCheckedKeys.splice(0, Stater.halfCheckedKeys.length, ...checkedHalfNodes.map(node => node.key))

          // Targeter
          Targeter.checkedLinkNode.value = checkedLinkNodes[0] || null
          Targeter.checkedHalfNode.value = checkedHalfNodes[0] || null
          Targeter.checkedNode.value = checkedNodes[0] || null

          // Sourcer
          Sourcer.checkedLinkNodes.splice(0, Sourcer.checkedLinkNodes.length, ...checkedLinkNodes.map(node => node.referenceSourceNode))
          Sourcer.checkedHalfNodes.splice(0, Sourcer.checkedHalfNodes.length, ...checkedHalfNodes.map(node => node.referenceSourceNode))
          Sourcer.checkedNodes.splice(0, Sourcer.checkedNodes.length, ...checkedNodes.map(node => node.referenceSourceNode))
          Sourcer.checkedLinkNode.value = checkedLinkNodes[0] && checkedLinkNodes[0].referenceSourceNode || null
          Sourcer.checkedHalfNode.value = checkedHalfNodes[0] && checkedHalfNodes[0].referenceSourceNode || null
          Sourcer.checkedNode.value = checkedNodes[0] && checkedNodes[0].referenceSourceNode || null
        }

        if (!types || types.includes('selected')) {
          // 初始化
          selectedNodes.splice(0, selectedNodes.length)
          selectedLinkNodes.splice(0, selectedLinkNodes.length)
          selectedKeys.splice(0, selectedKeys.length, ...selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          selectedNodes.push(...selectedKeys.map(key => flatTreeNodes.find(every => every.key === key)!))

          // 是否必选
          if (helper.isEmptyArray(selectedNodes)) {
            if (props.selectable && !props.allowUnSelected && (!props.checkable || !props.allowSelectToCheck) && linkTreeNodes.length === 1) {
              selectedNodes.push(...flatTreeNodes.filter(every => every.level === 1 || every.level === 2).filter(item => item.isSelectable && !item.disabled).slice(0, 1))
            }

            if (props.selectable && !props.allowUnSelected && (!props.checkable || !props.allowSelectToCheck) && linkTreeNodes.length > 1) {
              selectedNodes.push(...flatTreeNodes.filter(every => every.level === 1).filter(item => item.isSelectable && !item.disabled).slice(0, 1))
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

              if (upHandleNode && !helper.isNotEmptyArray(parentNodes)) {
                selectedLinkNodes.push(upHandleNode)
              }

              if (upHandleNode && helper.isNotEmptyArray(parentNodes)) {
                selectedLinkNodes.push(...parentNodes, upHandleNode)
              }
            }
          }

          // 排序逻辑
          if (helper.isArray(selectedNodes)) {
            selectedNodes.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key))
          }

          if (helper.isArray(selectedLinkNodes)) {
            selectedLinkNodes.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key))
          }

          // Stater
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...selectedNodes.map(node => node.key))

          // Targeter
          Targeter.selectedNode.value = selectedNodes[0] || null
          Targeter.selectedLinkNode.value = selectedLinkNodes[0] || null

          // Sourcer
          Sourcer.selectedLinkNodes.splice(0, Sourcer.selectedLinkNodes.length, ...selectedLinkNodes.map(node => node.referenceSourceNode))
          Sourcer.selectedNodes.splice(0, Sourcer.selectedNodes.length, ...selectedNodes.map(node => node.referenceSourceNode))
          Sourcer.selectedLinkNode.value = selectedLinkNodes[0] && selectedLinkNodes[0].referenceSourceNode || null
          Sourcer.selectedNode.value = selectedNodes[0] && selectedNodes[0].referenceSourceNode || null
        }

        if (!types || types.includes('expanded')) {
          // 初始化
          expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))

          // 是否展开
          if (helper.isEmptyArray(expandedKeys)) {
            if (!props.allowUnExpanded && linkTreeNodes.length === 1) {
              Methoder.expandTreeNodes(linkTreeNodes.map(every => every.key).slice(0, 1))
            }
          }

          // 排序逻辑
          if (helper.isArray(expandedKeys)) {
            expandedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          }

          if (helper.isArray(selectedLinkNodes)) {
            selectedLinkNodes.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key))
          }
        }
      },

      resetTreeNodes(nodes, force) {
        if (!helper.isArray(nodes)) {
          nodes = Stater.propTreeNodes
        }

        if (nodes !== Stater.propTreeNodes) {
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...nodes)
          Cacher.treeData.splice(0, Cacher.treeData.length, ...nodes)
        }

        Methoder.reloadTreeNodes(nodes, null, force)
      },

      reloadTreeNodes(nodes, parent, force) {
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNode = helper.isNotEmptyObject(parent) ? flatTreeNodes.find(every => parent.key === every.key) : undefined
        const noReloadTreeNode = helper.isNotEmptyObject(parent) && !parentTreeNode

        if (noReloadTreeNode) {
          return
        }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const referencedNodes = helper.isNotEmptyArray(nodes) ? nodes : undefined
        const resultTreeNodes = Methoder.compileTreeNodes(nodes, parentTreeNode)
        const flatResultNodes = Methoder.spreadTreeNodes(resultTreeNodes)

        nodes = nodes.map(node => toRaw(node))

        const newTreeNodes = Methoder.spreadTreeNodes(nodes)
        const oldTreeNodes = Methoder.spreadTreeNodes(Cacher.treeData)
        const isNeedEmited = newTreeNodes.length !== oldTreeNodes.length || !newTreeNodes.every((newNode, index) => newNode === oldTreeNodes[index])

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          if (nodes !== Stater.propTreeNodes) {
            Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...nodes)
            Cacher.treeData.splice(0, Cacher.treeData.length, ...nodes)
          }

          loadKeys.splice(0, loadKeys.length)
          loadedKeys.splice(0, loadedKeys.length)
          linkTreeNodes.splice(0, linkTreeNodes.length)
          flatTreeNodes.splice(0, flatTreeNodes.length)
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          if (loadKeys.includes(parentTreeNode.key)) {
            const parentKey = parentTreeNode.key
            const childNodes = childTreeNodes.value[parentKey]
            const childKeys = (childNodes || []).map(node => node.key)
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentKey && !childKeys.includes(key)))
            loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => !childKeys.includes(key)))
          }

          const isLoadedNode = loadedKeys.includes(parentTreeNode.key)
          const isLeafedNode = parentTreeNode.isLeaf = resultTreeNodes.length === 0
          const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)
          const childrenKey = props.replaceFields.children || 'children'

          isAsyncNode && !isLoadedNode && loadedKeys.push(parentTreeNode.key)
          parentTreeNode.referenceSourceNode[childrenKey] = referencedNodes
          parentTreeNode.children = resultTreeNodes

          parentTreeNode.scopedSlots = {
            icon: parentTreeNode.level === 1 ? 'iconRoot' : helper.isNotEmptyArray(parentTreeNode.children) ? 'iconParent' : 'iconLeaf',
            title: parentTreeNode.level === 1 ? 'titleRoot' : helper.isNotEmptyArray(parentTreeNode.children) ? 'titleParent' : 'titleLeaf'
          }

          loadKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          loadedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
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
          Stater.halfCheckedKeys.splice(0, Stater.halfCheckedKeys.length, ...Stater.halfCheckedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        }

        Methoder.cleanTreeStater(force)
        Methoder.doTreeSelected([...Stater.selectedKeys])
        Methoder.doTreeOnlyChecked([...Stater.checkedKeys])
        Methoder.doTreeOnlyExpanded([...Stater.expandedKeys])

        if (isNeedEmited) {
          context.emit('update:treeData', [...Cacher.treeData])
        }
      },

      appendTreeNodes(nodes, parent, force) {
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const parentTreeNode = helper.isNotEmptyObject(parent) ? flatTreeNodes.find(every => parent.key === every.key) : undefined
        const noReloadTreeNode = helper.isNotEmptyObject(parent) && !parentTreeNode

        if (noReloadTreeNode) {
          return
        }

        nodes = nodes.filter(node => !(parentTreeNode?.children || flatTreeNodes).some(every => every.key === node[props.replaceFields.key || 'key']))
        nodes = nodes.map(node => toRaw(node))

        if (!helper.isNotEmptyArray(nodes)) {
          return
        }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const childTreeNodes = Stater.childTreeNodes
        const resultTreeNodes = Methoder.compileTreeNodes(nodes, parentTreeNode)
        const flatResultNodes = Methoder.spreadTreeNodes(resultTreeNodes)

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...[...Stater.propTreeNodes, ...nodes])
          Cacher.treeData.splice(0, Cacher.treeData.length, ...[...Cacher.treeData, ...nodes])
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          if (loadKeys.includes(parentTreeNode.key)) {
            const parentKey = parentTreeNode.key
            const childNodes = childTreeNodes.value[parentKey]
            const childKeys = (childNodes || []).map(node => node.key)
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentKey && !childKeys.includes(key)))
          }

          const isLoadedNode = loadedKeys.includes(parentTreeNode.key)
          const isLeafedNode = parentTreeNode.isLeaf = parentTreeNode.children.length === 0 && resultTreeNodes.length === 0
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

          loadKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          loadedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
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
          Stater.halfCheckedKeys.splice(0, Stater.halfCheckedKeys.length, ...Stater.halfCheckedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        }

        Methoder.cleanTreeStater(force)
        Methoder.doTreeSelected([...Stater.selectedKeys])
        Methoder.doTreeOnlyChecked([...Stater.checkedKeys])
        Methoder.doTreeOnlyExpanded([...Stater.expandedKeys])

        context.emit('update:treeData', [...Cacher.treeData])

        return
      },

      removeTreeNodes(nodes, parent, force) {
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNode = helper.isNotEmptyObject(parent) ? flatTreeNodes.find(every => parent.key === every.key) : undefined
        const noReloadTreeNode = helper.isNotEmptyObject(parent) && !parentTreeNode

        if (noReloadTreeNode) {
          return
        }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const filterRemoveNodes = nodes.filter(node => (parentTreeNode?.children || flatTreeNodes).some(every => every.key === node[props.replaceFields.key || 'key']))
        const rightRemoveNodes = filterRemoveNodes.map(node => flatTreeNodes.find(every => every.key === node[props.replaceFields.key || 'key'])!)
        const flatRemoveNodes = Methoder.spreadTreeNodes(rightRemoveNodes)
        const childrenKey = props.replaceFields.children || 'children'

        if (!helper.isNotEmptyArray(flatRemoveNodes)) {
          return
        }

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...Stater.propTreeNodes.filter(every => !flatRemoveNodes.some(node => node.key === every.key)))
          Cacher.treeData.splice(0, Cacher.treeData.length, ...Cacher.treeData.filter(every => !flatRemoveNodes.some(node => node.key === every.key)))

          loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => !flatRemoveNodes.some(node => node.key === key)))
          loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => !flatRemoveNodes.some(node => node.key === key)))
          loadKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          loadedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          if (loadKeys.includes(parentTreeNode.key)) {
            const parentKey = parentTreeNode.key
            const childNodes = childTreeNodes.value[parentKey]
            const childKeys = (childNodes || []).map(node => node.key)
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentKey && !childKeys.includes(key)))
          }

          if (loadedKeys.includes(parentTreeNode.key)) {
            const parentKey = parentTreeNode.key
            const childNodes = childTreeNodes.value[parentKey]
            const childKeys = (childNodes || []).map(node => node.key)
            loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => key !== parentKey && !childKeys.includes(key)))
          }

          if (helper.isNotEmptyArray(parentTreeNode.referenceSourceNode[childrenKey])) {
            parentTreeNode.referenceSourceNode[childrenKey] = parentTreeNode.referenceSourceNode[childrenKey].filter((child: any) => !rightRemoveNodes.some(node => node.key === child.key))
          }

          if (!helper.isNotEmptyArray(parentTreeNode.referenceSourceNode[childrenKey])) {
            if (Object.hasOwn(parentTreeNode.referenceSourceNode, childrenKey)) {
              delete parentTreeNode.referenceSourceNode[childrenKey]
            }
          }

          loadKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
          loadedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))

          parentTreeNode.children.splice(0, parentTreeNode.children.length, ...parentTreeNode.children.filter(every => !rightRemoveNodes.some(node => node.key === every.key)))
          parentTreeNode.isLeaf = parentTreeNode.children.length === 0
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !flatRemoveNodes.some(remove => remove.key === every.key)))
        }

        if (!helper.isNotEmptyObject(parentTreeNode)) {
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
          Stater.halfCheckedKeys.splice(0, Stater.halfCheckedKeys.length, ...Stater.halfCheckedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        }

        Methoder.cleanTreeStater(force)
        Methoder.doTreeSelected([...Stater.selectedKeys])
        Methoder.doTreeOnlyChecked([...Stater.checkedKeys])
        Methoder.doTreeOnlyExpanded([...Stater.expandedKeys])

        context.emit('update:treeData', [...Cacher.treeData])

        return
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
          const isLeaf: boolean = !helper.isNotEmptyArray(children) && node.isLeaf !== false

          const newNode: STreeTargetNode = {
            scopedSlots: {
              icon: level === 1 ? 'iconRoot' : !isLeaf ? 'iconParent' : 'iconLeaf',
              title: level === 1 ? 'titleRoot' : !isLeaf ? 'titleParent' : 'titleLeaf'
            },
            key: key,
            icon: helper.isString(icon) && isIconType(icon) ? <SIcon type={icon}/> : null,
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
          const node = Stater.flatTreeNodes.find(node => node.key === key)
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
            const isAsyncNode = expandedNode && expandedNode.isLeaf === false && helper.isFunction(props.loadData)
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

          expandedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(node => node.key === a) -
            flatTreeNodes.findIndex(node => node.key === b)
          ))
        }
      },

      doTreeAllCollapsed() {
        if (Stater.expandedKeys.length > 0) {
          const expandedKeys = Stater.expandedKeys
          const linkTreeNodes = Stater.linkTreeNodes
          const delExpandedKeys = Stater.expandedKeys.filter(key => props.allowUnExpanded || linkTreeNodes.length !== 1 || !linkTreeNodes.some(node => node.key === key))

          expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => !delExpandedKeys.includes(key)))
        }
      },

      doTreeToggleExpanded(keys) {
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

        Methoder.doTreeOnlyExpanded(expandedKeys)
      },

      doTreeOnlyExpanded(keys) {
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
            const isAsyncNode = firstNode && firstNode.isLeaf === false && helper.isFunction(props.loadData)
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
              const isAsyncNode = firstNode && firstNode.isLeaf === false && helper.isFunction(props.loadData)
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
      },

      doTreePushExpanded(keys) {
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
            const isAsyncNode = firstNode && firstNode.isLeaf === false && helper.isFunction(props.loadData)
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
              const isAsyncNode = firstNode && firstNode.isLeaf === false && helper.isFunction(props.loadData)
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
      },

      doTreePopExpanded(keys) {
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
      },

      doTreeAllChecked() {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        Methoder.doTreePushChecked(Stater.linkTreeNodes.map(node => node.key))
      },

      doTreeAllUnChecked() {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        Methoder.doTreePopChecked(Stater.linkTreeNodes.map(node => node.key))
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
        const oldKeepCheckedNodes = flatTreeNodes.filter(every => checkedKeys.some(key => every.key === key) && (every.disabled || every.disableCheckbox))
        const newKeepCheckedNodes = flatTreeNodes.filter(every => computeKeys.some(key => every.key === key) && !every.disabled && !every.disableCheckbox && every.checkable)
        const oldKeepCheckedKeys = Array.from(new Set(oldKeepCheckedNodes)).map(node => node.key)
        const newKeepCheckedKeys = Array.from(new Set(newKeepCheckedNodes)).map(node => node.key)
        const allKeepCheckedKeys = Array.from(new Set([...oldKeepCheckedKeys, ...newKeepCheckedKeys]))

        if (!helper.isNotEmptyArray(allKeepCheckedKeys)) {
          checkedKeys.splice(0, checkedKeys.length)
        }

        if (helper.isNotEmptyArray(allKeepCheckedKeys)) {
          allKeepCheckedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(node => node.key === a) -
            flatTreeNodes.findIndex(node => node.key === b)
          ))

          while (newKeepCheckedKeys.length > 0) {
            const filterKey = newKeepCheckedKeys.pop()!
            const childNodes = (childTreeNodes.value[filterKey] || []).filter(node => !node.disabled && !node.disableCheckbox && node.checkable)
            const childKeys = childNodes.map(node => node.key)

            if (!childKeys.every(key => allKeepCheckedKeys.includes(key))) {
              allKeepCheckedKeys.splice(0, allKeepCheckedKeys.length, ...allKeepCheckedKeys.filter(key => key !== filterKey))
            }
          }

          checkedKeys.splice(0, checkedKeys.length, ...allKeepCheckedKeys)
        }

        Methoder.cleanTreeStater(false, ['checked'])
        Methoder.resetTreeStater(false, ['checked'])
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
        const childTreeNodes = Stater.childTreeNodes

        const addCheckedNodes = flatTreeNodes.filter(every => computeKeys.some(key => every.key === key))
        const addCheckedKeys = addCheckedNodes.map(node => node.key)

        for (const addKey of [...addCheckedKeys]) {
          addCheckedKeys.push(...(childTreeNodes.value[addKey] || []).map(child => child.key))
        }

        Methoder.doTreeOnlyChecked(Array.from(new Set([...checkedKeys, ...addCheckedKeys])))
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
        const childTreeNodes = Stater.childTreeNodes

        const delCheckedNodes = flatTreeNodes.filter(every => computeKeys.some(key => every.key === key))
        const delCheckedKeys = delCheckedNodes.map(node => node.key)

        for (const delKey of [...delCheckedKeys]) {
          delCheckedKeys.push(...(childTreeNodes.value[delKey] || []).map(child => child.key))
        }

        Methoder.doTreeOnlyChecked(checkedKeys.filter(key => !delCheckedKeys.includes(key)))
      },

      doTreeSelected(keys) {
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
              ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpanded(expandedKeys.filter(key => key !== newSelectedKey && !childKeys.includes(key)))
              : props.allowAutoExpanded && Methoder.doTreeOnlyExpanded([...expandedKeys, newSelectedKey])
          }

          if (newSelectedKey && newSelectedNode && !newSelectedNode.disabled && !newSelectedNode.disableCheckbox && newSelectedNode.checkable) {
            checkedKeys.includes(newSelectedKey)
              ? Methoder.doTreeOnlyChecked(checkedKeys.filter(key => {
                const children = childTreeNodes.value[newSelectedKey].map(child => child.key)
                const parents = parentTreeNodes.value[newSelectedKey].map(parent => parent.key)
                return key !== newSelectedKey && !parents.includes(key) && !children.includes(key)
              }))
              : Methoder.doTreeOnlyChecked([
                newSelectedKey,
                ...checkedKeys,
                ...childTreeNodes.value[newSelectedKey].map(child => child.key)
              ])
          }

          return
        }

        if (!props.selectable && !newSelectedKey) {
          if (oldSelectedKey) {
            const childNodes = childTreeNodes.value[oldSelectedKey] || []
            const childKeys = childNodes.map(node => node.key)

            expandedKeys.includes(oldSelectedKey)
              ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpanded(expandedKeys.filter(key => key !== oldSelectedKey && !childKeys.includes(key)))
              : props.allowAutoExpanded && Methoder.doTreeOnlyExpanded([...expandedKeys, oldSelectedKey])
          }

          return
        }

        if (!props.selectable && newSelectedKey) {
          const childNodes = childTreeNodes.value[newSelectedKey] || []
          const childKeys = childNodes.map(node => node.key)

          expandedKeys.includes(newSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpanded(expandedKeys.filter(key => key !== newSelectedKey && !childKeys.includes(key)))
            : props.allowAutoExpanded && Methoder.doTreeOnlyExpanded([...expandedKeys, newSelectedKey])

          return
        }

        if (newSelectedKey && (newSelectedNode.isSelectable === false || newSelectedNode.disabled === true)) {
          const childNodes = childTreeNodes.value[newSelectedKey] || []
          const childKeys = childNodes.map(node => node.key)

          expandedKeys.includes(newSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpanded(expandedKeys.filter(key => key !== newSelectedKey && !childKeys.includes(key)))
            : props.allowAutoExpanded && Methoder.doTreeOnlyExpanded([...expandedKeys, newSelectedKey])

          return
        }

        if (!newSelectedKey && oldSelectedKey && (oldSelectedNode.isSelectable === false || oldSelectedNode.disabled === true)) {
          const childNodes = childTreeNodes.value[oldSelectedKey] || []
          const childKeys = childNodes.map(node => node.key)

          expandedKeys.includes(oldSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreeOnlyExpanded(expandedKeys.filter(key => key !== oldSelectedKey && !childKeys.includes(key)))
            : props.allowAutoExpanded && Methoder.doTreeOnlyExpanded([...expandedKeys, oldSelectedKey])

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
            ? props.allowAutoCollapsed && nowSameSelectedKey && Methoder.doTreeOnlyExpanded(expandedKeys.filter(key => key !== nowFirstSelectedKey && !childKeys.includes(key)))
            : props.allowAutoExpanded && Methoder.doTreeOnlyExpanded([...expandedKeys, nowFirstSelectedKey])
        }

        if (!nowFirstSelectedKey) {
          if (oldSelectedKey && expandedKeys.includes(oldSelectedKey)) {
            const childNodes = childTreeNodes.value[oldSelectedKey] || []
            const childKeys = childNodes.map(node => node.key)

            props.allowAutoCollapsed && Methoder.doTreeOnlyExpanded(expandedKeys.filter(key => key !== oldSelectedKey && !childKeys.includes(key)))
          }
        }

        Methoder.cleanTreeStater(false, ['selected'])
        Methoder.resetTreeStater(false, ['selected'])
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

        Methoder.doTreeOnlyExpanded(Array.from(new Set(keys)))
      },

      doEventSelect(keys) {
        if (props.disabled === true) {
          return
        }

        if (helper.isNotEmptyObject(keys)) {
          keys = keys.selected
        }

        Methoder.doTreeSelected(keys)
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

        const delCheckedNodes = flatTreeNodes.filter(every => checkedKeys.some(key => every.key === key) && !computeKeys.some(key => every.key === key))
        const addCheckedNodes = flatTreeNodes.filter(every => !checkedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
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

            const doSuccess = (nodes: any) => {
              loadedKeys.includes(key) || loadedKeys.push(key)
              loadKeys.includes(key) && loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(filter))
              loadKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
              loadedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))

              Methoder.appendTreeNodes(nodes, { key })

              if (!parentTreeNodes.value[key] || parentTreeNodes.value[key].every(node => expandedKeys.includes(node.key))) {
                Methoder.doTreeOnlyExpanded([key, ...expandedKeys])
              }
            }

            const doError = (_: any) => {
              loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(filter))
              loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(filter))
              expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(filter))
              loadKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
              loadedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
            }

            const options = {
              expandedKeys: Stater.expandedKeys,
              outCheckedKeys: Stater.outCheckedKeys,
              selectedKeys: props.selectedMode === 'link' ? Targeter.selectedLinkNodes.map(node => node.key) : Targeter.selectedNodes.map(node => node.key),
              checkedKeys: props.checkedMode === 'link' ? Targeter.checkedLinkNodes.map(node => node.key) : Targeter.checkedNodes.map(node => node.key)
            }

            promises.push(
              Promise.resolve(loadTreeNodes(loadNode.referenceSourceNode, options))
                .then(nodes => doSuccess(nodes))
                .catch(error => doError(error))
            )
          }
        }

        return Promise.all(promises)
      },

      forceUpdate(clean) {
        Methoder.resetTreeNodes([...Stater.propTreeNodes], clean)
      }
    }

    const Transformer: STreeTransformer = {
      resetPropTreeData: () => {
        if (Cacher.treeData.length !== props.treeData.length || !Cacher.treeData.every((cacheNode, index) => cacheNode === toRaw(props.treeData[index]))) {
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...Cacher.treeData)
          context.emit('update:treeData', [...Cacher.treeData])
        }
      },
      resetPropCheckedKeys: () => {
        const propCheckedKeys = props.checkedKeys.filter(key => !Stater.outCheckedKeys.includes(key))
        const newCheckedKeys = props.checkedMode === 'link' ? [...Targeter.checkedLinkNodes.map(node => node.key)] : [...Targeter.checkedNodes.map(node => node.key)]
        const allCheckedKeys = Array.from(new Set([...newCheckedKeys, ...Stater.outCheckedKeys]))

        if (!newCheckedKeys.every((key, index) => propCheckedKeys[index] === key) || !propCheckedKeys.every((key, index) => newCheckedKeys[index] === key)) {
          Cacher.checkedKeys.splice(0, Cacher.checkedKeys.length, ...allCheckedKeys)
          context.emit('update:checkedKeys', [...allCheckedKeys])

          context.emit('check', {
            checkedKeys: allCheckedKeys,
            delCheckedKeys: propCheckedKeys.filter(key => !newCheckedKeys.includes(key)),
            addCheckedKeys: newCheckedKeys.filter(key => !propCheckedKeys.includes(key))
          })
        }
      },
      resetPropSelectedKeys: () => {
        const propSelectedKeys = props.selectedKeys
        const newSelectedKeys = props.selectedMode === 'link'
          ? [...Targeter.selectedLinkNodes.map(node => node.key)]
          : [...Targeter.selectedNodes.map(node => node.key)]

        if (!newSelectedKeys.every((key, index) => propSelectedKeys[index] === key) || !propSelectedKeys.every((key, index) => newSelectedKeys[index] === key)) {
          Cacher.selectedKeys.splice(0, Cacher.selectedKeys.length, ...newSelectedKeys)
          context.emit('update:selectedKeys', [...newSelectedKeys])

          context.emit('select', {
            selectedKeys: newSelectedKeys,
            delSelectedKeys: propSelectedKeys.filter(key => !newSelectedKeys.includes(key)),
            addSelectedKeys: newSelectedKeys.filter(key => !propSelectedKeys.includes(key))
          })
        }
      },
      resetPropExpandedKeys: () => {
        const propExpandedKeys = props.expandedKeys
        const newExpandedKeys = Stater.expandedKeys

        if (!newExpandedKeys.every((key, index) => propExpandedKeys[index] === key) || !propExpandedKeys.every((key, index) => newExpandedKeys[index] === key)) {
          Cacher.expandedKeys.splice(0, Cacher.expandedKeys.length, ...newExpandedKeys)
          context.emit('update:expandedKeys', [...newExpandedKeys])

          context.emit('expand', {
            expandedKeys: newExpandedKeys,
            delExpandedKeys: propExpandedKeys.filter(key => !newExpandedKeys.includes(key)),
            addExpandedKeys: newExpandedKeys.filter(key => !propExpandedKeys.includes(key))
          })
        }
      },

      resetStaterCheckedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const cacheCheckedKeys = Cacher.checkedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const outCheckedKeys = props.checkedKeys.filter(key => !flatTreeNodes.some(node => node.key === key))
        const propCheckedKeys = props.checkedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const helpCheckedKeys = props.checkedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const propCheckedNodes = propCheckedKeys.map(key => flatTreeNodes.find(node => node.key === key)!)
        const helpCheckedNodes = helpCheckedKeys.map(key => flatTreeNodes.find(node => node.key === key)!)

        cacheCheckedKeys.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b)))
        propCheckedNodes.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key)))
        helpCheckedNodes.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key)))
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

        if (!propCheckedNodes.every((prop, index) => cacheCheckedKeys[index] === prop.key) || !cacheCheckedKeys.every((key, index) => propCheckedNodes[index]?.key === key)) {
          Cacher.checkedKeys.splice(0, Cacher.checkedKeys.length, ...propCheckedNodes.map(node => node.key), ...outCheckedKeys)
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...propCheckedNodes.map(node => node.key), ...outCheckedKeys)
        }
      },
      resetStaterSelectedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const cacheSelectedKeys = Cacher.selectedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const propSelectedKeys = props.selectedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const helpSelectedKeys = props.selectedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const propSelectedNodes = propSelectedKeys.map(key => flatTreeNodes.find(node => node.key === key)!)
        const helpSelectedNodes = helpSelectedKeys.map(key => flatTreeNodes.find(node => node.key === key)!)

        cacheSelectedKeys.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b)))
        propSelectedNodes.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key)))
        helpSelectedNodes.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a.key) - flatTreeNodes.findIndex(node => node.key === b.key)))

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

        if (!propSelectedNodes.every((prop, index) => cacheSelectedKeys[index] === prop.key) || !cacheSelectedKeys.every((key, index) => propSelectedNodes[index]?.key === key)) {
          Cacher.selectedKeys.splice(0, Cacher.selectedKeys.length, ...propSelectedNodes.map(node => node.key))
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...propSelectedNodes.map(node => node.key))
        }
      },
      resetStaterExpandedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const propExpandedKeys = props.expandedKeys.filter(key => flatTreeNodes.some(node => node.key === key))
        const cacheExpandedKeys = Cacher.expandedKeys.filter(key => flatTreeNodes.some(node => node.key === key))

        propExpandedKeys.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b)))
        cacheExpandedKeys.sort((a, b) => (flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b)))

        if (!propExpandedKeys.every((key, index) => cacheExpandedKeys[index] === key) || !cacheExpandedKeys.every((key, index) => propExpandedKeys[index] === key)) {
          Cacher.expandedKeys.splice(0, Cacher.expandedKeys.length, ...propExpandedKeys)
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length, ...propExpandedKeys)
        }
      },
      resetStaterLinkTreeNodes: force => {
        if (props.treeData.length !== Cacher.treeData.length || !props.treeData.every((propNode, index) => toRaw(propNode) === Cacher.treeData[index])) {
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...toRaw(props.treeData))
          Cacher.treeData.splice(0, Cacher.treeData.length, ...toRaw(props.treeData))
          Methoder.resetTreeNodes(Stater.propTreeNodes, force)
        }
      }
    }

    const RenderTreeContainer = (_: any, ctx: SetupContext) => {
      return (
        <section
          ref={Cacher.treeContainer}
          class='s-tree-container'
        >
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
          class={context.attrs.class}
          style={context.attrs.style}
          treeData={[...Stater.linkTreeNodes]}
          expandedKeys={[...Stater.expandedKeys]}
          selectedKeys={[...Stater.selectedKeys]}
          checkedKeys={{ checked: Stater.checkedKeys, halfChecked: Stater.halfCheckedKeys }}
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
          checkStrictly={true}
          draggable={false}
          multiple={false}
          v-slots={slots}
        />
      )
    }

    const RenderTreeSwitcherIcon = (node: STreeTargetNode, ctx: SetupContext) => {
      const icon = Methoder.renderSwitcher(node)
      const onClick = (event: MouseEvent) => {
        if (icon !== 'LoadingOutlined') {
          Methoder.triggerSwitcher(node)
        }
        event.stopPropagation()
      }
      return isIconType(icon) ? <SIcon type={icon} style='cursor: pointer;' class={{ 'ant-tree-switcher-icon': icon === 'CaretDownOutlined' }} onClick={onClick}/> : null
    }

    const RenderTreeNodeIcon = (node: STreeTargetNode, ctx: SetupContext) => {
      if (node.scopedSlots.icon === 'iconRoot') {
        return helper.isFunction(ctx.slots.iconRoot) ? ctx.slots.iconRoot(node.referenceSourceNode) : <SIcon type={isIconType(node.icon) ? node.icon : 'AppstoreOutlined'}/>
      }

      if (node.scopedSlots.icon === 'iconParent') {
        return helper.isFunction(ctx.slots.iconParent) ? ctx.slots.iconParent(node.referenceSourceNode) : <SIcon type={isIconType(node.icon) ? node.icon : 'ApartmentOutlined'}/>
      }

      if (node.scopedSlots.icon === 'iconLeaf') {
        return helper.isFunction(ctx.slots.iconLeaf) ? ctx.slots.iconLeaf(node.referenceSourceNode) : <SIcon type={isIconType(node.icon) ? node.icon : 'ApartmentOutlined'}/>
      }
    }

    const RenderTreeNodeTitle = (node: STreeTargetNode, ctx: SetupContext) => {
      const RenderTreeNodeTitleRootLabel = (node: Omit<STreeTargetNode, 'key'>, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleRootLabel)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                tooltip={props.tooltip}
                ellipsis={true}
              >
                { ctx.slots.titleRootLabel(node.referenceSourceNode) }
              </SEllipsis>
            </span>
          )
        }

        return (
          <span class='s-tree-title-label'>
            <SEllipsis
              tooltip={props.tooltip}
              ellipsis={true}
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
              { ctx.slots.titleRootButton(node.referenceSourceNode) }
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
                tooltip={props.tooltip}
                ellipsis={true}
              >
                { ctx.slots.titleParentLabel(node.referenceSourceNode) }
              </SEllipsis>
            </span>
          )
        }

        return (
          <span class='s-tree-title-label'>
            <SEllipsis
              tooltip={props.tooltip}
              ellipsis={true}
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
              { ctx.slots.titleParentButton(node.referenceSourceNode) }
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
                tooltip={props.tooltip}
                ellipsis={true}
              >
                { ctx.slots.titleLeafLabel(node.referenceSourceNode) }
              </SEllipsis>
            </span>
          )
        }

        return (
          <span class='s-tree-title-label'>
            <SEllipsis
              tooltip={props.tooltip}
              ellipsis={true}
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
              { ctx.slots.titleLeafButton(node.referenceSourceNode) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      if (node.scopedSlots.title === 'titleRoot') {
        return helper.isFunction(ctx.slots.titleRoot) ? ctx.slots.titleRoot(node.referenceSourceNode) : (
          <span class={['s-tree-title-node', 's-tree-title-root-node', { 's-tree-title-sticky-node': props.sticky === true }]}>
            <RenderTreeNodeTitleRootLabel { ...node } key={undefined} v-slots={ctx.slots}/>
            <RenderTreeNodeTitleRootButton { ...node } key={undefined} v-slots={ctx.slots}/>
          </span>
        )
      }

      if (node.scopedSlots.title === 'titleParent') {
        return helper.isFunction(ctx.slots.titleParent) ? ctx.slots.titleParent(node.referenceSourceNode) : (
          <span class='s-tree-title-node s-tree-title-parent-node'>
            <RenderTreeNodeTitleParentLabel { ...node } key={undefined} v-slots={ctx.slots}/>
            <RenderTreeNodeTitleParentButton { ...node } key={undefined} v-slots={ctx.slots}/>
          </span>
        )
      }

      if (node.scopedSlots.title === 'titleLeaf') {
        return helper.isFunction(ctx.slots.titleLeaf) ? ctx.slots.titleLeaf(node.referenceSourceNode) : (
          <span class='s-tree-title-node s-tree-title-leaf-node'>
            <RenderTreeNodeTitleLeafLabel { ...node } key={undefined} v-slots={ctx.slots}/>
            <RenderTreeNodeTitleLeafButton { ...node } key={undefined} v-slots={ctx.slots}/>
          </span>
        )
      }
    }

    watch([
      () => props.checkable,
      () => props.checkedMode,
      () => props.selectedMode,
      () => [...props.treeData],
      () => [...props.checkedKeys],
      () => [...props.selectedKeys],
      () => [...props.expandedKeys]
    ], (
      [newCheckable, newCheckedMode, newSelectedMode, newTreeNodes, newCheckedKeys, newSelectedKeys, newExpandedKeys]: [boolean, 'link' | 'default', 'link' | 'default', STreeSourceNodes, STreeKeys, STreeKeys, STreeKeys],
      [oldCheckable, oldCheckedMode, oldSelectedMode, oldTreeNodes, oldCheckedKeys, oldSelectedKeys, oldExpandedKeys]: [boolean, 'link' | 'default', 'link' | 'default', STreeSourceNodes, STreeKeys, STreeKeys, STreeKeys]
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
          !newTreeNodes.every((propNode, index) => Cacher.treeData[index] === toRaw(propNode)) ||
          !Cacher.treeData.every((cacheNode, index) => toRaw(newTreeNodes[index]) === cacheNode)
        )
      }

      if (!isReloadTreeStater) {
        isChangeCheckable = newCheckable !== oldCheckable
        isChangeCheckedMode = newCheckedMode !== oldCheckedMode
        isChangeSelectedMode = newSelectedMode !== oldSelectedMode
        isChangeCheckedKeys = newCheckedKeys.length !== Cacher.checkedKeys.length || !newCheckedKeys.every(key => Cacher.checkedKeys.includes(key))
        isChangeSelectedKeys = newSelectedKeys.length !== Cacher.selectedKeys.length || !newSelectedKeys.every(key => Cacher.selectedKeys.includes(key))
        isChangeExpandedKeys = newExpandedKeys.length !== Cacher.expandedKeys.length || !newExpandedKeys.every(key => Cacher.expandedKeys.includes(key))
        isReloadTreeStater = isChangeCheckable || isChangeCheckedMode || isChangeSelectedMode || isChangeCheckedKeys || isChangeSelectedKeys || isChangeExpandedKeys
        isForcedCleanStater = isChangeCheckable
      }

      if (isReloadTreeNodes) {
        Transformer.resetStaterLinkTreeNodes(isForcedCleanStater)
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

    watch(() => props.bgColor, () => {
      const bgColor = props.bgColor
      const treeConatiner = Cacher.treeContainer.value
      treeConatiner?.style.setProperty('--bg-color', bgColor)
    })

    onMounted(() => {
      const bgColor = props.bgColor
      const treeConatiner = Cacher.treeContainer.value
      treeConatiner?.style.setProperty('--bg-color', bgColor)
    })

    context.expose({
      loadKeys: readonly(Stater.loadKeys),
      loadedKeys: readonly(Stater.loadedKeys),

      checkedKeys: readonly(Stater.checkedKeys),
      selectedKeys: readonly(Stater.selectedKeys),
      expandedKeys: readonly(Stater.expandedKeys),
      outCheckedKeys: readonly(Stater.outCheckedKeys),
      halfCheckedKeys: readonly(Stater.halfCheckedKeys),

      selectedNode: readonly(Sourcer.selectedNode),
      selectedNodes: readonly(Sourcer.selectedNodes),
      selectedLinkNode: readonly(Sourcer.selectedLinkNode),
      selectedLinkNodes: readonly(Sourcer.selectedLinkNodes),

      checkedNode: readonly(Sourcer.checkedNode),
      checkedNodes: readonly(Sourcer.checkedNodes),
      checkedHalfNode: readonly(Sourcer.checkedHalfNode),
      checkedHalfNodes: readonly(Sourcer.checkedHalfNodes),
      checkedLinkNode: readonly(Sourcer.checkedLinkNode),
      checkedLinkNodes: readonly(Sourcer.checkedLinkNodes),

      reloadTreeNodes: Methoder.reloadTreeNodes,
      appendTreeNodes: Methoder.appendTreeNodes,
      removeTreeNodes: Methoder.removeTreeNodes,
      lookupTreeNodes: Methoder.lookupTreeNodes,
      spreadTreeNodes: Methoder.spreadTreeNodes,

      doTreeAllExpanded: Methoder.doTreeAllExpanded,
      doTreeAllCollapsed: Methoder.doTreeAllCollapsed,
      doTreeToggleExpanded: Methoder.doTreeToggleExpanded,
      doTreeOnlyExpanded: Methoder.doTreeOnlyExpanded,
      doTreePushExpanded: Methoder.doTreePushExpanded,
      doTreePopExpanded: Methoder.doTreePopExpanded,

      doTreeAllChecked: Methoder.doTreeAllChecked,
      doTreeAllUnChecked: Methoder.doTreeAllUnChecked,
      doTreeToggleChecked: Methoder.doTreeToggleChecked,
      doTreeOnlyChecked: Methoder.doTreeOnlyChecked,
      doTreePushChecked: Methoder.doTreePushChecked,
      doTreePopChecked: Methoder.doTreePopChecked,

      doTreeSelected: Methoder.doTreeSelected,

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
