import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateInfoRequest } from './models';

@Injectable() // by defining it as injectable, nest will create a singleton instance of the service and inject it wherever it is needed
export class InfoService {
  // function to provide a validation of the data
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    // trasform raw data inside the request into an instance of UpdateInfoRequest
    const data = plainToInstance(UpdateInfoRequest, rawData);

    // validate the data
    const validationErrors = await validate(data, {
      skipMissingProperties: false,
      whitelist: true,
    });

    // if there are validation errors return them
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }

    // if there are no validation errors return the data
    return {
      success: true,
      data,
    };
  }
}
