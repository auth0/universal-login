import React from 'react';
import { ButtonProps } from './Button';
type PrimaryButtonProps = Omit<ButtonProps, 'variant'>;
declare const PrimaryButton: React.FC<PrimaryButtonProps>;
export default PrimaryButton; 