import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'afawefwadaf123123124';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    // 환경 설정
    AWS.config.update({
      credentials: {
        accessKeyId: 'AKIAZWQGLVTMSR5J35ZR',
        secretAccessKey: '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',
      },
      region: 'ap-northeast-2',
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      // 원래 코드로 AWS S3의 버킷을 생성해야하나 잘 안되서 그냥 홈페이지 들어가서 직접 버킷 설정
      // 그러고 put 하면 파일 업로드됨
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
