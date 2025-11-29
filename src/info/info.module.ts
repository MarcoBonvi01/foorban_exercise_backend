import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

// mudule are composed by controllers and services
// controllers are used to handle requests
// services are used to handle business logic
// imports contains the modules that are used by the module
@Module({
  imports: [],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
