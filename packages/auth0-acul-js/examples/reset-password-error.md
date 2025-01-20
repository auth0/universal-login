import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';

const resetPasswordError = new ResetPasswordError();

const { screen } = resetPasswordError;
const data = screen.data;

console.log(data);
