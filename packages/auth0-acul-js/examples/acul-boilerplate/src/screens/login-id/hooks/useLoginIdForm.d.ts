export declare const useLoginIdForm: () => {
    loginIdRef: import("react").RefObject<HTMLInputElement>;
    captchaRef: import("react").RefObject<HTMLInputElement>;
    getFormValues: () => {
        loginId: string;
        captcha: string;
    };
};
