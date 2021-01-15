import React, { memo } from 'react'
import { TouchableOpacity, Linking } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Stop } from 'Routes'
import { CardButtonContainerProps } from 'uikit/Buttons'
import { Heading6 } from 'uikit/Typography'
import { CardButton } from 'uikit/Buttons'
import formatDate from 'tools/formatDate'
import PhoneIcon from 'assets/icons/phone.svg'

interface StopCardProps {
  stop: Stop
  bgColor: string
  textColor: string
  buttons: Array<CardButtonContainerProps>
}

const StopCard = ({
  stop,
  bgColor,
  textColor,
  buttons,
}: StopCardProps) => {
  const theme = useTheme()

  return (
      <Container
        style={{
          ...theme.elevation.basic,
          backgroundColor: bgColor,
        }}
      >
        <InfoContainer>
          <Row>
            <Col>
              <Heading6 align="left" bold color={textColor}>
                №{stop.stopNo}
              </Heading6>
            </Col>
            <Col>
              <Heading6 align="center" bold color={textColor}>
                {formatDate(stop.arrivalTime, '03.04.2020')}
              </Heading6>
            </Col>
            <Col>
              <Heading6 align="center" bold color={textColor}>
                {formatDate(stop.arrivalTime, '12:54')}-
                {formatDate(stop.departureTime, '12:54')}
              </Heading6>
            </Col>
            <Col>
              <Heading6 align="right" bold color={textColor}>
                {formatDate(stop.waitingTime, '12:54')}
              </Heading6>
            </Col>
          </Row>

          <Row style={{ marginTop: 15 }}>
            <Col>
              <Heading6 align="left" bold color={textColor}>
                {stop.name}
              </Heading6>
            </Col>
            <Col disableShrink>
              <TouchableOpacity
                onPress={async () => Linking.openURL('tel://+14543532424344')}
              >
                <PhoneButtonContainer>
                  <PhoneIcon
                    width={20}
                    height={20}
                    style={{ marginRight: 5 }}
                    fill={textColor}
                  />
                  <Heading6 align="right" bold color={textColor}>
                    +14543532424344
                  </Heading6>
                </PhoneButtonContainer>
              </TouchableOpacity>
            </Col>
          </Row>

          <Row style={{ marginTop: 18 }}>
            <Col>
              <Heading6 align="left" color={textColor}>
                г. Киев, ул. Шевченка 23
              </Heading6>
            </Col>
          </Row>

    
        </InfoContainer>

        <ButtonsContainer>
          {buttons.map((buttonProps) => (
            <CardButton key={buttonProps.title} {...buttonProps} />
          ))}
        </ButtonsContainer>
      </Container>
  )
}

export default memo(
  StopCard,
  (prev, next) => prev.stop.status === next.stop.status,
)

const Container = styled.View`
  margin-bottom: 15px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
`

const InfoContainer = styled.View`
  padding: 12px 15px 15px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Col = styled.View<{ disableShrink?: boolean }>`
  flex: auto;
  flex-shrink: ${({ disableShrink }) => (disableShrink ? '0' : '1')};
  margin: 0 8px;
`

const PhoneButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const ButtonsContainer = styled.View`
  flex-direction: row;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.medium};
`
