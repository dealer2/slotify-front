import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const AppTopBar = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
  open: boolean;
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">My App</Typography>
      </Toolbar>
    </AppBar>
  );
};