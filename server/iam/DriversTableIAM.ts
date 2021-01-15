import type { IamRoleStatement } from 'serverless/aws'

const DriversTableIAM: IamRoleStatement = {
  Effect: 'Allow',
  Action: ['dynamodb:UpdateItem'],
  Resource: ['${self:custom.DriversTable.arn}'],
}

export default DriversTableIAM
