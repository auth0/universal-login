import LoginIdInstance from "@auth0/auth0-acul-js/login-id";
export declare const useLoginIdManager: () => {
    loginIdInstance: LoginIdInstance;
    handleLoginId: (loginId: string, captcha?: string) => void;
    handleSocialLogin: (connectionName: string) => void;
    handlePasskeyLogin: () => void;
};
