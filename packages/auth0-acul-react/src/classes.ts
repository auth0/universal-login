/* eslint-disable @typescript-eslint/no-namespace */
import { useScreen as useScreen_AcceptInvitation, useTransaction as useTransaction_AcceptInvitation, acceptInvitation as acceptInvitation_AcceptInvitation, useAcceptInvitation as useAcceptInvitation_AcceptInvitation } from './screens/accept-invitation';
export namespace AcceptInvitation {
  export const useScreen = useScreen_AcceptInvitation;
  export const useTransaction = useTransaction_AcceptInvitation;
  export const acceptInvitation = acceptInvitation_AcceptInvitation;
  export const useAcceptInvitation = useAcceptInvitation_AcceptInvitation;
}

import { useScreen as useScreen_Consent, useTransaction as useTransaction_Consent, accept as accept_Consent, deny as deny_Consent, useConsent as useConsent_Consent } from './screens/consent';
export namespace Consent {
  export const useScreen = useScreen_Consent;
  export const useTransaction = useTransaction_Consent;
  export const accept = accept_Consent;
  export const deny = deny_Consent;
  export const useConsent = useConsent_Consent;
}

import { useScreen as useScreen_CustomizedConsent, useTransaction as useTransaction_CustomizedConsent, accept as accept_CustomizedConsent, deny as deny_CustomizedConsent, useCustomizedConsent as useCustomizedConsent_CustomizedConsent } from './screens/customized-consent';
export namespace CustomizedConsent {
  export const useScreen = useScreen_CustomizedConsent;
  export const useTransaction = useTransaction_CustomizedConsent;
  export const accept = accept_CustomizedConsent;
  export const deny = deny_CustomizedConsent;
  export const useCustomizedConsent = useCustomizedConsent_CustomizedConsent;
}

import { useScreen as useScreen_DeviceCodeActivationAllowed, useTransaction as useTransaction_DeviceCodeActivationAllowed, useDeviceCodeActivationAllowed as useDeviceCodeActivationAllowed_DeviceCodeActivationAllowed } from './screens/device-code-activation-allowed';
export namespace DeviceCodeActivationAllowed {
  export const useScreen = useScreen_DeviceCodeActivationAllowed;
  export const useTransaction = useTransaction_DeviceCodeActivationAllowed;
  export const useDeviceCodeActivationAllowed = useDeviceCodeActivationAllowed_DeviceCodeActivationAllowed;
}

import { useScreen as useScreen_DeviceCodeActivationDenied, useTransaction as useTransaction_DeviceCodeActivationDenied, useDeviceCodeActivationDenied as useDeviceCodeActivationDenied_DeviceCodeActivationDenied } from './screens/device-code-activation-denied';
export namespace DeviceCodeActivationDenied {
  export const useScreen = useScreen_DeviceCodeActivationDenied;
  export const useTransaction = useTransaction_DeviceCodeActivationDenied;
  export const useDeviceCodeActivationDenied = useDeviceCodeActivationDenied_DeviceCodeActivationDenied;
}

import { useScreen as useScreen_DeviceCodeActivation, useTransaction as useTransaction_DeviceCodeActivation, continueMethod as continueMethod_DeviceCodeActivation, useDeviceCodeActivation as useDeviceCodeActivation_DeviceCodeActivation } from './screens/device-code-activation';
export namespace DeviceCodeActivation {
  export const useScreen = useScreen_DeviceCodeActivation;
  export const useTransaction = useTransaction_DeviceCodeActivation;
  export const continueMethod = continueMethod_DeviceCodeActivation;
  export const useDeviceCodeActivation = useDeviceCodeActivation_DeviceCodeActivation;
}

import { useScreen as useScreen_DeviceCodeConfirmation, useTransaction as useTransaction_DeviceCodeConfirmation, confirm as confirm_DeviceCodeConfirmation, cancel as cancel_DeviceCodeConfirmation, useDeviceCodeConfirmation as useDeviceCodeConfirmation_DeviceCodeConfirmation } from './screens/device-code-confirmation';
export namespace DeviceCodeConfirmation {
  export const useScreen = useScreen_DeviceCodeConfirmation;
  export const useTransaction = useTransaction_DeviceCodeConfirmation;
  export const confirm = confirm_DeviceCodeConfirmation;
  export const cancel = cancel_DeviceCodeConfirmation;
  export const useDeviceCodeConfirmation = useDeviceCodeConfirmation_DeviceCodeConfirmation;
}

import { useScreen as useScreen_EmailIdentifierChallenge, useTransaction as useTransaction_EmailIdentifierChallenge, submitEmailChallenge as submitEmailChallenge_EmailIdentifierChallenge, resendCode as resendCode_EmailIdentifierChallenge, returnToPrevious as returnToPrevious_EmailIdentifierChallenge, useEmailIdentifierChallenge as useEmailIdentifierChallenge_EmailIdentifierChallenge, useResend as useResend_EmailIdentifierChallenge } from './screens/email-identifier-challenge';
export namespace EmailIdentifierChallenge {
  export const useScreen = useScreen_EmailIdentifierChallenge;
  export const useTransaction = useTransaction_EmailIdentifierChallenge;
  export const submitEmailChallenge = submitEmailChallenge_EmailIdentifierChallenge;
  export const resendCode = resendCode_EmailIdentifierChallenge;
  export const returnToPrevious = returnToPrevious_EmailIdentifierChallenge;
  export const useEmailIdentifierChallenge = useEmailIdentifierChallenge_EmailIdentifierChallenge;
  export const useResend = useResend_EmailIdentifierChallenge;
}

import { useScreen as useScreen_EmailOtpChallenge, useTransaction as useTransaction_EmailOtpChallenge, submitCode as submitCode_EmailOtpChallenge, resendCode as resendCode_EmailOtpChallenge, useEmailOTPChallenge as useEmailOTPChallenge_EmailOtpChallenge, useResend as useResend_EmailOtpChallenge } from './screens/email-otp-challenge';
export namespace EmailOtpChallenge {
  export const useScreen = useScreen_EmailOtpChallenge;
  export const useTransaction = useTransaction_EmailOtpChallenge;
  export const submitCode = submitCode_EmailOtpChallenge;
  export const resendCode = resendCode_EmailOtpChallenge;
  export const useEmailOTPChallenge = useEmailOTPChallenge_EmailOtpChallenge;
  export const useResend = useResend_EmailOtpChallenge;
}

import { useScreen as useScreen_EmailVerificationResult, useTransaction as useTransaction_EmailVerificationResult, useEmailVerificationResult as useEmailVerificationResult_EmailVerificationResult } from './screens/email-verification-result';
export namespace EmailVerificationResult {
  export const useScreen = useScreen_EmailVerificationResult;
  export const useTransaction = useTransaction_EmailVerificationResult;
  export const useEmailVerificationResult = useEmailVerificationResult_EmailVerificationResult;
}

import { useScreen as useScreen_InterstitialCaptcha, useTransaction as useTransaction_InterstitialCaptcha, useInterstitialCaptcha as useInterstitialCaptcha_InterstitialCaptcha } from './screens/interstitial-captcha';
export namespace InterstitialCaptcha {
  export const useScreen = useScreen_InterstitialCaptcha;
  export const useTransaction = useTransaction_InterstitialCaptcha;
  export const useInterstitialCaptcha = useInterstitialCaptcha_InterstitialCaptcha;
}

import { useScreen as useScreen_LoginEmailVerification, useTransaction as useTransaction_LoginEmailVerification, continueWithCode as continueWithCode_LoginEmailVerification, resendCode as resendCode_LoginEmailVerification, useLoginEmailVerification as useLoginEmailVerification_LoginEmailVerification, useResend as useResend_LoginEmailVerification } from './screens/login-email-verification';
export namespace LoginEmailVerification {
  export const useScreen = useScreen_LoginEmailVerification;
  export const useTransaction = useTransaction_LoginEmailVerification;
  export const continueWithCode = continueWithCode_LoginEmailVerification;
  export const resendCode = resendCode_LoginEmailVerification;
  export const useLoginEmailVerification = useLoginEmailVerification_LoginEmailVerification;
  export const useResend = useResend_LoginEmailVerification;
}

