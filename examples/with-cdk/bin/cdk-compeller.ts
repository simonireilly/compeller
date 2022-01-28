#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCompellerStack } from '../lib/cdk-compeller-stack';

const app = new cdk.App();
new CdkCompellerStack(app, 'CdkContractualStack', {});
