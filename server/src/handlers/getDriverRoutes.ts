import 'source-map-support/register'
import { APIGatewayProxyHandler } from 'aws-lambda'
import createError from 'http-errors'
import httpMiddleware from '@libs/httpMiddleware'
import { Claims, Role } from '@auth/lib/models'
import { getRoutesByAssignedDriver } from 'lib/db/routes'

const getDriverRoutes: APIGatewayProxyHandler = async (event) => {
  const claims = event.requestContext.authorizer?.lambda as Claims
  if (claims?.role !== Role.Driver) throw new createError.Forbidden()

  const { externalId } = claims

  const routes = await getRoutesByAssignedDriver(externalId)

  return {
    statusCode: 200,
    body: JSON.stringify(routes),
  }
}

export const handler = httpMiddleware(getDriverRoutes)
