import './index.less'
import 'ant-design-vue/es/tree/style/index.less'
import 'ant-design-vue/es/message/style/index.less'

import * as VueTypes from 'vue-types'
import { defineComponent, SetupContext, ShallowReactive, ShallowRef, shallowReactive, shallowRef, watch, toRaw } from 'vue'
import { Key, DataNode } from 'ant-design-vue/es/vc-tree/interface'
import SIcon, { isIconType } from '@/S-Icon/index'
import SEllipsis from '@/S-Ellipsis/index'
import AMessage from 'ant-design-vue/es/message'
import ATree from 'ant-design-vue/es/tree'
import helper from '@/helper'

interface STreeSourceNode extends Omit<DataNode, 'key'> {
  key?: Key;
  title?: Key;
  children?: STreeSourceNode[];
}

interface STreeTargetNode extends STreeSourceNode {
  scopedSlots: {
    icon: string;
    title: string;
  };
  key: Key;
  icon: any;
  title: any;
  level: number;
  isLeaf: boolean;
  disabled: boolean;
  checkable: boolean;
  selectable: boolean;
  disableCheckbox: boolean;
  children: STreeTargetNode[];
  parentNode: STreeTargetNode | null;
  referenceTreeNode: STreeSourceNode;
}

interface STreeFieldNames {
  key?: string;
  title?: string;
  children?: string;
}

interface STreeLoadData {
  (treeNode: STreeSourceNode): Promise<STreeSourceNodes>
}

interface STreeMethoder {
  renderSwitcher: (node: STreeTargetNode) => string;
  triggerSwitcher: (node: STreeTargetNode) => void;

  resetTreeStater: (force?: boolean) => void;
  cleanTreeStater: (force?: boolean) => void;

  resetTreeNodes: (nodes?: STreeSourceNodes) => void;
  reloadTreeNodes: (nodes: STreeSourceNodes, parent?: STreeTargetNode | null) => STreeTargetNodes;
  appendTreeNodes: (nodes: STreeSourceNodes, parent?: STreeTargetNode | null) => STreeTargetNodes;
  removeTreeNodes: (nodes: STreeSourceNodes, parent?: STreeTargetNode | null) => STreeTargetNodes;
  compileTreeNodes: (nodes: STreeSourceNodes, parent?: STreeTargetNode | null) => STreeTargetNodes;
  recoverTreeNodes: (nodes: STreeTargetNodes) => STreeSourceNodes;
  spreadTreeNodes: <T extends STreeSourceNodes> (nodes: T) => T;

  expandTreeNodes: (keys: SKeys | { expanded: SKeys }) => void;
  collapseTreeNodes: (keys: SKeys | { expanded: SKeys }) => void;
  doTreeAllCollapse: (keys?: SKeys | { expanded: SKeys }) => void;
  doTreeAllExpand: (keys?: SKeys | { expanded: SKeys }) => void;
  doTreeExpand: (keys: SKeys | { expanded: SKeys }) => void;
  doTreeSelect: (keys: SKeys | { selected: SKeys }) => void;
  doTreeCheck: (keys: SKeys | { checked: SKeys }) => void;
  doTreeLoad: (keys: SKeys) => Promise<void[]>;
}

interface STreeTargeter {
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

interface STreeSourcer {
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

interface STreeStater {
  loadKeys: ShallowReactive<SKeys>;
  loadedKeys: ShallowReactive<SKeys>;

  checkedKeys: ShallowReactive<SKeys>;
  selectedKeys: ShallowReactive<SKeys>;
  expandedKeys: ShallowReactive<SKeys>;

  parentTreeNodes: ShallowRef<Record<string, STreeTargetNodes>>;
  childTreeNodes: ShallowRef<Record<string, STreeTargetNodes>>;
  flatTreeNodes: ShallowReactive<STreeTargetNodes>;
  linkTreeNodes: ShallowReactive<STreeTargetNodes>;
  propTreeNodes: ShallowReactive<STreeSourceNodes>;
}

interface STreeEmiter {
  loadKeys: SKeys;
  loadedKeys: SKeys;
  expandedKeys: SKeys;

  checkedKeys: SKeys;
  selectedKeys: SKeys;

  checkedNodes: STreeSourceNodes;
  selectedNodes: STreeSourceNodes;

  checkedNode: SPartSourceNode;
  selectedNode: SPartSourceNode;

  [key: string]: any;
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
    checkedKeys: VueTypes.array<string | number>().def([]),
    selectedKeys: VueTypes.array<string | number>().def([]),
    expandedKeys: VueTypes.array<string | number>().def([]),
    checkedMode: VueTypes.string<'link' | 'default'>().def('default'),
    selectedMode: VueTypes.string<'link' | 'default'>().def('default'),
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
  emits: {
    'check': (emiter: STreeEmiter) => true,
    'select': (emiter: STreeEmiter) => true,
    'expand': (emiter: STreeEmiter) => true,
    'update:treeData': (trees: STreeSourceNode) => true,
    'update:expandedKeys': (keys: SKeys) => true,
    'update:selectedKeys': (keys: SKeys) => true,
    'update:checkedKeys': (keys: SKeys) => true
  },
  setup(props, context) {
    const Stater: STreeStater = {
      loadKeys: shallowReactive([]),
      loadedKeys: shallowReactive([]),

      checkedKeys: shallowReactive([]),
      selectedKeys: shallowReactive([]),
      expandedKeys: shallowReactive([]),

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
          return 'loading'
        }

        if (props.showLine) {
          if (helper.isNotEmptyArray(node.children) || (isAsyncNode && !isLoadedNode)) {
            return !expandedKeys.includes(node.key) ? 'plus-square' : 'minus-square'
          }
          return 'file'
        }

        if (helper.isNotEmptyArray(node.children) || (isAsyncNode && !isLoadedNode)) {
          return 'caret-down'
        }

        return ''
      },

