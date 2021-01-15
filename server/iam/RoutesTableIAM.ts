import type { IamRoleStatement } from 'serverless/aws'

const RoutesTableIAM: IamRoleStatement = {
  Effect: 'Allow',
  Action: [
    'dynamodb:GetItem',
    'dynamodb:PutItem',
    'dynamodb:UpdateItem',
    'dynamodb:Query',
    'dynamodb:DeleteItem',
    'dynamodb:ConditionCheck',
  ],
  Resource: [
    '${self:custom.RoutesTable.arn}',
    { 'Fn::Join': ['/', ['${self:custom.RoutesTable.arn}', 'index/*']] },
  ],
}

export default RoutesTableIAM
