import * as aws from 'aws-sdk'

const dynamoDb = new aws.DynamoDB.DocumentClient()

export const markOrdersAsHidden = async (
  hiddenOrdersIds: string[],
  assignedDriverId: string,
) => {
  await Promise.all(
    hiddenOrdersIds.map(async (id) => {
      try {
        await dynamoDb
          .transactWrite({
            TransactItems: [
              {
                Update: {
                  TableName: process.env.ORDERS_TABLE_NAME,
                  Key: {
                    id,
                  },
                  UpdateExpression: 'SET isHidden = :isHidden',
                  ExpressionAttributeValues: {
                    ':isHidden': true,
                  },
                  ConditionExpression: 'attribute_exists(id)',
                },
              },
              {
                Update: {
                  TableName: process.env.DRIVERS_TABLE_NAME,
                  Key: {
                    id: assignedDriverId,
                  },
                  UpdateExpression: 'ADD hiddenOrdersIds :hiddenOrdersId',
                  ExpressionAttributeValues: {
                    ':hiddenOrdersId': id,
                  },
                },
              },
            ] as aws.DynamoDB.DocumentClient.TransactWriteItemList,
          })
          .promise()
      } catch (err) {
        if (err.code !== 'TransactionCanceledException') throw err
      }
    }),
  )
}
