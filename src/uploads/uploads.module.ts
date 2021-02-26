import { Module } from '@nestjs/common';
import { UploadsController } from './uploadsController';

@Module({
  controllers: [UploadsController],
})
export class UploadsModule {}
