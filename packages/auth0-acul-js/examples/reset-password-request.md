import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';

const resetPasswordRequest = new ResetPasswordRequest();

resetPasswordRequest.continueWithEmail({ email: 'test@test.com' });


resetPasswordRequest.continueWithUsername({ username: 'testuser' });

resetPasswordRequest.backToLogin();