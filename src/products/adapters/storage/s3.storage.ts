import AWS from 'aws-sdk';
import env from '../../../config/env';
import BaseStorage from "./base.storage";

AWS.config.update({ region: env.AWS_REGION })

export default class S3Storage implements BaseStorage {
  private s3: AWS.S3
  private bucket: string

  public constructor() {
    this.s3 = new AWS.S3()
    this.bucket = env.S3_BUCKET
  }
  
  async addFile(buffer: Buffer, fileName: string): Promise<string> {
    const uploadParams = { Bucket: this.bucket, Key: `${fileName}.png`, Body: buffer }
    const { Location } = await this.s3.upload(uploadParams).promise()
    return Location
  }
}