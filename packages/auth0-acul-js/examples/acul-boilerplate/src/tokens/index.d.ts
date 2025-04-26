/**
 * Design tokens for the application
 * This file exports all design tokens from a single location
 */
import colors from './colors';
import spacing from './spacing';
import typography from './typography';
export declare const tokens: {
    colors: {
        primary: {
            main: string;
            light: string;
            dark: string;
            contrast: string;
        };
        secondary: {
            main: string;
            light: string;
            dark: string;
            contrast: string;
        };
        text: {
            primary: string;
            secondary: string;
            disabled: string;
            hint: string;
        };
        background: {
            default: string;
            paper: string;
            disabled: string;
        };
        button: {
            primary: {
                background: string;
                text: string;
                border: string;
                hover: string;
            };
            secondary: {
                background: string;
                text: string;
                border: string;
                hover: string;
            };
        };
        form: {
            input: {
                background: string;
                text: string;
                border: string;
                focus: string;
                error: string;
            };
            label: string;
            placeholder: string;
        };
        status: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
        divider: string;
        overlay: string;
        shadow: string;
        focus: string;
        icons: string;
    };
    spacing: {
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
    typography: {
        fontFamily: {
            primary: string;
            secondary: string;
            monospace: string;
        };
        fontWeight: {
            light: string;
            regular: string;
            medium: string;
            semibold: string;
            bold: string;
        };
        fontSize: {
            xs: string;
            sm: string;
            base: string;
            lg: string;
            xl: string;
            '2xl': string;
            '3xl': string;
            '4xl': string;
        };
        lineHeight: {
            none: string;
            tight: string;
            snug: string;
            normal: string;
            relaxed: string;
            loose: string;
        };
        letterSpacing: {
            tighter: string;
            tight: string;
            normal: string;
            wide: string;
            wider: string;
            widest: string;
        };
        heading: {
            h1: {
                fontSize: string;
                fontWeight: string;
                lineHeight: string;
            };
            h2: {
                fontSize: string;
                fontWeight: string;
                lineHeight: string;
            };
            h3: {
                fontSize: string;
                fontWeight: string;
                lineHeight: string;
            };
            h4: {
                fontSize: string;
                fontWeight: string;
                lineHeight: string;
            };
            h5: {
                fontSize: string;
                fontWeight: string;
                lineHeight: string;
            };
            h6: {
                fontSize: string;
                fontWeight: string;
                lineHeight: string;
            };
        };
        button: {
            fontSize: string;
            fontWeight: string;
            lineHeight: string;
        };
        input: {
            fontSize: string;
            fontWeight: string;
            lineHeight: string;
        };
        label: {
            fontSize: string;
            fontWeight: string;
            lineHeight: string;
            letterSpacing: string;
        };
    };
};
export { colors, spacing, typography };
export default tokens;
