import { defineComponent, computed } from 'vue'
import * as VueTypes from 'vue-types'

export const STableLoading = defineComponent({
  name: 'STableLoading',
  inheritAttrs: false,
  props: {
    optionser: VueTypes.object().isRequired,
  },
  setup(props) {
    let top = '50%' as any
    let left = '50%' as any
    let right = 'auto' as any
    let bottom = 'auto' as any

    const Optionser = computed(() => {
      return {
        scroller: props.optionser.resizerContainer.value,
        container: props.optionser.refTableContainer.value,
        windowWidth: props.optionser.windowInnerWidth.value,
        windowHeight: props.optionser.windowInnerHeight.value,
        scrollLeft: props.optionser.resizerScrollLeft.value,
        scrollTop: props.optionser.resizerScrollTop.value,
      }
    })

    return () => {
      if (typeof HTMLElement !== 'undefined' && Optionser.value.container instanceof HTMLElement && Optionser.value.scroller instanceof HTMLElement) {
        const containerRect = Optionser.value.container.getBoundingClientRect()
        const scrollerRect = Optionser.value.scroller.getBoundingClientRect()

        top = Math.max(containerRect.top, scrollerRect.top)
        left = Math.max(containerRect.left, scrollerRect.left)
        right = Math.min(containerRect.right, scrollerRect.right, Optionser.value.windowWidth)
        bottom = Math.min(containerRect.bottom, scrollerRect.bottom, Optionser.value.windowHeight)

        top = (top - containerRect.top) + (bottom - top) / 2
        left = (left - containerRect.left) + (right - left) / 2

        top = top > 100 ? top : 100
        left = left > 100 ? left : 100
      }

      return (
        <div class="s-table-loading-container">
          <span
            class="s-table-loading-dot-group"
            style={{ top: top + 'px', left: left + 'px' }}
          >
            <i class="s-table-loading-dot" />
            <i class="s-table-loading-dot" />
            <i class="s-table-loading-dot" />
            <i class="s-table-loading-dot" />
          </span>

          <div
            class="s-table-loading-text"
            style={{ top: top + 'px', left: left + 'px' }}
          >
            <span>正在加载中...</span>
          </div>
        </div>
      )
    }
  },
})

export default STableLoading