import { useScreen as useScreen_LoginId, useTransaction as useTransaction_LoginId, login as login_LoginId, federatedLogin as federatedLogin_LoginId, passkeyLogin as passkeyLogin_LoginId, pickCountryCode as pickCountryCode_LoginId, useLoginId as useLoginId_LoginId, useActiveIdentifiers as useActiveIdentifiers_LoginId } from './screens/login-id';
export namespace LoginId {
  export const useScreen = useScreen_LoginId;
  export const useTransaction = useTransaction_LoginId;
  export const login = login_LoginId;
  export const federatedLogin = federatedLogin_LoginId;
  export const passkeyLogin = passkeyLogin_LoginId;
  export const pickCountryCode = pickCountryCode_LoginId;
  export const useLoginId = useLoginId_LoginId;
  export const useActiveIdentifiers = useActiveIdentifiers_LoginId;
}

import { useScreen as useScreen_LoginPassword, useTransaction as useTransaction_LoginPassword, login as login_LoginPassword, federatedLogin as federatedLogin_LoginPassword, useLoginPassword as useLoginPassword_LoginPassword } from './screens/login-password';
export namespace LoginPassword {
  export const useScreen = useScreen_LoginPassword;
  export const useTransaction = useTransaction_LoginPassword;
  export const login = login_LoginPassword;
  export const federatedLogin = federatedLogin_LoginPassword;
  export const useLoginPassword = useLoginPassword_LoginPassword;
}

import { useScreen as useScreen_LoginPasswordlessEmailCode, useTransaction as useTransaction_LoginPasswordlessEmailCode, submitCode as submitCode_LoginPasswordlessEmailCode, resendCode as resendCode_LoginPasswordlessEmailCode, useLoginPasswordlessEmailCode as useLoginPasswordlessEmailCode_LoginPasswordlessEmailCode } from './screens/login-passwordless-email-code';
export namespace LoginPasswordlessEmailCode {
  export const useScreen = useScreen_LoginPasswordlessEmailCode;
  export const useTransaction = useTransaction_LoginPasswordlessEmailCode;
  export const submitCode = submitCode_LoginPasswordlessEmailCode;
  export const resendCode = resendCode_LoginPasswordlessEmailCode;
  export const useLoginPasswordlessEmailCode = useLoginPasswordlessEmailCode_LoginPasswordlessEmailCode;
}

import { useScreen as useScreen_LoginPasswordlessSmsOtp, useTransaction as useTransaction_LoginPasswordlessSmsOtp, submitOTP as submitOTP_LoginPasswordlessSmsOtp, resendOTP as resendOTP_LoginPasswordlessSmsOtp, useLoginPasswordlessSmsOtp as useLoginPasswordlessSmsOtp_LoginPasswordlessSmsOtp, useResend as useResend_LoginPasswordlessSmsOtp } from './screens/login-passwordless-sms-otp';
export namespace LoginPasswordlessSmsOtp {
  export const useScreen = useScreen_LoginPasswordlessSmsOtp;
  export const useTransaction = useTransaction_LoginPasswordlessSmsOtp;
  export const submitOTP = submitOTP_LoginPasswordlessSmsOtp;
  export const resendOTP = resendOTP_LoginPasswordlessSmsOtp;
  export const useLoginPasswordlessSmsOtp = useLoginPasswordlessSmsOtp_LoginPasswordlessSmsOtp;
  export const useResend = useResend_LoginPasswordlessSmsOtp;
}

import { useScreen as useScreen_Login, useTransaction as useTransaction_Login, login as login_Login, federatedLogin as federatedLogin_Login, useLogin as useLogin_Login, useActiveIdentifiers as useActiveIdentifiers_Login } from './screens/login';
export namespace Login {
  export const useScreen = useScreen_Login;
  export const useTransaction = useTransaction_Login;
  export const login = login_Login;
  export const federatedLogin = federatedLogin_Login;
  export const useLogin = useLogin_Login;
  export const useActiveIdentifiers = useActiveIdentifiers_Login;
}

import { useScreen as useScreen_LogoutAborted, useTransaction as useTransaction_LogoutAborted, useLogoutAborted as useLogoutAborted_LogoutAborted } from './screens/logout-aborted';
export namespace LogoutAborted {
  export const useScreen = useScreen_LogoutAborted;
  export const useTransaction = useTransaction_LogoutAborted;
  export const useLogoutAborted = useLogoutAborted_LogoutAborted;
}

import { useScreen as useScreen_LogoutComplete, useTransaction as useTransaction_LogoutComplete, useLogoutComplete as useLogoutComplete_LogoutComplete } from './screens/logout-complete';
export namespace LogoutComplete {
  export const useScreen = useScreen_LogoutComplete;
  export const useTransaction = useTransaction_LogoutComplete;
  export const useLogoutComplete = useLogoutComplete_LogoutComplete;
}

import { useScreen as useScreen_Logout, useTransaction as useTransaction_Logout, confirmLogout as confirmLogout_Logout, useLogout as useLogout_Logout } from './screens/logout';
export namespace Logout {
  export const useScreen = useScreen_Logout;
  export const useTransaction = useTransaction_Logout;
  export const confirmLogout = confirmLogout_Logout;
  export const useLogout = useLogout_Logout;
}

import { useScreen as useScreen_MfaBeginEnrollOptions, useTransaction as useTransaction_MfaBeginEnrollOptions, enroll as enroll_MfaBeginEnrollOptions, useMfaBeginEnrollOptions as useMfaBeginEnrollOptions_MfaBeginEnrollOptions } from './screens/mfa-begin-enroll-options';
export namespace MfaBeginEnrollOptions {
  export const useScreen = useScreen_MfaBeginEnrollOptions;
  export const useTransaction = useTransaction_MfaBeginEnrollOptions;
  export const enroll = enroll_MfaBeginEnrollOptions;
  export const useMfaBeginEnrollOptions = useMfaBeginEnrollOptions_MfaBeginEnrollOptions;
}

import { useScreen as useScreen_MfaCountryCodes, useTransaction as useTransaction_MfaCountryCodes, selectCountryCode as selectCountryCode_MfaCountryCodes, goBack as goBack_MfaCountryCodes, useMfaCountryCodes as useMfaCountryCodes_MfaCountryCodes } from './screens/mfa-country-codes';
export namespace MfaCountryCodes {
  export const useScreen = useScreen_MfaCountryCodes;
  export const useTransaction = useTransaction_MfaCountryCodes;
  export const selectCountryCode = selectCountryCode_MfaCountryCodes;
  export const goBack = goBack_MfaCountryCodes;
  export const useMfaCountryCodes = useMfaCountryCodes_MfaCountryCodes;
}

import { useScreen as useScreen_MfaDetectBrowserCapabilities, useTransaction as useTransaction_MfaDetectBrowserCapabilities, detectCapabilities as detectCapabilities_MfaDetectBrowserCapabilities, useMfaDetectBrowserCapabilities as useMfaDetectBrowserCapabilities_MfaDetectBrowserCapabilities } from './screens/mfa-detect-browser-capabilities';
export namespace MfaDetectBrowserCapabilities {
  export const useScreen = useScreen_MfaDetectBrowserCapabilities;
  export const useTransaction = useTransaction_MfaDetectBrowserCapabilities;
  export const detectCapabilities = detectCapabilities_MfaDetectBrowserCapabilities;
  export const useMfaDetectBrowserCapabilities = useMfaDetectBrowserCapabilities_MfaDetectBrowserCapabilities;
}

import { useScreen as useScreen_MfaEmailChallenge, useTransaction as useTransaction_MfaEmailChallenge, continueMethod as continueMethod_MfaEmailChallenge, resendCode as resendCode_MfaEmailChallenge, tryAnotherMethod as tryAnotherMethod_MfaEmailChallenge, useMfaEmailChallenge as useMfaEmailChallenge_MfaEmailChallenge, useResend as useResend_MfaEmailChallenge } from './screens/mfa-email-challenge';
export namespace MfaEmailChallenge {
  export const useScreen = useScreen_MfaEmailChallenge;
  export const useTransaction = useTransaction_MfaEmailChallenge;
  export const continueMethod = continueMethod_MfaEmailChallenge;
  export const resendCode = resendCode_MfaEmailChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaEmailChallenge;
  export const useMfaEmailChallenge = useMfaEmailChallenge_MfaEmailChallenge;
  export const useResend = useResend_MfaEmailChallenge;
}

