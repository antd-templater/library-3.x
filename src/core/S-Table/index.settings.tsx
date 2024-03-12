import { defineComponent, onMounted, onUnmounted, nextTick, watch, ref } from 'vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import * as VueTypes from 'vue-types'
import STree from '../S-Tree'

interface STableSettingsType {
  key: string;
  title: string;
  children?: STableSettingsType[] | null;
  column: { rowIndex: number; colIndex: number; }
}

interface STableDropOptionsType {
  reloadNodes: Array<any>;
  appendNodes: Array<any>;
  removeNodes: Array<any>;
}

export const STableSettings = defineComponent({
  name: 'STableSettings',
  inheritAttrs: false,
  props: {
    title: VueTypes.string().def(''),
    style: VueTypes.object().def(() => ({})),
    multiline: VueTypes.bool().def(false),
    treeData: VueTypes.array<STableSettingsType>().def(() => []),
    dropHandler: VueTypes.func<(_: STableDropOptionsType) => boolean | void>().def(() => false),
    expandedKeys: VueTypes.array<string>().def(() => []),
    checkedKeys: VueTypes.array<string>().def(() => []),
    allTreeKeys: VueTypes.array<string>().def(() => []),
    draggable: VueTypes.bool().def(false)
  },
  emits: {
    'update:checkedKeys': (values: string[]) => true
  },
  setup(props, context) {
    const visible = ref(false)
    const overlay = ref(null as HTMLElement | null)
    const checkedKeys = ref(props.checkedKeys)
    const expandedKeys = ref(props.expandedKeys)
    const closer = () => { visible.value = false }
    const stoper = (event: Event) => { event.stopPropagation() }
    const toggler = (event: Event) => { visible.value = !visible.value; event.stopPropagation() }

    onMounted(() => { document.body.addEventListener('click', closer) })
    onUnmounted(() => { document.body.removeEventListener('click', closer) })

    watch(() => checkedKeys.value, value => { context.emit('update:checkedKeys', value.length > 0 ? value : [...props.allTreeKeys]) })
    watch(() => visible.value, value => { !value && (expandedKeys.value = [...props.allTreeKeys]) })
    watch(() => props.checkedKeys, value => { checkedKeys.value = value })

    return () => {
      const RenderOverlay = () => {
        if (!visible.value) {
          return <></>
        }

        nextTick(() => {
          if (overlay.value) {
            // fix mouseleave bug when tree node collapsed (width decreases)
            overlay.value.style.width = overlay.value.getBoundingClientRect().width + 'px'
          }
        })

        return (
          <div
            ref={overlay}
            class='s-table-settings-overlay'
            onMouseleave={closer}
            onClick={stoper}
          >
            <STree
              style={{ margin: props.multiline === true ? `7px 10px 3px 5px` : `7px 10px 3px -8px` }}
              v-models={[[checkedKeys.value, 'checkedKeys'], [expandedKeys.value, 'expandedKeys']]}
              dropHandler={props.dropHandler}
              draggable={props.draggable}
              treeData={props.treeData}
              allowSelectToCheck={true}
              checkedMode={'link'}
              selectable={false}
              checkable={true}
            />
          </div>
        )
      }

      return (
        <div
          class='s-table-settings-container'
          style={props.style}
          onClick={toggler}
        >
          <div class='s-table-settings-icon'>
            <SettingOutlined style={{ color: 'var(--ant-primary-color)' }}/>
          </div>

          <div class='s-table-settings-title'>
            { props.title }
          </div>

          <RenderOverlay />
        </div>
      )
    }
  }
})

export default STableSettings
