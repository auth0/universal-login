import ResetPassword from '@auth0/auth0-acul-js/reset-password';

const resetPassword = new ResetPassword();

resetPassword.resetPassword({
    'password-reset': 'Test@123!',
    're-enter-password': 'Test@123!',
});
