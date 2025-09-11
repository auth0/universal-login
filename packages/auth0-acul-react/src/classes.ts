/* eslint-disable @typescript-eslint/no-namespace */
import { useAcceptInvitation as useAcceptInvitation_AcceptInvitation, useScreen as useScreen_AcceptInvitation, useTransaction as useTransaction_AcceptInvitation, acceptInvitation as acceptInvitation_AcceptInvitation } from './screens/accept-invitation';
export namespace AcceptInvitation {
  export const useAcceptInvitation = useAcceptInvitation_AcceptInvitation;
  export const useScreen = useScreen_AcceptInvitation;
  export const useTransaction = useTransaction_AcceptInvitation;
  export const acceptInvitation = acceptInvitation_AcceptInvitation;
}

import { useConsent as useConsent_Consent, useScreen as useScreen_Consent, useTransaction as useTransaction_Consent, accept as accept_Consent, deny as deny_Consent } from './screens/consent';
export namespace Consent {
  export const useConsent = useConsent_Consent;
  export const useScreen = useScreen_Consent;
  export const useTransaction = useTransaction_Consent;
  export const accept = accept_Consent;
  export const deny = deny_Consent;
}

import { useCustomizedConsent as useCustomizedConsent_CustomizedConsent, useScreen as useScreen_CustomizedConsent, useTransaction as useTransaction_CustomizedConsent, accept as accept_CustomizedConsent, deny as deny_CustomizedConsent } from './screens/customized-consent';
export namespace CustomizedConsent {
  export const useCustomizedConsent = useCustomizedConsent_CustomizedConsent;
  export const useScreen = useScreen_CustomizedConsent;
  export const useTransaction = useTransaction_CustomizedConsent;
  export const accept = accept_CustomizedConsent;
  export const deny = deny_CustomizedConsent;
}

import { useDeviceCodeActivationAllowed as useDeviceCodeActivationAllowed_DeviceCodeActivationAllowed, useScreen as useScreen_DeviceCodeActivationAllowed, useTransaction as useTransaction_DeviceCodeActivationAllowed } from './screens/device-code-activation-allowed';
export namespace DeviceCodeActivationAllowed {
  export const useDeviceCodeActivationAllowed = useDeviceCodeActivationAllowed_DeviceCodeActivationAllowed;
  export const useScreen = useScreen_DeviceCodeActivationAllowed;
  export const useTransaction = useTransaction_DeviceCodeActivationAllowed;
}

import { useDeviceCodeActivationDenied as useDeviceCodeActivationDenied_DeviceCodeActivationDenied, useScreen as useScreen_DeviceCodeActivationDenied, useTransaction as useTransaction_DeviceCodeActivationDenied } from './screens/device-code-activation-denied';
export namespace DeviceCodeActivationDenied {
  export const useDeviceCodeActivationDenied = useDeviceCodeActivationDenied_DeviceCodeActivationDenied;
  export const useScreen = useScreen_DeviceCodeActivationDenied;
  export const useTransaction = useTransaction_DeviceCodeActivationDenied;
}

import { useDeviceCodeActivation as useDeviceCodeActivation_DeviceCodeActivation, useScreen as useScreen_DeviceCodeActivation, useTransaction as useTransaction_DeviceCodeActivation, continueMethod as continueMethod_DeviceCodeActivation } from './screens/device-code-activation';
export namespace DeviceCodeActivation {
  export const useDeviceCodeActivation = useDeviceCodeActivation_DeviceCodeActivation;
  export const useScreen = useScreen_DeviceCodeActivation;
  export const useTransaction = useTransaction_DeviceCodeActivation;
  export const continueMethod = continueMethod_DeviceCodeActivation;
}

import { useDeviceCodeConfirmation as useDeviceCodeConfirmation_DeviceCodeConfirmation, useScreen as useScreen_DeviceCodeConfirmation, useTransaction as useTransaction_DeviceCodeConfirmation, confirm as confirm_DeviceCodeConfirmation, cancel as cancel_DeviceCodeConfirmation } from './screens/device-code-confirmation';
export namespace DeviceCodeConfirmation {
  export const useDeviceCodeConfirmation = useDeviceCodeConfirmation_DeviceCodeConfirmation;
  export const useScreen = useScreen_DeviceCodeConfirmation;
  export const useTransaction = useTransaction_DeviceCodeConfirmation;
  export const confirm = confirm_DeviceCodeConfirmation;
  export const cancel = cancel_DeviceCodeConfirmation;
}

import { useEmailIdentifierChallenge as useEmailIdentifierChallenge_EmailIdentifierChallenge, useScreen as useScreen_EmailIdentifierChallenge, useTransaction as useTransaction_EmailIdentifierChallenge, submitEmailChallenge as submitEmailChallenge_EmailIdentifierChallenge, resendCode as resendCode_EmailIdentifierChallenge, returnToPrevious as returnToPrevious_EmailIdentifierChallenge } from './screens/email-identifier-challenge';
export namespace EmailIdentifierChallenge {
  export const useEmailIdentifierChallenge = useEmailIdentifierChallenge_EmailIdentifierChallenge;
  export const useScreen = useScreen_EmailIdentifierChallenge;
  export const useTransaction = useTransaction_EmailIdentifierChallenge;
  export const submitEmailChallenge = submitEmailChallenge_EmailIdentifierChallenge;
  export const resendCode = resendCode_EmailIdentifierChallenge;
  export const returnToPrevious = returnToPrevious_EmailIdentifierChallenge;
}

import { useEmailOTPChallenge as useEmailOTPChallenge_EmailOtpChallenge, useScreen as useScreen_EmailOtpChallenge, useTransaction as useTransaction_EmailOtpChallenge, submitCode as submitCode_EmailOtpChallenge, resendCode as resendCode_EmailOtpChallenge } from './screens/email-otp-challenge';
export namespace EmailOtpChallenge {
  export const useEmailOTPChallenge = useEmailOTPChallenge_EmailOtpChallenge;
  export const useScreen = useScreen_EmailOtpChallenge;
  export const useTransaction = useTransaction_EmailOtpChallenge;
  export const submitCode = submitCode_EmailOtpChallenge;
  export const resendCode = resendCode_EmailOtpChallenge;
}

import { useEmailVerificationResult as useEmailVerificationResult_EmailVerificationResult, useScreen as useScreen_EmailVerificationResult, useTransaction as useTransaction_EmailVerificationResult } from './screens/email-verification-result';
export namespace EmailVerificationResult {
  export const useEmailVerificationResult = useEmailVerificationResult_EmailVerificationResult;
  export const useScreen = useScreen_EmailVerificationResult;
  export const useTransaction = useTransaction_EmailVerificationResult;
}

import { useInterstitialCaptcha as useInterstitialCaptcha_InterstitialCaptcha, useScreen as useScreen_InterstitialCaptcha, useTransaction as useTransaction_InterstitialCaptcha } from './screens/interstitial-captcha';
export namespace InterstitialCaptcha {
  export const useInterstitialCaptcha = useInterstitialCaptcha_InterstitialCaptcha;
  export const useScreen = useScreen_InterstitialCaptcha;
  export const useTransaction = useTransaction_InterstitialCaptcha;
}

import { useLoginEmailVerification as useLoginEmailVerification_LoginEmailVerification, useScreen as useScreen_LoginEmailVerification, useTransaction as useTransaction_LoginEmailVerification, continueWithCode as continueWithCode_LoginEmailVerification, resendCode as resendCode_LoginEmailVerification } from './screens/login-email-verification';
export namespace LoginEmailVerification {
  export const useLoginEmailVerification = useLoginEmailVerification_LoginEmailVerification;
  export const useScreen = useScreen_LoginEmailVerification;
  export const useTransaction = useTransaction_LoginEmailVerification;
  export const continueWithCode = continueWithCode_LoginEmailVerification;
  export const resendCode = resendCode_LoginEmailVerification;
}