import { useScreen as useScreen_MfaEmailList, useTransaction as useTransaction_MfaEmailList, selectMfaEmail as selectMfaEmail_MfaEmailList, goBack as goBack_MfaEmailList, useMfaEmailList as useMfaEmailList_MfaEmailList } from './screens/mfa-email-list';
export namespace MfaEmailList {
  export const useScreen = useScreen_MfaEmailList;
  export const useTransaction = useTransaction_MfaEmailList;
  export const selectMfaEmail = selectMfaEmail_MfaEmailList;
  export const goBack = goBack_MfaEmailList;
  export const useMfaEmailList = useMfaEmailList_MfaEmailList;
}

import { useScreen as useScreen_MfaEnrollResult, useTransaction as useTransaction_MfaEnrollResult, useMfaEnrollResult as useMfaEnrollResult_MfaEnrollResult } from './screens/mfa-enroll-result';
export namespace MfaEnrollResult {
  export const useScreen = useScreen_MfaEnrollResult;
  export const useTransaction = useTransaction_MfaEnrollResult;
  export const useMfaEnrollResult = useMfaEnrollResult_MfaEnrollResult;
}

import { useScreen as useScreen_MfaLoginOptions, useTransaction as useTransaction_MfaLoginOptions, enroll as enroll_MfaLoginOptions, useMfaLoginOptions as useMfaLoginOptions_MfaLoginOptions } from './screens/mfa-login-options';
export namespace MfaLoginOptions {
  export const useScreen = useScreen_MfaLoginOptions;
  export const useTransaction = useTransaction_MfaLoginOptions;
  export const enroll = enroll_MfaLoginOptions;
  export const useMfaLoginOptions = useMfaLoginOptions_MfaLoginOptions;
}

import { useScreen as useScreen_MfaOtpChallenge, useTransaction as useTransaction_MfaOtpChallenge, continueMethod as continueMethod_MfaOtpChallenge, tryAnotherMethod as tryAnotherMethod_MfaOtpChallenge, useMfaOtpChallenge as useMfaOtpChallenge_MfaOtpChallenge } from './screens/mfa-otp-challenge';
export namespace MfaOtpChallenge {
  export const useScreen = useScreen_MfaOtpChallenge;
  export const useTransaction = useTransaction_MfaOtpChallenge;
  export const continueMethod = continueMethod_MfaOtpChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaOtpChallenge;
  export const useMfaOtpChallenge = useMfaOtpChallenge_MfaOtpChallenge;
}

import { useScreen as useScreen_MfaOtpEnrollmentCode, useTransaction as useTransaction_MfaOtpEnrollmentCode, continueMethod as continueMethod_MfaOtpEnrollmentCode, tryAnotherMethod as tryAnotherMethod_MfaOtpEnrollmentCode, useMfaOtpEnrollmentCode as useMfaOtpEnrollmentCode_MfaOtpEnrollmentCode } from './screens/mfa-otp-enrollment-code';
export namespace MfaOtpEnrollmentCode {
  export const useScreen = useScreen_MfaOtpEnrollmentCode;
  export const useTransaction = useTransaction_MfaOtpEnrollmentCode;
  export const continueMethod = continueMethod_MfaOtpEnrollmentCode;
  export const tryAnotherMethod = tryAnotherMethod_MfaOtpEnrollmentCode;
  export const useMfaOtpEnrollmentCode = useMfaOtpEnrollmentCode_MfaOtpEnrollmentCode;
}

import { useScreen as useScreen_MfaOtpEnrollmentQr, useTransaction as useTransaction_MfaOtpEnrollmentQr, toggleView as toggleView_MfaOtpEnrollmentQr, continueMethod as continueMethod_MfaOtpEnrollmentQr, tryAnotherMethod as tryAnotherMethod_MfaOtpEnrollmentQr, useMfaOtpEnrollmentQr as useMfaOtpEnrollmentQr_MfaOtpEnrollmentQr } from './screens/mfa-otp-enrollment-qr';
export namespace MfaOtpEnrollmentQr {
  export const useScreen = useScreen_MfaOtpEnrollmentQr;
  export const useTransaction = useTransaction_MfaOtpEnrollmentQr;
  export const toggleView = toggleView_MfaOtpEnrollmentQr;
  export const continueMethod = continueMethod_MfaOtpEnrollmentQr;
  export const tryAnotherMethod = tryAnotherMethod_MfaOtpEnrollmentQr;
  export const useMfaOtpEnrollmentQr = useMfaOtpEnrollmentQr_MfaOtpEnrollmentQr;
}

import { useScreen as useScreen_MfaPhoneChallenge, useTransaction as useTransaction_MfaPhoneChallenge, continueMethod as continueMethod_MfaPhoneChallenge, pickPhone as pickPhone_MfaPhoneChallenge, tryAnotherMethod as tryAnotherMethod_MfaPhoneChallenge, useMfaPhoneChallenge as useMfaPhoneChallenge_MfaPhoneChallenge } from './screens/mfa-phone-challenge';
export namespace MfaPhoneChallenge {
  export const useScreen = useScreen_MfaPhoneChallenge;
  export const useTransaction = useTransaction_MfaPhoneChallenge;
  export const continueMethod = continueMethod_MfaPhoneChallenge;
  export const pickPhone = pickPhone_MfaPhoneChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaPhoneChallenge;
  export const useMfaPhoneChallenge = useMfaPhoneChallenge_MfaPhoneChallenge;
}

import { useScreen as useScreen_MfaPhoneEnrollment, useTransaction as useTransaction_MfaPhoneEnrollment, pickCountryCode as pickCountryCode_MfaPhoneEnrollment, continueEnrollment as continueEnrollment_MfaPhoneEnrollment, tryAnotherMethod as tryAnotherMethod_MfaPhoneEnrollment, useMfaPhoneEnrollment as useMfaPhoneEnrollment_MfaPhoneEnrollment } from './screens/mfa-phone-enrollment';
export namespace MfaPhoneEnrollment {
  export const useScreen = useScreen_MfaPhoneEnrollment;
  export const useTransaction = useTransaction_MfaPhoneEnrollment;
  export const pickCountryCode = pickCountryCode_MfaPhoneEnrollment;
  export const continueEnrollment = continueEnrollment_MfaPhoneEnrollment;
  export const tryAnotherMethod = tryAnotherMethod_MfaPhoneEnrollment;
  export const useMfaPhoneEnrollment = useMfaPhoneEnrollment_MfaPhoneEnrollment;
}

import { useScreen as useScreen_MfaPushChallengePush, useTransaction as useTransaction_MfaPushChallengePush, continueMethod as continueMethod_MfaPushChallengePush, resendPushNotification as resendPushNotification_MfaPushChallengePush, enterCodeManually as enterCodeManually_MfaPushChallengePush, tryAnotherMethod as tryAnotherMethod_MfaPushChallengePush, useMfaPushChallengePush as useMfaPushChallengePush_MfaPushChallengePush, useMfaPolling as useMfaPolling_MfaPushChallengePush } from './screens/mfa-push-challenge-push';
export namespace MfaPushChallengePush {
  export const useScreen = useScreen_MfaPushChallengePush;
  export const useTransaction = useTransaction_MfaPushChallengePush;
  export const continueMethod = continueMethod_MfaPushChallengePush;
  export const resendPushNotification = resendPushNotification_MfaPushChallengePush;
  export const enterCodeManually = enterCodeManually_MfaPushChallengePush;
  export const tryAnotherMethod = tryAnotherMethod_MfaPushChallengePush;
  export const useMfaPushChallengePush = useMfaPushChallengePush_MfaPushChallengePush;
  export const useMfaPolling = useMfaPolling_MfaPushChallengePush;
}

