import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import useStores from 'stores'
import { Route } from 'Routes'
import BalanceButton from 'components/Routes/Home/BalanceButton'
import RouteCard from 'components/Routes/Home/RouteCard'
import ListEmptyComponents from 'components/ListEmptyComponents'
import { RoutesHomeScreenNavigationProp } from 'screens/types'
import { CircleButton } from 'uikit/Buttons'
import ScreenLoading from 'uikit/ScreenLoading'
import SettingsIcon from 'assets/icons/settings.svg'

const RoutesHomeScreen = () => {
  const navigation = useNavigation<RoutesHomeScreenNavigationProp>()
  const { routesStore } = useStores()

  useEffect(() => {
    if (!routesStore.routes) routesStore.fetchRoutes()
  }, [routesStore.routes])

  if (routesStore.getLoadingStatus('routes') || !routesStore.routes)
    return <ScreenLoading />

  return (
    <Container>
      <HeaderContainer>
        <BalanceButton />
        <SettingsButtonContainer>
          <CircleButton
            Icon={SettingsIcon}
            iconSize={30}
            onPress={() => navigation.navigate('Settings')}
          />
        </SettingsButtonContainer>
      </HeaderContainer>

      <RoutesList
        data={Object.values(routesStore.routes)}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: 85,
          offset: 85 * index,
          index,
        })}
        ListEmptyComponent={ListEmptyComponents}
        renderItem={({ item: route, index }) => (
          <RouteCard key={index} route={route} />
        )}
      />
    </Container>
  )
}

export default observer(RoutesHomeScreen)

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.system.bg};
`

const RoutesList = styled(FlatList as new () => FlatList<Route>).attrs(
  ({ theme }) => ({
    contentContainerStyle: {
      paddingHorizontal: theme.space.scrollList,
    },
  }),
)``

const HeaderContainer = styled.View`
  margin: 15px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const SettingsButtonContainer = styled.View`
  margin-left: 10px;
  margin-right: 40px;
`