import { useLoginId as useLoginId_LoginId, useScreen as useScreen_LoginId, useTransaction as useTransaction_LoginId, login as login_LoginId, federatedLogin as federatedLogin_LoginId, passkeyLogin as passkeyLogin_LoginId, pickCountryCode as pickCountryCode_LoginId, useActiveIdentifiers as useActiveIdentifiers_LoginId } from './screens/login-id';
export namespace LoginId {
  export const useLoginId = useLoginId_LoginId;
  export const useScreen = useScreen_LoginId;
  export const useTransaction = useTransaction_LoginId;
  export const login = login_LoginId;
  export const federatedLogin = federatedLogin_LoginId;
  export const passkeyLogin = passkeyLogin_LoginId;
  export const pickCountryCode = pickCountryCode_LoginId;
  export const useActiveIdentifiers =  useActiveIdentifiers_Login;
}

import { useLoginPassword as useLoginPassword_LoginPassword, useScreen as useScreen_LoginPassword, useTransaction as useTransaction_LoginPassword, login as login_LoginPassword, federatedLogin as federatedLogin_LoginPassword } from './screens/login-password';
export namespace LoginPassword {
  export const useLoginPassword = useLoginPassword_LoginPassword;
  export const useScreen = useScreen_LoginPassword;
  export const useTransaction = useTransaction_LoginPassword;
  export const login = login_LoginPassword;
  export const federatedLogin = federatedLogin_LoginPassword;
}

import { useLoginPasswordlessEmailCode as useLoginPasswordlessEmailCode_LoginPasswordlessEmailCode, useScreen as useScreen_LoginPasswordlessEmailCode, useTransaction as useTransaction_LoginPasswordlessEmailCode, submitCode as submitCode_LoginPasswordlessEmailCode, resendCode as resendCode_LoginPasswordlessEmailCode } from './screens/login-passwordless-email-code';
export namespace LoginPasswordlessEmailCode {
  export const useLoginPasswordlessEmailCode = useLoginPasswordlessEmailCode_LoginPasswordlessEmailCode;
  export const useScreen = useScreen_LoginPasswordlessEmailCode;
  export const useTransaction = useTransaction_LoginPasswordlessEmailCode;
  export const submitCode = submitCode_LoginPasswordlessEmailCode;
  export const resendCode = resendCode_LoginPasswordlessEmailCode;
}

import { useLoginPasswordlessSmsOtp as useLoginPasswordlessSmsOtp_LoginPasswordlessSmsOtp, useScreen as useScreen_LoginPasswordlessSmsOtp, useTransaction as useTransaction_LoginPasswordlessSmsOtp, submitOTP as submitOTP_LoginPasswordlessSmsOtp, resendOTP as resendOTP_LoginPasswordlessSmsOtp } from './screens/login-passwordless-sms-otp';
export namespace LoginPasswordlessSmsOtp {
  export const useLoginPasswordlessSmsOtp = useLoginPasswordlessSmsOtp_LoginPasswordlessSmsOtp;
  export const useScreen = useScreen_LoginPasswordlessSmsOtp;
  export const useTransaction = useTransaction_LoginPasswordlessSmsOtp;
  export const submitOTP = submitOTP_LoginPasswordlessSmsOtp;
  export const resendOTP = resendOTP_LoginPasswordlessSmsOtp;
}

import { useLogin as useLogin_Login, useScreen as useScreen_Login, useTransaction as useTransaction_Login, login as login_Login, federatedLogin as federatedLogin_Login, useActiveIdentifiers as useActiveIdentifiers_Login } from './screens/login';
export namespace Login {
  export const useLogin = useLogin_Login;
  export const useScreen = useScreen_Login;
  export const useTransaction = useTransaction_Login;
  export const login = login_Login;
  export const federatedLogin = federatedLogin_Login;
  export const useActiveIdentifiers =  useActiveIdentifiers_Login;
}

import { useLogoutAborted as useLogoutAborted_LogoutAborted, useScreen as useScreen_LogoutAborted, useTransaction as useTransaction_LogoutAborted } from './screens/logout-aborted';
export namespace LogoutAborted {
  export const useLogoutAborted = useLogoutAborted_LogoutAborted;
  export const useScreen = useScreen_LogoutAborted;
  export const useTransaction = useTransaction_LogoutAborted;
}

import { useLogoutComplete as useLogoutComplete_LogoutComplete, useScreen as useScreen_LogoutComplete, useTransaction as useTransaction_LogoutComplete } from './screens/logout-complete';
export namespace LogoutComplete {
  export const useLogoutComplete = useLogoutComplete_LogoutComplete;
  export const useScreen = useScreen_LogoutComplete;
  export const useTransaction = useTransaction_LogoutComplete;
}

import { useLogout as useLogout_Logout, useScreen as useScreen_Logout, useTransaction as useTransaction_Logout, confirmLogout as confirmLogout_Logout } from './screens/logout';
export namespace Logout {
  export const useLogout = useLogout_Logout;
  export const useScreen = useScreen_Logout;
  export const useTransaction = useTransaction_Logout;
  export const confirmLogout = confirmLogout_Logout;
}

import { useMfaBeginEnrollOptions as useMfaBeginEnrollOptions_MfaBeginEnrollOptions, useScreen as useScreen_MfaBeginEnrollOptions, useTransaction as useTransaction_MfaBeginEnrollOptions, enroll as enroll_MfaBeginEnrollOptions } from './screens/mfa-begin-enroll-options';
export namespace MfaBeginEnrollOptions {
  export const useMfaBeginEnrollOptions = useMfaBeginEnrollOptions_MfaBeginEnrollOptions;
  export const useScreen = useScreen_MfaBeginEnrollOptions;
  export const useTransaction = useTransaction_MfaBeginEnrollOptions;
  export const enroll = enroll_MfaBeginEnrollOptions;
}

import { useMfaCountryCodes as useMfaCountryCodes_MfaCountryCodes, useScreen as useScreen_MfaCountryCodes, useTransaction as useTransaction_MfaCountryCodes, selectCountryCode as selectCountryCode_MfaCountryCodes, goBack as goBack_MfaCountryCodes } from './screens/mfa-country-codes';
export namespace MfaCountryCodes {
  export const useMfaCountryCodes = useMfaCountryCodes_MfaCountryCodes;
  export const useScreen = useScreen_MfaCountryCodes;
  export const useTransaction = useTransaction_MfaCountryCodes;
  export const selectCountryCode = selectCountryCode_MfaCountryCodes;
  export const goBack = goBack_MfaCountryCodes;
}

import { useMfaDetectBrowserCapabilities as useMfaDetectBrowserCapabilities_MfaDetectBrowserCapabilities, useScreen as useScreen_MfaDetectBrowserCapabilities, useTransaction as useTransaction_MfaDetectBrowserCapabilities, detectCapabilities as detectCapabilities_MfaDetectBrowserCapabilities } from './screens/mfa-detect-browser-capabilities';
export namespace MfaDetectBrowserCapabilities {
  export const useMfaDetectBrowserCapabilities = useMfaDetectBrowserCapabilities_MfaDetectBrowserCapabilities;
  export const useScreen = useScreen_MfaDetectBrowserCapabilities;
  export const useTransaction = useTransaction_MfaDetectBrowserCapabilities;
  export const detectCapabilities = detectCapabilities_MfaDetectBrowserCapabilities;
}

import { useMfaEmailChallenge as useMfaEmailChallenge_MfaEmailChallenge, useScreen as useScreen_MfaEmailChallenge, useTransaction as useTransaction_MfaEmailChallenge, continueMethod as continueMethod_MfaEmailChallenge, resendCode as resendCode_MfaEmailChallenge, tryAnotherMethod as tryAnotherMethod_MfaEmailChallenge } from './screens/mfa-email-challenge';
export namespace MfaEmailChallenge {
  export const useMfaEmailChallenge = useMfaEmailChallenge_MfaEmailChallenge;
  export const useScreen = useScreen_MfaEmailChallenge;
  export const useTransaction = useTransaction_MfaEmailChallenge;
  export const continueMethod = continueMethod_MfaEmailChallenge;
  export const resendCode = resendCode_MfaEmailChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaEmailChallenge;
}

