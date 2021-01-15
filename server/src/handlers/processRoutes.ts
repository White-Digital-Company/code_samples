import 'source-map-support/register'
import sqsMiddleware from '@libs/sqsMiddleware'
import { RouteWithAssignedDriver } from '@routes/lib/models'
import processRoutes from 'tools/process/processRoutes'

export type ProcessRoutesBody = {
  routes: RouteWithAssignedDriver[]
  assignedDriverId: string
  unformattedDate: string
}

const processRoutesHandler: AWSLambda.SQSHandler = async (event) => {
  const records = event.Records

  await Promise.all(
    records.map(
      async (
        record: AWSLambda.SQSRecord & {
          body: ProcessRoutesBody
        },
      ) => {
        await processRoutes(record.body as ProcessRoutesBody)
      },
    ),
  )
}

export const handler = sqsMiddleware(processRoutesHandler)
