import { Controller, Post, Body } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';

@Controller('info') // name of the route
export class InfoController {
  // dependency injection of the service used by the controller
  // nest provides the service by default
  // uses a singleton approach to create an instance of the service and then inject it
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate') // name of the route
  getConfig(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return this.infoService.validateInfo(bodyRequest);
  }
}
