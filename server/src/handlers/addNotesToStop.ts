import 'source-map-support/register'
import httpMiddleware from '@libs/httpMiddleware'
import { Notes } from 'lib/models'
import { setNotesToStop } from 'lib/db/__DEPR__'
import { deleteFiles } from 'lib/s3'

const addNotesToStop = async (
  event: AWSLambda.APIGatewayProxyEvent & {
    body: Notes
    pathParameters: { routeId: string }
    queryStringParameters: { stopIndex: string }
  },
) => {
  const notes = event.body as Notes
  const { routeId } = event.pathParameters
  const stopIndex = parseInt(event.queryStringParameters.stopIndex)

  await setNotesToStop({ routeId, stopIndex, notes })
  await deleteFiles(`${routeId}/${stopIndex}/`)

  return {
    statusCode: 200,
    body: '',
  }
}

export const handler = httpMiddleware(addNotesToStop)