import { useScreen as useScreen_MfaPushEnrollmentQr, useTransaction as useTransaction_MfaPushEnrollmentQr, pickAuthenticator as pickAuthenticator_MfaPushEnrollmentQr, useMfaPushEnrollmentQr as useMfaPushEnrollmentQr_MfaPushEnrollmentQr } from './screens/mfa-push-enrollment-qr';
export namespace MfaPushEnrollmentQr {
  export const useScreen = useScreen_MfaPushEnrollmentQr;
  export const useTransaction = useTransaction_MfaPushEnrollmentQr;
  export const pickAuthenticator = pickAuthenticator_MfaPushEnrollmentQr;
  export const useMfaPushEnrollmentQr = useMfaPushEnrollmentQr_MfaPushEnrollmentQr;
}

import { useScreen as useScreen_MfaPushList, useTransaction as useTransaction_MfaPushList, selectMfaPushDevice as selectMfaPushDevice_MfaPushList, goBack as goBack_MfaPushList, useMfaPushList as useMfaPushList_MfaPushList } from './screens/mfa-push-list';
export namespace MfaPushList {
  export const useScreen = useScreen_MfaPushList;
  export const useTransaction = useTransaction_MfaPushList;
  export const selectMfaPushDevice = selectMfaPushDevice_MfaPushList;
  export const goBack = goBack_MfaPushList;
  export const useMfaPushList = useMfaPushList_MfaPushList;
}

import { useScreen as useScreen_MfaPushWelcome, useTransaction as useTransaction_MfaPushWelcome, enroll as enroll_MfaPushWelcome, pickAuthenticator as pickAuthenticator_MfaPushWelcome, useMfaPushWelcome as useMfaPushWelcome_MfaPushWelcome } from './screens/mfa-push-welcome';
export namespace MfaPushWelcome {
  export const useScreen = useScreen_MfaPushWelcome;
  export const useTransaction = useTransaction_MfaPushWelcome;
  export const enroll = enroll_MfaPushWelcome;
  export const pickAuthenticator = pickAuthenticator_MfaPushWelcome;
  export const useMfaPushWelcome = useMfaPushWelcome_MfaPushWelcome;
}

import { useScreen as useScreen_MfaRecoveryCodeChallengeNewCode, useTransaction as useTransaction_MfaRecoveryCodeChallengeNewCode, continueMethod as continueMethod_MfaRecoveryCodeChallengeNewCode, useMfaRecoveryCodeChallengeNewCode as useMfaRecoveryCodeChallengeNewCode_MfaRecoveryCodeChallengeNewCode } from './screens/mfa-recovery-code-challenge-new-code';
export namespace MfaRecoveryCodeChallengeNewCode {
  export const useScreen = useScreen_MfaRecoveryCodeChallengeNewCode;
  export const useTransaction = useTransaction_MfaRecoveryCodeChallengeNewCode;
  export const continueMethod = continueMethod_MfaRecoveryCodeChallengeNewCode;
  export const useMfaRecoveryCodeChallengeNewCode = useMfaRecoveryCodeChallengeNewCode_MfaRecoveryCodeChallengeNewCode;
}

import { useScreen as useScreen_MfaRecoveryCodeChallenge, useTransaction as useTransaction_MfaRecoveryCodeChallenge, continueMethod as continueMethod_MfaRecoveryCodeChallenge, tryAnotherMethod as tryAnotherMethod_MfaRecoveryCodeChallenge, useMfaRecoveryCodeChallenge as useMfaRecoveryCodeChallenge_MfaRecoveryCodeChallenge } from './screens/mfa-recovery-code-challenge';
export namespace MfaRecoveryCodeChallenge {
  export const useScreen = useScreen_MfaRecoveryCodeChallenge;
  export const useTransaction = useTransaction_MfaRecoveryCodeChallenge;
  export const continueMethod = continueMethod_MfaRecoveryCodeChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaRecoveryCodeChallenge;
  export const useMfaRecoveryCodeChallenge = useMfaRecoveryCodeChallenge_MfaRecoveryCodeChallenge;
}

import { useScreen as useScreen_MfaRecoveryCodeEnrollment, useTransaction as useTransaction_MfaRecoveryCodeEnrollment, continueMethod as continueMethod_MfaRecoveryCodeEnrollment, useMfaRecoveryCodeEnrollment as useMfaRecoveryCodeEnrollment_MfaRecoveryCodeEnrollment } from './screens/mfa-recovery-code-enrollment';
export namespace MfaRecoveryCodeEnrollment {
  export const useScreen = useScreen_MfaRecoveryCodeEnrollment;
  export const useTransaction = useTransaction_MfaRecoveryCodeEnrollment;
  export const continueMethod = continueMethod_MfaRecoveryCodeEnrollment;
  export const useMfaRecoveryCodeEnrollment = useMfaRecoveryCodeEnrollment_MfaRecoveryCodeEnrollment;
}

import { useScreen as useScreen_MfaSmsChallenge, useTransaction as useTransaction_MfaSmsChallenge, continueMfaSmsChallenge as continueMfaSmsChallenge_MfaSmsChallenge, pickSms as pickSms_MfaSmsChallenge, resendCode as resendCode_MfaSmsChallenge, tryAnotherMethod as tryAnotherMethod_MfaSmsChallenge, getACall as getACall_MfaSmsChallenge, useMfaSmsChallenge as useMfaSmsChallenge_MfaSmsChallenge, useResend as useResend_MfaSmsChallenge } from './screens/mfa-sms-challenge';
export namespace MfaSmsChallenge {
  export const useScreen = useScreen_MfaSmsChallenge;
  export const useTransaction = useTransaction_MfaSmsChallenge;
  export const continueMfaSmsChallenge = continueMfaSmsChallenge_MfaSmsChallenge;
  export const pickSms = pickSms_MfaSmsChallenge;
  export const resendCode = resendCode_MfaSmsChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaSmsChallenge;
  export const getACall = getACall_MfaSmsChallenge;
  export const useMfaSmsChallenge = useMfaSmsChallenge_MfaSmsChallenge;
  export const useResend = useResend_MfaSmsChallenge;
}

import { useScreen as useScreen_MfaSmsEnrollment, useTransaction as useTransaction_MfaSmsEnrollment, pickCountryCode as pickCountryCode_MfaSmsEnrollment, continueEnrollment as continueEnrollment_MfaSmsEnrollment, tryAnotherMethod as tryAnotherMethod_MfaSmsEnrollment, useMfaSmsEnrollment as useMfaSmsEnrollment_MfaSmsEnrollment } from './screens/mfa-sms-enrollment';
export namespace MfaSmsEnrollment {
  export const useScreen = useScreen_MfaSmsEnrollment;
  export const useTransaction = useTransaction_MfaSmsEnrollment;
  export const pickCountryCode = pickCountryCode_MfaSmsEnrollment;
  export const continueEnrollment = continueEnrollment_MfaSmsEnrollment;
  export const tryAnotherMethod = tryAnotherMethod_MfaSmsEnrollment;
  export const useMfaSmsEnrollment = useMfaSmsEnrollment_MfaSmsEnrollment;
}

import { useScreen as useScreen_MfaSmsList, useTransaction as useTransaction_MfaSmsList, selectPhoneNumber as selectPhoneNumber_MfaSmsList, backAction as backAction_MfaSmsList, useMfaSmsList as useMfaSmsList_MfaSmsList } from './screens/mfa-sms-list';
export namespace MfaSmsList {
  export const useScreen = useScreen_MfaSmsList;
  export const useTransaction = useTransaction_MfaSmsList;
  export const selectPhoneNumber = selectPhoneNumber_MfaSmsList;
  export const backAction = backAction_MfaSmsList;
  export const useMfaSmsList = useMfaSmsList_MfaSmsList;
}

