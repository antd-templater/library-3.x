import type { Key } from 'ant-design-vue/es/vc-tree/interface'
import type { EventDataNode } from 'ant-design-vue/es/vc-tree/interface'
import type { ShallowReactive } from 'vue'
import type { ShallowRef } from 'vue'
import type { SlotsType } from 'vue'

export interface STreeFilterProps {
  filterField?: 'key' | 'title';
  filterValue: string | number;
}

export interface STreeFieldNames {
  key?: string;
  icon?: string;
  title?: string;
  isLeaf?: string;
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
  getVNodes: (node: any) => any;

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
  doEventExpand: (keys: STreeKeys | { expanded: STreeKeys; }) => void;
  doEventSelect: (keys: STreeKeys | { selected: STreeKeys; }) => void;
  doEventCheck: (keys: STreeKeys | { checked: STreeKeys; }) => void;
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
  appendNodes: Array<{ parentNode?: STreePartSourceNode | null; rootChildNodes: STreeSourceNodes; appendChildNodes: STreeSourceNodes; }>;
  removeNodes: Array<{ parentNode?: STreePartSourceNode | null; rootChildNodes: STreeSourceNodes; removeChildNodes: STreeSourceNodes; }>;
  loadedKeys: STreeKeys;
  loadKeys: STreeKeys;
}

export interface STreeLoadData<T = STreeSourceNode> {
  (treeNode: T, options?: { loadKeys: STreeKeys; loadedKeys: STreeKeys; checkedKeys: STreeKeys; outCheckedKeys: STreeKeys; selectedKeys: STreeKeys; expandedKeys: STreeKeys; }): Promise<Array<T> | void> | Array<T> | void;
}

export type STreeKey = Key
export type STreeKeys = Key[]
export type STreeSourceNodes = STreeSourceNode[]
export type STreeTargetNodes = STreeTargetNode[]
export type STreeSpreadNodes = STreeTargetNodes | STreeSourceNodes
export type STreePartTargetNode = STreeTargetNode | null
export type STreePartSourceNode = STreeSourceNode | null

export type STreeDefineMethods = Pick<STreeMethoder,
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

export type STreeDefineSlots = SlotsType<{
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
    switcherCls: string;
  };
}>
