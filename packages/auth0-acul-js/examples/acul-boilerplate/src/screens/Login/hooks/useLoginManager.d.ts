import LoginInstance from "@auth0/auth0-acul-js/login";
export declare const useLoginManager: () => {
    loginInstance: LoginInstance;
    handleLogin: (username: string, password: string, captcha: string) => void;
    handleSocialLogin: (connectionName: string) => void;
};
