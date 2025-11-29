import { Module } from '@nestjs/common';
import { InfoModule } from './info/info.module';

@Module({
  imports: [InfoModule], // import the module that handle the requests
  controllers: [],
  providers: [],
})
export class AppModule {}
