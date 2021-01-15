import React, { createContext, FC, useContext } from 'react'
import { navigate } from '../../App'
import { RoutesStore } from 'stores/RoutesStore'
import { SettingsStore } from 'stores/SettingsStore'
import { AuthStore } from 'stores/AuthStore'
import { UIStore } from 'stores/UIStore'
import { OrdersStore } from 'stores/OrdersStore'

export class RootStore {
  navigate: typeof navigate
  routesStore: RoutesStore
  settingsStore: SettingsStore
  authStore: AuthStore
  uiStore: UIStore
  ordersStore: OrdersStore

  constructor() {
    this.navigate = navigate
    this.routesStore = new RoutesStore()
    this.settingsStore = new SettingsStore(this)
    this.authStore = new AuthStore(this)
    this.uiStore = new UIStore()
    this.ordersStore = new OrdersStore(this)
  }
}

export const StoreContext = createContext(new RootStore())

const store = new RootStore()

export const StoreProvider: FC = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
export default useStore
