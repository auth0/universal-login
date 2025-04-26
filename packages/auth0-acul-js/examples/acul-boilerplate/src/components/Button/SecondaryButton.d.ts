import React from 'react';
import { ButtonProps } from './Button';
type SecondaryButtonProps = Omit<ButtonProps, 'variant'>;
declare const SecondaryButton: React.FC<SecondaryButtonProps>;
export default SecondaryButton; 