import type { IamRoleStatement } from 'serverless/aws'

const ProcessRouteQueueIAM: IamRoleStatement = {
  Effect: 'Allow',
  Action: ['sqs:SendMessage', 'sqs:RecieveMessage'],
  Resource: '${self:custom.ProcessRouteQueue.arn}',
}

export default ProcessRouteQueueIAM
