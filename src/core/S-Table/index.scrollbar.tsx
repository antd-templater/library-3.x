import { computed, defineComponent, reactive, ref, Ref } from 'vue'
import * as VueTypes from 'vue-types'

export const STableScrollbar = defineComponent({
  name: 'STableScrollbar',
  inheritAttrs: false,
  props: {
    overflow: VueTypes.string().isRequired,
    optionser: VueTypes.object().isRequired,
    direction: VueTypes.string().isRequired
  },
  setup(props) {
    const store = reactive({
      visible: false,
      activate: false,
      mousedownX: 0,
      mousedownY: 0,
      scrollbarX: 0,
      scrollbarY: 0
    })

    const size = ref(8)
    const listened = ref(false)
    const container = ref(null) as Ref<HTMLElement | null>
    const scrollbar = ref(null) as Ref<HTMLElement | null>

    const Optionser = computed(() => {
      if (props.overflow === 'auto') {
        return {
          scroller: props.optionser.refTableWrapper.value,
          scrollTop: props.optionser.wrapperScrollTop.value,
          scrollLeft: props.optionser.wrapperScrollLeft.value,
          scrollWidth: props.optionser.wrapperScrollLeft.value + props.optionser.wrapperScrollClientWidth.value + props.optionser.wrapperScrollRight.value,
          scrollHeight: props.optionser.wrapperScrollTop.value + props.optionser.wrapperScrollClientHeight.value + props.optionser.wrapperScrollBottom.value,
          clientHeight: props.optionser.wrapperScrollClientHeight.value,
          clientWidth: props.optionser.wrapperScrollClientWidth.value,
          windowHeight: props.optionser.windowInnerHeight.value,
          windowWidth: props.optionser.windowInnerWidth.value,
          container: props.optionser.refTableContainer.value,
          table: props.optionser.refTableNoder.value
        }
      }

      return {
        scroller: props.optionser.resizerContainer.value,
        scrollTop: props.optionser.resizerScrollTop.value,
        scrollLeft: props.optionser.resizerScrollLeft.value,
        scrollWidth: props.optionser.resizerScrollLeft.value + props.optionser.resizerScrollClientWidth.value + props.optionser.resizerScrollRight.value,
        scrollHeight: props.optionser.resizerScrollTop.value + props.optionser.resizerScrollClientHeight.value + props.optionser.resizerScrollBottom.value,
        clientHeight: props.optionser.resizerScrollClientHeight.value,
        clientWidth: props.optionser.resizerScrollClientWidth.value,
        windowHeight: props.optionser.windowInnerHeight.value,
        windowWidth: props.optionser.windowInnerWidth.value,
        container: props.optionser.refTableContainer.value,
        table: props.optionser.refTableNoder.value
      }
    })

    const scrollCompute = (range: number) => {
      if (props.direction === 'horizontal') {
        Optionser.value.scroller.scrollLeft = range / Optionser.value.clientWidth * Optionser.value.scrollWidth
        Optionser.value.scroller!.scrollLeft = Optionser.value.scroller!.scrollLeft > 0 ? Optionser.value.scroller!.scrollLeft : 0
      }

      if (props.direction === 'vertical') {
        Optionser.value.scroller!.scrollTop = range / Optionser.value.clientHeight * Optionser.value.scrollHeight
        Optionser.value.scroller!.scrollTop = Optionser.value.scroller!.scrollTop > 0 ? Optionser.value.scroller!.scrollTop : 0
      }
    }

    const scrollbarMouseUp = (event: MouseEvent) => {
      store.activate = false
      store.scrollbarX = 0
      store.scrollbarY = 0
      store.mousedownX = 0
      store.mousedownY = 0
      document.body.classList.remove('user-select-none')
    }

    const scrollbarMouseDown = (event: MouseEvent) => {
      if (Optionser.value.scroller instanceof HTMLElement) {
        if (props.direction === 'horizontal') {
          store.activate = true
          store.scrollbarX = Optionser.value.scrollLeft / Optionser.value.scrollWidth * Optionser.value.clientWidth
          store.scrollbarY = 0
          store.mousedownX = event.clientX
          store.mousedownY = 0
          document.body.classList.add('user-select-none')
        }

        if (props.direction === 'vertical') {
          store.activate = true
          store.scrollbarX = 0
          store.scrollbarY = Optionser.value.scrollTop / Optionser.value.scrollHeight * Optionser.value.clientHeight
          store.mousedownX = 0
          store.mousedownY = event.clientY
          document.body.classList.add('user-select-none')
        }

        event.stopPropagation()
      }
    }

    const scrollbarMouseMove = (event: MouseEvent) => {
      if (!(Optionser.value.scroller instanceof HTMLElement)) {
        store.activate = false
        store.scrollbarX = 0
        store.scrollbarY = 0
        store.mousedownX = 0
        store.mousedownY = 0
      }

      if (store.activate) {
        props.direction === 'horizontal' && scrollCompute(store.scrollbarX + event.clientX - store.mousedownX)
        props.direction === 'vertical' && scrollCompute(store.scrollbarY + event.clientY - store.mousedownY)
        event.stopPropagation()
      }
    }

    const containerMouseDown = (event: MouseEvent) => {
      if (props.direction === 'horizontal') {
        const containerRect = container.value!.getBoundingClientRect()
        const scrollbarRect = scrollbar.value!.getBoundingClientRect()
        scrollCompute(event.clientX - containerRect.left - scrollbarRect.width / 2)
      }

      if (props.direction === 'vertical') {
        const containerRect = container.value!.getBoundingClientRect()
        const scrollbarRect = scrollbar.value!.getBoundingClientRect()
        scrollCompute(event.clientY - containerRect.top - scrollbarRect.height / 2)
      }
    }

    const parenterMouseLeave = (event: MouseEvent) => {
      store.visible = false
    }

    const parenterMouseEnter = (event: MouseEvent) => {
      store.visible = true
    }

    return () => {
      if (props.direction !== 'horizontal' && props.direction !== 'vertical') {
        return
      }

      if (props.direction === 'horizontal' && Optionser.value.scrollWidth <= Optionser.value.clientWidth + 10) {
        return
      }

      if (props.direction === 'vertical' && Optionser.value.scrollHeight <= Optionser.value.clientHeight + 10) {
        return
      }

      if (Optionser.value.windowHeight <= 100 || Optionser.value.windowWidth <= 100) {
        return
      }

      if (Optionser.value.clientHeight <= 100 || Optionser.value.clientWidth <= 100) {
        return
      }

      if (Optionser.value.scrollHeight <= 100 || Optionser.value.scrollWidth <= 100) {
        return
      }

      if (!(Optionser.value.container instanceof HTMLElement)) {
        return
      }

      if (!(Optionser.value.scroller instanceof HTMLElement)) {
        return
      }

      if (!(Optionser.value.table instanceof HTMLElement)) {
        return
      }

      const paddingLeft = props.direction === 'vertical' && parseInt(window.getComputedStyle(Optionser.value.scroller).paddingLeft) || 0
      const scrollerRect = Optionser.value.scroller.getBoundingClientRect()

      const isOutsideTop = scrollerRect.top >= Optionser.value.windowHeight - 20
      const isOutsideLeft = scrollerRect.left >= Optionser.value.windowWidth - 20
      const isOutsideRight = scrollerRect.right <= Optionser.value.windowWidth + 20
      const isOutsideBottom = scrollerRect.bottom <= Optionser.value.windowHeight + 20
      const isRenderContainer = store.visible || store.activate

      const containerStyle: any = {}
      const scrollbarStyle: any = {}

      if (props.direction === 'horizontal') {
        Object.assign(containerStyle, {
          width: `${Optionser.value.clientWidth}px`,
          height: `${size.value}px`,
          display: `${!isOutsideTop && !isOutsideBottom && isRenderContainer ? 'block' : 'none'}`,
          transform: `translate(0, ${Optionser.value.windowHeight - scrollerRect.bottom - 3}px)`,
          backgroundColor: `rgba(255, 255, 255, 0.15)`,
          position: `sticky`,
          cursor: `pointer`,
          zIndex: 99999,
          bottom: 0,
          left: 0
        })

        Object.assign(scrollbarStyle, {
          height: `${size.value}px`,
          width: `${(Optionser.value.clientWidth / Optionser.value.scrollWidth * Optionser.value.clientWidth).toFixed(3)}px`,
          transform: `translate(${(Optionser.value.scrollLeft / Optionser.value.scrollWidth * Optionser.value.clientWidth).toFixed(3)}px, 0)`,
          backgroundColor: `rgba(0, 0, 0, 0.5)`,
          borderRadius: `${size.value / 2}px`
        })
      }

      if (props.direction === 'vertical') {
        Object.assign(containerStyle, {
          width: `${size.value}px`,
          height: `${Optionser.value.clientHeight}px`,
          marginTop: `${-Optionser.value.clientHeight}px`,
          display: `${!isOutsideLeft && !isOutsideRight && isRenderContainer ? 'block' : 'none'}`,
          transform: `translate(${Optionser.value.clientWidth + (Optionser.value.windowWidth - scrollerRect.right) - paddingLeft - size.value - 3}px, 0)`,
          backgroundColor: `rgba(255, 255, 255, 0.15)`,
          position: `sticky`,
          cursor: `pointer`,
          zIndex: 99999,
          bottom: 0,
          left: 0
        })

        Object.assign(scrollbarStyle, {
          width: `${size.value}px`,
          height: `${(Optionser.value.clientHeight / Optionser.value.scrollHeight * Optionser.value.clientHeight).toFixed(3)}px`,
          transform: `translate(0, ${(Optionser.value.scrollTop / Optionser.value.scrollHeight * Optionser.value.clientHeight).toFixed(3)}px)`,
          backgroundColor: `rgba(0, 0, 0, 0.5)`,
          borderRadius: `${size.value / 2}px`
        })
      }

      if (!listened.value) {
        Optionser.value.container.removeEventListener('mouseleave', parenterMouseLeave)
        Optionser.value.container.removeEventListener('mouseenter', parenterMouseEnter)
        document.removeEventListener('mousemove', scrollbarMouseMove)
        document.removeEventListener('mouseup', scrollbarMouseUp)

        Optionser.value.container.addEventListener('mouseleave', parenterMouseLeave)
        Optionser.value.container.addEventListener('mouseenter', parenterMouseEnter)
        document.addEventListener('mousemove', scrollbarMouseMove)
        document.addEventListener('mouseup', scrollbarMouseUp)

        listened.value = true
      }

      return (
        <div
          onMousedown={containerMouseDown}
          onMouseenter={() => { size.value = 12 }}
          onMouseleave={() => { size.value = 8 }}
          class='s-table-scrollbar-container'
          style={containerStyle}
          ref={container}
        >
          <div
            onMousedown={scrollbarMouseDown}
            class='s-table-scrollbar'
            style={scrollbarStyle}
            ref={scrollbar}
          />
        </div>
      )
    }
  }
})

export default STableScrollbar
