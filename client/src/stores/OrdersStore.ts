import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import { RouteIndex, StopIndex } from 'Routes'
import { Order } from 'Orders'
import { RootStore } from 'stores/RootStore'
import { ORDERS_API_URL } from 'stores/constants'

export class OrdersStore {
  rootStore: RootStore
  orders: Record<RouteIndex, Record<StopIndex, Order[]>>

  constructor(rootStore: RootStore) {
    this.orders = {}
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  getOrders(routeIndex: number, stopIndex: number) {
    return this.orders[routeIndex]?.[stopIndex]
  }

  getOrder(routeIndex: number, stopIndex: number, orderIndex: number) {
    return this.getOrders(routeIndex, stopIndex)?.[orderIndex]
  }

  async fetchOrders(routeIndex: RouteIndex, stopIndex: StopIndex) {
    try {
      const { externalDepotId } = this.rootStore.routesStore.routes[routeIndex]
      const { ordersIds } = this.rootStore.routesStore.routes[routeIndex].stops[
        stopIndex
      ]

      const { data } = await axios.get(
        `${ORDERS_API_URL}?externalDepotId=${externalDepotId}${ordersIds.reduce(
          (str, orderId) => `${str}&ordersIds=${orderId}`,
          '',
        )}`,
      )

      runInAction(() => {
        if (!this.orders[routeIndex]) this.orders[routeIndex] = {}
        this.orders[routeIndex][stopIndex] = data
      })
    } catch (err) {
      console.log(err)
    }
  }
}
