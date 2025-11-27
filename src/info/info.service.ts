import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateInfoRequest } from './models';

@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToInstance(UpdateInfoRequest, rawData);

    const validationErrors = await validate(data, {
      skipMissingProperties: false,
      whitelist: true,
    });

    console.log('Validation Errors:', validationErrors);

    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }

    return {
      success: true,
      data,
    };
  }
}
