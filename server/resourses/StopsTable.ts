import type { CloudFormationResource } from 'serverless/aws'

const StopsTable: CloudFormationResource = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.StopsTable.name}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'routeId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'stopNo',
        AttributeType: 'N',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'RouteIdGSI',
        KeySchema: [
          {
            AttributeName: 'routeId',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'stopNo',
            KeyType: 'RANGE',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
  },
}

export default StopsTable