import { useMfaEmailList as useMfaEmailList_MfaEmailList, useScreen as useScreen_MfaEmailList, useTransaction as useTransaction_MfaEmailList, selectMfaEmail as selectMfaEmail_MfaEmailList, goBack as goBack_MfaEmailList } from './screens/mfa-email-list';
export namespace MfaEmailList {
  export const useMfaEmailList = useMfaEmailList_MfaEmailList;
  export const useScreen = useScreen_MfaEmailList;
  export const useTransaction = useTransaction_MfaEmailList;
  export const selectMfaEmail = selectMfaEmail_MfaEmailList;
  export const goBack = goBack_MfaEmailList;
}

import { useMfaEnrollResult as useMfaEnrollResult_MfaEnrollResult, useScreen as useScreen_MfaEnrollResult, useTransaction as useTransaction_MfaEnrollResult } from './screens/mfa-enroll-result';
export namespace MfaEnrollResult {
  export const useMfaEnrollResult = useMfaEnrollResult_MfaEnrollResult;
  export const useScreen = useScreen_MfaEnrollResult;
  export const useTransaction = useTransaction_MfaEnrollResult;
}

import { useMfaLoginOptions as useMfaLoginOptions_MfaLoginOptions, useScreen as useScreen_MfaLoginOptions, useTransaction as useTransaction_MfaLoginOptions, enroll as enroll_MfaLoginOptions } from './screens/mfa-login-options';
export namespace MfaLoginOptions {
  export const useMfaLoginOptions = useMfaLoginOptions_MfaLoginOptions;
  export const useScreen = useScreen_MfaLoginOptions;
  export const useTransaction = useTransaction_MfaLoginOptions;
  export const enroll = enroll_MfaLoginOptions;
}

import { useMfaOtpChallenge as useMfaOtpChallenge_MfaOtpChallenge, useScreen as useScreen_MfaOtpChallenge, useTransaction as useTransaction_MfaOtpChallenge, continueMethod as continueMethod_MfaOtpChallenge, tryAnotherMethod as tryAnotherMethod_MfaOtpChallenge } from './screens/mfa-otp-challenge';
export namespace MfaOtpChallenge {
  export const useMfaOtpChallenge = useMfaOtpChallenge_MfaOtpChallenge;
  export const useScreen = useScreen_MfaOtpChallenge;
  export const useTransaction = useTransaction_MfaOtpChallenge;
  export const continueMethod = continueMethod_MfaOtpChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaOtpChallenge;
}

import { useMfaOtpEnrollmentCode as useMfaOtpEnrollmentCode_MfaOtpEnrollmentCode, useScreen as useScreen_MfaOtpEnrollmentCode, useTransaction as useTransaction_MfaOtpEnrollmentCode, continueMethod as continueMethod_MfaOtpEnrollmentCode, tryAnotherMethod as tryAnotherMethod_MfaOtpEnrollmentCode } from './screens/mfa-otp-enrollment-code';
export namespace MfaOtpEnrollmentCode {
  export const useMfaOtpEnrollmentCode = useMfaOtpEnrollmentCode_MfaOtpEnrollmentCode;
  export const useScreen = useScreen_MfaOtpEnrollmentCode;
  export const useTransaction = useTransaction_MfaOtpEnrollmentCode;
  export const continueMethod = continueMethod_MfaOtpEnrollmentCode;
  export const tryAnotherMethod = tryAnotherMethod_MfaOtpEnrollmentCode;
}

import { useMfaOtpEnrollmentQr as useMfaOtpEnrollmentQr_MfaOtpEnrollmentQr, useScreen as useScreen_MfaOtpEnrollmentQr, useTransaction as useTransaction_MfaOtpEnrollmentQr, toggleView as toggleView_MfaOtpEnrollmentQr, continueMethod as continueMethod_MfaOtpEnrollmentQr, tryAnotherMethod as tryAnotherMethod_MfaOtpEnrollmentQr } from './screens/mfa-otp-enrollment-qr';
export namespace MfaOtpEnrollmentQr {
  export const useMfaOtpEnrollmentQr = useMfaOtpEnrollmentQr_MfaOtpEnrollmentQr;
  export const useScreen = useScreen_MfaOtpEnrollmentQr;
  export const useTransaction = useTransaction_MfaOtpEnrollmentQr;
  export const toggleView = toggleView_MfaOtpEnrollmentQr;
  export const continueMethod = continueMethod_MfaOtpEnrollmentQr;
  export const tryAnotherMethod = tryAnotherMethod_MfaOtpEnrollmentQr;
}

import { useMfaPhoneChallenge as useMfaPhoneChallenge_MfaPhoneChallenge, useScreen as useScreen_MfaPhoneChallenge, useTransaction as useTransaction_MfaPhoneChallenge, continueMethod as continueMethod_MfaPhoneChallenge, pickPhone as pickPhone_MfaPhoneChallenge, tryAnotherMethod as tryAnotherMethod_MfaPhoneChallenge } from './screens/mfa-phone-challenge';
export namespace MfaPhoneChallenge {
  export const useMfaPhoneChallenge = useMfaPhoneChallenge_MfaPhoneChallenge;
  export const useScreen = useScreen_MfaPhoneChallenge;
  export const useTransaction = useTransaction_MfaPhoneChallenge;
  export const continueMethod = continueMethod_MfaPhoneChallenge;
  export const pickPhone = pickPhone_MfaPhoneChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaPhoneChallenge;
}

import { useMfaPhoneEnrollment as useMfaPhoneEnrollment_MfaPhoneEnrollment, useScreen as useScreen_MfaPhoneEnrollment, useTransaction as useTransaction_MfaPhoneEnrollment, pickCountryCode as pickCountryCode_MfaPhoneEnrollment, continueEnrollment as continueEnrollment_MfaPhoneEnrollment, tryAnotherMethod as tryAnotherMethod_MfaPhoneEnrollment } from './screens/mfa-phone-enrollment';
export namespace MfaPhoneEnrollment {
  export const useMfaPhoneEnrollment = useMfaPhoneEnrollment_MfaPhoneEnrollment;
  export const useScreen = useScreen_MfaPhoneEnrollment;
  export const useTransaction = useTransaction_MfaPhoneEnrollment;
  export const pickCountryCode = pickCountryCode_MfaPhoneEnrollment;
  export const continueEnrollment = continueEnrollment_MfaPhoneEnrollment;
  export const tryAnotherMethod = tryAnotherMethod_MfaPhoneEnrollment;
}

import { usePollingManager as useMfaPushChallengePush_MfaPushChallengePush, useScreen as useScreen_MfaPushChallengePush, useTransaction as useTransaction_MfaPushChallengePush, continueMethod as continueMethod_MfaPushChallengePush, resendPushNotification as resendPushNotification_MfaPushChallengePush, enterCodeManually as enterCodeManually_MfaPushChallengePush, tryAnotherMethod as tryAnotherMethod_MfaPushChallengePush } from './screens/mfa-push-challenge-push';
export namespace MfaPushChallengePush {
  export const useMfaPushChallengePush = useMfaPushChallengePush_MfaPushChallengePush;
  export const useScreen = useScreen_MfaPushChallengePush;
  export const useTransaction = useTransaction_MfaPushChallengePush;
  export const continueMethod = continueMethod_MfaPushChallengePush;
  export const resendPushNotification = resendPushNotification_MfaPushChallengePush;
  export const enterCodeManually = enterCodeManually_MfaPushChallengePush;
  export const tryAnotherMethod = tryAnotherMethod_MfaPushChallengePush;
}

