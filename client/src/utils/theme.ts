import { DefaultTheme } from 'styled-components'
import * as colors from './colors'
import {
  primaryFontRegular,
  primaryFontBold,
  primaryFontExtraBold,
  typeScale,
  typeLineHeight,
} from './typography'
import { elevation, borderRadius, space } from './visual'
import * as tools from './tools'

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryFontRegular: typeof primaryFontRegular
    primaryFontBold: typeof primaryFontBold
    primaryFontExtraBold: typeof primaryFontExtraBold
    colors: typeof colors
    typeScale: typeof typeScale
    typeLineHeight: typeof typeLineHeight
    elevation: typeof elevation
    borderRadius: typeof borderRadius
    space: typeof space
    tools: typeof tools
  }
}

export const defaultTheme: DefaultTheme = {
  primaryFontRegular,
  primaryFontBold,
  primaryFontExtraBold,
  colors,
  typeScale,
  typeLineHeight,
  elevation,
  borderRadius,
  space,
  tools,
}
