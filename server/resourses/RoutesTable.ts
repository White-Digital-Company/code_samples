import type { CloudFormationResource } from 'serverless/aws'

const RoutesTable: CloudFormationResource = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: '${self:custom.RoutesTable.name}',
    BillingMode: 'PAY_PER_REQUEST',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'assignedDriverId',
        AttributeType: 'S',
      },
      {
        AttributeName: 'unformattedDate',
        AttributeType: 'S',
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
        IndexName: 'AssignedDriverIdAndUnformattedDateGSI',
        KeySchema: [
          {
            AttributeName: 'assignedDriverId',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'unformattedDate',
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

export default RoutesTable