import { useMfaPushEnrollmentQr as useMfaPushEnrollmentQr_MfaPushEnrollmentQr, useScreen as useScreen_MfaPushEnrollmentQr, useTransaction as useTransaction_MfaPushEnrollmentQr, pickAuthenticator as pickAuthenticator_MfaPushEnrollmentQr } from './screens/mfa-push-enrollment-qr';
export namespace MfaPushEnrollmentQr {
  export const useMfaPushEnrollmentQr = useMfaPushEnrollmentQr_MfaPushEnrollmentQr;
  export const useScreen = useScreen_MfaPushEnrollmentQr;
  export const useTransaction = useTransaction_MfaPushEnrollmentQr;
  export const pickAuthenticator = pickAuthenticator_MfaPushEnrollmentQr;
}

import { useMfaPushList as useMfaPushList_MfaPushList, useScreen as useScreen_MfaPushList, useTransaction as useTransaction_MfaPushList, selectMfaPushDevice as selectMfaPushDevice_MfaPushList, goBack as goBack_MfaPushList } from './screens/mfa-push-list';
export namespace MfaPushList {
  export const useMfaPushList = useMfaPushList_MfaPushList;
  export const useScreen = useScreen_MfaPushList;
  export const useTransaction = useTransaction_MfaPushList;
  export const selectMfaPushDevice = selectMfaPushDevice_MfaPushList;
  export const goBack = goBack_MfaPushList;
}

import { useMfaPushWelcome as useMfaPushWelcome_MfaPushWelcome, useScreen as useScreen_MfaPushWelcome, useTransaction as useTransaction_MfaPushWelcome, enroll as enroll_MfaPushWelcome, pickAuthenticator as pickAuthenticator_MfaPushWelcome } from './screens/mfa-push-welcome';
export namespace MfaPushWelcome {
  export const useMfaPushWelcome = useMfaPushWelcome_MfaPushWelcome;
  export const useScreen = useScreen_MfaPushWelcome;
  export const useTransaction = useTransaction_MfaPushWelcome;
  export const enroll = enroll_MfaPushWelcome;
  export const pickAuthenticator = pickAuthenticator_MfaPushWelcome;
}

import { useMfaRecoveryCodeChallengeNewCode as useMfaRecoveryCodeChallengeNewCode_MfaRecoveryCodeChallengeNewCode, useScreen as useScreen_MfaRecoveryCodeChallengeNewCode, useTransaction as useTransaction_MfaRecoveryCodeChallengeNewCode, continueMethod as continueMethod_MfaRecoveryCodeChallengeNewCode } from './screens/mfa-recovery-code-challenge-new-code';
export namespace MfaRecoveryCodeChallengeNewCode {
  export const useMfaRecoveryCodeChallengeNewCode = useMfaRecoveryCodeChallengeNewCode_MfaRecoveryCodeChallengeNewCode;
  export const useScreen = useScreen_MfaRecoveryCodeChallengeNewCode;
  export const useTransaction = useTransaction_MfaRecoveryCodeChallengeNewCode;
  export const continueMethod = continueMethod_MfaRecoveryCodeChallengeNewCode;
}

import { useMfaRecoveryCodeChallenge as useMfaRecoveryCodeChallenge_MfaRecoveryCodeChallenge, useScreen as useScreen_MfaRecoveryCodeChallenge, useTransaction as useTransaction_MfaRecoveryCodeChallenge, continueMethod as continueMethod_MfaRecoveryCodeChallenge, tryAnotherMethod as tryAnotherMethod_MfaRecoveryCodeChallenge } from './screens/mfa-recovery-code-challenge';
export namespace MfaRecoveryCodeChallenge {
  export const useMfaRecoveryCodeChallenge = useMfaRecoveryCodeChallenge_MfaRecoveryCodeChallenge;
  export const useScreen = useScreen_MfaRecoveryCodeChallenge;
  export const useTransaction = useTransaction_MfaRecoveryCodeChallenge;
  export const continueMethod = continueMethod_MfaRecoveryCodeChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaRecoveryCodeChallenge;
}

import { useMfaRecoveryCodeEnrollment as useMfaRecoveryCodeEnrollment_MfaRecoveryCodeEnrollment, useScreen as useScreen_MfaRecoveryCodeEnrollment, useTransaction as useTransaction_MfaRecoveryCodeEnrollment, continueMethod as continueMethod_MfaRecoveryCodeEnrollment } from './screens/mfa-recovery-code-enrollment';
export namespace MfaRecoveryCodeEnrollment {
  export const useMfaRecoveryCodeEnrollment = useMfaRecoveryCodeEnrollment_MfaRecoveryCodeEnrollment;
  export const useScreen = useScreen_MfaRecoveryCodeEnrollment;
  export const useTransaction = useTransaction_MfaRecoveryCodeEnrollment;
  export const continueMethod = continueMethod_MfaRecoveryCodeEnrollment;
}

import { useMfaSmsChallenge as useMfaSmsChallenge_MfaSmsChallenge, useScreen as useScreen_MfaSmsChallenge, useTransaction as useTransaction_MfaSmsChallenge, continueMfaSmsChallenge as continueMfaSmsChallenge_MfaSmsChallenge, pickSms as pickSms_MfaSmsChallenge, resendCode as resendCode_MfaSmsChallenge, tryAnotherMethod as tryAnotherMethod_MfaSmsChallenge, getACall as getACall_MfaSmsChallenge } from './screens/mfa-sms-challenge';
export namespace MfaSmsChallenge {
  export const useMfaSmsChallenge = useMfaSmsChallenge_MfaSmsChallenge;
  export const useScreen = useScreen_MfaSmsChallenge;
  export const useTransaction = useTransaction_MfaSmsChallenge;
  export const continueMfaSmsChallenge = continueMfaSmsChallenge_MfaSmsChallenge;
  export const pickSms = pickSms_MfaSmsChallenge;
  export const resendCode = resendCode_MfaSmsChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaSmsChallenge;
  export const getACall = getACall_MfaSmsChallenge;
}

import { useMfaSmsEnrollment as useMfaSmsEnrollment_MfaSmsEnrollment, useScreen as useScreen_MfaSmsEnrollment, useTransaction as useTransaction_MfaSmsEnrollment, pickCountryCode as pickCountryCode_MfaSmsEnrollment, continueEnrollment as continueEnrollment_MfaSmsEnrollment, tryAnotherMethod as tryAnotherMethod_MfaSmsEnrollment } from './screens/mfa-sms-enrollment';
export namespace MfaSmsEnrollment {
  export const useMfaSmsEnrollment = useMfaSmsEnrollment_MfaSmsEnrollment;
  export const useScreen = useScreen_MfaSmsEnrollment;
  export const useTransaction = useTransaction_MfaSmsEnrollment;
  export const pickCountryCode = pickCountryCode_MfaSmsEnrollment;
  export const continueEnrollment = continueEnrollment_MfaSmsEnrollment;
  export const tryAnotherMethod = tryAnotherMethod_MfaSmsEnrollment;
}

import { useMfaSmsList as useMfaSmsList_MfaSmsList, useScreen as useScreen_MfaSmsList, useTransaction as useTransaction_MfaSmsList, selectPhoneNumber as selectPhoneNumber_MfaSmsList, backAction as backAction_MfaSmsList } from './screens/mfa-sms-list';
export namespace MfaSmsList {
  export const useMfaSmsList = useMfaSmsList_MfaSmsList;
  export const useScreen = useScreen_MfaSmsList;
  export const useTransaction = useTransaction_MfaSmsList;
  export const selectPhoneNumber = selectPhoneNumber_MfaSmsList;
  export const backAction = backAction_MfaSmsList;
}