import { useScreen as useScreen_MfaVoiceChallenge, useTransaction as useTransaction_MfaVoiceChallenge, continueMethod as continueMethod_MfaVoiceChallenge, pickPhone as pickPhone_MfaVoiceChallenge, switchToSms as switchToSms_MfaVoiceChallenge, resendCode as resendCode_MfaVoiceChallenge, tryAnotherMethod as tryAnotherMethod_MfaVoiceChallenge, useMfaVoiceChallenge as useMfaVoiceChallenge_MfaVoiceChallenge, useResend as useResend_MfaVoiceChallenge } from './screens/mfa-voice-challenge';
export namespace MfaVoiceChallenge {
  export const useScreen = useScreen_MfaVoiceChallenge;
  export const useTransaction = useTransaction_MfaVoiceChallenge;
  export const continueMethod = continueMethod_MfaVoiceChallenge;
  export const pickPhone = pickPhone_MfaVoiceChallenge;
  export const switchToSms = switchToSms_MfaVoiceChallenge;
  export const resendCode = resendCode_MfaVoiceChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaVoiceChallenge;
  export const useMfaVoiceChallenge = useMfaVoiceChallenge_MfaVoiceChallenge;
  export const useResend = useResend_MfaVoiceChallenge;
}

import { useScreen as useScreen_MfaVoiceEnrollment, useTransaction as useTransaction_MfaVoiceEnrollment, continueMethod as continueMethod_MfaVoiceEnrollment, tryAnotherMethod as tryAnotherMethod_MfaVoiceEnrollment, selectPhoneCountryCode as selectPhoneCountryCode_MfaVoiceEnrollment, useMfaVoiceEnrollment as useMfaVoiceEnrollment_MfaVoiceEnrollment } from './screens/mfa-voice-enrollment';
export namespace MfaVoiceEnrollment {
  export const useScreen = useScreen_MfaVoiceEnrollment;
  export const useTransaction = useTransaction_MfaVoiceEnrollment;
  export const continueMethod = continueMethod_MfaVoiceEnrollment;
  export const tryAnotherMethod = tryAnotherMethod_MfaVoiceEnrollment;
  export const selectPhoneCountryCode = selectPhoneCountryCode_MfaVoiceEnrollment;
  export const useMfaVoiceEnrollment = useMfaVoiceEnrollment_MfaVoiceEnrollment;
}

import { useScreen as useScreen_MfaWebauthnChangeKeyNickname, useTransaction as useTransaction_MfaWebauthnChangeKeyNickname, continueWithNewNickname as continueWithNewNickname_MfaWebauthnChangeKeyNickname, useMfaWebAuthnChangeKeyNickname as useMfaWebAuthnChangeKeyNickname_MfaWebauthnChangeKeyNickname } from './screens/mfa-webauthn-change-key-nickname';
export namespace MfaWebauthnChangeKeyNickname {
  export const useScreen = useScreen_MfaWebauthnChangeKeyNickname;
  export const useTransaction = useTransaction_MfaWebauthnChangeKeyNickname;
  export const continueWithNewNickname = continueWithNewNickname_MfaWebauthnChangeKeyNickname;
  export const useMfaWebAuthnChangeKeyNickname = useMfaWebAuthnChangeKeyNickname_MfaWebauthnChangeKeyNickname;
}

import { useScreen as useScreen_MfaWebauthnEnrollmentSuccess, useTransaction as useTransaction_MfaWebauthnEnrollmentSuccess, continueMethod as continueMethod_MfaWebauthnEnrollmentSuccess, useMfaWebAuthnEnrollmentSuccess as useMfaWebAuthnEnrollmentSuccess_MfaWebauthnEnrollmentSuccess } from './screens/mfa-webauthn-enrollment-success';
export namespace MfaWebauthnEnrollmentSuccess {
  export const useScreen = useScreen_MfaWebauthnEnrollmentSuccess;
  export const useTransaction = useTransaction_MfaWebauthnEnrollmentSuccess;
  export const continueMethod = continueMethod_MfaWebauthnEnrollmentSuccess;
  export const useMfaWebAuthnEnrollmentSuccess = useMfaWebAuthnEnrollmentSuccess_MfaWebauthnEnrollmentSuccess;
}

import { useScreen as useScreen_MfaWebauthnError, useTransaction as useTransaction_MfaWebauthnError, tryAgain as tryAgain_MfaWebauthnError, usePassword as usePassword_MfaWebauthnError, tryAnotherMethod as tryAnotherMethod_MfaWebauthnError, noThanks as noThanks_MfaWebauthnError, useMfaWebAuthnError as useMfaWebAuthnError_MfaWebauthnError } from './screens/mfa-webauthn-error';
export namespace MfaWebauthnError {
  export const useScreen = useScreen_MfaWebauthnError;
  export const useTransaction = useTransaction_MfaWebauthnError;
  export const tryAgain = tryAgain_MfaWebauthnError;
  export const usePassword = usePassword_MfaWebauthnError;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnError;
  export const noThanks = noThanks_MfaWebauthnError;
  export const useMfaWebAuthnError = useMfaWebAuthnError_MfaWebauthnError;
}

import { useScreen as useScreen_MfaWebauthnNotAvailableError, useTransaction as useTransaction_MfaWebauthnNotAvailableError, tryAnotherMethod as tryAnotherMethod_MfaWebauthnNotAvailableError, useMfaWebAuthnNotAvailableError as useMfaWebAuthnNotAvailableError_MfaWebauthnNotAvailableError } from './screens/mfa-webauthn-not-available-error';
export namespace MfaWebauthnNotAvailableError {
  export const useScreen = useScreen_MfaWebauthnNotAvailableError;
  export const useTransaction = useTransaction_MfaWebauthnNotAvailableError;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnNotAvailableError;
  export const useMfaWebAuthnNotAvailableError = useMfaWebAuthnNotAvailableError_MfaWebauthnNotAvailableError;
}

import { useScreen as useScreen_MfaWebauthnPlatformChallenge, useTransaction as useTransaction_MfaWebauthnPlatformChallenge, verify as verify_MfaWebauthnPlatformChallenge, reportBrowserError as reportBrowserError_MfaWebauthnPlatformChallenge, tryAnotherMethod as tryAnotherMethod_MfaWebauthnPlatformChallenge, useMfaWebAuthnPlatformChallenge as useMfaWebAuthnPlatformChallenge_MfaWebauthnPlatformChallenge } from './screens/mfa-webauthn-platform-challenge';
export namespace MfaWebauthnPlatformChallenge {
  export const useScreen = useScreen_MfaWebauthnPlatformChallenge;
  export const useTransaction = useTransaction_MfaWebauthnPlatformChallenge;
  export const verify = verify_MfaWebauthnPlatformChallenge;
  export const reportBrowserError = reportBrowserError_MfaWebauthnPlatformChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnPlatformChallenge;
  export const useMfaWebAuthnPlatformChallenge = useMfaWebAuthnPlatformChallenge_MfaWebauthnPlatformChallenge;
}

import { useScreen as useScreen_MfaWebauthnPlatformEnrollment, useTransaction as useTransaction_MfaWebauthnPlatformEnrollment, submitPasskeyCredential as submitPasskeyCredential_MfaWebauthnPlatformEnrollment, reportBrowserError as reportBrowserError_MfaWebauthnPlatformEnrollment, snoozeEnrollment as snoozeEnrollment_MfaWebauthnPlatformEnrollment, refuseEnrollmentOnThisDevice as refuseEnrollmentOnThisDevice_MfaWebauthnPlatformEnrollment, useMfaWebAuthnPlatformEnrollment as useMfaWebAuthnPlatformEnrollment_MfaWebauthnPlatformEnrollment } from './screens/mfa-webauthn-platform-enrollment';
export namespace MfaWebauthnPlatformEnrollment {
  export const useScreen = useScreen_MfaWebauthnPlatformEnrollment;
  export const useTransaction = useTransaction_MfaWebauthnPlatformEnrollment;
  export const submitPasskeyCredential = submitPasskeyCredential_MfaWebauthnPlatformEnrollment;
  export const reportBrowserError = reportBrowserError_MfaWebauthnPlatformEnrollment;
  export const snoozeEnrollment = snoozeEnrollment_MfaWebauthnPlatformEnrollment;
  export const refuseEnrollmentOnThisDevice = refuseEnrollmentOnThisDevice_MfaWebauthnPlatformEnrollment;
  export const useMfaWebAuthnPlatformEnrollment = useMfaWebAuthnPlatformEnrollment_MfaWebauthnPlatformEnrollment;
}

