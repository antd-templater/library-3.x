import { provideRouteContext as proProvideRouteContext } from './func.route'
import { createRouteContext as proCreateRouteContext } from './func.route'
import { firstMenuChildren as proFirstMenuChildren } from './func.menu'
import { useRouteContext as proUseRouteContext } from './func.route'
import { useMediaQuery as proUseMediaQuery } from './func.media'
import { clearMenuItem as proClearMenuItem } from './func.menu'
import { flatMenuItem as proFlatMenuItem } from './func.menu'

import { GlobalHeader as SProGlobalHeader } from './index.header'
import { ProBasicLayout as SProLayout } from './index.pro'

export {
  SProLayout,
  SProGlobalHeader,

  proFlatMenuItem,
  proClearMenuItem,
  proUseMediaQuery,
  proUseRouteContext,
  proFirstMenuChildren,
  proCreateRouteContext,
  proProvideRouteContext,
}

export default SProLayout
export type * from './type'
