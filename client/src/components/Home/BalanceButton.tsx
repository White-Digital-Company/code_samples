import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Heading2, Heading3 } from 'uikit/Typography'
import ArrowRightIcon from 'assets/icons/arrow_right.svg'

const RoutesBalanceButton = () => {
  const theme = useTheme()

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <Container>
        <ValuesContainer>
          <Title>
            <Heading3 color={theme.colors.system.white}>Баланс</Heading3>
          </Title>

          <Value>
            <Heading2 color={theme.colors.system.white} bold>
              4000
            </Heading2>
          </Value>
        </ValuesContainer>

        <ArrowContainer>
          <ArrowRightIcon width={10} height={20} />
        </ArrowContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default RoutesBalanceButton

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  max-width: 70%;
  padding: 10px 18px 10px 40px;
  background: ${({ theme }) => theme.colors.ui.blue[100]};
  border-top-right-radius: ${({ theme }) => theme.borderRadius.large};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.large};
`

const ValuesContainer = styled.View`
  flex-shrink: 1;
`

const Title = styled.View``

const Value = styled.View``

const ArrowContainer = styled.View`
  margin-left: 38px;
`
