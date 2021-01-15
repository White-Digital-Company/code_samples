import styled from 'styled-components/native'
import { smallerIphoneX } from 'tools/screenSizes'

export const Input = styled.TextInput.attrs(({ theme }) => ({
  underlineColorAndroid: 'transparent',
  placeholderTextColor: theme.colors.ui.grey[100],
}))`
  padding: ${smallerIphoneX ? '14px 15px' : '18px 15px'};
  background-color: ${({ theme }) => theme.colors.system.white};
  font-family: ${({ theme }) => theme.primaryFontRegular};
  font-size: ${({ theme }) => theme.typeScale.heading5};
  color: ${({ theme }) => theme.colors.system.black};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`