import { useMfaVoiceChallenge as useMfaVoiceChallenge_MfaVoiceChallenge, useScreen as useScreen_MfaVoiceChallenge, useTransaction as useTransaction_MfaVoiceChallenge, continueMethod as continueMethod_MfaVoiceChallenge, pickPhone as pickPhone_MfaVoiceChallenge, switchToSms as switchToSms_MfaVoiceChallenge, resendCode as resendCode_MfaVoiceChallenge, tryAnotherMethod as tryAnotherMethod_MfaVoiceChallenge } from './screens/mfa-voice-challenge';
export namespace MfaVoiceChallenge {
  export const useMfaVoiceChallenge = useMfaVoiceChallenge_MfaVoiceChallenge;
  export const useScreen = useScreen_MfaVoiceChallenge;
  export const useTransaction = useTransaction_MfaVoiceChallenge;
  export const continueMethod = continueMethod_MfaVoiceChallenge;
  export const pickPhone = pickPhone_MfaVoiceChallenge;
  export const switchToSms = switchToSms_MfaVoiceChallenge;
  export const resendCode = resendCode_MfaVoiceChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaVoiceChallenge;
}

import { useMfaVoiceEnrollment as useMfaVoiceEnrollment_MfaVoiceEnrollment, useScreen as useScreen_MfaVoiceEnrollment, useTransaction as useTransaction_MfaVoiceEnrollment, continueMethod as continueMethod_MfaVoiceEnrollment, tryAnotherMethod as tryAnotherMethod_MfaVoiceEnrollment, selectPhoneCountryCode as selectPhoneCountryCode_MfaVoiceEnrollment } from './screens/mfa-voice-enrollment';
export namespace MfaVoiceEnrollment {
  export const useMfaVoiceEnrollment = useMfaVoiceEnrollment_MfaVoiceEnrollment;
  export const useScreen = useScreen_MfaVoiceEnrollment;
  export const useTransaction = useTransaction_MfaVoiceEnrollment;
  export const continueMethod = continueMethod_MfaVoiceEnrollment;
  export const tryAnotherMethod = tryAnotherMethod_MfaVoiceEnrollment;
  export const selectPhoneCountryCode = selectPhoneCountryCode_MfaVoiceEnrollment;
}

import { useMfaWebAuthnChangeKeyNickname as useMfaWebAuthnChangeKeyNickname_MfaWebauthnChangeKeyNickname, useScreen as useScreen_MfaWebauthnChangeKeyNickname, useTransaction as useTransaction_MfaWebauthnChangeKeyNickname, continueWithNewNickname as continueWithNewNickname_MfaWebauthnChangeKeyNickname } from './screens/mfa-webauthn-change-key-nickname';
export namespace MfaWebauthnChangeKeyNickname {
  export const useMfaWebAuthnChangeKeyNickname = useMfaWebAuthnChangeKeyNickname_MfaWebauthnChangeKeyNickname;
  export const useScreen = useScreen_MfaWebauthnChangeKeyNickname;
  export const useTransaction = useTransaction_MfaWebauthnChangeKeyNickname;
  export const continueWithNewNickname = continueWithNewNickname_MfaWebauthnChangeKeyNickname;
}

import { useMfaWebAuthnEnrollmentSuccess as useMfaWebAuthnEnrollmentSuccess_MfaWebauthnEnrollmentSuccess, useScreen as useScreen_MfaWebauthnEnrollmentSuccess, useTransaction as useTransaction_MfaWebauthnEnrollmentSuccess, continueMethod as continueMethod_MfaWebauthnEnrollmentSuccess } from './screens/mfa-webauthn-enrollment-success';
export namespace MfaWebauthnEnrollmentSuccess {
  export const useMfaWebAuthnEnrollmentSuccess = useMfaWebAuthnEnrollmentSuccess_MfaWebauthnEnrollmentSuccess;
  export const useScreen = useScreen_MfaWebauthnEnrollmentSuccess;
  export const useTransaction = useTransaction_MfaWebauthnEnrollmentSuccess;
  export const continueMethod = continueMethod_MfaWebauthnEnrollmentSuccess;
}

import { useMfaWebAuthnError as useMfaWebAuthnError_MfaWebauthnError, useScreen as useScreen_MfaWebauthnError, useTransaction as useTransaction_MfaWebauthnError, tryAgain as tryAgain_MfaWebauthnError, usePassword as usePassword_MfaWebauthnError, tryAnotherMethod as tryAnotherMethod_MfaWebauthnError, noThanks as noThanks_MfaWebauthnError } from './screens/mfa-webauthn-error';
export namespace MfaWebauthnError {
  export const useMfaWebAuthnError = useMfaWebAuthnError_MfaWebauthnError;
  export const useScreen = useScreen_MfaWebauthnError;
  export const useTransaction = useTransaction_MfaWebauthnError;
  export const tryAgain = tryAgain_MfaWebauthnError;
  export const usePassword = usePassword_MfaWebauthnError;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnError;
  export const noThanks = noThanks_MfaWebauthnError;
}

import { useMfaWebAuthnNotAvailableError as useMfaWebAuthnNotAvailableError_MfaWebauthnNotAvailableError, useScreen as useScreen_MfaWebauthnNotAvailableError, useTransaction as useTransaction_MfaWebauthnNotAvailableError, tryAnotherMethod as tryAnotherMethod_MfaWebauthnNotAvailableError } from './screens/mfa-webauthn-not-available-error';
export namespace MfaWebauthnNotAvailableError {
  export const useMfaWebAuthnNotAvailableError = useMfaWebAuthnNotAvailableError_MfaWebauthnNotAvailableError;
  export const useScreen = useScreen_MfaWebauthnNotAvailableError;
  export const useTransaction = useTransaction_MfaWebauthnNotAvailableError;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnNotAvailableError;
}

import { useMfaWebAuthnPlatformChallenge as useMfaWebAuthnPlatformChallenge_MfaWebauthnPlatformChallenge, useScreen as useScreen_MfaWebauthnPlatformChallenge, useTransaction as useTransaction_MfaWebauthnPlatformChallenge, verify as verify_MfaWebauthnPlatformChallenge, reportBrowserError as reportBrowserError_MfaWebauthnPlatformChallenge, tryAnotherMethod as tryAnotherMethod_MfaWebauthnPlatformChallenge } from './screens/mfa-webauthn-platform-challenge';
export namespace MfaWebauthnPlatformChallenge {
  export const useMfaWebAuthnPlatformChallenge = useMfaWebAuthnPlatformChallenge_MfaWebauthnPlatformChallenge;
  export const useScreen = useScreen_MfaWebauthnPlatformChallenge;
  export const useTransaction = useTransaction_MfaWebauthnPlatformChallenge;
  export const verify = verify_MfaWebauthnPlatformChallenge;
  export const reportBrowserError = reportBrowserError_MfaWebauthnPlatformChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnPlatformChallenge;
}

import { useMfaWebAuthnPlatformEnrollment as useMfaWebAuthnPlatformEnrollment_MfaWebauthnPlatformEnrollment, useScreen as useScreen_MfaWebauthnPlatformEnrollment, useTransaction as useTransaction_MfaWebauthnPlatformEnrollment, submitPasskeyCredential as submitPasskeyCredential_MfaWebauthnPlatformEnrollment, reportBrowserError as reportBrowserError_MfaWebauthnPlatformEnrollment, snoozeEnrollment as snoozeEnrollment_MfaWebauthnPlatformEnrollment, refuseEnrollmentOnThisDevice as refuseEnrollmentOnThisDevice_MfaWebauthnPlatformEnrollment } from './screens/mfa-webauthn-platform-enrollment';
export namespace MfaWebauthnPlatformEnrollment {
  export const useMfaWebAuthnPlatformEnrollment = useMfaWebAuthnPlatformEnrollment_MfaWebauthnPlatformEnrollment;
  export const useScreen = useScreen_MfaWebauthnPlatformEnrollment;
  export const useTransaction = useTransaction_MfaWebauthnPlatformEnrollment;
  export const submitPasskeyCredential = submitPasskeyCredential_MfaWebauthnPlatformEnrollment;
  export const reportBrowserError = reportBrowserError_MfaWebauthnPlatformEnrollment;
  export const snoozeEnrollment = snoozeEnrollment_MfaWebauthnPlatformEnrollment;
  export const refuseEnrollmentOnThisDevice = refuseEnrollmentOnThisDevice_MfaWebauthnPlatformEnrollment;
}

