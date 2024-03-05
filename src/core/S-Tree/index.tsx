import './index.less'
import 'ant-design-vue/es/tree/style/index.less'
import 'ant-design-vue/es/spin/style/index.less'

import * as VueTypes from 'vue-types'
import { SlotsType, ShallowReactive, ShallowRef, shallowReactive, defineComponent, shallowRef, watch, onMounted, toRaw, unref, ref } from 'vue'
import { Key, EventDataNode } from 'ant-design-vue/es/vc-tree/interface'
import SIcon, { isIconType } from '@/S-Icon/index'
import SEllipsis from '@/S-Ellipsis/index'
import ATree from 'ant-design-vue/es/tree'
import ASpin from 'ant-design-vue/es/spin'
import helper from '@/helper'

export interface STreeFilterProps {
  filterField?: 'key' | 'title';
  filterValue: string | number;
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

export interface STreeSourceNode {
  [any: string]: any;
}

export interface STreeTargetNode {
  scopedSlots: {
    icon: string;
    title: string;
  };
  key: Key;
  icon: any;
  level: number;
  title: string;
  titles: string[];
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
  [any: string]: any;
}

export interface STreeTargeter {
  selectedNode: ShallowRef<STreePartTargetNode>;
  selectedLinkNode: ShallowRef<STreePartTargetNode>;
  checkedLinkNode: ShallowRef<STreePartTargetNode>;
  checkedHalfNode: ShallowRef<STreePartTargetNode>;
  checkedNode: ShallowRef<STreePartTargetNode>;

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

  filterField: ShallowRef<'key' | 'title'>;
  filterValue: ShallowRef<string | number>;
}

export interface STreeSourcer {
  selectedNode: ShallowRef<STreePartSourceNode>;
  selectedLinkNode: ShallowRef<STreePartSourceNode>;
  checkedLinkNode: ShallowRef<STreePartSourceNode>;
  checkedHalfNode: ShallowRef<STreePartSourceNode>;
  checkedNode: ShallowRef<STreePartSourceNode>;

  selectedNodes: ShallowReactive<STreeSourceNodes>;
  selectedLinkNodes: ShallowReactive<STreeSourceNodes>;
  checkedLinkNodes: ShallowReactive<STreeSourceNodes>;
  checkedHalfNodes: ShallowReactive<STreeSourceNodes>;
  checkedNodes: ShallowReactive<STreeSourceNodes>;
}

export interface STreeMethoder {
  renderSwitcher: (node: STreeTargetNode) => string;
  triggerSwitcher: (node: STreeTargetNode) => void;

  cleanTreeStater: (force?: boolean, types?: Array<'checked' | 'selected' | 'expanded'>) => void;
  checkTreeStater: (force?: boolean, types?: Array<'checked' | 'selected' | 'expanded'>) => void;
  resetTreeStater: (force?: boolean, types?: Array<'checked' | 'selected' | 'expanded'>) => void;

  resetTreeNodes: (nodes?: STreeSourceNodes, force?: boolean) => void;
  filterTreeNodes: (props: STreeFilterProps, expand?: boolean) => void;
  reloadTreeNodes: (nodes: STreeSourceNodes, parentKey?: STreeKey | null, force?: boolean) => void;
  appendTreeNodes: (nodes: STreeSourceNodes, parentKey?: STreeKey | null, force?: boolean) => void;
  removeTreeNodes: (nodes: STreeSourceNodes, parentKey?: STreeKey | null, force?: boolean) => void;
  changeTreeNodes: (nodes: STreeSourceNodes, parentKey?: STreeKey | null, force?: boolean) => void;
  createTreeNodes: (nodes: STreeSourceNodes, parentNode?: STreeTargetNode | null) => STreeTargetNodes;
  spreadTreeNodes: <T extends STreeSpreadNodes> (nodes: T, level?: number) => T;

  pickUpperTreeNodes: (key: STreeKey, level?: number) => Array<STreeSourceNode>;
  pickLowerTreeNodes: (key: STreeKey, level?: number) => Array<STreeSourceNode>;
  pickMatchTreeNode: (key: STreeKey, level?: number) => STreeSourceNode | null;

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

  doEventDragstart: (info: STreeEventDragstart) => void;
  doEventExpand: (keys: STreeKeys | { expanded: STreeKeys }) => void;
  doEventSelect: (keys: STreeKeys | { selected: STreeKeys }) => void;
  doEventCheck: (keys: STreeKeys | { checked: STreeKeys }) => void;
  doEventDrop: (info: STreeEventDrop) => void;

  doTreeLoad: (keys: STreeKeys) => Promise<void[]>;

  forceUpdate: (clear?: boolean) => void;
}

export interface STreeTransformer {
  resetPropFilters: () => void;
  resetPropCheckedKeys: () => void;
  resetPropSelectedKeys: () => void;
  resetPropExpandedKeys: () => void;