import { useScreen as useScreen_MfaWebauthnRoamingChallenge, useTransaction as useTransaction_MfaWebauthnRoamingChallenge, verify as verify_MfaWebauthnRoamingChallenge, reportWebAuthnError as reportWebAuthnError_MfaWebauthnRoamingChallenge, tryAnotherMethod as tryAnotherMethod_MfaWebauthnRoamingChallenge, useMfaWebAuthnRoamingChallenge as useMfaWebAuthnRoamingChallenge_MfaWebauthnRoamingChallenge } from './screens/mfa-webauthn-roaming-challenge';
export namespace MfaWebauthnRoamingChallenge {
  export const useScreen = useScreen_MfaWebauthnRoamingChallenge;
  export const useTransaction = useTransaction_MfaWebauthnRoamingChallenge;
  export const verify = verify_MfaWebauthnRoamingChallenge;
  export const reportWebAuthnError = reportWebAuthnError_MfaWebauthnRoamingChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnRoamingChallenge;
  export const useMfaWebAuthnRoamingChallenge = useMfaWebAuthnRoamingChallenge_MfaWebauthnRoamingChallenge;
}

import { useScreen as useScreen_MfaWebauthnRoamingEnrollment, useTransaction as useTransaction_MfaWebauthnRoamingEnrollment, enroll as enroll_MfaWebauthnRoamingEnrollment, showError as showError_MfaWebauthnRoamingEnrollment, tryAnotherMethod as tryAnotherMethod_MfaWebauthnRoamingEnrollment, useMfaWebAuthnRoamingEnrollment as useMfaWebAuthnRoamingEnrollment_MfaWebauthnRoamingEnrollment } from './screens/mfa-webauthn-roaming-enrollment';
export namespace MfaWebauthnRoamingEnrollment {
  export const useScreen = useScreen_MfaWebauthnRoamingEnrollment;
  export const useTransaction = useTransaction_MfaWebauthnRoamingEnrollment;
  export const enroll = enroll_MfaWebauthnRoamingEnrollment;
  export const showError = showError_MfaWebauthnRoamingEnrollment;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnRoamingEnrollment;
  export const useMfaWebAuthnRoamingEnrollment = useMfaWebAuthnRoamingEnrollment_MfaWebauthnRoamingEnrollment;
}

import { useScreen as useScreen_OrganizationPicker, useTransaction as useTransaction_OrganizationPicker, selectOrganization as selectOrganization_OrganizationPicker, skipOrganizationSelection as skipOrganizationSelection_OrganizationPicker, useOrganizationPicker as useOrganizationPicker_OrganizationPicker } from './screens/organization-picker';
export namespace OrganizationPicker {
  export const useScreen = useScreen_OrganizationPicker;
  export const useTransaction = useTransaction_OrganizationPicker;
  export const selectOrganization = selectOrganization_OrganizationPicker;
  export const skipOrganizationSelection = skipOrganizationSelection_OrganizationPicker;
  export const useOrganizationPicker = useOrganizationPicker_OrganizationPicker;
}

import { useScreen as useScreen_OrganizationSelection, useTransaction as useTransaction_OrganizationSelection, continueWithOrganizationName as continueWithOrganizationName_OrganizationSelection, useOrganizationSelection as useOrganizationSelection_OrganizationSelection } from './screens/organization-selection';
export namespace OrganizationSelection {
  export const useScreen = useScreen_OrganizationSelection;
  export const useTransaction = useTransaction_OrganizationSelection;
  export const continueWithOrganizationName = continueWithOrganizationName_OrganizationSelection;
  export const useOrganizationSelection = useOrganizationSelection_OrganizationSelection;
}

import { useScreen as useScreen_PasskeyEnrollmentLocal, useTransaction as useTransaction_PasskeyEnrollmentLocal, continuePasskeyEnrollment as continuePasskeyEnrollment_PasskeyEnrollmentLocal, abortPasskeyEnrollment as abortPasskeyEnrollment_PasskeyEnrollmentLocal, usePasskeyEnrollmentLocal as usePasskeyEnrollmentLocal_PasskeyEnrollmentLocal } from './screens/passkey-enrollment-local';
export namespace PasskeyEnrollmentLocal {
  export const useScreen = useScreen_PasskeyEnrollmentLocal;
  export const useTransaction = useTransaction_PasskeyEnrollmentLocal;
  export const continuePasskeyEnrollment = continuePasskeyEnrollment_PasskeyEnrollmentLocal;
  export const abortPasskeyEnrollment = abortPasskeyEnrollment_PasskeyEnrollmentLocal;
  export const usePasskeyEnrollmentLocal = usePasskeyEnrollmentLocal_PasskeyEnrollmentLocal;
}

import { useScreen as useScreen_PasskeyEnrollment, useTransaction as useTransaction_PasskeyEnrollment, continuePasskeyEnrollment as continuePasskeyEnrollment_PasskeyEnrollment, abortPasskeyEnrollment as abortPasskeyEnrollment_PasskeyEnrollment, usePasskeyEnrollment as usePasskeyEnrollment_PasskeyEnrollment } from './screens/passkey-enrollment';
export namespace PasskeyEnrollment {
  export const useScreen = useScreen_PasskeyEnrollment;
  export const useTransaction = useTransaction_PasskeyEnrollment;
  export const continuePasskeyEnrollment = continuePasskeyEnrollment_PasskeyEnrollment;
  export const abortPasskeyEnrollment = abortPasskeyEnrollment_PasskeyEnrollment;
  export const usePasskeyEnrollment = usePasskeyEnrollment_PasskeyEnrollment;
}

import { useScreen as useScreen_PhoneIdentifierChallenge, useTransaction as useTransaction_PhoneIdentifierChallenge, submitPhoneChallenge as submitPhoneChallenge_PhoneIdentifierChallenge, resendCode as resendCode_PhoneIdentifierChallenge, returnToPrevious as returnToPrevious_PhoneIdentifierChallenge, usePhoneIdentifierChallenge as usePhoneIdentifierChallenge_PhoneIdentifierChallenge, useResend as useResend_PhoneIdentifierChallenge } from './screens/phone-identifier-challenge';
export namespace PhoneIdentifierChallenge {
  export const useScreen = useScreen_PhoneIdentifierChallenge;
  export const useTransaction = useTransaction_PhoneIdentifierChallenge;
  export const submitPhoneChallenge = submitPhoneChallenge_PhoneIdentifierChallenge;
  export const resendCode = resendCode_PhoneIdentifierChallenge;
  export const returnToPrevious = returnToPrevious_PhoneIdentifierChallenge;
  export const usePhoneIdentifierChallenge = usePhoneIdentifierChallenge_PhoneIdentifierChallenge;
  export const useResend = useResend_PhoneIdentifierChallenge;
}

import { useScreen as useScreen_PhoneIdentifierEnrollment, useTransaction as useTransaction_PhoneIdentifierEnrollment, continuePhoneEnrollment as continuePhoneEnrollment_PhoneIdentifierEnrollment, returnToPrevious as returnToPrevious_PhoneIdentifierEnrollment, usePhoneIdentifierEnrollment as usePhoneIdentifierEnrollment_PhoneIdentifierEnrollment } from './screens/phone-identifier-enrollment';
export namespace PhoneIdentifierEnrollment {
  export const useScreen = useScreen_PhoneIdentifierEnrollment;
  export const useTransaction = useTransaction_PhoneIdentifierEnrollment;
  export const continuePhoneEnrollment = continuePhoneEnrollment_PhoneIdentifierEnrollment;
  export const returnToPrevious = returnToPrevious_PhoneIdentifierEnrollment;
  export const usePhoneIdentifierEnrollment = usePhoneIdentifierEnrollment_PhoneIdentifierEnrollment;
}

import { useScreen as useScreen_RedeemTicket, useTransaction as useTransaction_RedeemTicket, continueMethod as continueMethod_RedeemTicket, useRedeemTicket as useRedeemTicket_RedeemTicket } from './screens/redeem-ticket';
export namespace RedeemTicket {
  export const useScreen = useScreen_RedeemTicket;
  export const useTransaction = useTransaction_RedeemTicket;
  export const continueMethod = continueMethod_RedeemTicket;
  export const useRedeemTicket = useRedeemTicket_RedeemTicket;
}