import { useMfaWebAuthnRoamingChallenge as useMfaWebAuthnRoamingChallenge_MfaWebauthnRoamingChallenge, useScreen as useScreen_MfaWebauthnRoamingChallenge, useTransaction as useTransaction_MfaWebauthnRoamingChallenge, verify as verify_MfaWebauthnRoamingChallenge, reportWebAuthnError as reportWebAuthnError_MfaWebauthnRoamingChallenge, tryAnotherMethod as tryAnotherMethod_MfaWebauthnRoamingChallenge } from './screens/mfa-webauthn-roaming-challenge';
export namespace MfaWebauthnRoamingChallenge {
  export const useMfaWebAuthnRoamingChallenge = useMfaWebAuthnRoamingChallenge_MfaWebauthnRoamingChallenge;
  export const useScreen = useScreen_MfaWebauthnRoamingChallenge;
  export const useTransaction = useTransaction_MfaWebauthnRoamingChallenge;
  export const verify = verify_MfaWebauthnRoamingChallenge;
  export const reportWebAuthnError = reportWebAuthnError_MfaWebauthnRoamingChallenge;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnRoamingChallenge;
}

import { useMfaWebAuthnRoamingEnrollment as useMfaWebAuthnRoamingEnrollment_MfaWebauthnRoamingEnrollment, useScreen as useScreen_MfaWebauthnRoamingEnrollment, useTransaction as useTransaction_MfaWebauthnRoamingEnrollment, enroll as enroll_MfaWebauthnRoamingEnrollment, showError as showError_MfaWebauthnRoamingEnrollment, tryAnotherMethod as tryAnotherMethod_MfaWebauthnRoamingEnrollment } from './screens/mfa-webauthn-roaming-enrollment';
export namespace MfaWebauthnRoamingEnrollment {
  export const useMfaWebAuthnRoamingEnrollment = useMfaWebAuthnRoamingEnrollment_MfaWebauthnRoamingEnrollment;
  export const useScreen = useScreen_MfaWebauthnRoamingEnrollment;
  export const useTransaction = useTransaction_MfaWebauthnRoamingEnrollment;
  export const enroll = enroll_MfaWebauthnRoamingEnrollment;
  export const showError = showError_MfaWebauthnRoamingEnrollment;
  export const tryAnotherMethod = tryAnotherMethod_MfaWebauthnRoamingEnrollment;
}

import { useOrganizationPicker as useOrganizationPicker_OrganizationPicker, useScreen as useScreen_OrganizationPicker, useTransaction as useTransaction_OrganizationPicker, selectOrganization as selectOrganization_OrganizationPicker, skipOrganizationSelection as skipOrganizationSelection_OrganizationPicker } from './screens/organization-picker';
export namespace OrganizationPicker {
  export const useOrganizationPicker = useOrganizationPicker_OrganizationPicker;
  export const useScreen = useScreen_OrganizationPicker;
  export const useTransaction = useTransaction_OrganizationPicker;
  export const selectOrganization = selectOrganization_OrganizationPicker;
  export const skipOrganizationSelection = skipOrganizationSelection_OrganizationPicker;
}

import { useOrganizationSelection as useOrganizationSelection_OrganizationSelection, useScreen as useScreen_OrganizationSelection, useTransaction as useTransaction_OrganizationSelection, continueWithOrganizationName as continueWithOrganizationName_OrganizationSelection } from './screens/organization-selection';
export namespace OrganizationSelection {
  export const useOrganizationSelection = useOrganizationSelection_OrganizationSelection;
  export const useScreen = useScreen_OrganizationSelection;
  export const useTransaction = useTransaction_OrganizationSelection;
  export const continueWithOrganizationName = continueWithOrganizationName_OrganizationSelection;
}

import { usePasskeyEnrollmentLocal as usePasskeyEnrollmentLocal_PasskeyEnrollmentLocal, useScreen as useScreen_PasskeyEnrollmentLocal, useTransaction as useTransaction_PasskeyEnrollmentLocal, continuePasskeyEnrollment as continuePasskeyEnrollment_PasskeyEnrollmentLocal, abortPasskeyEnrollment as abortPasskeyEnrollment_PasskeyEnrollmentLocal } from './screens/passkey-enrollment-local';
export namespace PasskeyEnrollmentLocal {
  export const usePasskeyEnrollmentLocal = usePasskeyEnrollmentLocal_PasskeyEnrollmentLocal;
  export const useScreen = useScreen_PasskeyEnrollmentLocal;
  export const useTransaction = useTransaction_PasskeyEnrollmentLocal;
  export const continuePasskeyEnrollment = continuePasskeyEnrollment_PasskeyEnrollmentLocal;
  export const abortPasskeyEnrollment = abortPasskeyEnrollment_PasskeyEnrollmentLocal;
}

import { usePasskeyEnrollment as usePasskeyEnrollment_PasskeyEnrollment, useScreen as useScreen_PasskeyEnrollment, useTransaction as useTransaction_PasskeyEnrollment, continuePasskeyEnrollment as continuePasskeyEnrollment_PasskeyEnrollment, abortPasskeyEnrollment as abortPasskeyEnrollment_PasskeyEnrollment } from './screens/passkey-enrollment';
export namespace PasskeyEnrollment {
  export const usePasskeyEnrollment = usePasskeyEnrollment_PasskeyEnrollment;
  export const useScreen = useScreen_PasskeyEnrollment;
  export const useTransaction = useTransaction_PasskeyEnrollment;
  export const continuePasskeyEnrollment = continuePasskeyEnrollment_PasskeyEnrollment;
  export const abortPasskeyEnrollment = abortPasskeyEnrollment_PasskeyEnrollment;
}

import { usePhoneIdentifierChallenge as usePhoneIdentifierChallenge_PhoneIdentifierChallenge, useScreen as useScreen_PhoneIdentifierChallenge, useTransaction as useTransaction_PhoneIdentifierChallenge, submitPhoneChallenge as submitPhoneChallenge_PhoneIdentifierChallenge, resendCode as resendCode_PhoneIdentifierChallenge, returnToPrevious as returnToPrevious_PhoneIdentifierChallenge } from './screens/phone-identifier-challenge';
export namespace PhoneIdentifierChallenge {
  export const usePhoneIdentifierChallenge = usePhoneIdentifierChallenge_PhoneIdentifierChallenge;
  export const useScreen = useScreen_PhoneIdentifierChallenge;
  export const useTransaction = useTransaction_PhoneIdentifierChallenge;
  export const submitPhoneChallenge = submitPhoneChallenge_PhoneIdentifierChallenge;
  export const resendCode = resendCode_PhoneIdentifierChallenge;
  export const returnToPrevious = returnToPrevious_PhoneIdentifierChallenge;
}

import { usePhoneIdentifierEnrollment as usePhoneIdentifierEnrollment_PhoneIdentifierEnrollment, useScreen as useScreen_PhoneIdentifierEnrollment, useTransaction as useTransaction_PhoneIdentifierEnrollment, continuePhoneEnrollment as continuePhoneEnrollment_PhoneIdentifierEnrollment, returnToPrevious as returnToPrevious_PhoneIdentifierEnrollment } from './screens/phone-identifier-enrollment';
export namespace PhoneIdentifierEnrollment {
  export const usePhoneIdentifierEnrollment = usePhoneIdentifierEnrollment_PhoneIdentifierEnrollment;
  export const useScreen = useScreen_PhoneIdentifierEnrollment;
  export const useTransaction = useTransaction_PhoneIdentifierEnrollment;
  export const continuePhoneEnrollment = continuePhoneEnrollment_PhoneIdentifierEnrollment;
  export const returnToPrevious = returnToPrevious_PhoneIdentifierEnrollment;
}

