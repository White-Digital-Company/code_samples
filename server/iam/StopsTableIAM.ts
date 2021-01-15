import type { IamRoleStatement } from 'serverless/aws'

const StopsTableIAM: IamRoleStatement = {
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
    '${self:custom.StopsTable.arn}',
    { 'Fn::Join': ['/', ['${self:custom.StopsTable.arn}', 'index/*']] },
  ],
}

export default StopsTableIAM
