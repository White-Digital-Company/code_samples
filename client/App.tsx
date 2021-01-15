import React, { useEffect, createRef } from 'react'
import { ThemeProvider } from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { flowResult } from 'mobx'
import { observer } from 'mobx-react-lite'
import { defaultTheme } from 'utils/theme'
import { StoreProvider } from 'stores/RootStore'
import Router from 'screens'
import useStores from 'stores'
import Auth from 'screens/Auth'

const Root = observer(() => {
  const { settingsStore, authStore } = useStores()

  useEffect(() => {
    ;(async () => {
      await flowResult(settingsStore.initialize())
    })()
  }, [])

  if (settingsStore.isLoading) return null

  if (!authStore.isAuthed) return <Auth />;

  return <Router />;
})

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <ThemeProvider theme={defaultTheme}>
            <Root />
          </ThemeProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </StoreProvider>
  )
}

export default App
