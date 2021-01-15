import type { IamRoleStatement } from 'serverless/aws'

const RoutesBucketIAM: IamRoleStatement = {
  Effect: 'Allow',
  Action: ['s3:ListBucket', 's3:GetObject', 's3:PutObject'],
  Resource: {
    'Fn::Join': ['/', [{ 'Fn::GetAtt': ['RoutesBucket', 'Arn'] }, '*']],
  },
}

export default RoutesBucketIAM
