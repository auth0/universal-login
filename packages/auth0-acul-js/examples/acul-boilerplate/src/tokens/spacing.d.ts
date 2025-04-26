/**
 * Spacing tokens for the application
 * These tokens should be used instead of hardcoded spacing values
 */
export declare const spacing: {
    unit: number;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    button: {
        paddingX: string;
        paddingY: string;
        gap: string;
    };
    input: {
        paddingX: string;
        paddingY: string;
        marginBottom: string;
    };
    form: {
        gap: string;
        marginBottom: string;
    };
    getSpacing: (multiplier: number) => string;
};
export default spacing;
