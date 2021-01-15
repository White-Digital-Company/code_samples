import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from 'styled-components'
import { AuthStackParamList } from 'screens/types'
import { screenOptions } from 'screens/configs'
import Language from './Language'
import Login from './Login'
import ChangePassword from './ChangePassword'

const Stack = createStackNavigator<AuthStackParamList>()

const AuthScreen = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="Language"
      screenOptions={screenOptions(theme)}
    >
      <Stack.Screen
        name="Language"
        component={Language}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: '', headerBackTitle: 'Language' }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: '', headerBackTitle: 'Login' }}
      />
    </Stack.Navigator>
  )
}

export default AuthScreen
