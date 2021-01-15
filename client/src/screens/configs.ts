import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types'
import { DefaultTheme } from 'styled-components'
import { TransitionPresets } from '@react-navigation/stack'

export const screenOptions = (theme: DefaultTheme): StackHeaderOptions => ({
  ...TransitionPresets.SlideFromRightIOS,
  headerStyle: {
    backgroundColor: theme.colors.system.bg,
    elevation: 0,
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    fontFamily: theme.primaryFontRegular,
    fontWeight: '400',
    fontSize: theme.tools.getNumValue(theme.typeScale.heading3),
    color: theme.colors.system.black,
  },
})