import { useScreen as useScreen_ResetPasswordEmail, useTransaction as useTransaction_ResetPasswordEmail, resendEmail as resendEmail_ResetPasswordEmail, useResetPasswordEmail as useResetPasswordEmail_ResetPasswordEmail } from './screens/reset-password-email';
export namespace ResetPasswordEmail {
  export const useScreen = useScreen_ResetPasswordEmail;
  export const useTransaction = useTransaction_ResetPasswordEmail;
  export const resendEmail = resendEmail_ResetPasswordEmail;
  export const useResetPasswordEmail = useResetPasswordEmail_ResetPasswordEmail;
}

import { useScreen as useScreen_ResetPasswordError, useTransaction as useTransaction_ResetPasswordError, useResetPasswordError as useResetPasswordError_ResetPasswordError } from './screens/reset-password-error';
export namespace ResetPasswordError {
  export const useScreen = useScreen_ResetPasswordError;
  export const useTransaction = useTransaction_ResetPasswordError;
  export const useResetPasswordError = useResetPasswordError_ResetPasswordError;
}

import { useScreen as useScreen_ResetPasswordMfaEmailChallenge, useTransaction as useTransaction_ResetPasswordMfaEmailChallenge, continueMethod as continueMethod_ResetPasswordMfaEmailChallenge, resendCode as resendCode_ResetPasswordMfaEmailChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaEmailChallenge, useResetPasswordMfaEmailChallenge as useResetPasswordMfaEmailChallenge_ResetPasswordMfaEmailChallenge, useResend as useResend_ResetPasswordMfaEmailChallenge } from './screens/reset-password-mfa-email-challenge';
export namespace ResetPasswordMfaEmailChallenge {
  export const useScreen = useScreen_ResetPasswordMfaEmailChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaEmailChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaEmailChallenge;
  export const resendCode = resendCode_ResetPasswordMfaEmailChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaEmailChallenge;
  export const useResetPasswordMfaEmailChallenge = useResetPasswordMfaEmailChallenge_ResetPasswordMfaEmailChallenge;
  export const useResend = useResend_ResetPasswordMfaEmailChallenge;
}

import { useScreen as useScreen_ResetPasswordMfaOtpChallenge, useTransaction as useTransaction_ResetPasswordMfaOtpChallenge, continueMethod as continueMethod_ResetPasswordMfaOtpChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaOtpChallenge, useResetPasswordMfaOtpChallenge as useResetPasswordMfaOtpChallenge_ResetPasswordMfaOtpChallenge } from './screens/reset-password-mfa-otp-challenge';
export namespace ResetPasswordMfaOtpChallenge {
  export const useScreen = useScreen_ResetPasswordMfaOtpChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaOtpChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaOtpChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaOtpChallenge;
  export const useResetPasswordMfaOtpChallenge = useResetPasswordMfaOtpChallenge_ResetPasswordMfaOtpChallenge;
}

import { useScreen as useScreen_ResetPasswordMfaPhoneChallenge, useTransaction as useTransaction_ResetPasswordMfaPhoneChallenge, continueMethod as continueMethod_ResetPasswordMfaPhoneChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaPhoneChallenge, useResetPasswordMfaPhoneChallenge as useResetPasswordMfaPhoneChallenge_ResetPasswordMfaPhoneChallenge } from './screens/reset-password-mfa-phone-challenge';
export namespace ResetPasswordMfaPhoneChallenge {
  export const useScreen = useScreen_ResetPasswordMfaPhoneChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaPhoneChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaPhoneChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaPhoneChallenge;
  export const useResetPasswordMfaPhoneChallenge = useResetPasswordMfaPhoneChallenge_ResetPasswordMfaPhoneChallenge;
}

import { useScreen as useScreen_ResetPasswordMfaPushChallengePush, useTransaction as useTransaction_ResetPasswordMfaPushChallengePush, continueMethod as continueMethod_ResetPasswordMfaPushChallengePush, resendPushNotification as resendPushNotification_ResetPasswordMfaPushChallengePush, enterCodeManually as enterCodeManually_ResetPasswordMfaPushChallengePush, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaPushChallengePush, useResetPasswordMfaPushChallengePush as useResetPasswordMfaPushChallengePush_ResetPasswordMfaPushChallengePush, useMfaPolling as useMfaPolling_ResetPasswordMfaPushChallengePush } from './screens/reset-password-mfa-push-challenge-push';
export namespace ResetPasswordMfaPushChallengePush {
  export const useScreen = useScreen_ResetPasswordMfaPushChallengePush;
  export const useTransaction = useTransaction_ResetPasswordMfaPushChallengePush;
  export const continueMethod = continueMethod_ResetPasswordMfaPushChallengePush;
  export const resendPushNotification = resendPushNotification_ResetPasswordMfaPushChallengePush;
  export const enterCodeManually = enterCodeManually_ResetPasswordMfaPushChallengePush;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaPushChallengePush;
  export const useResetPasswordMfaPushChallengePush = useResetPasswordMfaPushChallengePush_ResetPasswordMfaPushChallengePush;
  export const useMfaPolling = useMfaPolling_ResetPasswordMfaPushChallengePush;
}

import { useScreen as useScreen_ResetPasswordMfaRecoveryCodeChallenge, useTransaction as useTransaction_ResetPasswordMfaRecoveryCodeChallenge, continueMethod as continueMethod_ResetPasswordMfaRecoveryCodeChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaRecoveryCodeChallenge, useResetPasswordMfaRecoveryCodeChallenge as useResetPasswordMfaRecoveryCodeChallenge_ResetPasswordMfaRecoveryCodeChallenge } from './screens/reset-password-mfa-recovery-code-challenge';
export namespace ResetPasswordMfaRecoveryCodeChallenge {
  export const useScreen = useScreen_ResetPasswordMfaRecoveryCodeChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaRecoveryCodeChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaRecoveryCodeChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaRecoveryCodeChallenge;
  export const useResetPasswordMfaRecoveryCodeChallenge = useResetPasswordMfaRecoveryCodeChallenge_ResetPasswordMfaRecoveryCodeChallenge;
}

import { useScreen as useScreen_ResetPasswordMfaSmsChallenge, useTransaction as useTransaction_ResetPasswordMfaSmsChallenge, continueMfaSmsChallenge as continueMfaSmsChallenge_ResetPasswordMfaSmsChallenge, resendCode as resendCode_ResetPasswordMfaSmsChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaSmsChallenge, getACall as getACall_ResetPasswordMfaSmsChallenge, useResetPasswordMfaSmsChallenge as useResetPasswordMfaSmsChallenge_ResetPasswordMfaSmsChallenge, useResend as useResend_ResetPasswordMfaSmsChallenge } from './screens/reset-password-mfa-sms-challenge';
export namespace ResetPasswordMfaSmsChallenge {
  export const useScreen = useScreen_ResetPasswordMfaSmsChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaSmsChallenge;
  export const continueMfaSmsChallenge = continueMfaSmsChallenge_ResetPasswordMfaSmsChallenge;
  export const resendCode = resendCode_ResetPasswordMfaSmsChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaSmsChallenge;
  export const getACall = getACall_ResetPasswordMfaSmsChallenge;
  export const useResetPasswordMfaSmsChallenge = useResetPasswordMfaSmsChallenge_ResetPasswordMfaSmsChallenge;
  export const useResend = useResend_ResetPasswordMfaSmsChallenge;
}