import { useRedeemTicket as useRedeemTicket_RedeemTicket, useScreen as useScreen_RedeemTicket, useTransaction as useTransaction_RedeemTicket, continueMethod as continueMethod_RedeemTicket } from './screens/redeem-ticket';
export namespace RedeemTicket {
  export const useRedeemTicket = useRedeemTicket_RedeemTicket;
  export const useScreen = useScreen_RedeemTicket;
  export const useTransaction = useTransaction_RedeemTicket;
  export const continueMethod = continueMethod_RedeemTicket;
}

import { useResetPasswordEmail as useResetPasswordEmail_ResetPasswordEmail, useScreen as useScreen_ResetPasswordEmail, useTransaction as useTransaction_ResetPasswordEmail, resendEmail as resendEmail_ResetPasswordEmail } from './screens/reset-password-email';
export namespace ResetPasswordEmail {
  export const useResetPasswordEmail = useResetPasswordEmail_ResetPasswordEmail;
  export const useScreen = useScreen_ResetPasswordEmail;
  export const useTransaction = useTransaction_ResetPasswordEmail;
  export const resendEmail = resendEmail_ResetPasswordEmail;
}

import { useResetPasswordError as useResetPasswordError_ResetPasswordError, useScreen as useScreen_ResetPasswordError, useTransaction as useTransaction_ResetPasswordError } from './screens/reset-password-error';
export namespace ResetPasswordError {
  export const useResetPasswordError = useResetPasswordError_ResetPasswordError;
  export const useScreen = useScreen_ResetPasswordError;
  export const useTransaction = useTransaction_ResetPasswordError;
}

import { useResetPasswordMfaEmailChallenge as useResetPasswordMfaEmailChallenge_ResetPasswordMfaEmailChallenge, useScreen as useScreen_ResetPasswordMfaEmailChallenge, useTransaction as useTransaction_ResetPasswordMfaEmailChallenge, continueMethod as continueMethod_ResetPasswordMfaEmailChallenge, resendCode as resendCode_ResetPasswordMfaEmailChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaEmailChallenge } from './screens/reset-password-mfa-email-challenge';
export namespace ResetPasswordMfaEmailChallenge {
  export const useResetPasswordMfaEmailChallenge = useResetPasswordMfaEmailChallenge_ResetPasswordMfaEmailChallenge;
  export const useScreen = useScreen_ResetPasswordMfaEmailChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaEmailChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaEmailChallenge;
  export const resendCode = resendCode_ResetPasswordMfaEmailChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaEmailChallenge;
}

import { useResetPasswordMfaOtpChallenge as useResetPasswordMfaOtpChallenge_ResetPasswordMfaOtpChallenge, useScreen as useScreen_ResetPasswordMfaOtpChallenge, useTransaction as useTransaction_ResetPasswordMfaOtpChallenge, continueMethod as continueMethod_ResetPasswordMfaOtpChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaOtpChallenge } from './screens/reset-password-mfa-otp-challenge';
export namespace ResetPasswordMfaOtpChallenge {
  export const useResetPasswordMfaOtpChallenge = useResetPasswordMfaOtpChallenge_ResetPasswordMfaOtpChallenge;
  export const useScreen = useScreen_ResetPasswordMfaOtpChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaOtpChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaOtpChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaOtpChallenge;
}

import { useResetPasswordMfaPhoneChallenge as useResetPasswordMfaPhoneChallenge_ResetPasswordMfaPhoneChallenge, useScreen as useScreen_ResetPasswordMfaPhoneChallenge, useTransaction as useTransaction_ResetPasswordMfaPhoneChallenge, continueMethod as continueMethod_ResetPasswordMfaPhoneChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaPhoneChallenge } from './screens/reset-password-mfa-phone-challenge';
export namespace ResetPasswordMfaPhoneChallenge {
  export const useResetPasswordMfaPhoneChallenge = useResetPasswordMfaPhoneChallenge_ResetPasswordMfaPhoneChallenge;
  export const useScreen = useScreen_ResetPasswordMfaPhoneChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaPhoneChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaPhoneChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaPhoneChallenge;
}

import { usePushPollingManager as useResetPasswordMfaPushChallengePush_ResetPasswordMfaPushChallengePush, useScreen as useScreen_ResetPasswordMfaPushChallengePush, useTransaction as useTransaction_ResetPasswordMfaPushChallengePush, continueMethod as continueMethod_ResetPasswordMfaPushChallengePush, resendPushNotification as resendPushNotification_ResetPasswordMfaPushChallengePush, enterCodeManually as enterCodeManually_ResetPasswordMfaPushChallengePush, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaPushChallengePush } from './screens/reset-password-mfa-push-challenge-push';
export namespace ResetPasswordMfaPushChallengePush {
  export const useResetPasswordMfaPushChallengePush = useResetPasswordMfaPushChallengePush_ResetPasswordMfaPushChallengePush;
  export const useScreen = useScreen_ResetPasswordMfaPushChallengePush;
  export const useTransaction = useTransaction_ResetPasswordMfaPushChallengePush;
  export const continueMethod = continueMethod_ResetPasswordMfaPushChallengePush;
  export const resendPushNotification = resendPushNotification_ResetPasswordMfaPushChallengePush;
  export const enterCodeManually = enterCodeManually_ResetPasswordMfaPushChallengePush;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaPushChallengePush;
}

import { useResetPasswordMfaRecoveryCodeChallenge as useResetPasswordMfaRecoveryCodeChallenge_ResetPasswordMfaRecoveryCodeChallenge, useScreen as useScreen_ResetPasswordMfaRecoveryCodeChallenge, useTransaction as useTransaction_ResetPasswordMfaRecoveryCodeChallenge, continueMethod as continueMethod_ResetPasswordMfaRecoveryCodeChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaRecoveryCodeChallenge } from './screens/reset-password-mfa-recovery-code-challenge';
export namespace ResetPasswordMfaRecoveryCodeChallenge {
  export const useResetPasswordMfaRecoveryCodeChallenge = useResetPasswordMfaRecoveryCodeChallenge_ResetPasswordMfaRecoveryCodeChallenge;
  export const useScreen = useScreen_ResetPasswordMfaRecoveryCodeChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaRecoveryCodeChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaRecoveryCodeChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaRecoveryCodeChallenge;
}

import { useResetPasswordMfaSmsChallenge as useResetPasswordMfaSmsChallenge_ResetPasswordMfaSmsChallenge, useScreen as useScreen_ResetPasswordMfaSmsChallenge, useTransaction as useTransaction_ResetPasswordMfaSmsChallenge, continueMfaSmsChallenge as continueMfaSmsChallenge_ResetPasswordMfaSmsChallenge, resendCode as resendCode_ResetPasswordMfaSmsChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaSmsChallenge, getACall as getACall_ResetPasswordMfaSmsChallenge } from './screens/reset-password-mfa-sms-challenge';
export namespace ResetPasswordMfaSmsChallenge {
  export const useResetPasswordMfaSmsChallenge = useResetPasswordMfaSmsChallenge_ResetPasswordMfaSmsChallenge;
  export const useScreen = useScreen_ResetPasswordMfaSmsChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaSmsChallenge;
  export const continueMfaSmsChallenge = continueMfaSmsChallenge_ResetPasswordMfaSmsChallenge;
  export const resendCode = resendCode_ResetPasswordMfaSmsChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaSmsChallenge;
  export const getACall = getACall_ResetPasswordMfaSmsChallenge;
}

import { useResetPasswordMfaVoiceChallenge as useResetPasswordMfaVoiceChallenge_ResetPasswordMfaVoiceChallenge, useScreen as useScreen_ResetPasswordMfaVoiceChallenge, useTransaction as useTransaction_ResetPasswordMfaVoiceChallenge, continueMethod as continueMethod_ResetPasswordMfaVoiceChallenge, switchToSms as switchToSms_ResetPasswordMfaVoiceChallenge, resendCode as resendCode_ResetPasswordMfaVoiceChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaVoiceChallenge } from './screens/reset-password-mfa-voice-challenge';
export namespace ResetPasswordMfaVoiceChallenge {
  export const useResetPasswordMfaVoiceChallenge = useResetPasswordMfaVoiceChallenge_ResetPasswordMfaVoiceChallenge;
  export const useScreen = useScreen_ResetPasswordMfaVoiceChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaVoiceChallenge;
  export const continueMethod = continueMethod_ResetPasswordMfaVoiceChallenge;
  export const switchToSms = switchToSms_ResetPasswordMfaVoiceChallenge;
  export const resendCode = resendCode_ResetPasswordMfaVoiceChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaVoiceChallenge;
}

