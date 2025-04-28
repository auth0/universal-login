import React, { InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id: string;
    error?: string;
    showPasswordToggle?: boolean;
    icon?: React.ReactNode;
}

declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

export type { InputProps };
export default Input;
