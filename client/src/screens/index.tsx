import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'styled-components'
import { RootStackParamList } from 'screens/types'
import { screenOptions } from 'screens/configs'
import Routes from 'screens/Routes'

const Stack = createStackNavigator<RootStackParamList>()

const AuthScreen = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator screenOptions={screenOptions(theme)}>
      <Stack.Screen
        name="Routes"
        component={Routes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default AuthScreen
