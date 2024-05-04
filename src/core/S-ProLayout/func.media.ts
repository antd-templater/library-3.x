import { ref } from 'vue'

export type TypeMediaQueryEnum = typeof MediaQueryEnum
export type TypeMediaQueryKey = keyof TypeMediaQueryEnum

export const MediaQueryEnum = {
  xs: {
    maxWidth: 575,
    matchMedia: '(max-width: 575px)',
  },
  sm: {
    minWidth: 576,
    maxWidth: 767,
    matchMedia: '(min-width: 576px) and (max-width: 767px)',
  },
  md: {
    minWidth: 768,
    maxWidth: 991,
    matchMedia: '(min-width: 768px) and (max-width: 991px)',
  },
  lg: {
    minWidth: 992,
    maxWidth: 1199,
    matchMedia: '(min-width: 992px) and (max-width: 1199px)',
  },
  xl: {
    minWidth: 1200,
    maxWidth: 1599,
    matchMedia: '(min-width: 1200px) and (max-width: 1599px)',
  },
  xxl: {
    minWidth: 1600,
    maxWidth: 1999,
    matchMedia: '(min-width: 1600px) and (max-width: 1999px)',
  },
  xxxl: {
    minWidth: 2000,
    matchMedia: '(min-width: 2000px)',
  },
}

export const useMediaQuery = () => {
  const media = ref<TypeMediaQueryKey>('md')
  const enums = Object.keys(MediaQueryEnum)
  const keys = enums as TypeMediaQueryKey[]

  keys.forEach(key => {
    const mediaQuery = MediaQueryEnum[key]
    const matchMedia = mediaQuery.matchMedia
    const query = window.matchMedia(matchMedia)

    query.onchange = event => {
      if (event.matches) {
        media.value = key
      }
    }

    if (query.matches) {
      media.value = key
    }
  })

  return media
}
