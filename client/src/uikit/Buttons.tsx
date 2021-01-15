import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import styled, { css, useTheme } from 'styled-components/native'
import { SvgProps } from 'react-native-svg'
import { Heading5, Description, Heading6 } from 'uikit/Typography'

const PrimaryButtonContainer = styled.View`
  min-height: 60px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.ui.blue['100']};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

const PrimaryButtonTitle = styled(Heading5)`
  color: ${({ theme }) => theme.colors.system.white};
  flex-shrink: 1;
`

interface PrimaryButtonProps {
  title: string
  onPress: () => void
  Icon?: React.FC<SvgProps>
  style?: Readonly<StyleProp<ViewStyle>>
}

export const PrimaryButton = ({
  title,
  onPress,
  Icon,
  style,
}: PrimaryButtonProps) => (
  <TouchableOpacity onPress={onPress} style={{ flex: 1, ...style }}>
    <PrimaryButtonContainer>
      {Icon && (
        <Icon width={20} height={20} style={{ marginRight: 10 }} fill="#fff" />
      )}
      <PrimaryButtonTitle align="center">{title}</PrimaryButtonTitle>
    </PrimaryButtonContainer>
  </TouchableOpacity>
)

// ---------------------------------------------

const TransparentButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`

interface TransparentButtonProps {
  Icon: React.FC<SvgProps>
  title: string
  onPress: () => void
  style?: Readonly<StyleProp<ViewStyle>> | any
}

export const TransparentButton = ({
  Icon,
  title,
  onPress,
  style,
}: TransparentButtonProps) => (
  <TouchableOpacity onPress={onPress} style={{ ...style, flex: 1 }}>
    <TransparentButtonContainer>
      <Icon width={15} height={15} style={{ marginRight: 15 }} />
      <Description>{title}</Description>
    </TransparentButtonContainer>
  </TouchableOpacity>
)

// ----------------------------------------------

const CardButtonContainer = styled.View<{
  buttonPosition: CardButtonPosition
  bgColor: string
  textColor?: string
}>`
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  background-color: ${({ bgColor }) => bgColor};
  ${({ buttonPosition }) =>
    buttonPosition === 'left' &&
    css`
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius.medium};
    `}

  ${({ buttonPosition }) =>
    buttonPosition === 'right' &&
    css`
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius.medium};
    `}

      ${({ buttonPosition }) =>
    buttonPosition === 'full' &&
    css`
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius.medium};
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius.medium};
    `}
`

export type CardButtonPosition = 'left' | 'middle' | 'right' | 'full'

export interface CardButtonContainerProps {
  Icon?: React.FC<SvgProps>
  title: string
  buttonPosition: CardButtonPosition
  bgColor: string
  textColor?: string
  onPress: () => void
}

export const CardButton = ({
  Icon,
  title,
  onPress,
  textColor,
  ...props
}: CardButtonContainerProps) => {
  const theme = useTheme()

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <CardButtonContainer {...props}>
        <Heading6
          style={{ color: textColor || theme.colors.system.white, padding: 10 }}
          align="center"
        >
          {title}
        </Heading6>
        {Icon && (
          <Icon
            width={12}
            height={12}
            fill={textColor || theme.colors.system.white}
          />
        )}
      </CardButtonContainer>
    </TouchableOpacity>
  )
}

// ----------------------------------------------

const CircleButtonContainer = styled.View<{ bgColor?: string }>`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

interface CircleButtonProps {
  onPress: () => void
  Icon: React.FC<SvgProps>
  iconFill?: string
  iconSize?: number
  bgColor?: string
}

export const CircleButton = ({
  onPress,
  Icon,
  bgColor,
  iconSize = 24,
  iconFill,
}: CircleButtonProps) => {
  const theme = useTheme()

  return (
    <TouchableOpacity onPress={onPress}>
      <CircleButtonContainer bgColor={bgColor}>
        <Icon
          width={iconSize}
          height={iconSize}
          fill={iconFill || theme.colors.system.white}
        />
      </CircleButtonContainer>
    </TouchableOpacity>
  )
}
