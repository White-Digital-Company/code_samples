declare module 'Routes' {
  type RouteId = string
  type StopId = string

  interface Route {
    id: RouteId
    externalId: string
    depotId: string
    externalDepotId: string
    km: number
    routeSections: RouteSection[]
    vehiclePlateNumber: string
    date: string
    startTime: string
    endTime: string
    assignedDriverId: string
    stopsNum: number
  }

  interface RouteSection {
    waypoints: Waypoint[]
  }

  interface Waypoint {
    geoX: string
    geoY: string
  }

  export type StopStatus =
    | 'NOT_ACCEPTED'
    | 'ACCEPTED'
    | 'CANCELED'
    | 'FINISHED'
    | 'FINISHED_WITH_SOME_CANCELED_ORDERS'

  interface Stop {
    id: StopId
    stopNo: number
    userDefinedId: string
    name: string
    ordersIds: string[]
    orders: import('Orders').Order[]
    arrivalTime: string
    departureTime: string
    waitingTime: string
    costs: number
    km: number
    kmToll: number
    geoX: string
    geoY: string
    kmFromDepot: number
    timeFromDepot: string
    status: StopStatus
  }

  interface Notes {
    option: string
    description: string
  }
}
