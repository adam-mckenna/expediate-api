import { Module } from '@nestjs/common';
import { DqsController } from './dqs.controller';
import { DqsService } from './dqs.service';

@Module({
  controllers: [DqsController],
  providers: [DqsService],
})
export class DqsModule {}
