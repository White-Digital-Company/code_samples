import * as aws from 'aws-sdk'
import { Route, RouteWithAssignedDriver } from 'lib/models'
import { queryAll } from '@libs/dynamodb'
import omit from 'lodash.omit'
import { deleteStopsByRouteId, addStop } from 'lib/db/stops'
import { withChunks } from '@libs/dynamodb'

const dynamoDb = new aws.DynamoDB.DocumentClient()

export const getExistingRoutesIds = async (
  assignedDriverId: string,
  unformattedDate: string,
): Promise<string[]> => {
  const items = await queryAll<{ id: string }>({
    TableName: process.env.ROUTES_TABLE_NAME,
    IndexName: 'AssignedDriverIdAndUnformattedDateGSI',
    KeyConditionExpression:
      'assignedDriverId= :assignedDriverId AND unformattedDate= :unformattedDate',
    FilterExpression: 'isFinished = :isFinished',
    ExpressionAttributeValues: {
      ':assignedDriverId': assignedDriverId,
      ':unformattedDate': unformattedDate,
      ':isFinished': false,
    },
    ProjectionExpression: 'id',
  })

  return items.map((route) => route.id)
}

export const getRoutesByAssignedDriver = async (assignedDriverId: string) => {
  const items = await queryAll<Route>({
    TableName: process.env.ROUTES_TABLE_NAME,
    IndexName: 'AssignedDriverIdAndUnformattedDateGSI',
    KeyConditionExpression: 'assignedDriverId = :assignedDriverId',
    ExpressionAttributeValues: {
      ':assignedDriverId': assignedDriverId,
    },
  })

  return items
}