  resetStaterFilters: () => void;
  resetStaterCheckedKeys: () => void;
  resetStaterSelectedKeys: () => void;
  resetStaterExpandedKeys: () => void;
  resetStaterLinkTreeNodes: (force?: boolean) => void;
}

export interface STreeDropHandler {
  (options: {
    reloadNodes: Array<{ parentNode?: STreePartSourceNode | null; rootChildNodes: STreeSourceNodes; oldChildNodes: STreeSourceNodes; newChildNodes: STreeSourceNodes; }>;
    appendNodes: Array<{ parentNode?: STreePartSourceNode | null; rootChildNodes: STreeSourceNodes; appendChildNodes: STreeSourceNodes; }>;
    removeNodes: Array<{ parentNode?: STreePartSourceNode | null; rootChildNodes: STreeSourceNodes; removeChildNodes: STreeSourceNodes; }>;
  }): boolean | void;
}

export interface STreeEventDragstart {
  event: DragEvent;
  node: EventDataNode;
}

export interface STreeEventDrop {
  event: DragEvent;
  node: EventDataNode;
  dragNode: EventDataNode;
  dragNodesKeys: STreeKeys;
  dropPosition: number;
  dropToGap: boolean;
}

export interface STreeEmiterCheck {
  checkedKeys: STreeKeys;
  delCheckedKeys: STreeKeys;
  addCheckedKeys: STreeKeys;
  checkedNode: STreePartSourceNode;
}

export interface STreeEmiterSelect {
  selectedKeys: STreeKeys;
  delSelectedKeys: STreeKeys;
  addSelectedKeys: STreeKeys;
  selectedNode: STreePartSourceNode;
}

export interface STreeEmiterExpand {
  expandedKeys: STreeKeys;
  delExpandedKeys: STreeKeys;
  addExpandedKeys: STreeKeys;
  expandedNode: STreePartSourceNode;
}

export interface STreeEmiterChange {
  type: 'reload' | 'append' | 'remove' | 'change';
  reloadNodes: Array<{ parentNode?: STreePartSourceNode | null; rootChildNodes: STreeSourceNodes; oldChildNodes: STreeSourceNodes; newChildNodes: STreeSourceNodes; }>;
  appendNodes: Array<{ parentNode?: STreePartSourceNode | null; rootChildNodes: STreeSourceNodes; appendChildNodes: STreeSourceNodes }>;
  removeNodes: Array<{ parentNode?: STreePartSourceNode | null; rootChildNodes: STreeSourceNodes; removeChildNodes: STreeSourceNodes }>;
  loadedKeys: STreeKeys;
  loadKeys: STreeKeys;
}

export interface STreeLoadData<T = STreeSourceNode> {
  (treeNode: T, options?: { loadKeys: STreeKeys, loadedKeys: STreeKeys, checkedKeys: STreeKeys; outCheckedKeys: STreeKeys; selectedKeys: STreeKeys; expandedKeys: STreeKeys; }): Promise<STreeSourceNodes>;
}

export type STreeKey = Key
export type STreeKeys = Key[]
export type STreeSourceNodes = STreeSourceNode[]
export type STreeTargetNodes = STreeTargetNode[]
export type STreeSpreadNodes = STreeTargetNodes | STreeSourceNodes
export type STreePartTargetNode = STreeTargetNode | null
export type STreePartSourceNode = STreeSourceNode | null

type STreeDefineMethods = Pick<STreeMethoder,
  'reloadTreeNodes' |
  'appendTreeNodes' |
  'removeTreeNodes' |
  'changeTreeNodes' |
  'filterTreeNodes' |
  'pickUpperTreeNodes' |
  'pickLowerTreeNodes' |
  'pickMatchTreeNode' |
  'doTreeAllExpanded' |
  'doTreeAllCollapsed' |
  'doTreeToggleExpanded' |
  'doTreeOnlyExpanded' |
  'doTreePushExpanded' |
  'doTreePopExpanded' |
  'doTreeAllChecked' |
  'doTreeAllUnChecked' |
  'doTreeToggleChecked' |
  'doTreeOnlyChecked' |
  'doTreePushChecked' |
  'doTreePopChecked' |
  'doTreeSelected' |
  'forceUpdate'
>

type STreeDefineSlots = SlotsType<{
  icon: STreeSourceNode;
  iconRoot: STreeSourceNode;
  iconParent: STreeSourceNode;
  iconLeaf: STreeSourceNode;

  title: STreeSourceNode;
  titleRoot: STreeSourceNode;
  titleParent: STreeSourceNode;
  titleLeaf: STreeSourceNode;

  titleRootLabel: STreeSourceNode;
  titleParentLabel: STreeSourceNode;
  titleLeafLabel: STreeSourceNode;

  titleRootButton: STreeSourceNode;
  titleParentButton: STreeSourceNode;
  titleLeafButton: STreeSourceNode;

  switcherIcon: STreeSourceNode & {
    switcherCls: string
  };
}>

export const STree = defineComponent({
  name: 'STree',
  inheritAttrs: true,
  props: {
    bgColor: VueTypes.string().def('transparent'),
    treeData: VueTypes.array<STreeSourceNode>().def(() => []),
    loadData: VueTypes.func<STreeLoadData>().def(undefined),
    dropHandler: VueTypes.func<STreeDropHandler>().def(undefined),
    checkedKeys: VueTypes.array<string | number>().def(() => []),
    selectedKeys: VueTypes.array<string | number>().def(() => []),
    expandedKeys: VueTypes.array<string | number>().def(() => []),
    selectedMode: VueTypes.string<'link' | 'default'>().def('default'),
    checkedMode: VueTypes.string<'link' | 'default'>().def('default'),
    filterField: VueTypes.string<'key' | 'title'>().def('title'),
    filterValue: VueTypes.any<string | number>().def(''),
    replaceFields: VueTypes.object<STreeFieldNames>().def(() => ({})),
    allowCheckedLevel: VueTypes.any<number | Function>().def(1),
    allowSelectedLevel: VueTypes.any<number | Function>().def(1),
    forceCleanWhenNotInTreeNodes: VueTypes.bool().def(false),
    forceCleanWhenRemoveTreeNode: VueTypes.bool().def(true),
    forceApplyDisableCheckbox: VueTypes.bool().def(false),
    forceApplyDisabled: VueTypes.bool().def(false),
    alwaysShowTitleButton: VueTypes.bool().def(false),
    allowSelectToCheck: VueTypes.bool().def(false),
    allowAutoCollapsed: VueTypes.bool().def(true),
    allowMultiExpanded: VueTypes.bool().def(true),
    allowAutoExpandLoad: VueTypes.bool().def(false),
    allowAutoExpanded: VueTypes.bool().def(true),
    defaultExpandAll: VueTypes.bool().def(false),
    allowUnExpanded: VueTypes.bool().def(false),
    allowUnSelected: VueTypes.bool().def(false),
    allowUnChecked: VueTypes.bool().def(true),
    selectable: VueTypes.bool().def(true),
    checkable: VueTypes.bool().def(false),
    blockNode: VueTypes.bool().def(false),
    draggable: VueTypes.bool().def(false),
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
    'change': (emiter: STreeEmiterChange) => true,
    'update:treeData': (trees: STreeSourceNode) => true,
    'update:filterField': (field: 'key' | 'title') => true,
    'update:filterValue': (value: string | number) => true,
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
      propTreeNodes: shallowReactive([]),

      filterField: shallowRef('title'),
      filterValue: shallowRef('')
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
        const expandedKeys = Stater.expandedKeys

        const isLeafedNode = node.isLeaf === true
        const isAsyncedNode = !isLeafedNode && helper.isFunction(props.loadData)
        const isLoadingNode = loadKeys.includes(node.key)

        if (isAsyncedNode && isLoadingNode) {
          return 'LoadingOutlined'
        }

        if (props.showLine) {
          if (helper.isNonEmptyArray(node.children) || (isAsyncedNode && !isLoadingNode)) {
            return !expandedKeys.includes(node.key) ? 'PlusSquareOutlined' : 'MinusSquareOutlined'
          }
          return 'FileOutlined'
        }

        if (helper.isNonEmptyArray(node.children) || (isAsyncedNode && !isLoadingNode)) {
          return 'CaretDownOutlined'
        }

        return ''
      },

      triggerSwitcher(node) {
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes

        if (flatTreeNodes.some(every => every.key === node.key)) {
          expandedKeys.includes(node.key)
            ? Methoder.doTreePopExpanded([node.key])
            : Methoder.doTreePushExpanded([node.key])
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
        const flatTreeNodes = Stater.flatTreeNodes
        const outCheckedKeys = Stater.outCheckedKeys
        const halfCheckedKeys = Stater.halfCheckedKeys
        const forceCleanWhenRemoveTreeNode = props.forceCleanWhenRemoveTreeNode
        const forceCleanWhenNotInTreeNodes = props.forceCleanWhenNotInTreeNodes

        if (forceCleanWhenRemoveTreeNode !== false) {
          if (!types || types.includes('checked')) {
            checkedKeys.splice(0, Stater.checkedKeys.length, ...checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
            halfCheckedKeys.splice(0, Stater.halfCheckedKeys.length, ...halfCheckedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          }

          if (!types || types.includes('selected')) {
            selectedKeys.splice(0, Stater.selectedKeys.length, ...selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          }

          if (!types || types.includes('expanded')) {
            expandedKeys.splice(0, Stater.expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          }
        }

        if (!types || types.includes('checked')) {
          const linkAllCheckedKeys = Array.from(new Set([...checkedKeys, ...halfCheckedKeys, ...outCheckedKeys]))
          const selfAllCheckedKeys = Array.from(new Set([...checkedKeys, ...outCheckedKeys]))

          halfCheckedKeys.splice(0, halfCheckedKeys.length)
          outCheckedKeys.splice(0, outCheckedKeys.length, ...linkAllCheckedKeys.filter(key => !forceCleanWhenNotInTreeNodes && !flatTreeNodes.some(every => every.key === key)))
          checkedKeys.splice(0, checkedKeys.length, ...selfAllCheckedKeys.filter(key => flatTreeNodes.some(every => every.key === key && (every.disabled || every.disableCheckbox || every.checkable))))

          checkedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
          outCheckedKeys.splice(0, outCheckedKeys.length, ...Array.from(new Set(outCheckedKeys)))
          checkedKeys.splice(0, checkedKeys.length, ...Array.from(new Set(checkedKeys)))
        }

        if (!types || types.includes('selected')) {
          selectedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
          selectedKeys.splice(0, selectedKeys.length, ...selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key && (!every.disabled && every.isSelectable))))
          selectedKeys.splice(0, selectedKeys.length, ...Array.from(new Set(selectedKeys)))
        }

        if (!types || types.includes('expanded')) {
          expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNonEmptyArray(every.children))))
          expandedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
          expandedKeys.splice(0, expandedKeys.length, ...Array.from(new Set(expandedKeys)))
        }
      },

      checkTreeStater(force, types) {
        if (!types || types.includes('checked')) {
          Methoder.doTreeOnlyChecked([...Stater.checkedKeys, ...Stater.outCheckedKeys])
        }
        if (!types || types.includes('selected')) {
          Methoder.doTreeSelected([...Stater.selectedKeys])
        }
        if (!types || types.includes('expanded')) {
          Methoder.doTreeOnlyExpanded([...Stater.expandedKeys])
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
          halfCheckedKeys.splice(0, halfCheckedKeys.length)
          checkedLinkNodes.splice(0, checkedLinkNodes.length)
          checkedHalfNodes.splice(0, checkedHalfNodes.length)

          checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
          checkedNodes.push(...checkedKeys.map(key => flatTreeNodes.find(every => every.key === key)!))

          // 核心逻辑
          if (helper.isNonEmptyArray(checkedNodes)) {
            let upHandleNodes = [...checkedNodes]
            let downHandleNodes = [...checkedNodes]

            // 向下处理 - push child key
            if (helper.isNonEmptyArray(downHandleNodes)) {
              while (downHandleNodes.length > 0) {
                const downNode = downHandleNodes.shift()!
                const childNodes = childTreeNodes.value[downNode.key] || []
                !downNode.disabled && !downNode.disableCheckbox && upHandleNodes.push(...childNodes.filter(child => !child.disabled && !child.disableCheckbox && child.checkable && !upHandleNodes.some(node => node === child)))
                downHandleNodes = downHandleNodes.filter(node => !childNodes.some(child => node === child))
              }
            }

            // 向上处理 - push parent key
            if (helper.isNonEmptyArray(upHandleNodes)) {
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

                  if (childNodes.every(child => checkedNodes.some(node => node === child))) {
                    if (!parent.disabled && !parent.disableCheckbox && parent.checkable && !checkedNodes.some(node => node === parent)) {
                      checkedNodes.push(parent)
                    }
                  } else {
                    if (childNodes.some(child => checkedNodes.some(node => node === child))) {
                      checkedHalfNodes.push(...parentNodes.filter(node => !checkedHalfNodes.some(half => node === half)))
                    }
                    checkedNodes.splice(0, checkedNodes.length, ...checkedNodes.filter(node => node.disabled || node.disableCheckbox || (node.checkable && !parentKeys.includes(node.key))))
                  }

                  if (!upHandleNodes.some(node => node === parent)) {
                    upHandleNodes.push(parent)
                  }

                  tempUpNodes = tempUpNodes.filter(temp => !children.some(child => child === temp))
                }

                if (helper.isNonEmptyArray(tempUpNodes)) {
                  tempUpNode = tempUpNodes.pop()
                } else if (helper.isNonEmptyArray(upHandleNodes)) {
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
            checkedNodes.sort((a, b) => flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b))
          }

          if (helper.isArray(checkedHalfNodes)) {
            checkedHalfNodes.sort((a, b) => flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b))
          }

          if (helper.isArray(checkedLinkNodes)) {
            checkedLinkNodes.push(...checkedNodes, ...checkedHalfNodes)
            checkedLinkNodes.sort((a, b) => flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b))
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
          if (helper.isNonEmptyArray(selectedNodes)) {
            if (props.checkable && props.allowSelectToCheck) {
              selectedNodes.splice(0, selectedNodes.length)
            }

            if (!props.checkable || !props.allowSelectToCheck) {
              const upHandleNode = flatTreeNodes.find(every => !every.disabled && every.isSelectable && selectedNodes.some(node => node === every))
              const parentNodes = upHandleNode && (parentTreeNodes.value[upHandleNode.key] || []).filter(every => !every.disabled && every.isSelectable)

              if (upHandleNode && !helper.isNonEmptyArray(parentNodes)) {
                selectedLinkNodes.push(upHandleNode)
              }

              if (upHandleNode && helper.isNonEmptyArray(parentNodes)) {
                selectedLinkNodes.push(...parentNodes, upHandleNode)
              }
            }
          }

          // 排序逻辑
          if (helper.isArray(selectedNodes)) {
            selectedNodes.sort((a, b) => flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b))
          }

          if (helper.isArray(selectedLinkNodes)) {
            selectedLinkNodes.sort((a, b) => flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b))
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
            expandedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
          }

          if (helper.isArray(selectedLinkNodes)) {
            selectedLinkNodes.sort((a, b) => flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b))
          }
        }
      },

      resetTreeNodes(nodes, force) {
        if (!helper.isArray(nodes)) {
          nodes = Stater.propTreeNodes
        }

        nodes = nodes.map(node => toRaw(node))

        const filterField = Stater.filterField
        const filterValue = Stater.filterValue
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const findAppendNodes = Methoder.createTreeNodes(nodes, null)
        const flatAppendNodes = Methoder.spreadTreeNodes(findAppendNodes, Infinity)

        linkTreeNodes.splice(0, linkTreeNodes.length)
        flatTreeNodes.splice(0, flatTreeNodes.length)

        Cacher.treeData.splice(0, Cacher.treeData.length, ...nodes)
        Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...nodes)

        flatTreeNodes.splice(0, flatTreeNodes.length, ...flatAppendNodes)
        linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))

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

        Methoder.cleanTreeStater(force)
        Methoder.checkTreeStater(force)

        Methoder.filterTreeNodes({
          filterField: filterField.value,
          filterValue: filterValue.value
        })
      },

      filterTreeNodes(props, expand) {
        const expandKeys: STreeKeys = []
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes

        const isAllowExpand = expand !== false
        const isAssertExpand = props.filterField !== Stater.filterField.value || props.filterValue !== Stater.filterValue.value
        const propFilterValue = Stater.filterValue.value = helper.isString(props.filterValue) ? props.filterValue.trim() : props.filterValue
        const propFilterField = Stater.filterField.value = props.filterField === 'key' ? props.filterField : 'title'

        for (const every of flatTreeNodes) {
          every.titles.splice(0, every.titles.length)
        }

        if (helper.isNonEmptyString(propFilterValue) || helper.isFiniteNumber(propFilterValue)) {
          for (const node of flatTreeNodes) {
            const key = node.key
            const title = node.title.trim()
            const regexp = new RegExp(`(.*?)(${propFilterValue})(.*)`)

            if (propFilterField === 'key') {
              const isMatched = propFilterValue === key || +propFilterValue === key
              const parentKeys = parentTreeNodes.value[key] ? parentTreeNodes.value[key].map(node => node.key) : null
              isAllowExpand && isAssertExpand && isMatched && parentKeys && expandKeys.push(...parentKeys)
            }

            if (propFilterField === 'title') {
              if (regexp.test(title)) {
                const partTitle1 = title.replace(regexp, '$1')
                const partTitle2 = title.replace(regexp, '$2')
                const partTitle3 = title.replace(regexp, '$3')
                const parentKeys = parentTreeNodes.value[key]?.map(node => node.key)
                isAllowExpand && isAssertExpand && parentKeys && expandKeys.push(...parentKeys)
                node.titles.push(partTitle1, partTitle2, partTitle3)
              }
            }
          }

          if (!isAllowExpand) {
            Methoder.forceUpdate()
          }
        }

        if (isAllowExpand && isAssertExpand) {
          Methoder.doTreeAllCollapsed()
          Methoder.doTreePushExpanded(Array.from(new Set(expandKeys)))
        }
      },

      reloadTreeNodes(nodes, parentKey, force) {
        const filterField = Stater.filterField
        const filterValue = Stater.filterValue
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const parentTreeNode = helper.isPrimitive(parentKey) ? flatTreeNodes.find(every => every.key === parentKey) : undefined
        const findChildrenNodes = parentTreeNode ? [...parentTreeNode.children] : [...linkTreeNodes]
        const noReloadTreeNode = helper.isPrimitive(parentKey) && !parentTreeNode
        const replaceFieldChildren = props.replaceFields.children || 'children'
        const replaceFieldKey = props.replaceFields.key || 'key'

        if (noReloadTreeNode) {
          return
        }

        nodes = nodes.filter(node => !parentTreeNode || !parentTreeNodes.value[parentTreeNode.key] || !parentTreeNodes.value[parentTreeNode.key].some(parent => parent.key === node[replaceFieldKey]))
        nodes = nodes.filter(node => !parentTreeNode || parentTreeNode.key !== node[replaceFieldKey])
        nodes = nodes.filter(node => !!node[replaceFieldKey] || node[replaceFieldKey] === 0)
        nodes = nodes.map(node => toRaw(node))

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const findAppendNodes = Methoder.createTreeNodes(nodes, parentTreeNode)
        const flatAppendNodes = Methoder.spreadTreeNodes(findAppendNodes, Infinity)

        const newTreeNodes = Methoder.spreadTreeNodes(nodes, Infinity)
        const oldTreeNodes = Methoder.spreadTreeNodes(findChildrenNodes, Infinity)
        const isNeedEmitChange = newTreeNodes.length !== oldTreeNodes.length || !newTreeNodes.every((newNode, index) => newNode === oldTreeNodes[index].referenceSourceNode)

        if (!helper.isNonEmptyObject(parentTreeNode)) {
          loadKeys.splice(0, loadKeys.length)
          loadedKeys.splice(0, loadedKeys.length)
          linkTreeNodes.splice(0, linkTreeNodes.length)
          flatTreeNodes.splice(0, flatTreeNodes.length)

          Cacher.treeData.splice(0, Cacher.treeData.length, ...nodes)
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...nodes)
        }

        if (helper.isNonEmptyObject(parentTreeNode)) {
          const childNodes = childTreeNodes.value[parentTreeNode.key]

          parentTreeNode.isLeaf = findAppendNodes.length === 0
          parentTreeNode.referenceSourceNode[replaceFieldChildren] = nodes
          parentTreeNode.children = findAppendNodes

          parentTreeNode.scopedSlots = {
            icon: parentTreeNode.level === 1 ? 'iconRoot' : helper.isNonEmptyArray(parentTreeNode.children) ? 'iconParent' : 'iconLeaf',
            title: parentTreeNode.level === 1 ? 'titleRoot' : helper.isNonEmptyArray(parentTreeNode.children) ? 'titleParent' : 'titleLeaf'
          }

          if (!helper.isNonEmptyArray(parentTreeNode.referenceSourceNode[replaceFieldChildren])) {
            if (Object.hasOwn(parentTreeNode.referenceSourceNode, replaceFieldChildren)) {
              delete parentTreeNode.referenceSourceNode[replaceFieldChildren]
            }
          }

          loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentTreeNode.key))
          loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => !childNodes?.map(node => node.key).includes(key)))
          loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => !childNodes?.map(node => node.key).includes(key)))

          loadKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
          loadedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
        }

        if (helper.isNonEmptyObject(parentTreeNode)) {
          const presetTreeNodes = (childTreeNodes.value[parentTreeNode.key] || []).filter(child => flatTreeNodes.some(every => every === child))
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !presetTreeNodes.some(child => child === every)))
          flatTreeNodes.splice(flatTreeNodes.findIndex(every => every === parentTreeNode) + 1, 0, ...flatAppendNodes)
          linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
        }

        if (!helper.isNonEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatAppendNodes)
          linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
        }

        if (isNeedEmitChange) {
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

          Methoder.cleanTreeStater(force)
          Methoder.checkTreeStater(force)

          Methoder.filterTreeNodes({
            filterField: filterField.value,
            filterValue: filterValue.value
          })

          context.emit('update:treeData', [...toRaw(unref(Cacher.treeData))])

          context.emit('change', {
            type: 'reload',
            loadKeys: [...loadKeys],
            loadedKeys: [...loadedKeys],
            reloadNodes: [{
              parentNode: parentTreeNode?.referenceSourceNode || null,
              oldChildNodes: findChildrenNodes.map(child => child.referenceSourceNode),
              newChildNodes: (parentTreeNode ? parentTreeNode.children : linkTreeNodes).map(child => child.referenceSourceNode),
              rootChildNodes: linkTreeNodes.map(child => child.referenceSourceNode)
            }],
            appendNodes: [],
            removeNodes: []
          })
        }
      },

      appendTreeNodes(nodes, parentKey, force) {
        const filterField = Stater.filterField
        const filterValue = Stater.filterValue
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const parentTreeNode = helper.isPrimitive(parentKey) ? flatTreeNodes.find(every => every.key === parentKey) : undefined
        const findChildrenNodes = parentTreeNode ? [...parentTreeNode.children] : [...linkTreeNodes]
        const noReloadTreeNode = helper.isPrimitive(parentKey) && !parentTreeNode
        const replaceFieldChildren = props.replaceFields.children || 'children'
        const replaceFieldKey = props.replaceFields.key || 'key'

        if (noReloadTreeNode) {
          return
        }

        nodes = nodes.filter(node => !parentTreeNode || !parentTreeNodes.value[parentTreeNode.key] || !parentTreeNodes.value[parentTreeNode.key].some(parent => parent.key === node[replaceFieldKey]))
        nodes = nodes.filter(node => !findChildrenNodes.some(every => every.key === node[replaceFieldKey]))
        nodes = nodes.filter(node => !parentTreeNode || parentTreeNode.key !== node[replaceFieldKey])
        nodes = nodes.filter(node => !!node[replaceFieldKey] || node[replaceFieldKey] === 0)
        nodes = nodes.map(node => toRaw(node))

        // fix bug: update node change
        // if (!helper.isNonEmptyArray(nodes)) {
        //   return
        // }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const childTreeNodes = Stater.childTreeNodes
        const findAppendNodes = Methoder.createTreeNodes(nodes, parentTreeNode)
        const flatAppendNodes = Methoder.spreadTreeNodes(findAppendNodes, Infinity)
        const isNeedEmitChange = helper.isNonEmptyArray(nodes)

        if (!helper.isNonEmptyObject(parentTreeNode)) {
          Cacher.treeData.push(...nodes)
          Stater.propTreeNodes.push(...nodes)
        }

        if (helper.isNonEmptyObject(parentTreeNode)) {
          parentTreeNode.isLeaf = parentTreeNode.children.length === 0 && findAppendNodes.length === 0
          parentTreeNode.referenceSourceNode[replaceFieldChildren] = parentTreeNode.referenceSourceNode[replaceFieldChildren] || []
          parentTreeNode.referenceSourceNode[replaceFieldChildren].push(...nodes)
          parentTreeNode.children.push(...findAppendNodes)

          parentTreeNode.scopedSlots = {
            icon: parentTreeNode.level === 1 ? 'iconRoot' : helper.isNonEmptyArray(parentTreeNode.children) ? 'iconParent' : 'iconLeaf',
            title: parentTreeNode.level === 1 ? 'titleRoot' : helper.isNonEmptyArray(parentTreeNode.children) ? 'titleParent' : 'titleLeaf'
          }

          loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentTreeNode.key))
          loadKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
          loadedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
        }

        if (helper.isNonEmptyObject(parentTreeNode)) {
          const presetTreeNodes = (childTreeNodes.value[parentTreeNode.key] || []).filter(child => flatTreeNodes.some(every => every === child))
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !presetTreeNodes.some(child => child === every)))
          flatTreeNodes.splice(flatTreeNodes.findIndex(every => every === parentTreeNode) + 1, 0, ...presetTreeNodes, ...flatAppendNodes)
          linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
        }

        if (!helper.isNonEmptyObject(parentTreeNode)) {
          flatTreeNodes.push(...flatAppendNodes)
          linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
        }

        if (isNeedEmitChange) {
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

          Methoder.cleanTreeStater(force)
          Methoder.checkTreeStater(force)

          Methoder.filterTreeNodes({
            filterField: filterField.value,
            filterValue: filterValue.value
          })

          context.emit('update:treeData', [...toRaw(unref(Cacher.treeData))])

          context.emit('change', {
            type: 'append',
            loadKeys: [...loadKeys],
            loadedKeys: [...loadedKeys],
            appendNodes: [{ parentNode: parentTreeNode?.referenceSourceNode || null, rootChildNodes: linkTreeNodes.map(child => child.referenceSourceNode), appendChildNodes: [...nodes] }],
            removeNodes: [],
            reloadNodes: []
          })
        }
      },

      removeTreeNodes(nodes, parentKey, force) {
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const parentTreeNode = helper.isPrimitive(parentKey) ? flatTreeNodes.find(every => every.key === parentKey) : undefined
        const findChildrenNodes = parentTreeNode ? [...parentTreeNode.children] : [...linkTreeNodes]
        const noReloadTreeNode = helper.isPrimitive(parentKey) && !parentTreeNode
        const replaceFieldChildren = props.replaceFields.children || 'children'
        const replaceFieldKey = props.replaceFields.key || 'key'

        if (noReloadTreeNode) {
          return
        }

        nodes = nodes.filter(node => !parentTreeNode || parentTreeNode.key !== node[replaceFieldKey])
        nodes = nodes.filter(node => findChildrenNodes.some(every => every.key === node[replaceFieldKey]))
        nodes = nodes.map(node => flatTreeNodes.find(every => every.key === node[replaceFieldKey])!.referenceSourceNode)
        nodes = nodes.map(node => toRaw(node))

        // fix bug: update node change
        // if (!helper.isNonEmptyArray(nodes)) {
        //   return
        // }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const findTargetRemoveNodes = nodes.map(node => flatTreeNodes.find(every => every.key === node[replaceFieldKey])!)
        const flatTargetRemoveNodes = Methoder.spreadTreeNodes(findTargetRemoveNodes, Infinity)
        const isNeedEmitChange = helper.isNonEmptyArray(flatTargetRemoveNodes)

        if (!helper.isNonEmptyArray(flatTargetRemoveNodes)) {
          return
        }

        if (helper.isNonEmptyArray(flatTargetRemoveNodes)) {
          for (const removeNode of findTargetRemoveNodes) {
            const removeKey = removeNode.key
            const childNodes = childTreeNodes.value[removeKey] || []
            loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => key !== removeKey && !childNodes.some(child => child.key === key)))
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== removeKey && !childNodes.some(child => child.key === key)))
          }

          loadKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
          loadedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
        }

        if (!helper.isNonEmptyObject(parentTreeNode)) {
          Cacher.treeData.splice(0, Cacher.treeData.length, ...Cacher.treeData.filter(every => !findTargetRemoveNodes.some(remove => remove.key === every[replaceFieldKey])))
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...Stater.propTreeNodes.filter(every => !findTargetRemoveNodes.some(remove => remove.key === every[replaceFieldKey])))
        }

        if (helper.isNonEmptyObject(parentTreeNode)) {
          if (helper.isNonEmptyArray(parentTreeNode.referenceSourceNode[replaceFieldChildren])) {
            parentTreeNode.referenceSourceNode[replaceFieldChildren] = parentTreeNode.referenceSourceNode[replaceFieldChildren].filter((child: STreeSourceNode) => !findTargetRemoveNodes.some(node => node.key === child[replaceFieldKey]))
          }

          if (!helper.isNonEmptyArray(parentTreeNode.referenceSourceNode[replaceFieldChildren])) {
            if (Object.hasOwn(parentTreeNode.referenceSourceNode, replaceFieldChildren)) {
              delete parentTreeNode.referenceSourceNode[replaceFieldChildren]
            }
          }

          parentTreeNode.children.splice(0, parentTreeNode.children.length, ...parentTreeNode.children.filter(every => !findTargetRemoveNodes.some(node => node === every)))
          parentTreeNode.isLeaf = parentTreeNode.children.length === 0

          parentTreeNode.scopedSlots = {
            icon: parentTreeNode.level === 1 ? 'iconRoot' : helper.isNonEmptyArray(parentTreeNode.children) ? 'iconParent' : 'iconLeaf',
            title: parentTreeNode.level === 1 ? 'titleRoot' : helper.isNonEmptyArray(parentTreeNode.children) ? 'titleParent' : 'titleLeaf'
          }
        }

        if (helper.isNonEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !flatTargetRemoveNodes.some(remove => remove === every)))
          linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
        }

        if (!helper.isNonEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !flatTargetRemoveNodes.some(remove => remove === every)))
          linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
        }

        if (isNeedEmitChange) {
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

          Methoder.cleanTreeStater(force)
          Methoder.checkTreeStater(force)

          context.emit('update:treeData', [...toRaw(unref(Cacher.treeData))])

          context.emit('change', {
            type: 'remove',
            loadKeys: [...loadKeys],
            loadedKeys: [...loadedKeys],
            removeNodes: [{ parentNode: parentTreeNode?.referenceSourceNode || null, rootChildNodes: linkTreeNodes.map(child => child.referenceSourceNode), removeChildNodes: [...nodes] }],
            appendNodes: [],
            reloadNodes: []
          })
        }
      },

      changeTreeNodes(nodes, parentKey, force) {
        const filterField = Stater.filterField
        const filterValue = Stater.filterValue
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const parentTreeNode = helper.isPrimitive(parentKey) ? flatTreeNodes.find(every => every.key === parentKey) : undefined
        const findChildrenNodes = parentTreeNode ? [...parentTreeNode.children] : [...linkTreeNodes]
        const noReloadTreeNode = helper.isPrimitive(parentKey) && !parentTreeNode
        const replaceFieldChildren = props.replaceFields.children || 'children'
        const replaceFieldKey = props.replaceFields.key || 'key'

        if (noReloadTreeNode) {
          return
        }

        nodes = nodes.map(node => flatTreeNodes.find(every => every.key === node[replaceFieldKey])?.referenceSourceNode || node)
        nodes = nodes.filter(node => !parentTreeNode || !parentTreeNodes.value[parentTreeNode.key] || !parentTreeNodes.value[parentTreeNode.key].some(parent => parent.key === node[replaceFieldKey]))
        nodes = nodes.filter(node => !parentTreeNode || parentTreeNode.key !== node[replaceFieldKey])
        nodes = nodes.map(node => toRaw(unref(node)))

        // fix bug: update node change
        // if (!helper.isNonEmptyArray(nodes)) {
        //   return
        // }

        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const appendNodes: Array<{ parentNode: STreePartSourceNode, appendChildNodes: STreeSourceNodes }> = []
        const removeNodes: Array<{ parentNode: STreePartSourceNode, removeChildNodes: STreeSourceNodes }> = []
        const filterAppendNodes = Array.from(new Set([...nodes.filter(node => !!node[replaceFieldKey] || node[replaceFieldKey] === 0)]))
        const filterRemoveNodes = Array.from(new Set([...nodes.filter(node => flatTreeNodes.some(every => every.referenceSourceNode === node)), ...findChildrenNodes.map(node => node.referenceSourceNode)]))
        const filterChildrenNodes = Array.from(new Set(nodes.filter(node => findChildrenNodes.some(every => every.referenceSourceNode === node)).map(node => flatTreeNodes.find(every => every.referenceSourceNode === node)!)))

        if (helper.isNonEmptyArray(filterRemoveNodes)) {
          filterRemoveNodes.sort((a, b) => (
            flatTreeNodes.findIndex(every => every.key === a[replaceFieldKey]) -
            flatTreeNodes.findIndex(every => every.key === b[replaceFieldKey])
          ))

          for (const filterNode of filterRemoveNodes.reverse()) {
            const findTargetRemoveNode = flatTreeNodes.find(every => every.key === filterNode[replaceFieldKey])!
            const findSourceParentNode = findTargetRemoveNode && findTargetRemoveNode.parentNode?.referenceSourceNode || null
            const findTargetParentNode = findTargetRemoveNode && findTargetRemoveNode.parentNode || null
            const flatTargetRemoveNodes = Methoder.spreadTreeNodes([findTargetRemoveNode], Infinity)

            if (!helper.isNonEmptyObject(findTargetParentNode)) {
              Cacher.treeData.splice(0, Cacher.treeData.length, ...Cacher.treeData.filter(every => filterNode !== every))
              Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...Stater.propTreeNodes.filter(every => filterNode !== every))
            }

            if (helper.isNonEmptyObject(findTargetParentNode)) {
              if (helper.isNonEmptyArray(findTargetParentNode.referenceSourceNode[replaceFieldChildren])) {
                findTargetParentNode.referenceSourceNode[replaceFieldChildren] = findTargetParentNode.referenceSourceNode[replaceFieldChildren].filter((child: STreeSourceNode) => filterNode !== child)
              }

              if (!helper.isNonEmptyArray(findTargetParentNode.referenceSourceNode[replaceFieldChildren])) {
                if (Object.hasOwn(findTargetParentNode.referenceSourceNode, replaceFieldChildren)) {
                  delete findTargetParentNode.referenceSourceNode[replaceFieldChildren]
                }
              }

              findTargetParentNode.children.splice(0, findTargetParentNode.children.length, ...findTargetParentNode.children.filter(every => findTargetRemoveNode !== every))
              findTargetParentNode.isLeaf = findTargetParentNode.children.length === 0

              findTargetParentNode.scopedSlots = {
                icon: findTargetParentNode.level === 1 ? 'iconRoot' : helper.isNonEmptyArray(findTargetParentNode.children) ? 'iconParent' : 'iconLeaf',
                title: findTargetParentNode.level === 1 ? 'titleRoot' : helper.isNonEmptyArray(findTargetParentNode.children) ? 'titleParent' : 'titleLeaf'
              }
            }

            if (helper.isNonEmptyObject(findTargetParentNode)) {
              flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !flatTargetRemoveNodes.some(remove => remove === every)))
              linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
            }

            if (!helper.isNonEmptyObject(findTargetParentNode)) {
              flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !flatTargetRemoveNodes.some(remove => remove === every)))
              linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
            }

            if (filterAppendNodes.every(child => child !== filterNode) || !findChildrenNodes.some(child => child.referenceSourceNode === filterNode)) {
              if (!removeNodes.some(node => node.parentNode === findSourceParentNode)) {
                removeNodes.push({ parentNode: findSourceParentNode, removeChildNodes: [] })
              }

              if (removeNodes.some(node => node.parentNode === findSourceParentNode)) {
                const removeNode = removeNodes.find(node => node.parentNode === findSourceParentNode)!
                !removeNode.removeChildNodes.includes(filterNode) && removeNode.removeChildNodes.push(filterNode)
              }
            }
          }
        }

        if (helper.isNonEmptyArray(filterAppendNodes)) {
          filterAppendNodes.sort((a, b) => (
            flatTreeNodes.findIndex(every => every.key === a[replaceFieldKey]) -
            flatTreeNodes.findIndex(every => every.key === b[replaceFieldKey])
          ))

          const findAppendNodes = filterAppendNodes.map(node => filterChildrenNodes.find(every => every.referenceSourceNode === node) || Methoder.createTreeNodes([node], parentTreeNode)[0])
          const partAppendNodes = filterAppendNodes.filter(node => findChildrenNodes.every(child => child.referenceSourceNode !== node))
          const flatAppendNodes = Methoder.spreadTreeNodes(findAppendNodes, Infinity)

          if (!helper.isNonEmptyObject(parentTreeNode)) {
            Cacher.treeData.push(...filterAppendNodes)
            Stater.propTreeNodes.push(...filterAppendNodes)
          }

          if (helper.isNonEmptyObject(parentTreeNode)) {
            parentTreeNode.isLeaf = parentTreeNode.children.length === 0 && findAppendNodes.length === 0
            parentTreeNode.referenceSourceNode[replaceFieldChildren] = parentTreeNode.referenceSourceNode[replaceFieldChildren] || []
            parentTreeNode.referenceSourceNode[replaceFieldChildren].push(...nodes)
            parentTreeNode.children.push(...findAppendNodes)

            parentTreeNode.scopedSlots = {
              icon: parentTreeNode.level === 1 ? 'iconRoot' : helper.isNonEmptyArray(parentTreeNode.children) ? 'iconParent' : 'iconLeaf',
              title: parentTreeNode.level === 1 ? 'titleRoot' : helper.isNonEmptyArray(parentTreeNode.children) ? 'titleParent' : 'titleLeaf'
            }
          }

          if (helper.isNonEmptyObject(parentTreeNode)) {
            const presetTreeNodes = (childTreeNodes.value[parentTreeNode.key] || []).filter(child => flatTreeNodes.some(every => every === child))
            flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !presetTreeNodes.some(child => child === every)))
            flatTreeNodes.splice(flatTreeNodes.findIndex(every => every === parentTreeNode) + 1, 0, ...presetTreeNodes, ...flatAppendNodes)
            linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
          }

          if (!helper.isNonEmptyObject(parentTreeNode)) {
            flatTreeNodes.push(...flatAppendNodes)
            linkTreeNodes.splice(0, linkTreeNodes.length, ...flatTreeNodes.filter(every => every.level === 1))
          }

          if (helper.isNonEmptyArray(partAppendNodes)) {
            appendNodes.push({ parentNode: parentTreeNode?.referenceSourceNode || null, appendChildNodes: [...partAppendNodes] })
          }
        }

        if (helper.isNonEmptyArray(filterRemoveNodes) || helper.isNonEmptyArray(filterAppendNodes)) {
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

          Methoder.cleanTreeStater(force)
          Methoder.checkTreeStater(force)
          Methoder.filterTreeNodes({ filterField: filterField.value, filterValue: filterValue.value })

          loadKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
          loadedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))

          context.emit('update:treeData', [...toRaw(unref(Cacher.treeData))])

          context.emit('change', {
            type: 'change',
            loadKeys: [...loadKeys],
            loadedKeys: [...loadedKeys],
            appendNodes: [...appendNodes.map(appendNode => ({ ...appendNode, rootChildNodes: linkTreeNodes.map(child => child.referenceSourceNode) }))],
            removeNodes: [...removeNodes.map(removeNode => ({ ...removeNode, rootChildNodes: linkTreeNodes.map(child => child.referenceSourceNode) }))],
            reloadNodes: [{
              parentNode: parentTreeNode?.referenceSourceNode || null,
              oldChildNodes: findChildrenNodes.map(child => child.referenceSourceNode),
              newChildNodes: (parentTreeNode ? parentTreeNode.children : linkTreeNodes).map(child => child.referenceSourceNode),
              rootChildNodes: linkTreeNodes.map(child => child.referenceSourceNode)
            }]
          })
        }
      },

      createTreeNodes(nodes, parentNode) {
        const level = helper.isNonEmptyObject(parentNode) && parentNode.level + 1 || 1
        const parentTreeNode = helper.isNonEmptyObject(parentNode) ? parentNode : null
        const currentTreeNodes: STreeTargetNodes = []

        if (!helper.isNonEmptyArray(nodes)) {
          return currentTreeNodes
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
          const isLeaf: boolean = !helper.isNonEmptyArray(children) && node.isLeaf !== false

          const newNode: STreeTargetNode = {
            scopedSlots: {
              icon: level === 1 ? 'iconRoot' : !isLeaf ? 'iconParent' : 'iconLeaf',
              title: level === 1 ? 'titleRoot' : !isLeaf ? 'titleParent' : 'titleLeaf'
            },
            key: key,
            icon: helper.isString(icon) && isIconType(icon) ? <SIcon type={icon}/> : null,
            level: level,
            title: title,
            titles: [],
            isLeaf: isLeaf,
            parentNode: parentTreeNode,
            alwaysShowTitleButton: alwaysShowTitleButton,
            forceApplyDisabled: forceApplyDisabled || props.forceApplyDisabled === true || parentTreeNode?.forceApplyDisabled === true,
            forceApplyDisableCheckbox: forceApplyDisabled || forceApplyDisableCheckbox || props.forceApplyDisabled === true || parentTreeNode?.forceApplyDisableCheckbox === true,
            checkable: helper.isBoolean(node.checkable) ? node.checkable : helper.isFunction(props.allowCheckedLevel) ? props.allowCheckedLevel(level, node) !== false : level >= props.allowCheckedLevel,
            isSelectable: helper.isBoolean(node.selectable) ? node.selectable : helper.isFunction(props.allowSelectedLevel) ? props.allowSelectedLevel(level, node) !== false : level >= props.allowSelectedLevel,
            disableCheckbox: disabled || disableCheckbox || forceApplyDisabled || forceApplyDisableCheckbox || (props.forceApplyDisabled || props.forceApplyDisableCheckbox || parentTreeNode?.forceApplyDisabled || parentTreeNode?.forceApplyDisableCheckbox ? parentTreeNode?.disableCheckbox === true : false),
            disabled: disabled || forceApplyDisabled || (props.forceApplyDisabled || parentTreeNode?.forceApplyDisabled ? parentTreeNode?.disabled === true : false),
            referenceSourceNode: node,
            selectable: true, // use isSelectable, because call doEventSelect when selectable is false
            children: []
          }

          if (helper.isNonEmptyArray(children)) {
            newNode.children = Methoder.createTreeNodes(children, newNode)
          }

          currentTreeNodes.push(newNode)
        }

        return currentTreeNodes
      },

      spreadTreeNodes(nodes, level) {
        const treeNodes: any = []
        const rawNodes = nodes.map(node => toRaw(node))

        for (const node of rawNodes) {
          const replaceFieldChildren = !Object.hasOwn(node, 'referenceSourceNode')
            ? props.replaceFields.children || 'children'
            : 'children'

          helper.isFiniteNumber(level)
            ? level = level - 1
            : level = Infinity

          helper.isNonEmptyArray(node[replaceFieldChildren])
            ? treeNodes.push(node, ...Methoder.spreadTreeNodes(node[replaceFieldChildren], level))
            : treeNodes.push(node)
        }

        return treeNodes
      },

      pickUpperTreeNodes(key, level) {
        const treeNodes = []
        const flatTreeNodes = Stater.flatTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const currentSourceNode = flatTreeNodes.find(every => every.key === key)
        const parentSourceNodes = parentTreeNodes.value[key]

        if (currentSourceNode && parentSourceNodes) {
          helper.isFiniteNumber(level)
            ? level = currentSourceNode.level - level
            : level = 0

          treeNodes.push(
            ...parentSourceNodes.filter(node => node.level >= level!).map(node => node.referenceSourceNode)
          )
        }

        return treeNodes
      },

      pickLowerTreeNodes(key, level) {
        const treeNodes = []
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const currentSourceNode = flatTreeNodes.find(every => every.key === key)
        const childSourceNodes = childTreeNodes.value[key]

        if (currentSourceNode && childSourceNodes) {
          helper.isFiniteNumber(level)
            ? level = currentSourceNode.level + level
            : level = Infinity

          treeNodes.push(
            ...childSourceNodes.filter(node => node.level <= level!).map(node => node.referenceSourceNode)
          )
        }

        return treeNodes
      },

      pickMatchTreeNode(key, level) {
        const flatTreeNodes = Stater.flatTreeNodes
        const currentSourceNode = flatTreeNodes.find(every => every.key === key)

        if (currentSourceNode && (!helper.isNumber(level) || currentSourceNode.level === level)) {
          return currentSourceNode.referenceSourceNode
        }

        return null
      },

      expandTreeNodes(keys) {
        const loadKeys = Stater.loadKeys
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes

        if (helper.isNonEmptyArray(keys)) {
          keys = keys.filter(key => flatTreeNodes.some(every => every.key === key))
          keys = Array.from(new Set(keys))
        }

        if (!helper.isNonEmptyArray(keys)) {
          return
        }

        if (helper.isNonEmptyArray(keys)) {
          for (const key of keys) {
            const expandedNode = flatTreeNodes.find(every => key === every.key)!
            const isAsyncedNode = expandedNode.isLeaf === false && helper.isFunction(props.loadData)
            const isLoadingNode = loadKeys.includes(key)

            if (helper.isNonEmptyArray(expandedNode.children) || (isAsyncedNode && !isLoadingNode)) {
              if (!expandedKeys.includes(expandedNode.key)) {
                expandedKeys.push(expandedNode.key)
              }
            }
          }
        }

        if (helper.isNonEmptyArray(expandedKeys)) {
          expandedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(every => every.key === a) -
            flatTreeNodes.findIndex(every => every.key === b)
          ))

          if (helper.isFunction(props.loadData)) {
            const keys = expandedKeys.filter(
              key => (
                !loadKeys.includes(key) &&
                !helper.isNonEmptyArray(flatTreeNodes.find(every => every.key === key)?.children) &&
                flatTreeNodes.find(every => every.key === key)?.isLeaf === false
              )
            )

            for (const temp of [...keys]) {
              keys.splice(0, keys.length, ...keys.filter(key => !childTreeNodes.value[temp] || !childTreeNodes.value[temp].some(node => key === node.key)))
            }

            helper.isNonEmptyArray(keys) && Methoder.doTreeLoad(keys)
          }
        }

        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNonEmptyArray(every.children))))
        expandedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
      },

      collapseTreeNodes(keys) {
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes

        if (!helper.isNonEmptyArray(expandedKeys)) {
          return
        }

        if (helper.isNonEmptyArray(keys)) {
          keys = keys.filter(key => flatTreeNodes.some(every => every.key === key))
          keys = Array.from(new Set(keys))
        }

        if (!helper.isNonEmptyArray(keys)) {
          return
        }

        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => !keys.includes(key) && flatTreeNodes.some(every => every.key === key && helper.isNonEmptyArray(every.children))))
        expandedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
      },

      doTreeAllExpanded() {
        if (Stater.expandedKeys.length !== Stater.flatTreeNodes.length || !Stater.flatTreeNodes.every(every => Stater.expandedKeys.includes(every.key))) {
          Methoder.expandTreeNodes(Stater.flatTreeNodes.filter(every => helper.isNonEmptyArray(every.children) || (props.allowAutoExpanded && props.allowAutoExpandLoad && every.isLeaf === false)).map(every => every.key))
          Methoder.cleanTreeStater(false, ['expanded'])
          Methoder.resetTreeStater(false, ['expanded'])
        }
      },

      doTreeAllCollapsed() {
        if (Stater.expandedKeys.length > 0) {
          Methoder.collapseTreeNodes(Stater.expandedKeys)
          Methoder.cleanTreeStater(false, ['expanded'])
          Methoder.resetTreeStater(false, ['expanded'])
        }
      },

      doTreeToggleExpanded(keys) {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const allExpandedKeys = [...Stater.expandedKeys]
        const newExpandedKeys = [] as STreeKeys

        if (helper.isNonEmptyArray(keys)) {
          keys = keys.filter(key => flatTreeNodes.some(every => every.key === key))
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const delExpandedNodes = flatTreeNodes.filter(every => keys.some(key => every.key === key) && allExpandedKeys.some(key => every.key === key))
        const addExpandedNodes = flatTreeNodes.filter(every => keys.some(key => every.key === key) && !allExpandedKeys.some(key => every.key === key))
        const delExpandedKeys = delExpandedNodes.map(node => node.key)
        const addExpandedKeys = addExpandedNodes.map(node => node.key)

        if (helper.isNonEmptyArray(delExpandedNodes)) {
          for (const delKey of delExpandedKeys) {
            props.allowAutoCollapsed
              ? allExpandedKeys.splice(0, allExpandedKeys.length, ...allExpandedKeys.filter(key => key !== delKey && !(childTreeNodes.value[delKey] || []).some(child => child.key === key)))
              : allExpandedKeys.splice(0, allExpandedKeys.length, ...allExpandedKeys.filter(key => key !== delKey))
          }
        }

        if (helper.isNonEmptyArray(addExpandedKeys)) {
          for (const addKey of addExpandedKeys) {
            const parentNodes = parentTreeNodes.value[addKey] || []
            const parentKeys = parentNodes.map(node => node.key)

            newExpandedKeys.push(addKey, ...parentKeys)

            if (props.allowAutoExpanded) {
              let isExpandFirstNode = true
              let isExpandAsyncNode = true
              let onlyFirstChildNode = flatTreeNodes.find(every => every.key === addKey)

              while (onlyFirstChildNode && (isExpandAsyncNode || isExpandFirstNode)) {
                newExpandedKeys.push(onlyFirstChildNode.key)
                onlyFirstChildNode = onlyFirstChildNode.children.length === 1 ? onlyFirstChildNode.children[0] : undefined
                isExpandAsyncNode = !!onlyFirstChildNode && !helper.isNonEmptyArray(onlyFirstChildNode.children) && props.allowAutoExpandLoad && onlyFirstChildNode.isLeaf === false && helper.isFunction(props.loadData)
                isExpandFirstNode = !!onlyFirstChildNode && helper.isNonEmptyArray(onlyFirstChildNode.children)
              }
            }
          }
        }

        newExpandedKeys.push(...Array.from(new Set(allExpandedKeys)))

        Methoder.doTreeOnlyExpanded(Array.from(new Set(newExpandedKeys)))
      },

      doTreeOnlyExpanded(keys) {
        const loadKeys = Stater.loadKeys
        const expandedKeys = Stater.expandedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes

        if (helper.isNonEmptyArray(keys)) {
          keys = keys.filter(key => flatTreeNodes.some(every => every.key === key))
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const keepExpandedNodes = flatTreeNodes.filter(every => expandedKeys.some(key => every.key === key) && keys.some(key => every.key === key))
        const addExpandedNodes = flatTreeNodes.filter(every => !expandedKeys.some(key => every.key === key) && keys.some(key => every.key === key))
        const delExpandedNodes = flatTreeNodes.filter(every => expandedKeys.some(key => every.key === key) && !keys.some(key => every.key === key))
        const keepExpandedKeys = keepExpandedNodes.map(node => node.key)
        const addExpandedKeys = addExpandedNodes.map(node => node.key)
        const delExpandedKeys = delExpandedNodes.map(node => node.key)
        const allExpandedKeys = [...addExpandedKeys, ...keepExpandedKeys]
        const nowExpandedKeys = [] as STreeKeys
        const newExpandedKeys = [] as STreeKeys

        expandedKeys.splice(0, expandedKeys.length)

        addExpandedKeys.sort((a, b) => (flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b)))
        delExpandedKeys.sort((a, b) => (flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b)))
        allExpandedKeys.sort((a, b) => (flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b)))

        if (!props.allowUnExpanded && linkTreeNodes.length === 1) {
          nowExpandedKeys.push(linkTreeNodes.map(every => every.key)[0])
          newExpandedKeys.push(linkTreeNodes.map(every => every.key)[0])
        }

        if (helper.isNonEmptyArray(allExpandedKeys)) {
          allExpandedKeys.splice(0, allExpandedKeys.length, ...Array.from(new Set(allExpandedKeys)))

          allExpandedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(every => every.key === a) -
            flatTreeNodes.findIndex(every => every.key === b)
          ))

          if (!props.allowMultiExpanded) {
            const firstKey = allExpandedKeys.find(key => {
              const firstNode = flatTreeNodes.find(every => every.key === key)!
              const isHasChildNode = helper.isNonEmptyArray(firstNode.children)
              const isAsyncedNode = firstNode.isLeaf === false && helper.isFunction(props.loadData)
              const isLoadingNode = loadKeys.includes(key) === true
              const isLoadNode = isAsyncedNode && !isLoadingNode
              return isHasChildNode || isLoadNode
            })

            if (firstKey) {
              newExpandedKeys.push(firstKey)

              for (const newKey of allExpandedKeys) {
                const childNodes = childTreeNodes.value[firstKey] || []
                const parentNodes = parentTreeNodes.value[firstKey] || []

                if (parentNodes.some(node => node.key === newKey)) {
                  newExpandedKeys.push(newKey)
                  continue
                }

                if (childNodes.some(node => node.key === newKey)) {
                  const parentNodes = parentTreeNodes.value[newKey]
                  const parentKeys = (parentNodes || []).map(node => node.key)

                  if (newExpandedKeys.every(key => parentKeys.includes(key))) {
                    newExpandedKeys.push(newKey)
                  }
                }
              }
            }
          }

          if (props.allowMultiExpanded) {
            for (const key of allExpandedKeys) {
              const firstNode = flatTreeNodes.find(every => every.key === key)!
              const isAsyncedNode = firstNode.isLeaf === false && helper.isFunction(props.loadData)
              const isLoadingNode = loadKeys.includes(key) === true
              const childNodes = childTreeNodes.value[key] || []

              if (!helper.isNonEmptyArray(childNodes) && (!isAsyncedNode || isLoadingNode)) {
                continue
              }

              if (helper.isNonEmptyArray(childNodes) || (isAsyncedNode && !isLoadingNode)) {
                newExpandedKeys.push(key)
              }
            }
          }

          nowExpandedKeys.splice(0, nowExpandedKeys.length, ...Array.from(new Set(newExpandedKeys)))
          newExpandedKeys.splice(0, newExpandedKeys.length, ...Array.from(new Set(newExpandedKeys)))
        }

        if (helper.isNonEmptyArray(newExpandedKeys)) {
          newExpandedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(every => every.key === a) -
            flatTreeNodes.findIndex(every => every.key === b)
          ))

          if (props.allowAutoCollapsed) {
            while (nowExpandedKeys.length > 0) {
              const nowLastKey = nowExpandedKeys.pop()!
              const parentNodes = parentTreeNodes.value[nowLastKey]

              if (parentNodes && !parentNodes.every(node => newExpandedKeys.includes(node.key))) {
                newExpandedKeys.splice(newExpandedKeys.indexOf(nowLastKey), 1)
              }
            }
          }

          Methoder.expandTreeNodes(newExpandedKeys)
        }

        Methoder.cleanTreeStater(false, ['expanded'])
        Methoder.resetTreeStater(false, ['expanded'])
      },

      doTreePushExpanded(keys) {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const allExpandedKeys = [...Stater.expandedKeys]
        const newExpandedKeys = [] as STreeKeys

        if (helper.isNonEmptyArray(keys)) {
          keys = keys.filter(key => Stater.flatTreeNodes.some(every => every.key === key))
          keys = Array.from(new Set(keys))
        }

        if (!helper.isNonEmptyArray(keys)) {
          return
        }

        const addExpandedNodes = flatTreeNodes.filter(every => keys.includes(every.key))
        const addExpandedKeys = addExpandedNodes.map(node => node.key)

        if (helper.isNonEmptyArray(addExpandedKeys)) {
          addExpandedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(every => every.key === a) -
            flatTreeNodes.findIndex(every => every.key === b)
          ))

          for (const addKey of addExpandedKeys) {
            const parentNodes = parentTreeNodes.value[addKey] || []
            const parentKeys = parentNodes.map(node => node.key)

            newExpandedKeys.push(addKey, ...parentKeys)

            if (props.allowAutoExpanded) {
              let isExpandFirstNode = true
              let isExpandAsyncNode = true
              let onlyFirstChildNode = flatTreeNodes.find(every => every.key === addKey)

              while (onlyFirstChildNode && (isExpandAsyncNode || isExpandFirstNode)) {
                newExpandedKeys.push(onlyFirstChildNode.key)
                onlyFirstChildNode = onlyFirstChildNode.children.length === 1 ? onlyFirstChildNode.children[0] : undefined
                isExpandAsyncNode = !!onlyFirstChildNode && !helper.isNonEmptyArray(onlyFirstChildNode.children) && props.allowAutoExpandLoad && onlyFirstChildNode.isLeaf === false && helper.isFunction(props.loadData)
                isExpandFirstNode = !!onlyFirstChildNode && helper.isNonEmptyArray(onlyFirstChildNode.children)
              }
            }
          }

          if (!props.allowMultiExpanded) {
            const expandKeys: STreeKeys = []

            while (addExpandedKeys.length > 0) {
              const firstKey = addExpandedKeys.shift()!
              const parentKeys = (parentTreeNodes.value[firstKey] || []).map(node => node.key)

              if (expandKeys.length === 0 || parentKeys.every(key => expandKeys.includes(key))) {
                expandKeys.push(...[firstKey, ...parentKeys].filter(key => !expandKeys.includes(key)))
              }
            }

            expandKeys.sort((a, b) => (
              flatTreeNodes.findIndex(every => every.key === a) -
              flatTreeNodes.findIndex(every => every.key === b)
            ))

            const lastKey = expandKeys.pop()!
            const childKeys = (childTreeNodes.value[lastKey] || []).map(node => node.key)
            const parentKeys = (parentTreeNodes.value[lastKey] || []).map(node => node.key)
            newExpandedKeys.splice(0, newExpandedKeys.length, ...newExpandedKeys.filter(key => key === lastKey || childKeys.includes(key) || parentKeys.includes(key)))
            allExpandedKeys.splice(0, allExpandedKeys.length, ...allExpandedKeys.filter(key => key === lastKey || childKeys.includes(key) || parentKeys.includes(key)))
          }
        }

        newExpandedKeys.push(...Array.from(new Set(allExpandedKeys)))

        Methoder.doTreeOnlyExpanded(Array.from(new Set(newExpandedKeys)))
      },

      doTreePopExpanded(keys) {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const newExpandedKeys = [...Stater.expandedKeys]

        if (helper.isNonEmptyArray(keys)) {
          keys = keys.filter(key => flatTreeNodes.some(every => every.key === key))
          keys = Array.from(new Set(keys))
        }

        if (!helper.isNonEmptyArray(keys)) {
          return
        }

        const delExpandedNodes = flatTreeNodes.filter(every => keys.includes(every.key))
        const delExpandedKeys = delExpandedNodes.map(node => node.key)

        for (const delKey of delExpandedKeys) {
          props.allowAutoCollapsed
            ? newExpandedKeys.splice(0, newExpandedKeys.length, ...newExpandedKeys.filter(key => key !== delKey && !(childTreeNodes.value[delKey] || []).some(child => child.key === key)))
            : newExpandedKeys.splice(0, newExpandedKeys.length, ...newExpandedKeys.filter(key => key !== delKey))
        }

        Methoder.doTreeOnlyExpanded(Array.from(new Set(newExpandedKeys)))
      },

      doTreeAllChecked() {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        const flatTreeNodes = Stater.flatTreeNodes
        const pushTreeNodes = flatTreeNodes.filter(every => !every.disabled && !every.disableCheckbox && every.checkable)

        Stater.checkedKeys.push(...pushTreeNodes.map(node => node.key))
        Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...Array.from(Stater.checkedKeys))

        Methoder.cleanTreeStater(false, ['checked'])
        Methoder.resetTreeStater(false, ['checked'])
      },

      doTreeAllUnChecked() {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        const flatTreeNodes = Stater.flatTreeNodes
        const popTreeNodes = flatTreeNodes.filter(every => !every.disabled && !every.disableCheckbox)

        Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...Stater.checkedKeys.filter(key => Stater.outCheckedKeys.includes(key) || !popTreeNodes.some(node => node.key === key)))
        Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...Array.from(Stater.checkedKeys))

        Methoder.cleanTreeStater(false, ['checked'])
        Methoder.resetTreeStater(false, ['checked'])
      },

      doTreeToggleChecked(keys) {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        if (helper.isNonEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isNonEmptyArray(keys)) {
          return
        }

        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const allCheckedKeys = [...Stater.checkedKeys, ...Stater.outCheckedKeys]
        const delCheckedKeys = keys.filter(key => flatTreeNodes.some(every => every.key === key) && allCheckedKeys.includes(key))
        const addCheckedKeys = keys.filter(key => flatTreeNodes.some(every => every.key === key) && !allCheckedKeys.includes(key))
        const delOutCheckedKeys = keys.filter(key => !flatTreeNodes.some(every => every.key === key) && allCheckedKeys.includes(key))
        const addOutCheckedKeys = keys.filter(key => !flatTreeNodes.some(every => every.key === key) && !allCheckedKeys.includes(key))

        // first append
        for (const addKey of addCheckedKeys) {
          allCheckedKeys.push(addKey, ...(childTreeNodes.value[addKey] || []).map(child => child.key).filter(key => !allCheckedKeys.includes(key)))
        }

        for (const addKey of addOutCheckedKeys) {
          allCheckedKeys.push(addKey)
        }

        // last remove
        for (const delKey of delOutCheckedKeys) {
          allCheckedKeys.splice(0, allCheckedKeys.length, ...allCheckedKeys.filter(key => key !== delKey))
        }

        for (const delKey of delCheckedKeys) {
          allCheckedKeys.splice(0, allCheckedKeys.length, ...allCheckedKeys.filter(key => key !== delKey && !(childTreeNodes.value[delKey] || []).some(child => child.key === key)))
        }

        Methoder.doTreeOnlyChecked(Array.from(new Set(allCheckedKeys)))
      },

      doTreeOnlyChecked(keys) {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        if (helper.isNonEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const nowCheckedKeys = [...Stater.checkedKeys]
        const nowOutCheckedKeys = [...Stater.outCheckedKeys]
        const nowAllCheckedKeys = [...nowCheckedKeys, ...nowOutCheckedKeys]
        const oldKeepCheckedNodes = flatTreeNodes.filter(every => nowAllCheckedKeys.some(key => every.key === key) && (every.disabled || every.disableCheckbox))
        const newKeepCheckedNodes = flatTreeNodes.filter(every => keys.some(key => every.key === key) && !every.disabled && !every.disableCheckbox && every.checkable)
        const newKeepCheckedKeys = [...Array.from(new Set(newKeepCheckedNodes)).map(node => node.key), ...keys.filter(key => !flatTreeNodes.some(every => every.key === key))]
        const oldKeepCheckedKeys = [...Array.from(new Set(oldKeepCheckedNodes)).map(node => node.key)]
        const allKeepCheckedKeys = Array.from(new Set([...oldKeepCheckedKeys, ...newKeepCheckedKeys]))

        if (!helper.isNonEmptyArray(allKeepCheckedKeys)) {
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length)
        }

        if (helper.isNonEmptyArray(allKeepCheckedKeys)) {
          allKeepCheckedKeys.sort((a, b) => (
            flatTreeNodes.findIndex(every => every.key === a) -
            flatTreeNodes.findIndex(every => every.key === b)
          ))

          while (newKeepCheckedKeys.length > 0) {
            const filterKey = newKeepCheckedKeys.pop()
            const childNodes = (filterKey && childTreeNodes.value[filterKey] || []).filter(node => !node.disabled && !node.disableCheckbox && node.checkable)
            const childKeys = childNodes.map(node => node.key)

            if (!childKeys.every(key => allKeepCheckedKeys.includes(key))) {
              allKeepCheckedKeys.splice(0, allKeepCheckedKeys.length, ...allKeepCheckedKeys.filter(key => key !== filterKey))
            }
          }

          Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...allKeepCheckedKeys)
        }

        if (helper.isNonEmptyArray(allKeepCheckedKeys)) {
          Stater.outCheckedKeys.splice(0, Stater.outCheckedKeys.length, ...Stater.checkedKeys.filter(key => !flatTreeNodes.some(every => every.key === key)))
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...Stater.checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        }

        if (helper.isEmptyArray(Stater.checkedKeys)) {
          if (!props.allowUnChecked) {
            nowCheckedKeys.sort((a, b) => (
              flatTreeNodes.findIndex(every => every.key === a) -
              flatTreeNodes.findIndex(every => every.key === b)
            ))

            const lastKey = nowCheckedKeys.filter(key => flatTreeNodes.some(every => every.key === key)).pop()
            const parentKeys = lastKey && parentTreeNodes.value[lastKey] && parentTreeNodes.value[lastKey].map(node => node.key) || []
            lastKey && Stater.checkedKeys.push(lastKey, ...nowCheckedKeys.filter(key => parentKeys.includes(key)))
          }
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

        if (helper.isNonEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isNonEmptyArray(keys)) {
          return
        }

        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const allCheckedKeys = [...Stater.checkedKeys, ...Stater.outCheckedKeys]
        const addCheckedKeys = keys.filter(key => flatTreeNodes.some(every => every.key === key) && !allCheckedKeys.includes(key))
        const addOutCheckedKeys = keys.filter(key => !flatTreeNodes.some(every => every.key === key) && !allCheckedKeys.includes(key))

        for (const addKey of addCheckedKeys) {
          allCheckedKeys.push(addKey, ...(childTreeNodes.value[addKey] || []).map(child => child.key).filter(key => !allCheckedKeys.includes(key)))
        }

        for (const addKey of addOutCheckedKeys) {
          allCheckedKeys.push(addKey)
        }

        Methoder.doTreeOnlyChecked(Array.from(new Set(allCheckedKeys)))
      },

      doTreePopChecked(keys) {
        if (props.disabled === true) {
          return
        }

        if (props.checkable !== true) {
          return
        }

        if (helper.isNonEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isNonEmptyArray(keys)) {
          return
        }

        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const allCheckedKeys = [...Stater.checkedKeys, ...Stater.outCheckedKeys]
        const delCheckedKeys = keys.filter(key => flatTreeNodes.some(every => every.key === key) && allCheckedKeys.includes(key))
        const delOutCheckedKeys = keys.filter(key => !flatTreeNodes.some(every => every.key === key) && allCheckedKeys.includes(key))

        for (const delKey of delCheckedKeys) {
          allCheckedKeys.splice(0, allCheckedKeys.length, ...allCheckedKeys.filter(key => key !== delKey && !(childTreeNodes.value[delKey] || []).some(child => child.key === key)))
        }

        for (const delKey of delOutCheckedKeys) {
          allCheckedKeys.splice(0, allCheckedKeys.length, ...allCheckedKeys.filter(key => key !== delKey))
        }

        Methoder.doTreeOnlyChecked(Array.from(new Set(allCheckedKeys)))
      },

      doTreeSelected(keys) {
        if (props.disabled === true) {
          return
        }

        if (helper.isNonEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const checkedKeys = Stater.checkedKeys
        const selectedKeys = Stater.selectedKeys
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const delSelectedNodes = flatTreeNodes.filter(every => selectedKeys.some(key => every.key === key) && !keys.some(key => every.key === key))
        const addSelectedNodes = flatTreeNodes.filter(every => !selectedKeys.some(key => every.key === key) && keys.some(key => every.key === key))
        const delSelectedKeys = delSelectedNodes.map(node => node.key)
        const addSelectedKeys = addSelectedNodes.map(node => node.key)
        const oldSelectedNode = delSelectedNodes[0]
        const newSelectedNode = addSelectedNodes[0]
        const oldSelectedKey = delSelectedKeys[0]
        const newSelectedKey = addSelectedKeys[0]

        if (props.checkable && props.allowSelectToCheck) {
          if (newSelectedKey && newSelectedNode && (newSelectedNode.disabled || newSelectedNode.disableCheckbox || !newSelectedNode.checkable)) {
            expandedKeys.includes(newSelectedKey)
              ? props.allowAutoCollapsed && Methoder.doTreePopExpanded([newSelectedKey])
              : props.allowAutoExpanded && Methoder.doTreePushExpanded([newSelectedKey])
          }

          if (newSelectedKey && newSelectedNode && !newSelectedNode.disabled && !newSelectedNode.disableCheckbox && newSelectedNode.checkable) {
            checkedKeys.includes(newSelectedKey)
              ? Methoder.doTreePopChecked([newSelectedKey])
              : Methoder.doTreePushChecked([newSelectedKey])
          }

          return
        }

        if (!props.selectable && !newSelectedKey) {
          if (oldSelectedKey) {
            expandedKeys.includes(oldSelectedKey)
              ? props.allowAutoCollapsed && Methoder.doTreePopExpanded([oldSelectedKey])
              : props.allowAutoExpanded && Methoder.doTreePushExpanded([oldSelectedKey])
          }

          return
        }

        if (!props.selectable && newSelectedKey) {
          expandedKeys.includes(newSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreePopExpanded([newSelectedKey])
            : props.allowAutoExpanded && Methoder.doTreePushExpanded([newSelectedKey])

          return
        }

        if (newSelectedKey && (newSelectedNode.isSelectable === false || newSelectedNode.disabled === true)) {
          expandedKeys.includes(newSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreePopExpanded([newSelectedKey])
            : props.allowAutoExpanded && Methoder.doTreePushExpanded([newSelectedKey])

          return
        }

        if (!newSelectedKey && oldSelectedKey && (oldSelectedNode.isSelectable === false || oldSelectedNode.disabled === true)) {
          expandedKeys.includes(oldSelectedKey)
            ? props.allowAutoCollapsed && Methoder.doTreePopExpanded([oldSelectedKey])
            : props.allowAutoExpanded && Methoder.doTreePushExpanded([oldSelectedKey])

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
          expandedKeys.includes(nowFirstSelectedKey)
            ? props.allowAutoCollapsed && nowSameSelectedKey && Methoder.doTreePopExpanded([nowFirstSelectedKey])
            : props.allowAutoExpanded && Methoder.doTreePushExpanded([nowFirstSelectedKey])
        }

        if (!nowFirstSelectedKey) {
          if (oldSelectedKey && expandedKeys.includes(oldSelectedKey)) {
            props.allowAutoCollapsed && Methoder.doTreePopExpanded([nowFirstSelectedKey])
          }
        }

        Methoder.cleanTreeStater(false, ['selected'])
        Methoder.resetTreeStater(false, ['selected'])
      },

      doEventDragstart(info) {
        if (info.event.dataTransfer) {
          info.event.dataTransfer.effectAllowed = 'move'
        }
      },

      doEventExpand(keys) {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const oldExpandedKeys = [...Stater.expandedKeys]
        const newExpandedKeys = [] as STreeKeys

        if (helper.isNonEmptyObject(keys)) {
          keys = keys.expanded
        }

        if (helper.isNonEmptyArray(keys)) {
          keys = keys.filter(key => Stater.flatTreeNodes.some(every => every.key === key))
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const nowComputeKeys = keys as STreeKeys
        const keepExpandedNodes = flatTreeNodes.filter(every => oldExpandedKeys.some(key => every.key === key) && nowComputeKeys.some(key => every.key === key))
        const delExpandedNodes = flatTreeNodes.filter(every => oldExpandedKeys.some(key => every.key === key) && !nowComputeKeys.some(key => every.key === key))
        const addExpandedNodes = flatTreeNodes.filter(every => !oldExpandedKeys.some(key => every.key === key) && nowComputeKeys.some(key => every.key === key))
        const keepExpandedKeys = keepExpandedNodes.map(node => node.key)
        const delExpandedKeys = delExpandedNodes.map(node => node.key)
        const addExpandedKeys = addExpandedNodes.map(node => node.key)

        if (helper.isNonEmptyArray(delExpandedNodes)) {
          for (const delKey of delExpandedKeys) {
            props.allowAutoCollapsed
              ? keepExpandedKeys.splice(0, keepExpandedKeys.length, ...keepExpandedKeys.filter(key => key !== delKey && !(childTreeNodes.value[delKey] || []).some(child => child.key === key)))
              : keepExpandedKeys.splice(0, keepExpandedKeys.length, ...keepExpandedKeys.filter(key => key !== delKey))
          }
        }

        if (helper.isNonEmptyArray(addExpandedKeys)) {
          for (const addKey of addExpandedKeys) {
            const firstNode = flatTreeNodes.find(every => every.key === addKey)!
            const parentNodes = parentTreeNodes.value[addKey] || []
            const childNodes = childTreeNodes.value[addKey] || []

            newExpandedKeys.push(addKey, ...parentNodes.map(node => node.key))

            if (helper.isNonEmptyArray(childNodes) && firstNode.children.length === 1) {
              if (props.allowAutoExpanded) {
                let firstChildNode = firstNode.children[0]
                let firstChildCount = firstChildNode?.children.length
                let firstChildKey = firstChildNode?.key

                while (firstChildNode && firstChildCount === 1 && firstChildKey) {
                  newExpandedKeys.push(firstChildKey)
                  firstChildNode = firstChildNode.children[0]
                  firstChildCount = firstChildNode?.children.length
                  firstChildKey = firstChildNode?.key
                }
              }
            }
          }

          if (!props.allowMultiExpanded) {
            const firstKey = addExpandedKeys[0]!
            const childKeys = (childTreeNodes.value[firstKey] || []).map(node => node.key)
            const parentKeys = (parentTreeNodes.value[firstKey] || []).map(node => node.key)
            newExpandedKeys.splice(0, newExpandedKeys.length, ...newExpandedKeys.filter(key => key === firstKey || childKeys.includes(key) || parentKeys.includes(key)))
            keepExpandedKeys.splice(0, keepExpandedKeys.length, ...keepExpandedKeys.filter(key => key === firstKey || childKeys.includes(key) || parentKeys.includes(key)))
          }
        }

        newExpandedKeys.push(...Array.from(new Set(keepExpandedKeys)))

        Methoder.doTreeOnlyExpanded(Array.from(new Set(newExpandedKeys)))
      },

      doEventSelect(keys) {
        if (props.disabled === true) {
          return
        }

        if (helper.isNonEmptyObject(keys)) {
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

        if (helper.isNonEmptyObject(keys)) {
          keys = keys.checked
        }

        if (helper.isNonEmptyArray(keys)) {
          keys = Array.from(new Set(keys))
        }

        if (!helper.isArray(keys)) {
          return
        }

        const childTreeNodes = Stater.childTreeNodes
        const allComputeKeys = [...keys, ...Stater.outCheckedKeys]
        const allCheckedKeys = [...Stater.checkedKeys, ...Stater.outCheckedKeys]
        const delCheckedKeys = allCheckedKeys.filter(key => !allComputeKeys.includes(key))
        const addCheckedKeys = allComputeKeys.filter(key => !allCheckedKeys.includes(key))

        for (const addKey of addCheckedKeys) {
          allCheckedKeys.push(addKey, ...(childTreeNodes.value[addKey] || []).map(child => child.key).filter(key => !allCheckedKeys.includes(key)))
        }

        for (const delKey of delCheckedKeys) {
          allCheckedKeys.splice(0, allCheckedKeys.length, ...allCheckedKeys.filter(key => key !== delKey && !(childTreeNodes.value[delKey] || []).some(child => child.key === key)))
        }

        Methoder.doTreeOnlyChecked(Array.from(new Set(allCheckedKeys)))
      },

      doEventDrop(info) {
        const dropKey = info.node.key
        const dragKey = info.dragNode.key
        const dropPos = info.node.pos ? info.node.pos.split('-') : []
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
        const dropTargetNode = Stater.flatTreeNodes.find(every => every.key === dropKey)
        const dragTargetNode = Stater.flatTreeNodes.find(every => every.key === dragKey)
        const allowPositions = [-1, 0, 1]

        if (dropTargetNode && dragTargetNode && allowPositions.includes(dropPosition)) {
          if (dropPosition === -1 || dropPosition === 1) {
            const dropParentNode = dropTargetNode && dropTargetNode.parentNode || null
            const oldChildrenNodes = dropParentNode ? dropParentNode.children : Stater.linkTreeNodes
            const newChildrenNodes = dropParentNode ? [...dropParentNode.children] : [...Stater.linkTreeNodes]

            if (newChildrenNodes.includes(dragTargetNode)) {
              newChildrenNodes.splice(newChildrenNodes.findIndex(child => child === dragTargetNode), 1)
            }

            if (!newChildrenNodes.includes(dragTargetNode)) {
              const dropChildIndex = newChildrenNodes.findIndex(child => child === dropTargetNode)
              const dragChildIndex = dropPosition === 1 ? dropChildIndex + dropPosition : dropChildIndex
              newChildrenNodes.splice(dragChildIndex, 0, dragTargetNode)
            }

            if (newChildrenNodes.length !== oldChildrenNodes.length || !newChildrenNodes.every((child, index) => oldChildrenNodes[index] === child)) {
              const reloadNodes = [{ parentNode: dropParentNode?.referenceSourceNode, oldChildNodes: oldChildrenNodes.map(child => child.referenceSourceNode), rootChildNodes: Stater.linkTreeNodes.map(child => child.referenceSourceNode), newChildNodes: newChildrenNodes.map(child => child.referenceSourceNode) }]
              const removeNodes = !oldChildrenNodes.includes(dragTargetNode) ? [{ parentNode: dragTargetNode.parentNode?.referenceSourceNode, rootChildNodes: Stater.linkTreeNodes.map(child => child.referenceSourceNode), removeChildNodes: [dragTargetNode.referenceSourceNode] }] : []
              const appendNodes = !oldChildrenNodes.includes(dragTargetNode) ? [{ parentNode: dropParentNode?.referenceSourceNode, rootChildNodes: Stater.linkTreeNodes.map(child => child.referenceSourceNode), appendChildNodes: [dragTargetNode.referenceSourceNode] }] : []
              const dropHandler = helper.isFunction(props.dropHandler) ? props.dropHandler : () => true

              if (dropHandler({ reloadNodes, appendNodes, removeNodes }) !== false) {
                Methoder.changeTreeNodes(newChildrenNodes.map(child => child.referenceSourceNode), dropParentNode?.key)
              }
            }
          }

          if (dropPosition === 0) {
            const dropParentNode = dropTargetNode
            const oldChildrenNodes = dropParentNode.children
            const newChildrenNodes = [...dropParentNode.children]

            if (newChildrenNodes.includes(dragTargetNode)) {
              newChildrenNodes.splice(newChildrenNodes.findIndex(child => child === dragTargetNode), 1)
            }

            if (!newChildrenNodes.includes(dragTargetNode)) {
              newChildrenNodes.unshift(dragTargetNode)
            }

            if (newChildrenNodes.length !== oldChildrenNodes.length || !newChildrenNodes.every((child, index) => oldChildrenNodes[index] === child)) {
              const reloadNodes = [{ parentNode: dropParentNode?.referenceSourceNode, oldChildNodes: oldChildrenNodes.map(child => child.referenceSourceNode), rootChildNodes: Stater.linkTreeNodes.map(child => child.referenceSourceNode), newChildNodes: newChildrenNodes.map(child => child.referenceSourceNode) }]
              const removeNodes = !oldChildrenNodes.includes(dragTargetNode) ? [{ parentNode: dragTargetNode.parentNode?.referenceSourceNode, rootChildNodes: Stater.linkTreeNodes.map(child => child.referenceSourceNode), removeChildNodes: [dragTargetNode.referenceSourceNode] }] : []
              const appendNodes = !oldChildrenNodes.includes(dragTargetNode) ? [{ parentNode: dropParentNode?.referenceSourceNode, rootChildNodes: Stater.linkTreeNodes.map(child => child.referenceSourceNode), appendChildNodes: [dragTargetNode.referenceSourceNode] }] : []
              const dropHandler = helper.isFunction(props.dropHandler) ? props.dropHandler : () => true

              if (dropHandler({ reloadNodes, appendNodes, removeNodes }) !== false) {
                Methoder.changeTreeNodes(newChildrenNodes.map(child => child.referenceSourceNode), dropParentNode?.key)
              }
            }
          }
        }
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

        if (helper.isNonEmptyArray(tempKeys)) {
          tempKeys.sort((a, b) => (
            flatTreeNodes.findIndex(every => every.key === a) -
            flatTreeNodes.findIndex(every => every.key === b)
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

        if (helper.isNonEmptyArray(keys)) {
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
              loadKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
              loadedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))

              Methoder.appendTreeNodes(nodes, key)

              if (!parentTreeNodes.value[key] || parentTreeNodes.value[key].every(node => expandedKeys.includes(node.key))) {
                Methoder.doTreePushExpanded([key])
              }
            }

            const doError = (_: any) => {
              loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(filter))
              loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(filter))
              expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(filter))
              loadKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
              loadedKeys.sort((a, b) => flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b))
            }

            const options = {
              expandedKeys: Stater.expandedKeys,
              outCheckedKeys: Stater.outCheckedKeys,
              selectedKeys: props.selectedMode === 'link' ? Targeter.selectedLinkNodes.map(node => node.key) : Targeter.selectedNodes.map(node => node.key),
              checkedKeys: props.checkedMode === 'link' ? Targeter.checkedLinkNodes.map(node => node.key) : Targeter.checkedNodes.map(node => node.key),
              loadedKeys: Stater.loadedKeys,
              loadKeys: Stater.loadKeys
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

      forceUpdate(clear) {
        const rawPropTreeData = toRaw(props.treeData)
        const rawCacheTreeData = toRaw(Cacher.treeData)
        const propSpreadTreeData = Methoder.spreadTreeNodes(rawPropTreeData, Infinity)
        const cacheSpreadTreeData = Methoder.spreadTreeNodes(rawCacheTreeData, Infinity)

        if (propSpreadTreeData.length !== cacheSpreadTreeData.length || !propSpreadTreeData.every((propNode, index) => propNode === cacheSpreadTreeData[index])) {
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...rawPropTreeData)
          Cacher.treeData.splice(0, Cacher.treeData.length, ...rawPropTreeData)
        }

        Methoder.resetTreeNodes([...Stater.propTreeNodes], clear)
      }
    }

    const Transformer: STreeTransformer = {
      resetPropFilters: () => {
        if (Stater.filterField.value !== props.filterField || Stater.filterValue.value !== props.filterValue) {
          context.emit('update:filterField', Stater.filterField.value)
          context.emit('update:filterValue', Stater.filterValue.value)
        }
      },
      resetPropCheckedKeys: () => {
        const propCheckedKeys = props.checkedKeys
        const newCheckedKeys = props.checkedMode === 'link' ? [...Targeter.checkedLinkNodes.map(node => node.key)] : [...Targeter.checkedNodes.map(node => node.key)]
        const allCheckedKeys = Array.from(new Set([...newCheckedKeys, ...Stater.outCheckedKeys]))

        if (!allCheckedKeys.every((key, index) => propCheckedKeys[index] === key) || !propCheckedKeys.every((key, index) => allCheckedKeys[index] === key)) {
          Cacher.checkedKeys.splice(0, Cacher.checkedKeys.length, ...allCheckedKeys)

          context.emit('update:checkedKeys', [...allCheckedKeys])

          context.emit('check', {
            checkedKeys: allCheckedKeys,
            delCheckedKeys: propCheckedKeys.filter(key => !allCheckedKeys.includes(key)),
            addCheckedKeys: allCheckedKeys.filter(key => !propCheckedKeys.includes(key)),
            checkedNode: Stater.flatTreeNodes.find(every => every.key === allCheckedKeys[0])?.referenceSourceNode || null
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
            addSelectedKeys: newSelectedKeys.filter(key => !propSelectedKeys.includes(key)),
            selectedNode: Stater.flatTreeNodes.find(every => every.key === newSelectedKeys[0])?.referenceSourceNode || null
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
            addExpandedKeys: newExpandedKeys.filter(key => !propExpandedKeys.includes(key)),
            expandedNode: Stater.flatTreeNodes.find(every => every.key === newExpandedKeys[0])?.referenceSourceNode || null
          })
        }
      },

      resetStaterFilters: () => {
        if (props.filterField !== Stater.filterField.value || props.filterValue !== Stater.filterValue.value) {
          Methoder.filterTreeNodes({
            filterField: props.filterField,
            filterValue: props.filterValue
          })
        }
      },
      resetStaterCheckedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const propTreeCheckedKeys = props.checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key))
        const cacheTreeCheckedKeys = Cacher.checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key))
        const keepTreeCheckedNodes = propTreeCheckedKeys.map(key => flatTreeNodes.find(every => every.key === key)!)
        const proTreepCheckedNodes = propTreeCheckedKeys.map(key => flatTreeNodes.find(every => every.key === key)!)
        const helpTreeCheckedNodes = propTreeCheckedKeys.map(key => flatTreeNodes.find(every => every.key === key)!)

        cacheTreeCheckedKeys.sort((a, b) => (flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b)))
        keepTreeCheckedNodes.sort((a, b) => (flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b)))
        proTreepCheckedNodes.sort((a, b) => (flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b)))
        helpTreeCheckedNodes.sort((a, b) => (flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b)))

        while (helpTreeCheckedNodes.length > 0) {
          const helpNode = helpTreeCheckedNodes.pop()!
          const childNodes = (childTreeNodes.value[helpNode.key] || []).filter(node => !node.disabled && !node.disableCheckbox && node.checkable)
          const parentNodes = (parentTreeNodes.value[helpNode.key] || []).filter(node => !node.disabled && !node.disableCheckbox && node.checkable)
          const parentKeys = parentNodes.map(node => node.key)

          if (helper.isNonEmptyArray(childNodes) && !childNodes.every(node => keepTreeCheckedNodes.some(prop => node === prop))) {
            keepTreeCheckedNodes.splice(0, keepTreeCheckedNodes.length, ...keepTreeCheckedNodes.filter(node => node.disabled || node.disableCheckbox || (node.checkable && node.key !== helpNode.key && !parentKeys.includes(node.key))))
            helpTreeCheckedNodes.splice(0, helpTreeCheckedNodes.length, ...helpTreeCheckedNodes.filter(node => node.disabled || node.disableCheckbox || (node.checkable && node.key !== helpNode.key && !parentKeys.includes(node.key))))
          }
        }

        if (!props.checkedKeys.every((key, index) => Cacher.checkedKeys[index] === key) || !Cacher.checkedKeys.every((key, index) => props.checkedKeys[index] === key)) {
          Stater.outCheckedKeys.splice(0, Stater.outCheckedKeys.length, ...props.checkedKeys.filter(key => !flatTreeNodes.some(every => every.key === key)))
          Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...keepTreeCheckedNodes.map(node => node.key))
          Cacher.checkedKeys.splice(0, Cacher.checkedKeys.length, ...props.checkedKeys)
        }
      },
      resetStaterSelectedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const cacheSelectedKeys = Cacher.selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key))
        const propSelectedKeys = props.selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key))
        const helpSelectedKeys = props.selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key))
        const propSelectedNodes = propSelectedKeys.map(key => flatTreeNodes.find(every => every.key === key)!)
        const helpSelectedNodes = helpSelectedKeys.map(key => flatTreeNodes.find(every => every.key === key)!)

        cacheSelectedKeys.sort((a, b) => (flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b)))
        propSelectedNodes.sort((a, b) => (flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b)))
        helpSelectedNodes.sort((a, b) => (flatTreeNodes.findIndex(every => every === a) - flatTreeNodes.findIndex(every => every === b)))

        if (props.selectedMode === 'link') {
          while (helpSelectedNodes.length > 0) {
            const helpNode = helpSelectedNodes.pop()!
            const childNodes = (childTreeNodes.value[helpNode.key] || []).filter(node => !node.disabled && node.isSelectable)
            const parentNodes = (parentTreeNodes.value[helpNode.key] || []).filter(node => !node.disabled && node.isSelectable)
            const parentKeys = parentNodes.map(node => node.key)

            if (helper.isNonEmptyArray(childNodes) && childNodes.some(node => propSelectedNodes.some(prop => node === prop))) {
              propSelectedNodes.splice(0, propSelectedNodes.length, ...propSelectedNodes.filter(node => node.disabled || node.key !== helpNode.key))
              helpSelectedNodes.splice(0, helpSelectedNodes.length, ...helpSelectedNodes.filter(node => node.disabled || node.key !== helpNode.key))
            }

            propSelectedNodes.splice(0, propSelectedNodes.length, ...propSelectedNodes.filter(node => node.disabled || !parentKeys.includes(node.key)))
            helpSelectedNodes.splice(0, helpSelectedNodes.length, ...helpSelectedNodes.filter(node => node.disabled || !parentKeys.includes(node.key)))
          }
        }

        if (!propSelectedNodes.every((prop, index) => cacheSelectedKeys[index] === prop.key) || !cacheSelectedKeys.every((key, index) => propSelectedNodes[index]?.key === key)) {
          Cacher.selectedKeys.splice(0, Cacher.selectedKeys.length, ...propSelectedNodes.map(node => node.key))
          Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...propSelectedNodes.map(node => node.key))
        }
      },
      resetStaterExpandedKeys: () => {
        const flatTreeNodes = Stater.flatTreeNodes
        const propExpandedKeys = props.expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key))
        const cacheExpandedKeys = Cacher.expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key))

        propExpandedKeys.sort((a, b) => (flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b)))
        cacheExpandedKeys.sort((a, b) => (flatTreeNodes.findIndex(every => every.key === a) - flatTreeNodes.findIndex(every => every.key === b)))

        if (!propExpandedKeys.every((key, index) => cacheExpandedKeys[index] === key) || !cacheExpandedKeys.every((key, index) => propExpandedKeys[index] === key)) {
          Cacher.expandedKeys.splice(0, Cacher.expandedKeys.length, ...propExpandedKeys)
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length, ...propExpandedKeys)
        }
      },
      resetStaterLinkTreeNodes: force => {
        const rawPropTreeData = toRaw(props.treeData)
        const rawCacheTreeData = toRaw(Cacher.treeData)
        const propSpreadTreeData = Methoder.spreadTreeNodes(rawPropTreeData, Infinity)
        const cacheSpreadTreeData = Methoder.spreadTreeNodes(rawCacheTreeData, Infinity)

        if (propSpreadTreeData.length !== cacheSpreadTreeData.length || !propSpreadTreeData.every((propNode, index) => propNode === cacheSpreadTreeData[index])) {
          Stater.propTreeNodes.splice(0, Stater.propTreeNodes.length, ...rawPropTreeData)
          Cacher.treeData.splice(0, Cacher.treeData.length, ...rawPropTreeData)
          Methoder.resetTreeNodes(Stater.propTreeNodes, force)
        }
      }
    }

    const RenderTreeContainer = (_: any, ctx: typeof context) => {
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

    const RenderTreeComponent = (_: any, ctx: typeof context) => {
      const slots = {
        ...ctx.slots,
        switcherIcon: helper.isFunction(ctx.slots.switcherIcon) ? (node: STreeTargetNode) => ctx.slots.switcherIcon!({ ...node.referenceSourceNode, switcherCls: node.switcherCls }) : (node: STreeTargetNode) => RenderTreeSwitcherIcon(node, ctx),
        title: helper.isFunction(ctx.slots.title) ? (node: STreeTargetNode) => ctx.slots.title!({ ...node.referenceSourceNode }) : (node: STreeTargetNode) => RenderTreeNodeTitle(node, ctx),
        icon: helper.isFunction(ctx.slots.icon) ? (node: STreeTargetNode) => ctx.slots.icon!({ ...node.referenceSourceNode }) : (node: STreeTargetNode) => RenderTreeNodeIcon(node, ctx)
      }

      return (
        <ATree
          treeData={[...Stater.linkTreeNodes]}
          expandedKeys={[...Stater.expandedKeys]}
          selectedKeys={[...Stater.selectedKeys]}
          checkedKeys={{ checked: Stater.checkedKeys, halfChecked: Stater.halfCheckedKeys }}
          onDragstart={Methoder.doEventDragstart}
          onExpand={Methoder.doEventExpand}
          onSelect={Methoder.doEventSelect}
          onCheck={Methoder.doEventCheck}
          onDrop={Methoder.doEventDrop}
          selectable={props.selectable}
          checkable={props.checkable}
          blockNode={props.blockNode}
          draggable={props.draggable}
          disabled={props.disabled}
          showIcon={props.showIcon}
          showLine={props.showLine}
          virtual={props.virtual}
          checkStrictly={true}
          multiple={false}
          v-slots={slots}
        />
      )
    }

    const RenderTreeSwitcherIcon = (node: STreeTargetNode, ctx: typeof context) => {
      const icon = Methoder.renderSwitcher(node)
      const onClick = (event: MouseEvent) => {
        if (icon !== 'LoadingOutlined') {
          Methoder.triggerSwitcher(node)
        }
        event.stopPropagation()
      }
      return isIconType(icon) ? <SIcon type={icon} style='cursor: pointer;' class={{ [node.switcherCls]: icon === 'CaretDownOutlined' }} onClick={onClick}/> : null
    }

    const RenderTreeNodeIcon = (node: STreeTargetNode, ctx: typeof context) => {
      if (node.scopedSlots.icon === 'iconRoot') {
        return helper.isFunction(ctx.slots.iconRoot) ? ctx.slots.iconRoot({ ...node.referenceSourceNode }) : <SIcon type={isIconType(node.icon) ? node.icon : 'AppstoreOutlined'}/>
      }

      if (node.scopedSlots.icon === 'iconParent') {
        return helper.isFunction(ctx.slots.iconParent) ? ctx.slots.iconParent({ ...node.referenceSourceNode }) : <SIcon type={isIconType(node.icon) ? node.icon : 'ApartmentOutlined'}/>
      }
      if (node.scopedSlots.icon === 'iconLeaf') {
        return helper.isFunction(ctx.slots.iconLeaf) ? ctx.slots.iconLeaf({ ...node.referenceSourceNode }) : <SIcon type={isIconType(node.icon) ? node.icon : 'ApartmentOutlined'}/>
      }
    }

    const RenderTreeNodeTitle = (node: STreeTargetNode, ctx: typeof context) => {
      const RenderTreeNodeTitleRootLabel = (node: STreeTargetNode, ctx: typeof context) => {
        if (helper.isFunction(ctx.slots.titleRootLabel)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                tooltip={props.tooltip}
                ellipsis={true}
              >
                { ctx.slots.titleRootLabel({ ...node.referenceSourceNode }) }
              </SEllipsis>
            </span>
          )
        }

        if (helper.isNonEmptyArray(node.titles)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                tooltip={props.tooltip}
                ellipsis={true}
              >
                <span class='normal'>{ node.titles[0] }</span>
                <span class='primary'>{ node.titles[1] }</span>
                <span class='normal'>{ node.titles[2] }</span>
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
              { node.title }
            </SEllipsis>
          </span>
        )
      }

      const RenderTreeNodeTitleRootButton = (node: STreeTargetNode, ctx: typeof context) => {
        if (helper.isFunction(ctx.slots.titleRootButton)) {
          return (
            <span class={['s-tree-title-button', { 'always-show-title-button': props.alwaysShowTitleButton === true || node.alwaysShowTitleButton === true }]}>
              { ctx.slots.titleRootButton({ ...node.referenceSourceNode }) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      const RenderTreeNodeTitleParentLabel = (node: STreeTargetNode, ctx: typeof context) => {
        if (helper.isFunction(ctx.slots.titleParentLabel)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                tooltip={props.tooltip}
                ellipsis={true}
              >
                { ctx.slots.titleParentLabel({ ...node.referenceSourceNode }) }
              </SEllipsis>
            </span>
          )
        }

        if (helper.isNonEmptyArray(node.titles)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                tooltip={props.tooltip}
                ellipsis={true}
              >
                <span class='normal'>{ node.titles[0] }</span>
                <span class='primary'>{ node.titles[1] }</span>
                <span class='normal'>{ node.titles[2] }</span>
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

      const RenderTreeNodeTitleParentButton = (node: STreeTargetNode, ctx: typeof context) => {
        if (helper.isFunction(ctx.slots.titleParentButton)) {
          return (
            <span class={['s-tree-title-button', { 'always-show-title-button': props.alwaysShowTitleButton === true || node.alwaysShowTitleButton === true }]}>
              { ctx.slots.titleParentButton({ ...node.referenceSourceNode }) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      const RenderTreeNodeTitleLeafLabel = (node: STreeTargetNode, ctx: typeof context) => {
        if (helper.isFunction(ctx.slots.titleLeafLabel)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                tooltip={props.tooltip}
                ellipsis={true}
              >
                { ctx.slots.titleLeafLabel({ ...node.referenceSourceNode }) }
              </SEllipsis>
            </span>
          )
        }

        if (helper.isNonEmptyArray(node.titles)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                tooltip={props.tooltip}
                ellipsis={true}
              >
                <span class='normal'>{ node.titles[0] }</span>
                <span class='primary'>{ node.titles[1] }</span>
                <span class='normal'>{ node.titles[2] }</span>
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

      const RenderTreeNodeTitleLeafButton = (node: STreeTargetNode, ctx: typeof context) => {
        if (helper.isFunction(ctx.slots.titleLeafButton)) {
          return (
            <span class={['s-tree-title-button', { 'always-show-title-button': props.alwaysShowTitleButton === true || node.alwaysShowTitleButton === true }]}>
              { ctx.slots.titleLeafButton({ ...node.referenceSourceNode }) }
            </span>
          )
        }

        return <span class='s-tree-title-button'></span>
      }

      if (node.scopedSlots.title === 'titleRoot') {
        const ctxNode = {
          ...node,
          key: undefined as any
        }

        return helper.isFunction(ctx.slots.titleRoot) ? ctx.slots.titleRoot({ ...node.referenceSourceNode }) : (
          <span class={['s-tree-title-node', 's-tree-title-root-node', { 's-tree-title-sticky-node': props.sticky === true }]}>
            <RenderTreeNodeTitleRootLabel { ...ctxNode } v-slots={ctx.slots}/>
            <RenderTreeNodeTitleRootButton { ...ctxNode } v-slots={ctx.slots}/>
          </span>
        )
      }

      if (node.scopedSlots.title === 'titleParent') {
        const ctxNode = {
          ...node,
          key: undefined as any
        }

        return helper.isFunction(ctx.slots.titleParent) ? ctx.slots.titleParent({ ...node.referenceSourceNode }) : (
          <span class='s-tree-title-node s-tree-title-parent-node'>
            <RenderTreeNodeTitleParentLabel { ...ctxNode } v-slots={ctx.slots}/>
            <RenderTreeNodeTitleParentButton { ...ctxNode } v-slots={ctx.slots}/>
          </span>
        )
      }

      if (node.scopedSlots.title === 'titleLeaf') {
        const ctxNode = {
          ...node,
          key: undefined as any
        }

        return helper.isFunction(ctx.slots.titleLeaf) ? ctx.slots.titleLeaf({ ...node.referenceSourceNode }) : (
          <span class='s-tree-title-node s-tree-title-leaf-node'>
            <RenderTreeNodeTitleLeafLabel { ...ctxNode } v-slots={ctx.slots}/>
            <RenderTreeNodeTitleLeafButton { ...ctxNode } v-slots={ctx.slots}/>
          </span>
        )
      }
    }

    watch([
      () => props.checkable,
      () => props.filterField,
      () => props.filterValue,
      () => props.checkedMode,
      () => props.selectedMode,
      () => [...props.treeData],
      () => [...props.checkedKeys],
      () => [...props.selectedKeys],
      () => [...props.expandedKeys]
    ], (
      [newCheckable, newFilterField, newFilterValue, newCheckedMode, newSelectedMode, newTreeNodes, newCheckedKeys, newSelectedKeys, newExpandedKeys]: [boolean, 'key' | 'title', string | number, 'link' | 'default', 'link' | 'default', STreeSourceNodes, STreeKeys, STreeKeys, STreeKeys],
      [oldCheckable, oldFilterField, oldFilterValue, oldCheckedMode, oldSelectedMode, oldTreeNodes, oldCheckedKeys, oldSelectedKeys, oldExpandedKeys]: [boolean, 'key' | 'title', string | number, 'link' | 'default', 'link' | 'default', STreeSourceNodes, STreeKeys, STreeKeys, STreeKeys]
    ) => {
      let isFilterTreeNodes = false
      let isReloadTreeNodes = false
      let isReloadTreeStater = false
      let isForcedCleanStater = false

      let isChangeCheckable = false
      let isChangeCheckedMode = false
      let isChangeSelectedMode = false

      let isChangeCheckedKeys = false
      let isChangeSelectedKeys = false
      let isChangeExpandedKeys = false

      if (!isFilterTreeNodes) {
        isFilterTreeNodes = (
          newFilterField !== oldFilterField ||
          newFilterValue !== oldFilterValue
        )
      }

      if (!isReloadTreeNodes) {
        if (newTreeNodes !== oldTreeNodes) {
          const newPropTreeData = toRaw(unref(newTreeNodes)) || []
          const oldPropTreeData = toRaw(unref(oldTreeNodes)) || []
          const newSpreadTreeData = Methoder.spreadTreeNodes(newPropTreeData, Infinity)
          const oldSpreadTreeData = Methoder.spreadTreeNodes(oldPropTreeData, Infinity)

          isReloadTreeNodes = (
            !newSpreadTreeData.every((propNode, index) => propNode === oldSpreadTreeData[index]) ||
            !oldSpreadTreeData.every((cacheNode, index) => cacheNode === newSpreadTreeData[index])
          )
        }
      }

      if (!isReloadTreeStater) {
        if (newCheckedKeys !== oldCheckedKeys) {
          isChangeCheckedKeys = (
            !helper.isArray(newCheckedKeys) ||
            !helper.isArray(oldCheckedKeys) ||
            newCheckedKeys.length !== oldCheckedKeys.length ||
            newCheckedKeys.some(key => !oldCheckedKeys.includes(key))
          )
        }

        if (newSelectedKeys !== oldSelectedKeys) {
          isChangeSelectedKeys = (
            !helper.isArray(newSelectedKeys) ||
            !helper.isArray(oldSelectedKeys) ||
            newSelectedKeys.length !== oldSelectedKeys.length ||
            newSelectedKeys.some(key => !oldSelectedKeys.includes(key))
          )
        }

        if (newExpandedKeys !== oldExpandedKeys) {
          isChangeExpandedKeys = (
            !helper.isArray(newExpandedKeys) ||
            !helper.isArray(oldExpandedKeys) ||
            newExpandedKeys.length !== oldExpandedKeys.length ||
            newExpandedKeys.some(key => !oldExpandedKeys.includes(key))
          )
        }

        isChangeCheckable = newCheckable !== oldCheckable
        isChangeCheckedMode = newCheckedMode !== oldCheckedMode
        isChangeSelectedMode = newSelectedMode !== oldSelectedMode
        isReloadTreeStater = isChangeCheckable || isChangeCheckedMode || isChangeSelectedMode || isChangeCheckedKeys || isChangeSelectedKeys || isChangeExpandedKeys
        isForcedCleanStater = isChangeCheckable
      }

      if (isFilterTreeNodes) {
        Transformer.resetStaterFilters()
      }

      if (isReloadTreeNodes) {
        Transformer.resetStaterLinkTreeNodes(isForcedCleanStater)
      }

      if (isReloadTreeStater) {
        const setTreeStaterTypes: any = []
        isChangeCheckedKeys && setTreeStaterTypes.push('checked')
        isChangeSelectedKeys && setTreeStaterTypes.push('selected')
        isChangeExpandedKeys && setTreeStaterTypes.push('expanded')
        isChangeCheckedKeys && Transformer.resetStaterCheckedKeys()
        isChangeSelectedKeys && Transformer.resetStaterSelectedKeys()
        isChangeExpandedKeys && Transformer.resetStaterExpandedKeys()
        Methoder.cleanTreeStater(isForcedCleanStater, setTreeStaterTypes)
        Methoder.resetTreeStater(isForcedCleanStater, setTreeStaterTypes)
      }
    })

    watch(() => [Stater.filterField.value, Stater.filterValue.value], () => Transformer.resetPropFilters())
    watch(() => [...Stater.checkedKeys, ...Stater.outCheckedKeys], () => Transformer.resetPropCheckedKeys())
    watch(() => [...Stater.selectedKeys], () => Transformer.resetPropSelectedKeys())
    watch(() => [...Stater.expandedKeys], () => Transformer.resetPropExpandedKeys())

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
      filterTreeNodes: Methoder.filterTreeNodes,
      reloadTreeNodes: Methoder.reloadTreeNodes,
      appendTreeNodes: Methoder.appendTreeNodes,
      removeTreeNodes: Methoder.removeTreeNodes,
      changeTreeNodes: Methoder.changeTreeNodes,

      pickUpperTreeNodes: Methoder.pickUpperTreeNodes,
      pickLowerTreeNodes: Methoder.pickLowerTreeNodes,
      pickMatchTreeNode: Methoder.pickMatchTreeNode,

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
    Transformer.resetStaterFilters()
    Methoder.cleanTreeStater()
    Methoder.resetTreeStater()

    if (props.defaultExpandAll === true) {
      const isRightNumber = helper.isFiniteNumber(props.filterValue)
      const isRightString = helper.isNonEmptyString(props.filterValue)
      !isRightNumber && !isRightString && Methoder.doTreeAllExpanded()
    }

    return () => <RenderTreeContainer v-slots={context.slots}/>
  },
  slots: {} as STreeDefineSlots,
  methods: {} as STreeDefineMethods
})

export const treeDataDefiner = <T extends Record<string, any> = Record<string, any>>(treeData: T[]) => ref(treeData)
export const treeLoadDataDefiner = <T extends Record<string, any> = Record<string, any>>(loadData: STreeLoadData<T>) => loadData
export const treeDropHandlerDefiner = (dropHandler: STreeDropHandler) => dropHandler
export const treeReplaceFieldsDefiner = (replaceFields: STreeFieldNames) => ref(replaceFields)

export const treeEmitCheckDefiner = (func: (emiter: STreeEmiterCheck) => void) => func
export const treeEmitSelectDefiner = (func: (emiter: STreeEmiterSelect) => void) => func
export const treeEmitExpandDefiner = (func: (emiter: STreeEmiterExpand) => void) => func
export const treeEmitChangeDefiner = (func: (emiter: STreeEmiterChange) => void) => func

export default STree
