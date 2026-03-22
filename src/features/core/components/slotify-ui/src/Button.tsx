import React from 'react';
import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface ButtonProps {
  children: React.ReactNode;
  variant?: MuiButtonProps['variant']; 
  disabled?: boolean;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = 'contained',
  disabled = false,
  onClick,
  startIcon,
  endIcon,
}: ButtonProps) => {
  return (
    <MuiButton
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </MuiButton>
  );
};