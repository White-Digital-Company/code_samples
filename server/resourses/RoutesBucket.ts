import type { CloudFormationResource } from 'serverless/aws'

const RoutesBucket: CloudFormationResource = {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: '${self:custom.RoutesBucket.name}',
  },
}

export default RoutesBucket
