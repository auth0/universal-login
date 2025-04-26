import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
