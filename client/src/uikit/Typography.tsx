import styled, { css } from 'styled-components/native'

interface BaseTextProps {
  bold?: boolean
  extraBold?: boolean
  align?: string
  color?: string
}

const BaseText = styled.Text<BaseTextProps>`
  color: ${({ theme, color }) => color || theme.colors.system.black};
  font-family: ${({ theme }) => theme.primaryFontRegular};
  font-weight: 400;
  text-align: ${({ align }) => align || 'left'};

  ${({ bold, theme }) =>
    bold &&
    css`
      font-family: ${theme.primaryFontBold};
      font-weight: 700;
    `}

  ${({ extraBold, theme }) =>
    extraBold &&
    css`
      font-family: ${theme.primaryFontExtraBold};
      font-weight: 800;
    `}
`

export const Heading1 = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.heading1};
  line-height: ${({ theme }) => theme.typeLineHeight.heading1};
`

export const Heading2 = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.heading2};
  line-height: ${({ theme }) => theme.typeLineHeight.heading2};
`

export const Heading3 = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.heading3};
  line-height: ${({ theme }) => theme.typeLineHeight.heading3};
`

export const Heading4 = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.heading4};
  line-height: ${({ theme }) => theme.typeLineHeight.heading4};
  letter-spacing: -0.41px;
`

export const Heading5 = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.heading5};
  line-height: ${({ theme }) => theme.typeLineHeight.heading5};
  letter-spacing: -0.41px;
`

export const Heading6 = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.heading6};
  line-height: ${({ theme }) => theme.typeLineHeight.heading6};
`

export const Description = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.description};
  line-height: ${({ theme }) => theme.typeLineHeight.description};
`

export const Paragraph = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.paragraph};
  line-height: ${({ theme }) => theme.typeLineHeight.paragraph};
`

export const Details = styled(BaseText)`
  font-size: ${({ theme }) => theme.typeScale.details};
  line-height: ${({ theme }) => theme.typeLineHeight.details};
`
