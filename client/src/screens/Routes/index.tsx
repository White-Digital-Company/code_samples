import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'styled-components/native'
import { RoutesStackParamList } from 'screens/types'
import { screenOptions } from 'screens/configs'
import Home from 'screens/Routes/Home'
import Stops from 'screens/Routes/Stops'
import NotAcceptedOrders from 'screens/Routes/NotAcceptedOrders'
import OrderDetails from 'screens/Routes/OrderDetails'
import StopsMapPreview from 'screens/Routes/StopsMapPreview'
import CheckPhoto from 'screens/Routes/CheckPhoto'
import Options from 'screens/Routes/Options'
import Settings from 'screens/Routes/Settings'
import { useNavigation } from '@react-navigation/native'
import { RoutesStopsScreenNavigationProp } from 'screens/types'

const Stack = createStackNavigator<RoutesStackParamList>()

const RoutesScreen = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...screenOptions(theme),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Stops"
        component={Stops}
        options={{
          headerBackTitle: 'Маршруты',
          title: 'Точки',
        }}
      />
      <Stack.Screen
        name="NotAcceptedOrders"
        component={NotAcceptedOrders}
        options={{
          title: 'Непринятые',
        }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          title: '№123456789011213',
        }}
      />
      <Stack.Screen
        name="StopsMapPreview"
        component={StopsMapPreview}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name="CheckPhoto"
        component={CheckPhoto}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Options"
        component={Options}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Настройки' }}
      />
    </Stack.Navigator>
  )
}

export default RoutesScreen
