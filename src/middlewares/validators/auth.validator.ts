import { RequestHandler } from 'express';
import { check } from 'express-validator';
import validateRequest from '../index';

const passwordValidator: RequestHandler[] = [
  check('password', 'please give a strong password')
    .notEmpty()
    .withMessage("Password can't be empty")
    .bail()
    .isStrongPassword(),
];

const emailValidator: RequestHandler[] = [
  check('email', 'please give a valid email id ')
    .notEmpty()
    .withMessage('email should not be empty')
    .bail()
    .isEmail(),
];

const profileStatusValidator: RequestHandler[] = [
  check(
    'profileStatus',
    'please give your profile status ie public or private '
  )
    .notEmpty()
    .withMessage('profile status should not be empty')
    .bail(),
];

const phoneNumberValidator: RequestHandler[] = [
  check('phoneNumber', 'please provide your phone number ')
    .notEmpty()
    .withMessage('phone number can not be empty')
    .bail(),
];

const userNameValidator: RequestHandler[] = [
  check('userName', 'please provide name ')
    .notEmpty()
    .withMessage('user name can not be empty'),
];

export const loginValidator: RequestHandler[] = [
  ...passwordValidator,
  ...emailValidator,
  ...validateRequest,
];

export const registerValidator: RequestHandler[] = [
  ...passwordValidator,
  ...emailValidator,
  ...userNameValidator,
  ...phoneNumberValidator,
  ...profileStatusValidator,
  ...validateRequest,
];
