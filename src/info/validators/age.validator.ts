import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UpdateInfoRequest } from '../models';

@ValidatorConstraint({ name: 'AgeMatchValidator', async: false })
export class AgeMatchValidator implements ValidatorConstraintInterface {
  validate(birthDate: Date, args: ValidationArguments) {
    // trasform obj into an instance of UpdateInfoRequest
    const obj = args.object as UpdateInfoRequest;

    // getting today date
    const today = new Date();

    // calculate the age by difference between today and birth date
    let age = today.getFullYear() - birthDate.getFullYear();

    // if the month of birth date is greater than today's month
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // if month difference is less than 0 or if month difference is 0 but today's date is less than birth date
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age === obj.age;
  }

  defaultMessage() {
    // message to show on validation error
    return 'Date of birth must match age insert.';
  }
}
