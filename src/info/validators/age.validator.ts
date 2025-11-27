import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UpdateInfoRequest } from '../models';

@ValidatorConstraint({ name: 'AgeMatchValidator', async: false })
export class AgeMatchValidator implements ValidatorConstraintInterface {
  validate(birthDate: Date, args: ValidationArguments) {
    const obj = args.object as UpdateInfoRequest;

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age === obj.age;
  }

  defaultMessage() {
    return 'La data di nascita non corrisponde all’età';
  }
}
