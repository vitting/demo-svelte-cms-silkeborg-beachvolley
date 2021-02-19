import validator from "validator";

export type ValidatorData = {
  valid: boolean;
  message: string;
};

export function requiredValidator(value: string): ValidatorData {
  return {
    valid: !validator.isEmpty(value),
    message: "Can't be empty"
  };
}

export function emailValidator(value: string): ValidatorData {
    return {
      valid: validator.isEmail(value),
      message: "E-mail address isn't valid"
    };
}

export function minLengthValidator(length: number) {
  return (value: string): ValidatorData => {
    return {
      valid: validator.isLength(value, {min: length}),
      message: `Must be minimum ${length} charaters long`
    };
  };
}

export function maxLengthValidator(length: number) {
  return (value: string): ValidatorData => {
    return {
      valid: validator.isLength(value, {max: length}),
      message: `Must be maximum ${length} charaters long`
    };
  };
}