import { useScreen as useScreen_ResetPasswordMfaVoiceChallenge, useTransaction as useTransaction_ResetPasswordMfaVoiceChallenge, continueMethod as continueMethod_ResetPasswordMfaVoiceChallenge, switchToSms as switchToSms_ResetPasswordMfaVoiceChallenge, resendCode as resendCode_ResetPasswordMfaVoiceChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaVoiceChallenge, useResetPasswordMfaVoiceChallenge as useResetPasswordMfaVoiceChallenge_ResetPasswordMfaVoiceChallenge, useResend as useResend_ResetPasswordMfaVoiceChallenge } from './screens/reset-password-mfa-voice-challenge';
export namespace ResetPasswordMfaVoiceChallenge {
  export const useScreen = useScreen_ResetPasswordMfaVoiceChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaVoiceChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaVoiceChallenge;
  export const switchToSms = switchToSms_ResetPasswordMfaVoiceChallenge;
  export const resendCode = resendCode_ResetPasswordMfaVoiceChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaVoiceChallenge;
  export const useResetPasswordMfaVoiceChallenge = useResetPasswordMfaVoiceChallenge_ResetPasswordMfaVoiceChallenge;
  export const useResend = useResend_ResetPasswordMfaVoiceChallenge;
}

import { useScreen as useScreen_ResetPasswordMfaWebauthnPlatformChallenge, useTransaction as useTransaction_ResetPasswordMfaWebauthnPlatformChallenge, continueWithPasskey as continueWithPasskey_ResetPasswordMfaWebauthnPlatformChallenge, reportBrowserError as reportBrowserError_ResetPasswordMfaWebauthnPlatformChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaWebauthnPlatformChallenge, useResetPasswordMfaWebAuthnPlatformChallenge as useResetPasswordMfaWebAuthnPlatformChallenge_ResetPasswordMfaWebauthnPlatformChallenge } from './screens/reset-password-mfa-webauthn-platform-challenge';
export namespace ResetPasswordMfaWebauthnPlatformChallenge {
  export const useScreen = useScreen_ResetPasswordMfaWebauthnPlatformChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaWebauthnPlatformChallenge;
  export const continueWithPasskey = continueWithPasskey_ResetPasswordMfaWebauthnPlatformChallenge;
  export const reportBrowserError = reportBrowserError_ResetPasswordMfaWebauthnPlatformChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaWebauthnPlatformChallenge;
  export const useResetPasswordMfaWebAuthnPlatformChallenge = useResetPasswordMfaWebAuthnPlatformChallenge_ResetPasswordMfaWebauthnPlatformChallenge;
}

import { useScreen as useScreen_ResetPasswordMfaWebauthnRoamingChallenge, useTransaction as useTransaction_ResetPasswordMfaWebauthnRoamingChallenge, useSecurityKey as useSecurityKey_ResetPasswordMfaWebauthnRoamingChallenge, showError as showError_ResetPasswordMfaWebauthnRoamingChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaWebauthnRoamingChallenge, useResetPasswordMfaWebAuthnRoamingChallenge as useResetPasswordMfaWebAuthnRoamingChallenge_ResetPasswordMfaWebauthnRoamingChallenge } from './screens/reset-password-mfa-webauthn-roaming-challenge';
export namespace ResetPasswordMfaWebauthnRoamingChallenge {
  export const useScreen = useScreen_ResetPasswordMfaWebauthnRoamingChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaWebauthnRoamingChallenge;
  export const useSecurityKey = useSecurityKey_ResetPasswordMfaWebauthnRoamingChallenge;
  export const showError = showError_ResetPasswordMfaWebauthnRoamingChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaWebauthnRoamingChallenge;
  export const useResetPasswordMfaWebAuthnRoamingChallenge = useResetPasswordMfaWebAuthnRoamingChallenge_ResetPasswordMfaWebauthnRoamingChallenge;
}

import { useScreen as useScreen_ResetPasswordRequest, useTransaction as useTransaction_ResetPasswordRequest, resetPassword as resetPassword_ResetPasswordRequest, backToLogin as backToLogin_ResetPasswordRequest, useResetPasswordRequest as useResetPasswordRequest_ResetPasswordRequest } from './screens/reset-password-request';
export namespace ResetPasswordRequest {
  export const useScreen = useScreen_ResetPasswordRequest;
  export const useTransaction = useTransaction_ResetPasswordRequest;
  export const resetPassword = resetPassword_ResetPasswordRequest;
  export const backToLogin = backToLogin_ResetPasswordRequest;
  export const useResetPasswordRequest = useResetPasswordRequest_ResetPasswordRequest;
}

import { useScreen as useScreen_ResetPasswordSuccess, useTransaction as useTransaction_ResetPasswordSuccess, useResetPasswordSuccess as useResetPasswordSuccess_ResetPasswordSuccess } from './screens/reset-password-success';
export namespace ResetPasswordSuccess {
  export const useScreen = useScreen_ResetPasswordSuccess;
  export const useTransaction = useTransaction_ResetPasswordSuccess;
  export const useResetPasswordSuccess = useResetPasswordSuccess_ResetPasswordSuccess;
}

import { useScreen as useScreen_ResetPassword, useTransaction as useTransaction_ResetPassword, resetPassword as resetPassword_ResetPassword, useResetPassword as useResetPassword_ResetPassword, usePasswordValidation as usePasswordValidation_ResetPassword } from './screens/reset-password';
export namespace ResetPassword {
  export const useScreen = useScreen_ResetPassword;
  export const useTransaction = useTransaction_ResetPassword;
  export const resetPassword = resetPassword_ResetPassword;
  export const useResetPassword = useResetPassword_ResetPassword;
  export const usePasswordValidation = usePasswordValidation_ResetPassword;
}

import { useScreen as useScreen_SignupId, useTransaction as useTransaction_SignupId, signup as signup_SignupId, federatedSignup as federatedSignup_SignupId, pickCountryCode as pickCountryCode_SignupId, useSignupId as useSignupId_SignupId, useEnabledIdentifiers as useEnabledIdentifiers_SignupId, useUsernameValidation as useUsernameValidation_SignupId } from './screens/signup-id';
export namespace SignupId {
  export const useScreen = useScreen_SignupId;
  export const useTransaction = useTransaction_SignupId;
  export const signup = signup_SignupId;
  export const federatedSignup = federatedSignup_SignupId;
  export const pickCountryCode = pickCountryCode_SignupId;
  export const useSignupId = useSignupId_SignupId;
  export const useEnabledIdentifiers = useEnabledIdentifiers_SignupId;
  export const useUsernameValidation = useUsernameValidation_SignupId;
}

import { useScreen as useScreen_SignupPassword, useTransaction as useTransaction_SignupPassword, signup as signup_SignupPassword, federatedSignup as federatedSignup_SignupPassword, useSignupPassword as useSignupPassword_SignupPassword, usePasswordValidation as usePasswordValidation_SignupPassword } from './screens/signup-password';
export namespace SignupPassword {
  export const useScreen = useScreen_SignupPassword;
  export const useTransaction = useTransaction_SignupPassword;
  export const signup = signup_SignupPassword;
  export const federatedSignup = federatedSignup_SignupPassword;
  export const useSignupPassword = useSignupPassword_SignupPassword;
  export const usePasswordValidation = usePasswordValidation_SignupPassword;
}

import { useScreen as useScreen_Signup, useTransaction as useTransaction_Signup, signup as signup_Signup, federatedSignup as federatedSignup_Signup, pickCountryCode as pickCountryCode_Signup, useSignup as useSignup_Signup, usePasswordValidation as usePasswordValidation_Signup, useEnabledIdentifiers as useEnabledIdentifiers_Signup, useUsernameValidation as useUsernameValidation_Signup } from './screens/signup';
export namespace Signup {
  export const useScreen = useScreen_Signup;
  export const useTransaction = useTransaction_Signup;
  export const signup = signup_Signup;
  export const federatedSignup = federatedSignup_Signup;
  export const pickCountryCode = pickCountryCode_Signup;
  export const useSignup = useSignup_Signup;
  export const usePasswordValidation = usePasswordValidation_Signup;
  export const useEnabledIdentifiers = useEnabledIdentifiers_Signup;
  export const useUsernameValidation = useUsernameValidation_Signup;
}

import { useCurrentScreen as use_currentScreen, useAuth0Themes as use_Auth0Themes, useErrors as use_Errors } from '../src/hooks/common';
export namespace CommonHooks {
    export const useCurrentScreen = use_currentScreen;
    export const useAuth0Themes = use_Auth0Themes;
    export const useErrors = use_Errors;
  }
