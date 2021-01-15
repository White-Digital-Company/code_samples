import React, { useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { RouteIndex, StopIndex } from 'Routes'
import useStores from 'stores'
import Loading from 'uikit/Loading'
import DollarSignIcon from 'assets/icons/dollar-sign.svg'
import { Paragraph } from 'uikit/Typography'
import { RoutesOrderDetailsScreenNavigationProp } from 'screens/types'
import { Order, OrderIndex, OrderStatus } from 'Orders'
import pick from 'lodash.pick'
import Animated, { useAnimatedStyle, Easing } from 'react-native-reanimated'
import { mix, useTiming } from 'react-native-redash'

const ORDER_STATUS_TO_TITLE: Record<OrderStatus, string> = {
  NOT_PROCESSED: 'Не обработан',
  DELIVERY: 'Поставка',
  NOT_ACCEPTED: 'Не принят',
  CANCELED: 'Отменен',
  DELIVERED: 'Доставлен',
  REFUND: 'Возврат по заявке',
}

interface ProductListCardProps
  extends Pick<Order, 'orderId' | 'amount' | 'status'> {
  routeIndex: RouteIndex
  stopIndex: StopIndex
  orderIndex: OrderIndex
}

const ProductListCard = ({
  orderId,
  amount,
  status,
  ...orderDetailsProps
}: ProductListCardProps) => {
  const naivgation = useNavigation<RoutesOrderDetailsScreenNavigationProp>()

  return (
    <TouchableWithoutFeedback
      onPress={() => naivgation.navigate('OrderDetails', orderDetailsProps)}
    >
      <CardContainer>
        <OrderNumberContainer>
          <Paragraph>№</Paragraph>
          <Paragraph numberOfLines={1} ellipsizeMode="head">
            {orderId}
          </Paragraph>
        </OrderNumberContainer>

        <TotalPriceContainer>
          <DollarSignIcon width={5} height={11} style={{ marginRight: 4 }} />
          <Paragraph>{amount}</Paragraph>
        </TotalPriceContainer>

        <OrderStatusContainer>
          <Paragraph align="right">{ORDER_STATUS_TO_TITLE[status]}</Paragraph>
        </OrderStatusContainer>
      </CardContainer>
    </TouchableWithoutFeedback>
  )
}

const ProductsList = ({
  routeIndex,
  stopIndex,
}: {
  routeIndex: RouteIndex
  stopIndex: StopIndex
}) => {
  const { ordersStore } = useStores()
  const orders = ordersStore.getOrders(routeIndex, stopIndex)
  const ordersNum = orders ? Object.keys(orders).length : 0.4

  useEffect(() => {
    if (!orders) ordersStore.fetchOrders(routeIndex, stopIndex)
  }, [orders])

  if (!orders) return <Loading containerMargin="10px 0 0" />

  return (
    <ListContainer>
      {orders.map((order, index) => (
        <ProductListCard
          key={index}
          orderIndex={index}
          {...pick(order, ['orderId', 'amount', 'status'])}
          {...{ routeIndex, stopIndex }}
        />
      ))}
    </ListContainer>
  )
}

export default observer(ProductsList)

const ListContainer = styled.View`
  margin-top: 10px;
  padding: 0 15px;
  overflow: hidden;
`

const CardContainer = styled.View`
  min-height: 40px;
  margin: 5px 0;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.system.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 8px 5px;
`

const OrderNumberContainer = styled.View`
  flex: 1;
  padding: 5px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.ui.grey[100]};
  margin-right: 5px;
`

const TotalPriceContainer = styled.View`
  flex: 1;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
`

const OrderStatusContainer = styled.View`
  flex: 1;
  padding: 5px 10px;
  justify-content: center;
`