      triggerSwitcher(node) {
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes

        if (flatTreeNodes.some(every => every.key === node.key)) {
          Methoder.doTreeExpand(
            expandedKeys.includes(node.key)
              ? expandedKeys.filter(key => key !== node.key)
              : [...expandedKeys, node.key]
          )
        }
      },

      resetTreeStater(force) {
        const checkedKeys = Stater.checkedKeys
        const selectedKeys = Stater.selectedKeys
        const expandedKeys = Stater.expandedKeys
        const linkTreeNodes = Stater.linkTreeNodes
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes

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

        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        selectedKeys.splice(0, selectedKeys.length, ...selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))

        selectedNodes.push(...selectedKeys.map(key => flatTreeNodes.find(every => every.key === key)!))
        checkedNodes.push(...checkedKeys.map(key => flatTreeNodes.find(every => every.key === key)!))

        // 是否展开
        if (helper.isEmptyArray(expandedKeys)) {
          if (linkTreeNodes.length === 1) {
            Methoder.expandTreeNodes(flatTreeNodes.map(every => every.key).slice(0, 1))
          }
        }

        // 是否必选
        if (helper.isEmptyArray(selectedNodes)) {
          if (props.selectable && !props.allowUnSelected) {
            selectedNodes.push(...flatTreeNodes.filter(item => item.selectable).slice(0, 1))
          }
        }

        if (helper.isEmptyArray(checkedNodes)) {
          if (props.checkable && !props.allowUnChecked) {
            checkedNodes.push(...flatTreeNodes.filter(item => item.checkable).slice(0, 1))
          }
        }

        // 核心逻辑
        if (helper.isNotEmptyArray(selectedNodes)) {
          const upHandleNode = flatTreeNodes.find(every => selectedNodes.some(node => node.key === every.key))
          const parentNodes = upHandleNode && upHandleNode.key && parentTreeNodes.value[upHandleNode.key] || []

          if (upHandleNode) {
            selectedLinkNodes.push(...parentNodes, upHandleNode)
          }
        }

