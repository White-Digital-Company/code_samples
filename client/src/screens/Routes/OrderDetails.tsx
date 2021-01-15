import React from 'react'
import { FlatList } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { observer } from 'mobx-react-lite'
import useStores from 'stores'
import WareCard from 'components/Routes/OrderDetails/WareCard'
import Info from 'components/Routes/OrderDetails/Info'
import { PrimaryButton } from 'uikit/Buttons'
import ButtonNavigationIcon from 'assets/icons/button_navigation.svg'
import { useRoute } from '@react-navigation/native'
import { RoutesOrderDetailsScreenRouteProp } from 'screens/types'
import { Ware } from 'Orders'

const RoutesOrderDetailsScreen = () => {
  const theme = useTheme()
  const {
    params: { routeIndex, stopIndex, orderIndex },
  } = useRoute<RoutesOrderDetailsScreenRouteProp>()
  const { bottom: bottomInset } = useSafeAreaInsets()

  const { ordersStore } = useStores()
  const order = ordersStore.getOrder(routeIndex, stopIndex, orderIndex)

  return (
    <Container>
      <WaresList
        ListHeaderComponent={<Info {...{ order }} />}
        data={Object.values(order.wares)}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: 85,
          offset: 85 * index,
          index,
        })}
        renderItem={({ item: ware, index }) => (
          <WareCard key={index} {...ware} selected={false} />
        )}
      />

      <ButtonsContainer bottomInset={bottomInset}>
        <PrimaryButton
          title="Navigation"
          Icon={ButtonNavigationIcon}
          onPress={() => {}}
        />
      </ButtonsContainer>
    </Container>
  )
}

export default RoutesOrderDetailsScreen

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.system.bg};
`

const WaresList = styled(FlatList as new () => FlatList<Ware>).attrs(
  ({ theme }) => ({
    contentContainerStyle: {
      paddingHorizontal: theme.space.scrollList,
    },
  }),
)``

const ButtonsContainer = styled.View<{ bottomInset: number }>`
  flex-direction: row;
  padding: ${({ theme }) => `0 ${theme.space.scrollList}`};
  margin-bottom: ${({ bottomInset }) => bottomInset + 20}px;
`
