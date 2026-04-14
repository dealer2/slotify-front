import { Box } from '@mui/material';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};