        if (helper.isNotEmptyArray(checkedNodes)) {
          let upHandleNodes = [...checkedNodes]
          let downHandleNodes = [...checkedNodes]
          let downHandleNode: STreeTargetNode | undefined
          let upHandleNode: STreeTargetNode | undefined

          // 向下处理
          downHandleNode = downHandleNodes.pop()

          while (downHandleNode) {
            if (flatTreeNodes.some(every => every.key === downHandleNode!.key)) {
              if (helper.isNotEmptyArray(childTreeNodes.value[downHandleNode.key])) {
                upHandleNodes.push(...childTreeNodes.value[downHandleNode.key].filter(child => !upHandleNodes.some(node => node.key === child.key)))
                downHandleNodes = downHandleNodes.filter(node => !childTreeNodes.value[downHandleNode!.key].some(child => node.key === child.key))
              }
            }
            downHandleNode = downHandleNodes.pop()
          }

          // 向上处理
          if (helper.isNotEmptyArray(upHandleNodes)) {
            let tempUpNodes: STreeTargetNodes = []
            let tempUpNode: STreeTargetNode | undefined

            upHandleNodes.sort((a, b) => a.level - b.level)
            upHandleNode = upHandleNodes.pop()
            tempUpNode = upHandleNode

            tempUpNodes = upHandleNodes.filter(node => node.level === upHandleNode!.level)
            upHandleNodes = upHandleNodes.filter(node => !tempUpNodes.some(temp => temp.level === node.level))

            while (tempUpNode) {
              if (tempUpNode.parentNode) {
                const parent = tempUpNode.parentNode
                const children = tempUpNode.parentNode.children || []

                if (children.every(child => checkedNodes.some(node => node.key === child.key))) {
                  if (!checkedNodes.some(node => node.key === parent.key)) {
                    checkedNodes.push(parent)
                  }
                } else {
                  if (checkedNodes.some(node => node.key === parent.key)) {
                    checkedNodes.splice(checkedNodes.findIndex(node => node.key === parent.key), 1)
                  }

                  if (children.some(child => checkedNodes.some(node => node.key === child.key) || checkedHalfNodes.some(node => node.key === child.key))) {
                    if (!checkedHalfNodes.some(node => node.key === parent.key)) {
                      checkedHalfNodes.push(parent)
                    }
                  }
                }

                if (!upHandleNodes.some(node => node.key === parent.key)) {
                  upHandleNodes.push(parent)
                }

                tempUpNodes = tempUpNodes.filter(temp => !children.some(child => child.key === temp.key))
              }

              if (helper.isNotEmptyArray(tempUpNodes)) {
                tempUpNode = tempUpNodes.pop()
              } else if (helper.isNotEmptyArray(upHandleNodes)) {
                upHandleNode = upHandleNodes.pop()
                tempUpNode = upHandleNode

                tempUpNodes = upHandleNodes.filter(node => node.level === upHandleNode!.level)
                upHandleNodes = upHandleNodes.filter(node => !tempUpNodes.some(temp => temp.level === node.level))
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
        Stater.checkedKeys.splice(0, Stater.checkedKeys.length, ...Targeter.checkedNodes.map(node => node.key))
        Stater.selectedKeys.splice(0, Stater.selectedKeys.length, ...Targeter.selectedNodes.map(node => node.key))

        // Targeter
        Targeter.selectedNode.value = selectedNodes[0] || null
        Targeter.selectedLinkNode.value = selectedLinkNodes[0] || null
        Targeter.checkedLinkNode.value = checkedLinkNodes[0] || null
        Targeter.checkedHalfNode.value = checkedHalfNodes[0] || null
        Targeter.checkedNode.value = checkedNodes[0] || null

        // Sourcer
        Sourcer.selectedNodes.splice(0, Sourcer.selectedNodes.length, ...selectedNodes.map(node => node.referenceTreeNode))
        Sourcer.selectedLinkNodes.splice(0, Sourcer.selectedLinkNodes.length, ...selectedLinkNodes.map(node => node.referenceTreeNode))
        Sourcer.checkedLinkNodes.splice(0, Sourcer.checkedLinkNodes.length, ...checkedLinkNodes.map(node => node.referenceTreeNode))
        Sourcer.checkedHalfNodes.splice(0, Sourcer.checkedHalfNodes.length, ...checkedHalfNodes.map(node => node.referenceTreeNode))
        Sourcer.checkedNodes.splice(0, Sourcer.checkedNodes.length, ...checkedNodes.map(node => node.referenceTreeNode))

        Sourcer.selectedNode.value = selectedNodes[0] && selectedNodes[0].referenceTreeNode || null
        Sourcer.selectedLinkNode.value = selectedLinkNodes[0] && selectedLinkNodes[0].referenceTreeNode || null
        Sourcer.checkedLinkNode.value = checkedLinkNodes[0] && checkedLinkNodes[0].referenceTreeNode || null
        Sourcer.checkedHalfNode.value = checkedHalfNodes[0] && checkedHalfNodes[0].referenceTreeNode || null
        Sourcer.checkedNode.value = checkedNodes[0] && checkedNodes[0].referenceTreeNode || null
      },

      cleanTreeStater(force) {
        if (force === true) {
          // Stater
          Stater.loadKeys.splice(0, Stater.loadKeys.length)
          Stater.loadedKeys.splice(0, Stater.loadedKeys.length)
          Stater.expandedKeys.splice(0, Stater.expandedKeys.length)

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
        const flatTreeNodes = Stater.flatTreeNodes

        // 清理中
        loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => flatTreeNodes.some(every => every.key === key && every.isLeaf === false)))
        loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => flatTreeNodes.some(every => every.key === key && every.isLeaf === false)))
        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNotEmptyArray(every.children))))
        selectedKeys.splice(0, selectedKeys.length, ...selectedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))
        checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => flatTreeNodes.some(every => every.key === key)))

        // 排序中
        loadKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        loadedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        expandedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        selectedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        checkedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
      },

      resetTreeNodes(nodes) {
        if (!helper.isArray(nodes)) {
          nodes = Stater.propTreeNodes
        }

        if (nodes !== Stater.propTreeNodes) {
          Stater.propTreeNodes = [...nodes]
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
            Stater.propTreeNodes = [...nodes]
          }

          loadKeys.splice(0, loadKeys.length)
          loadedKeys.splice(0, loadedKeys.length)
          linkTreeNodes.splice(0, linkTreeNodes.length)
          flatTreeNodes.splice(0, flatTreeNodes.length)
          parentTreeNodes.value = {}
          childTreeNodes.value = {}
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          if (loadKeys.includes(parentTreeNode.key)) {
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentTreeNode.key))
          }

          const isLeafedNode = parentTreeNode.isLeaf = false
          const isLoadedNode = loadedKeys.includes(parentTreeNode.key)
          const isAsyncNode = !isLeafedNode && helper.isFunction(props.loadData)

          isAsyncNode && !isLoadedNode && loadedKeys.push(parentTreeNode.key)
          parentTreeNode.referenceTreeNode.children = referencedNodes
          parentTreeNode.children = resultTreeNodes
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !childTreeNodes.value[parentTreeNode.key].some(child => child.key === every.key)))
          flatTreeNodes.splice(flatTreeNodes.findIndex(every => every.key === parentTreeNode.key) + 1, 0, ...flatResultNodes)
        }

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatResultNodes)
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

          isAsyncNode && !isLoadedNode && loadedKeys.push(parentTreeNode.key)
          parentTreeNode.referenceTreeNode.children = parentTreeNode.referenceTreeNode.children || []
          parentTreeNode.referenceTreeNode.children.push(...nodes)
          parentTreeNode.children.push(...resultTreeNodes)
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          const presetTreeNodes = childTreeNodes.value[parentTreeNode.key] || []
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !presetTreeNodes.some(child => child.key === every.key)))
          flatTreeNodes.splice(flatTreeNodes.findIndex(every => every.key === parentTreeNode.key) + 1, 0, ...presetTreeNodes, ...flatResultNodes)
        }

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.push(...flatResultNodes)
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
        const childTreeNodes = Stater.childTreeNodes
        const parentTreeNodes = Stater.parentTreeNodes
        const filterRemoveKeys = nodes.map(node => node[props.replaceFields.key || 'key'])
        const flatRemoveNodes = Methoder.spreadTreeNodes(nodes)

        if (!helper.isNotEmptyObject(parentTreeNode)) {
          Stater.propTreeNodes = Stater.propTreeNodes.filter(every => !filterRemoveKeys.includes(every.key))
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          if (loadKeys.includes(parentTreeNode.key)) {
            loadKeys.splice(0, loadKeys.length, ...loadKeys.filter(key => key !== parentTreeNode.key))
          }

          if (loadedKeys.includes(parentTreeNode.key)) {
            loadedKeys.splice(0, loadedKeys.length, ...loadedKeys.filter(key => key !== parentTreeNode.key))
          }

          if (helper.isNotEmptyArray(parentTreeNode.referenceTreeNode.children)) {
            parentTreeNode.referenceTreeNode.children = parentTreeNode.referenceTreeNode.children.filter(child => !filterRemoveKeys.includes(child.key))
          }

          if (!helper.isNotEmptyArray(parentTreeNode.referenceTreeNode.children)) {
            delete parentTreeNode.referenceTreeNode.children
          }

          parentTreeNode.children.splice(0, parentTreeNode.children.length, ...parentTreeNode.children.filter(every => !filterRemoveKeys.includes(every.key)))
        }

        if (helper.isNotEmptyObject(parentTreeNode)) {
          flatTreeNodes.splice(0, flatTreeNodes.length, ...flatTreeNodes.filter(every => !flatRemoveNodes.some(remove => remove.key === every.key)))
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

        Methoder.cleanTreeStater()
        Methoder.resetTreeStater()

        return parentTreeNode ? parentTreeNode.children : []
      },

      compileTreeNodes(nodes, parent) {
        const currentLevel = helper.isNotEmptyObject(parent) && parent.level + 1 || 1
        const currentParent = helper.isNotEmptyObject(parent) ? parent : null
        const currentNodes: STreeTargetNodes = []

        if (!helper.isNotEmptyArray(nodes)) {
          return currentNodes
        }

        for (const node of nodes) {
          const key: Key = node[props.replaceFields.key || 'key']
          const title: string = node[props.replaceFields.title || 'title']
          const children: STreeSourceNodes = node[props.replaceFields.children || 'children']

          const newNode: STreeTargetNode = {
            scopedSlots: {
              icon: currentLevel === 1 ? 'iconRoot' : 'iconChild',
              title: currentLevel === 1 ? 'titleRoot' : 'titleChild'
            },
            key: key,
            title: title,
            children: [],
            icon: node.icon,
            level: currentLevel,
            parentNode: currentParent,
            isLeaf: helper.isBoolean(node.isLeaf) ? node.isLeaf : !helper.isNotEmptyArray(children),
            checkable: helper.isFunction(props.allowSelectedLevel) ? props.allowSelectedLevel(node) !== false : node.level >= props.allowSelectedLevel,
            selectable: helper.isFunction(props.allowCheckedLevel) ? props.allowCheckedLevel(node) !== false : node.level >= props.allowCheckedLevel,
            disableCheckbox: node.disableCheckbox === true || currentParent?.disableCheckbox === true,
            disabled: node.disabled === true || currentParent?.disabled === true,
            referenceTreeNode: node
          }

          if (helper.isNotEmptyArray(children)) {
            newNode.children = Methoder.compileTreeNodes(children, newNode)
          }

          currentNodes.push(newNode)
        }

        return currentNodes
      },

      recoverTreeNodes(nodes) {
        const trees: STreeSourceNodes = []

        for (const node of nodes) {
          const tree = node.referenceTreeNode

          if (helper.isNotEmptyArray(node.children)) {
            tree.children = Methoder.recoverTreeNodes(node.children)
          }

          if (!helper.isNotEmptyArray(node.children)) {
            delete tree.children
          }

          trees.push(tree)
        }

        return trees
      },

      spreadTreeNodes(nodes) {
        const spreadNodes: any = []

        if (!helper.isNotEmptyArray(nodes)) {
          return spreadNodes
        }

        for (const node of nodes) {
          helper.isNotEmptyArray(node.children)
            ? spreadNodes.push(node, ...Methoder.spreadTreeNodes(node.children))
            : spreadNodes.push(node)
        }

        return spreadNodes
      },

      expandTreeNodes(keys) {
        if (helper.isNotEmptyObject(keys)) {
          keys = keys.expanded
        }

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

              if (props.allowAutoExpanded) {
                let onlyOneChild = expandedNode.children.length === 1
                let firstChildNode = expandedNode.children[0]

                while (onlyOneChild && helper.isNotEmptyObject(firstChildNode) && helper.isNotEmptyArray(firstChildNode.children) && !expandedKeys.includes(firstChildNode.key)) {
                  if (!expandedKeys.includes(firstChildNode.key)) {
                    expandedKeys.push(firstChildNode.key)
                  }
                  onlyOneChild = firstChildNode.children.length === 1
                  firstChildNode = firstChildNode.children[0]
                }
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
            Methoder.doTreeLoad(
              expandedKeys.filter(
                key => (
                  !loadKeys.includes(key) &&
                  !loadedKeys.includes(key) &&
                  !helper.isNotEmptyArray(flatTreeNodes.find(node => node.key === key)?.children) &&
                  flatTreeNodes.find(node => node.key === key)?.isLeaf === false
                )
              )
            )
          }
        }

        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNotEmptyArray(every.children))))
      },

      collapseTreeNodes(keys) {
        if (helper.isNotEmptyObject(keys)) {
          keys = keys.expanded
        }

        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes

        if (helper.isNotEmptyArray(keys)) {
          for (const key of keys) {
            const collapsedNode = flatTreeNodes.find(every => key === every.key)

            if (expandedKeys.includes(key)) {
              expandedKeys.splice(expandedKeys.findIndex(expanded => key === expanded), 1)

              if (props.allowAutoCollapsed) {
                if (helper.isNotEmptyArray(expandedKeys) && helper.isNotEmptyObject(collapsedNode)) {
                  expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(expanded => !childTreeNodes.value[collapsedNode.key].some(child => child.key === expanded)))
                }
              }
            }
          }
        }

        if (helper.isNotEmptyArray(expandedKeys)) {
          expandedKeys.sort((a, b) => flatTreeNodes.findIndex(node => node.key === a) - flatTreeNodes.findIndex(node => node.key === b))
        }

        expandedKeys.splice(0, expandedKeys.length, ...expandedKeys.filter(key => flatTreeNodes.some(every => every.key === key && helper.isNotEmptyArray(every.children))))
      },

      doTreeAllCollapse(keys) {
        Stater.expandedKeys.splice(0, Stater.expandedKeys.length)
      },

      doTreeAllExpand(keys) {
        Stater.expandedKeys.splice(0, Stater.expandedKeys.length, ...Stater.flatTreeNodes.filter(every => helper.isNotEmptyArray(every.children)).map(every => every.key))
      },

      doTreeExpand(keys) {
        if (helper.isNotEmptyObject(keys)) {
          keys = keys.expanded
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

        const delExpandedNodes = flatTreeNodes.filter(every => expandedKeys.some(key => every.key === key) && !computeKeys.some(key => every.key === key))
        const addExpandedNodes = flatTreeNodes.filter(every => !expandedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const delExpandedKeys = delExpandedNodes.map(node => node.key)
        const addExpandedKeys = addExpandedNodes.map(node => node.key)

        if (helper.isNotEmptyArray(delExpandedNodes)) {
          Methoder.collapseTreeNodes(delExpandedKeys)
        }

        if (helper.isNotEmptyArray(addExpandedNodes)) {
          if (!props.allowMultiExpanded) {
            if (helper.isNotEmptyArray(expandedKeys)) {
              Methoder.collapseTreeNodes([...expandedKeys])
            }

            addExpandedKeys.sort((a, b) => (
              flatTreeNodes.findIndex(node => node.key === a) -
              flatTreeNodes.findIndex(node => node.key === b)
            ))

            const expandKeys: SKeys = []
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
            const expandKeys: SKeys = []

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

        context.emit('expand', {
          loadKeys: [...Stater.loadKeys],
          loadedKeys: [...Stater.loadedKeys],
          expandedKeys: [...Stater.expandedKeys],

          checkedKeys: props.checkedMode === 'link' ? Targeter.checkedLinkNodes.map(node => node.key) : Targeter.checkedNodes.map(node => node.key),
          selectedKeys: props.selectedMode === 'link' ? Targeter.selectedLinkNodes.map(node => node.key) : Targeter.selectedNodes.map(node => node.key),

          checkedNodes: props.checkedMode === 'link' ? Sourcer.checkedLinkNodes.map(node => node) : Sourcer.checkedNodes.map(node => node),
          selectedNodes: props.selectedMode === 'link' ? Sourcer.selectedLinkNodes.map(node => node) : Sourcer.selectedNodes.map(node => node),

          checkedNode: props.checkedMode === 'link' ? toRaw(Sourcer.checkedLinkNode) : toRaw(Sourcer.checkedNode),
          selectedNode: props.selectedMode === 'link' ? toRaw(Sourcer.selectedLinkNode) : toRaw(Sourcer.selectedNode)
        })
      },

      doTreeSelect(keys) {
        if (helper.isNotEmptyObject(keys)) {
          keys = keys.selected
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

        if (!props.selectable) {
          if (helper.isNotEmptyArray(computeKeys)) {
            const findNode = (node: STreeTargetNode) => computeKeys.includes(node.key)
            const firstNode = flatTreeNodes.find(findNode)
            const firstKey = firstNode?.key || ''

            if (!props.allowSelectToCheck) {
              expandedKeys.includes(firstKey)
                ? props.allowAutoCollapsed && Methoder.doTreeExpand(expandedKeys.filter(key => key !== firstKey))
                : props.allowAutoExpanded && Methoder.doTreeExpand([...expandedKeys, firstKey])
            }

            if (props.allowSelectToCheck) {
              checkedKeys.includes(firstKey)
                ? Methoder.doTreeCheck(checkedKeys.filter(key => {
                  const children = childTreeNodes.value[firstKey].map(child => child.key)
                  const parents = parentTreeNodes.value[firstKey].map(parent => parent.key)
                  return key !== firstKey && !parents.includes(key) && !children.includes(key)
                }))
                : Methoder.doTreeCheck([
                  firstKey,
                  ...checkedKeys,
                  ...childTreeNodes.value[firstKey].map(child => child.key)
                ])
            }
          }
          return
        }

        const oldFirstSelectedKey = flatTreeNodes.map(every => every.key).find(key => selectedKeys.includes(key))
        const newFirstSelectedKey = flatTreeNodes.map(every => every.key).find(key => computeKeys.includes(key))
        const isSomeSelectedKey = oldFirstSelectedKey === newFirstSelectedKey

        if (newFirstSelectedKey) {
          !props.allowUnSelected || !isSomeSelectedKey
            ? selectedKeys.splice(0, selectedKeys.length, newFirstSelectedKey)
            : selectedKeys.splice(0, selectedKeys.length)
        }

        if (!newFirstSelectedKey) {
          !props.allowUnSelected && oldFirstSelectedKey
            ? selectedKeys.splice(0, selectedKeys.length, oldFirstSelectedKey)
            : selectedKeys.splice(0, selectedKeys.length)
        }

        const nowFirstSelectedKey = selectedKeys[0]
        const nowSomeSelectedKey = oldFirstSelectedKey === nowFirstSelectedKey

        if (nowFirstSelectedKey) {
          expandedKeys.includes(nowFirstSelectedKey)
            ? props.allowAutoCollapsed && nowSomeSelectedKey && Methoder.doTreeExpand(expandedKeys.filter(key => key !== nowFirstSelectedKey))
            : props.allowAutoExpanded && Methoder.doTreeExpand([...expandedKeys, nowFirstSelectedKey])
        }

        if (!nowFirstSelectedKey) {
          if (helper.isNotEmptyObject(oldFirstSelectedKey) && props.allowAutoCollapsed) {
            Methoder.doTreeExpand(expandedKeys.filter(key => key !== oldFirstSelectedKey))
          }
        }

        let delSelectedKeys: SKeys = []
        let addSelectedKeys: SKeys = []

        if (!nowSomeSelectedKey && oldFirstSelectedKey) {
          delSelectedKeys = !selectedKeys.includes(oldFirstSelectedKey) ? [oldFirstSelectedKey] : []
        }

        if (!nowSomeSelectedKey && newFirstSelectedKey) {
          addSelectedKeys = selectedKeys.includes(newFirstSelectedKey) ? [newFirstSelectedKey] : []
        }

        Methoder.cleanTreeStater()
        Methoder.resetTreeStater()

        context.emit('select', {
          loadKeys: [...Stater.loadKeys],
          loadedKeys: [...Stater.loadedKeys],
          expandedKeys: [...Stater.expandedKeys],

          checkedKeys: props.checkedMode === 'link' ? Targeter.checkedLinkNodes.map(node => node.key) : Targeter.checkedNodes.map(node => node.key),
          selectedKeys: props.selectedMode === 'link' ? Targeter.selectedLinkNodes.map(node => node.key) : Targeter.selectedNodes.map(node => node.key),

          checkedNodes: props.checkedMode === 'link' ? Sourcer.checkedLinkNodes.map(node => node) : Sourcer.checkedNodes.map(node => node),
          selectedNodes: props.selectedMode === 'link' ? Sourcer.selectedLinkNodes.map(node => node) : Sourcer.selectedNodes.map(node => node),

          checkedNode: props.checkedMode === 'link' ? toRaw(Sourcer.checkedLinkNode) : toRaw(Sourcer.checkedNode),
          selectedNode: props.selectedMode === 'link' ? toRaw(Sourcer.selectedLinkNode) : toRaw(Sourcer.selectedNode),

          delSelectedKeys: delSelectedKeys.map(key => key),
          addSelectedKeys: addSelectedKeys.map(key => key)
        })
      },

      doTreeCheck(keys) {
        if (helper.isNotEmptyObject(keys)) {
          keys = keys.checked
        }

        if (!helper.isArray(keys)) {
          return
        }

        if (!props.checkable) {
          return
        }

        const computeKeys = keys
        const checkedKeys = Stater.checkedKeys
        const flatTreeNodes = Stater.flatTreeNodes

        const delCheckedNodes = flatTreeNodes.filter(every => checkedKeys.some(key => every.key === key) && !computeKeys.some(key => every.key === key))
        const addCheckedNodes = flatTreeNodes.filter(every => !checkedKeys.some(key => every.key === key) && computeKeys.some(key => every.key === key))
        const delCheckedKeys = delCheckedNodes.map(node => node.key)
        const addCheckedKeys = addCheckedNodes.map(node => node.key)

        if (helper.isNotEmptyArray(delCheckedKeys)) {
          checkedKeys.splice(0, checkedKeys.length, ...checkedKeys.filter(key => !delCheckedKeys.includes(key)))
        }

        if (helper.isNotEmptyArray(addCheckedKeys)) {
          checkedKeys.push(...addCheckedKeys)
        }

        Methoder.cleanTreeStater()
        Methoder.resetTreeStater()

        context.emit('check', {
          loadKeys: [...Stater.loadKeys],
          loadedKeys: [...Stater.loadedKeys],
          expandedKeys: [...Stater.expandedKeys],

          checkedKeys: props.checkedMode === 'link' ? Targeter.checkedLinkNodes.map(node => node.key) : Targeter.checkedNodes.map(node => node.key),
          selectedKeys: props.selectedMode === 'link' ? Targeter.selectedLinkNodes.map(node => node.key) : Targeter.selectedNodes.map(node => node.key),

          checkedNodes: props.checkedMode === 'link' ? Sourcer.checkedLinkNodes.map(node => node) : Sourcer.checkedNodes.map(node => node),
          selectedNodes: props.selectedMode === 'link' ? Sourcer.selectedLinkNodes.map(node => node) : Sourcer.selectedNodes.map(node => node),

          checkedNode: props.checkedMode === 'link' ? toRaw(Sourcer.checkedLinkNode) : toRaw(Sourcer.checkedNode),
          selectedNode: props.selectedMode === 'link' ? toRaw(Sourcer.selectedLinkNode) : toRaw(Sourcer.selectedNode),

          delCheckedKeys: delCheckedKeys.map(key => key),
          addCheckedKeys: addCheckedKeys.map(key => key)
        })
      },

      doTreeLoad(keys) {
        const promises = []
        const tempKeys = [...keys]
        const loadKeys = Stater.loadKeys
        const loadedKeys = Stater.loadedKeys
        const expandedKeys = Stater.expandedKeys
        const flatTreeNodes = Stater.flatTreeNodes
        const childTreeNodes = Stater.childTreeNodes
        const loadTreeNodes = helper.isFunction(props.loadData) ? props.loadData : null

        if (!helper.isFunction(loadTreeNodes)) {
          return Promise.resolve([])
        }

        if (helper.isNotEmptyArray(tempKeys)) {
          tempKeys.sort((a, b) => (
            flatTreeNodes.findIndex(node => node.key === a) -
            flatTreeNodes.findIndex(node => node.key === b)
          ))

          for (const temp of tempKeys) {
            if (keys.includes(temp)) {
              keys.splice(0, keys.length, ...keys.filter(key => !childTreeNodes.value[temp].some(child => child.key === key)))
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
                  const loadNodes = helper.isArray(nodes) ? nodes : []
                  const targetNodes = Methoder.reloadTreeNodes(loadNodes, loadNode)

                  if (props.allowAutoExpanded) {
                    Methoder.doTreeExpand([
                      key,
                      ...expandedKeys,
                      ...targetNodes.filter(node => nodes.length === 1 && !node.isLeaf).map(node => node.key)
                    ])
                  }

                  doSuccess()
                })
                .catch(() => {
                  AMessage.error({
                    content: '加载失败，请重试!',
                    onClose: doError,
                    duration: 0.3
                  })
                })
            )
          }
        }

        return Promise.all(promises)
      }
    }

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
          treeData={Stater.linkTreeNodes}
          expandedKeys={Stater.expandedKeys}
          selectedKeys={Stater.selectedKeys}
          checkedKeys={Stater.checkedKeys}
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
      if (node.scopedSlots.icon === 'iconRoot') {
        return helper.isFunction(ctx.slots.iconRoot) ? ctx.slots.iconRoot(node) : <SIcon type={isIconType(node.icon) ? node.icon : 'AppstoreOutlined'}/>
      }

      if (node.scopedSlots.icon === 'iconChild') {
        return helper.isFunction(ctx.slots.iconChild) ? ctx.slots.iconChild(node) : <SIcon type={isIconType(node.icon) ? node.icon : 'ApartmentOutlined'}/>
      }
    }

    const RenderTreeNodeTitle = (node: STreeTargetNode, ctx: SetupContext) => {
      const RenderTreeNodeTitleRootLabel = (node: STreeTargetNode, ctx: SetupContext) => {
        if (helper.isFunction(ctx.slots.titleRootLabel)) {
          return (
            <span class='s-tree-title-label'>
              <SEllipsis
                limit={props.tooltip}
                tooltip={props.tooltip > -1}
              >
                { ctx.slots.titleRootLabel(node) }
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
              <SEllipsis
                limit={props.tooltip ? props.tooltip - node.level * 2 : 0}
                tooltip={props.tooltip > -1}
              >
                { ctx.slots.titleChildLabel(node) }
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

      if (node.scopedSlots.title === 'titleRoot') {
        return helper.isFunction(ctx.slots.titleRoot) ? ctx.slots.titleRoot(node) : (
          <span class='spans-tree-title-container'>
            <RenderTreeNodeTitleRootLabel { ...node } v-slots={ctx.slots}/>
            <RenderTreeNodeTitleRootButton { ...node } v-slots={ctx.slots}/>
          </span>
        )
      }

      if (node.scopedSlots.title === 'titleChild') {
        return helper.isFunction(ctx.slots.titleChild) ? ctx.slots.titleChild(node) : (
          <span class='spans-tree-title-container'>
            <RenderTreeNodeTitleChildLabel { ...node } v-slots={ctx.slots}/>
            <RenderTreeNodeTitleChildButton { ...node } v-slots={ctx.slots}/>
          </span>
        )
      }
    }

    context.expose({
      loadKeys: Stater.loadKeys,
      loadedKeys: Stater.loadedKeys,

      checkedKeys: Stater.checkedKeys,
      selectedKeys: Stater.selectedKeys,
      expandedKeys: Stater.expandedKeys,

      parentTreeNodes: Stater.parentTreeNodes,
      childTreeNodes: Stater.childTreeNodes,
      flatTreeNodes: Stater.flatTreeNodes,
      linkTreeNodes: Stater.linkTreeNodes,
      propTreeNodes: Stater.propTreeNodes,

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
      recoverTreeNodes: Methoder.recoverTreeNodes,
      spreadTreeNodes: Methoder.spreadTreeNodes,

      doTreeAllCollapse: Methoder.doTreeAllCollapse,
      doTreeAllExpand: Methoder.doTreeAllExpand,
      doTreeExpand: Methoder.doTreeExpand,
      doTreeSelect: Methoder.doTreeSelect,
      doTreeCheck: Methoder.doTreeCheck
    })

    watch(Stater.propTreeNodes, trees => context.emit('update:treeData', [...trees]))
    watch(Stater.expandedKeys, keys => context.emit('update:expandedKeys', [...keys]))
    watch(Stater.selectedKeys, keys => context.emit('update:selectedKeys', [...keys]))
    watch(Stater.checkedKeys, keys => context.emit('update:checkedKeys', [...keys]))

    watch([
      props.treeData,
      props.checkable,
      props.checkedMode,
      props.selectedMode,
      props.checkedKeys,
      props.selectedKeys,
      props.expandedKeys
    ], (
      [newTreeNodes, newCheckable, newCheckedMode, newSelectedMode, newCheckedKeys, newSelectedKeys, newExpandedKeys]: [STreeSourceNodes, boolean, 'link' | 'default', 'link' | 'default', SKeys, SKeys, SKeys],
      [oldTreeNodes, oldCheckable, oldCheckedMode, oldSelectedMode, oldCheckedKeys, oldSelectedKeys, oldExpandedKeys]: [STreeSourceNodes, boolean, 'link' | 'default', 'link' | 'default', SKeys, SKeys, SKeys]
    ) => {
      let isReloadTreeNodes = false
      let isReloadTreeStater = false
      let isForcedCleanStater = false

      const key = props.replaceFields.key || 'key'
      const propTreeNodes = Stater.propTreeNodes
      const expandedKeys = Stater.expandedKeys
      const selectedKeys = Stater.selectedKeys
      const checkedKeys = Stater.checkedKeys

      if (!isReloadTreeNodes) {
        isReloadTreeNodes = (
          !newTreeNodes.every(newNode => propTreeNodes.some(propNode => propNode[key] === newNode[key])) ||
          !propTreeNodes.every(propNode => newTreeNodes.some(newNode => newNode[key] === propNode[key]))
        )
      }

      if (!isReloadTreeStater) {
        isReloadTreeStater = newCheckable !== oldCheckable
        isForcedCleanStater = newCheckable !== oldCheckable
      }

      if (!isReloadTreeStater) {
        isReloadTreeStater = newCheckedMode !== oldCheckedMode || newSelectedMode !== oldSelectedMode
      }

      if (!isReloadTreeStater) {
        isReloadTreeStater = (
          !checkedKeys.every(key => newCheckedKeys.includes(key)) ||
          !selectedKeys.every(key => newSelectedKeys.includes(key)) ||
          !expandedKeys.every(key => newExpandedKeys.includes(key)) ||
          !newCheckedKeys.every(newKey => checkedKeys.includes(newKey)) ||
          !newSelectedKeys.every(newKey => selectedKeys.includes(newKey)) ||
          !newExpandedKeys.every(newKey => expandedKeys.includes(newKey))
        )
      }

      if (isReloadTreeNodes) {
        Methoder.resetTreeNodes(newTreeNodes)
      }

      if (isReloadTreeStater) {
        Methoder.cleanTreeStater(isForcedCleanStater)
        Methoder.resetTreeStater()
      }
    })

    return () => <RenderTreeContainer v-slots={context.slots} />
  }
})

export default STree
