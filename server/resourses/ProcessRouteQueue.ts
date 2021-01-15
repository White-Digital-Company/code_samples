import type { CloudFormationResource } from 'serverless/aws'

const ProcessRouteQueue: CloudFormationResource = {
  Type: 'AWS::SQS::Queue',
  Properties: {
    QueueName: '${self:custom.ProcessRouteQueue.name}',
  },
}

export default ProcessRouteQueue
