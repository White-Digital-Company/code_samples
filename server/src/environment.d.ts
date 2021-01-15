declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WS_API: string
      COMPANIES_SERVICE_URL: string
      DEPOTS_SERVICE_URL: string
      DRIVERS_SERVICE_URL: string
      ROUTES_TABLE_NAME: string
      STOPS_TABLE_NAME: string
      ORDERS_TABLE_NAME: string
      DRIVERS_TABLE_NAME: string
      PROCESS_ROUTE_QUEUE_URL: string
      ROUTES_BUCKET_NAME: string
    }
  }
}

export {}
