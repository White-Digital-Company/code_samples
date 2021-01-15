import React, { useState, useEffect } from 'react'
import {
  Linking,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { useTiming, mix } from 'react-native-redash'
import { Heading6 } from 'uikit/Typography'
import { Order, PaymentMethod } from 'Orders'
import formatDate from 'tools/formatDate'
import PhoneIcon from 'assets/icons/phone.svg'
import CardFooterIcon from 'assets/icons/card_footer.svg'
import ArrowDownIcon from 'assets/icons/arrow_down.svg'

const PAYMENT_METHOD_TO_TITLE: Record<PaymentMethod, string> = {
  CASH: 'Наличные',
  CARD: 'Карта',
  BANK_TRANSFER: 'Банковский перевод',
}

const OrderDetailsInfo = ({ order }: { order: Order }) => {
  const theme = useTheme()
  const [toggled, setToggled] = useState(false)

  const transition = useTiming(toggled, {
    duration: 200,
    easing: Easing.inOut(Easing.quad),
  })

  const fullInfoStyle = useAnimatedStyle(() => ({
    maxHeight: mix(transition.value, 0, 109),
  }))

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${mix(transition.value, 0, 180)}deg`,
      },
    ],
  }))

  return (
    <>
      <InfoContainer>
        <Row>
          <Col>
            <Heading6 bold>№{order.pos}</Heading6>
          </Col>

          <Col>
            <Heading6 bold align="center">
              {order.slot}
            </Heading6>
          </Col>

          <Col>
            <Heading6 bold align="right">
              {formatDate(order.date, '12:54')}
            </Heading6>
          </Col>
        </Row>

        <Row style={{ marginTop: 12 }}>
          <Col>
            <Heading6 bold>{order.customerName}</Heading6>
          </Col>

          <Col disableShrink>
            <TouchableOpacity
              onPress={async () =>
                Linking.openURL(`tel://${order.customerPhone}`)
              }
            >
              <PhoneButtonContainer>
                <PhoneIcon
                  width={20}
                  height={20}
                  style={{ marginRight: 5 }}
                  fill={theme.colors.system.black}
                />
                <Heading6 align="right" bold>
                  {order.customerPhone}
                </Heading6>
              </PhoneButtonContainer>
            </TouchableOpacity>
          </Col>
        </Row>

        <Row style={{ marginTop: 18 }}>
          <Col>
            <Heading6>{order.customerAddress}</Heading6>
          </Col>
        </Row>

        {/* ------ Full info --------- */}
        {theme && (
          <Animated.View style={{ overflow: 'hidden', ...fullInfoStyle }}>
            <Row style={{ marginTop: 18 }}>
              <Col>
                <Heading6>
                  {PAYMENT_METHOD_TO_TITLE[order.paymentMethod]}
                </Heading6>
              </Col>
              <Col>
                <Heading6 align="right">{order.customerId}</Heading6>
              </Col>
            </Row>
            <TotalContainer style={{ marginTop: 24 }}>
              <TotalCol style={{ marginRight: 18 }}>
                <Heading6 align="center" bold>
                  Сумма
                </Heading6>
                <Heading6 align="center" style={{ marginTop: 10 }}>
                  {order.amount}
                </Heading6>
              </TotalCol>
              <TotalCol style={{ marginLeft: 18 }}>
                <Heading6 align="center" bold>
                  Количество
                </Heading6>
                <Heading6 align="center" style={{ marginTop: 10 }}>
                  {Object.keys(order.wares).length}
                </Heading6>
              </TotalCol>
            </TotalContainer>
          </Animated.View>
        )}
      </InfoContainer>

      <InfoContainerFooter>
        <CardFooterIcon width="100%" />
        <TouchableWithoutFeedback onPress={() => setToggled((prev) => !prev)}>
          <OpenMoreButton style={{ ...arrowStyle }}>
            <ArrowDownIcon
              width={25}
              height={15}
              fill={theme.colors.system.black}
            />
          </OpenMoreButton>
        </TouchableWithoutFeedback>
      </InfoContainerFooter>
    </>
  )
}

export default OrderDetailsInfo

const InfoContainer = styled.View`
  margin: 20px 0;
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

const InfoContainerFooter = styled.View`
  align-items: center;
  margin-bottom: 10px;
`

const OpenMoreButton = styled(Animated.View)`
  padding: 10px;
`

const TotalContainer = styled.View`
  flex-direction: row;
  align-self: center;
`

const TotalCol = styled.View``
