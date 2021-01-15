import styled from 'styled-components/native'

export default styled.TextInput.attrs(({ theme }) => ({
  multiline: true,
  underlineColorAndroid: 'transparent',
  placeholderTextColor: theme.colors.ui.grey[100],
  numberOfLines: 5,
  returnKeyType: 'done',
  blurOnSubmit: true,
}))`
  background-color: ${({ theme }) => theme.colors.system.white};
  font-family: ${({ theme }) => theme.primaryFontRegular};
  font-size: ${({ theme }) => theme.typeScale.heading5};
  color: ${({ theme }) => theme.colors.system.black};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  height: 120px;
  padding: 10px;
`
