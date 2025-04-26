import React from 'react';
import Button, { ButtonProps } from './Button';

type PrimaryButtonProps = Omit<ButtonProps, 'variant'>;

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  return <Button variant="primary" {...props} />;
};

export default PrimaryButton; 