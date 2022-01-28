import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import {
  Effect,
  Policy,
  PolicyStatement,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

export class CdkCompellerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const getVersion = new NodejsFunction(this, 'GetVersionLambda', {
      entry: join(__dirname, '..', 'src/api/v1', 'get.ts'),
    });

    const getDocs = new NodejsFunction(this, 'GetDocsLambda', {
      entry: join(__dirname, '..', 'src/api', 'doc.ts'),
    });

    const exportApiPolicy = new PolicyStatement({
      actions: ['apigatewayV2:ExportApi', 'apigateway:GET', 'apigatewayV2:GET'],
      resources: ['*'],
      effect: Effect.ALLOW,
    });

    getDocs.role?.attachInlinePolicy(
      new Policy(this, 'ExportAPI', {
        statements: [exportApiPolicy],
      })
    );

    const createUser = new NodejsFunction(this, 'CreateUserLambda', {
      entry: join(__dirname, '..', 'src/api/v1/users', 'create.ts'),
    });

    const getVersionIntegration = new HttpLambdaIntegration(
      'versionIntegration',
      getVersion
    );

    const getDocsIntegration = new HttpLambdaIntegration(
      'docsIntegration',
      getDocs
    );

    const createUserIntegration = new HttpLambdaIntegration(
      'createUserIntegration',
      createUser
    );

    const httpApi = new HttpApi(this, 'HttpApi');

    httpApi.addRoutes({
      path: '/v1/version',
      methods: [HttpMethod.GET],
      integration: getVersionIntegration,
    });

    httpApi.addRoutes({
      path: '/docs',
      methods: [HttpMethod.GET],
      integration: getDocsIntegration,
    });

    httpApi.addRoutes({
      path: '/v1/users',
      methods: [HttpMethod.POST],
      integration: createUserIntegration,
    });

    new CfnOutput(this, 'HTTPUrl', {
      value: String(httpApi.url),
      exportName: 'HTTPUrl',
    });
  }
}
