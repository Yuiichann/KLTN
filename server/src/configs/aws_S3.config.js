import aws from 'aws-sdk';
import config from './config.js';

aws.config.update({
  accessKeyId: config.aws.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.aws.AWS_SECRET_ACCESS_KEY,
  region: config.aws.AWS_REGION,
});

const aws_S3 = new aws.S3();

export default aws_S3;
