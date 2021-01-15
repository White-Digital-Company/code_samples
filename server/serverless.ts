import serverlessCommon from '../../serverless.common'
import type { Serverless } from 'serverless/aws'
import RoutesTableIAM from './iam/RoutesTableIAM'
import OrdersTableIAM from './iam/OrdersTableIAM'
import DriversTableIAM from './iam/DriversTableIAM'
import StopsTableIAM from './iam/StopsTableIAM'
import ProcessRouteQueueIAM from './iam/ProcessRouteQueueIAM'
import RoutesBucketIAM from './iam/RoutesBucketIAM'
import RoutesTable from './resourses/RoutesTable'
import StopsTable from './resourses/StopsTable'
import RoutesBucket from './resourses/RoutesBucket'
import ProcessRouteQueue from './resourses/ProcessRouteQueue'

const serverlessConfiguration: Serverless = {
  ...serverlessCommon.root,
  service: 'routes',
  custom: {
    ...serverlessCommon.custom,
    'serverless-offline': {
      useChildProcesses: true,
    },
    RoutesTable: {
      name: '${self:app}-RoutesTable-${self:provider.stage}',
      arn: { 'Fn::GetAtt': ['RoutesTable', 'Arn'] },
    },
    StopsTable: {
      name: '${self:app}-StopsTable-${self:provider.stage}',
      arn: { 'Fn::GetAtt': ['StopsTable', 'Arn'] },
    },
    OrdersTable: {
      name: '${cf:${self:app}-orders-${self:provider.stage}.OrdersTableName}',
      arn: '${cf:${self:app}-orders-${self:provider.stage}.OrdersTableArn}',
    },
    DriversTable: {
      name: '${cf:${self:app}-drivers-${self:provider.stage}.DriversTableName}',
      arn: '${cf:${self:app}-drivers-${self:provider.stage}.DriversTableArn}',
    },
    RoutesBucket: {
      name: '${self:app}-routes-bucket-${self:provider.stage}',
    },
    ProcessRouteQueue: {
      name: '${self:app}-ProcessRouteQueue-${self:provider.stage}',
      arn: {
        'Fn::GetAtt': ['ProcessRouteQueue', 'Arn'],
      },
      url: {
        Ref: 'ProcessRouteQueue',
      },
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    ...serverlessCommon.provider,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      ROUTES_TABLE_NAME: '${self:custom.RoutesTable.name}',
      STOPS_TABLE_NAME: '${self:custom.StopsTable.name}',
      ORDERS_TABLE_NAME: '${self:custom.OrdersTable.name}',
      DRIVERS_TABLE_NAME: '${self:custom.DriversTable.name}',
      ROUTES_BUCKET_NAME: '${self:custom.RoutesBucket.name}',
      PROCESS_ROUTE_QUEUE_URL: '${self:custom.ProcessRouteQueue.url}',
      COMPANIES_SERVICE_URL: '${self:custom.ApiUrl}/companies',
      DEPOTS_SERVICE_URL: '${self:custom.ApiUrl}/depots',
      DRIVERS_SERVICE_URL: '${self:custom.ApiUrl}/drivers',
    },
    iamRoleStatements: [
      RoutesTableIAM,
      OrdersTableIAM,
      DriversTableIAM,
      StopsTableIAM,
      ProcessRouteQueueIAM,
      RoutesBucketIAM,
    ],
  },
  functions: {
    processPlans: {
      name: '${self:app}-${self:provider.stage}-processPlans',
      handler: 'src/handlers/processPlans.handler',
      events: [
        {
          httpApi: {
            method: 'post',
            path: '/routes/process',
          },
        },
      ],
      timeout: 29,
    },
    processRoutes: {
      name: '${self:app}-${self:provider.stage}-processRoutes',
      handler: 'src/handlers/processRoutes.handler',
      events: [
        {
          sqs: {
            arn: '${self:custom.ProcessRouteQueue.arn}',
            maximumRetryAttempts: 1,
          },
        },
      ],
    },
    getDriverRoutes: {
      name: '${self:app}-${self:provider.stage}-getDriverRoutes',
      handler: 'src/handlers/getDriverRoutes.handler',
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/routes/driver',
          },
        },
      ],
    },
    getStops: {
      name: '${self:app}-${self:provider.stage}-getStops',
      handler: 'src/handlers/getStops.handler',
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/routes/{routeId}/stops',
          },
        },
      ],
    },
  },
  resources: {
    Description: '${self:app} ${self:service} service',
    Resources: {
      RoutesTable,
      StopsTable,
      ProcessRouteQueue,
      RoutesBucket,
    },
  },
}

module.exports = serverlessConfiguration
