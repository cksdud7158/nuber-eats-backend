import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'nwjlawkdjdlakkdkd';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    // 환경 설정
    AWS.config.update({
      credentials: {
        accessKeyId: 'AKIAYAQFJNQNC6BI776B',
        secretAccessKey: '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',
      },
      region: 'ap-northeast-2',
    });
    try {
      // 최초 S3에 버킷을 생성해줘야함
      // const upload = await new AWS.S3()
      //   .createBucket({
      //     Bucket: 'nwjlawkdjdlakkdkd',
      //   })
      //   .promise();
      // console.log('upload', upload);
      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();
      const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (e) {
      return null;
    }
  }
}
