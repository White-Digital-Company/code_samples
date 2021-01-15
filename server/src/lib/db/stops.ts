import * as aws from 'aws-sdk'
import { queryAll } from '@libs/dynamodb'
import { Stop } from 'lib/models'

const dynamoDb = new aws.DynamoDB.DocumentClient()

export const getAllStopsOnlyWithOrdersIds = async (routeId: string) => {
  const items = await queryAll<{ ordersIds: string[] }>({
    TableName: process.env.STOPS_TABLE_NAME,
    IndexName: 'RouteIdGSI',
    KeyConditionExpression: 'routeId = :routeId',
    ExpressionAttributeValues: {
      ':routeId': routeId,
    },
    ProjectionExpression: 'ordersIds',
  })

  return items
}

export const getStopsByRouteId = async (routeId: string) => {
  const resp = await queryAll<Stop>({
    TableName: process.env.STOPS_TABLE_NAME,
    IndexName: 'RouteIdGSI',
    KeyConditionExpression: 'routeId = :routeId',
    ExpressionAttributeValues: {
      ':routeId': routeId,
    },
  })

  return resp
}

export const deleteStopsByRouteId = async (routeId: string) => {
  const items = await queryAll<{ id: string }>({
    TableName: process.env.STOPS_TABLE_NAME,
    IndexName: 'RouteIdGSI',
    KeyConditionExpression: 'routeId = :routeId',
    ExpressionAttributeValues: {
      ':routeId': routeId,
    },
    ProjectionExpression: 'id',
  })

  await Promise.all(
    items.map(async (item) =>
      dynamoDb
        .delete({
          TableName: process.env.STOPS_TABLE_NAME,
          Key: {
            id: item.id,
          },
        })
        .promise(),
    ),
  )
}

export const addStop = async (stop: Stop) => {
  await dynamoDb
    .put({
      TableName: process.env.STOPS_TABLE_NAME,
      Item: stop,
    })
    .promise()
}
