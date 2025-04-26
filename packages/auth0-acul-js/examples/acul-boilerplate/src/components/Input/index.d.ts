import React, { InputHTMLAttributes } from 'react';
import './Input.css';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id: string;
    error?: string;
    showPasswordToggle?: boolean;
    icon?: React.ReactNode;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
