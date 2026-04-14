import React from "react";
import MuiButton from "@mui/material/Button";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material";

interface ButtonProps {
  children: React.ReactNode;
  variant?: MuiButtonProps["variant"];
  disabled?: boolean;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Button = ({
  children,
  variant = "contained",
  disabled = false,
  onClick,
  startIcon,
  endIcon,
  sx,
}: ButtonProps) => {
  return (
    <MuiButton
      sx={sx}
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
