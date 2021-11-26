import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const {password, confirmPassword} = control.getRawValue();
  return password !== confirmPassword ? { confirmPassword: true } : null;
};