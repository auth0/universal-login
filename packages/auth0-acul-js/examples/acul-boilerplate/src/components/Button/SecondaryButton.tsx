import React from 'react';
import Button, { ButtonProps } from './Button';

type SecondaryButtonProps = Omit<ButtonProps, 'variant'>;

const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
  return <Button variant="secondary" {...props} />;
};

export default SecondaryButton; 