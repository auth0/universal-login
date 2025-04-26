export declare const useLoginForm: () => {
    usernameRef: import("react").RefObject<HTMLInputElement>;
    passwordRef: import("react").RefObject<HTMLInputElement>;
    captchaRef: import("react").RefObject<HTMLInputElement>;
    getFormValues: () => {
        username: string;
        password: string;
        captcha: string;
    };
};
