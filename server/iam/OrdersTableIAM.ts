import type { IamRoleStatement } from 'serverless/aws'

const OrdersTableIAM: IamRoleStatement = {
  Effect: 'Allow',
  Action: ['dynamodb:UpdateItem'],
  Resource: '${self:custom.OrdersTable.arn}',
}

export default OrdersTableIAM