import { useResetPasswordMfaWebAuthnPlatformChallenge as useResetPasswordMfaWebAuthnPlatformChallenge_ResetPasswordMfaWebauthnPlatformChallenge, useScreen as useScreen_ResetPasswordMfaWebauthnPlatformChallenge, useTransaction as useTransaction_ResetPasswordMfaWebauthnPlatformChallenge, continueWithPasskey as continueWithPasskey_ResetPasswordMfaWebauthnPlatformChallenge, reportBrowserError as reportBrowserError_ResetPasswordMfaWebauthnPlatformChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaWebauthnPlatformChallenge } from './screens/reset-password-mfa-webauthn-platform-challenge';
export namespace ResetPasswordMfaWebauthnPlatformChallenge {
  export const useResetPasswordMfaWebAuthnPlatformChallenge = useResetPasswordMfaWebAuthnPlatformChallenge_ResetPasswordMfaWebauthnPlatformChallenge;
  export const useScreen = useScreen_ResetPasswordMfaWebauthnPlatformChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaWebauthnPlatformChallenge;
  export const continueWithPasskey = continueWithPasskey_ResetPasswordMfaWebauthnPlatformChallenge;
  export const reportBrowserError = reportBrowserError_ResetPasswordMfaWebauthnPlatformChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaWebauthnPlatformChallenge;
}

import { useResetPasswordMfaWebAuthnRoamingChallenge as useResetPasswordMfaWebAuthnRoamingChallenge_ResetPasswordMfaWebauthnRoamingChallenge, useScreen as useScreen_ResetPasswordMfaWebauthnRoamingChallenge, useTransaction as useTransaction_ResetPasswordMfaWebauthnRoamingChallenge, useSecurityKey as useSecurityKey_ResetPasswordMfaWebauthnRoamingChallenge, showError as showError_ResetPasswordMfaWebauthnRoamingChallenge, tryAnotherMethod as tryAnotherMethod_ResetPasswordMfaWebauthnRoamingChallenge } from './screens/reset-password-mfa-webauthn-roaming-challenge';
export namespace ResetPasswordMfaWebauthnRoamingChallenge {
  export const useResetPasswordMfaWebAuthnRoamingChallenge = useResetPasswordMfaWebAuthnRoamingChallenge_ResetPasswordMfaWebauthnRoamingChallenge;
  export const useScreen = useScreen_ResetPasswordMfaWebauthnRoamingChallenge;
  export const useTransaction = useTransaction_ResetPasswordMfaWebauthnRoamingChallenge;
  export const useSecurityKey = useSecurityKey_ResetPasswordMfaWebauthnRoamingChallenge;
  export const showError = showError_ResetPasswordMfaWebauthnRoamingChallenge;
  export const tryAnotherMethod = tryAnotherMethod_ResetPasswordMfaWebauthnRoamingChallenge;
}

import { useResetPasswordRequest as useResetPasswordRequest_ResetPasswordRequest, useScreen as useScreen_ResetPasswordRequest, useTransaction as useTransaction_ResetPasswordRequest, resetPassword as resetPassword_ResetPasswordRequest, backToLogin as backToLogin_ResetPasswordRequest } from './screens/reset-password-request';
export namespace ResetPasswordRequest {
  export const useResetPasswordRequest = useResetPasswordRequest_ResetPasswordRequest;
  export const useScreen = useScreen_ResetPasswordRequest;
  export const useTransaction = useTransaction_ResetPasswordRequest;
  export const resetPassword = resetPassword_ResetPasswordRequest;
  export const backToLogin = backToLogin_ResetPasswordRequest;
}

import { useResetPasswordSuccess as useResetPasswordSuccess_ResetPasswordSuccess, useScreen as useScreen_ResetPasswordSuccess, useTransaction as useTransaction_ResetPasswordSuccess } from './screens/reset-password-success';
export namespace ResetPasswordSuccess {
  export const useResetPasswordSuccess = useResetPasswordSuccess_ResetPasswordSuccess;
  export const useScreen = useScreen_ResetPasswordSuccess;
  export const useTransaction = useTransaction_ResetPasswordSuccess;
}

import { useResetPassword as useResetPassword_ResetPassword, useScreen as useScreen_ResetPassword, useTransaction as useTransaction_ResetPassword, resetPassword as resetPassword_ResetPassword } from './screens/reset-password';
export namespace ResetPassword {
  export const useResetPassword = useResetPassword_ResetPassword;
  export const useScreen = useScreen_ResetPassword;
  export const useTransaction = useTransaction_ResetPassword;
  export const resetPassword = resetPassword_ResetPassword;
}

import { useSignupId as useSignupId_SignupId, useScreen as useScreen_SignupId, useTransaction as useTransaction_SignupId, signup as signup_SignupId, federatedSignup as federatedSignup_SignupId, useEnabledIdentifiers as useEnabledIdentifiers_SignupId, pickCountryCode as pickCountryCode_SignupId, useUsernameValidation as useUsernameValidation_SignupId } from './screens/signup-id';
export namespace SignupId {
  export const useSignupId = useSignupId_SignupId;
  export const useScreen = useScreen_SignupId;
  export const useTransaction = useTransaction_SignupId;
  export const signup = signup_SignupId;
  export const federatedSignup = federatedSignup_SignupId;
  export const useEnabledIdentifiers = useEnabledIdentifiers_SignupId;
  export const pickCountryCode = pickCountryCode_SignupId;
  export const useUsernameValidation = useUsernameValidation_SignupId;
}

import { useSignupPassword as useSignupPassword_SignupPassword, useScreen as useScreen_SignupPassword, useTransaction as useTransaction_SignupPassword, signup as signup_SignupPassword, federatedSignup as federatedSignup_SignupPassword, usePasswordValidation as usePasswordValidation_SignupPassword } from './screens/signup-password';
export namespace SignupPassword {
  export const useSignupPassword = useSignupPassword_SignupPassword;
  export const useScreen = useScreen_SignupPassword;
  export const useTransaction = useTransaction_SignupPassword;
  export const signup = signup_SignupPassword;
  export const federatedSignup = federatedSignup_SignupPassword;
  export const usePasswordValidation = usePasswordValidation_SignupPassword;
}

import { useSignup as useSignup_Signup, useScreen as useScreen_Signup, useTransaction as useTransaction_Signup, signup as signup_Signup, federatedSignup as federatedSignup_Signup, pickCountryCode as pickCountryCode_Signup, usePasswordValidation as usePasswordValidation_Signup, useEnabledIdentifiers as useEnabledIdentifiers_Signup, useUsernameValidation as useUsernameValidation_Signup } from './screens/signup';
export namespace Signup {
  export const useSignup = useSignup_Signup;
  export const useScreen = useScreen_Signup;
  export const useTransaction = useTransaction_Signup;
  export const signup = signup_Signup;
  export const federatedSignup = federatedSignup_Signup;
  export const pickCountryCode = pickCountryCode_Signup;
  export const usePasswordValidation = usePasswordValidation_Signup;
  export const useEnabledIdentifiers = useEnabledIdentifiers_Signup;
  export const useUsernameValidation = useUsernameValidation_Signup;
}

import { useCurrentScreen as use_currentScreen, useAuth0Themes as use_Auth0Themes, useErrors as use_Errors } from '../src/hooks/common-hooks';
export namespace CommonHooks {
    export const useCurrentScreen = use_currentScreen;
    export const useAuth0Themes = use_Auth0Themes;
    export const useErrors = use_Errors;
  }
