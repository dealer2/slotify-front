import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import { useAuth } from "../../../../../../auth/AuthContext"

const drawerWidth = 240;

export const Sidebar = ({ open }: { open: boolean }) => {
  const { logout } = useAuth();

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 64,
          transition: "width 0.3s",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // кнопка Logout вниз
        },
      }}
    >
      {/* Верхний список */}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      {/* Нижняя кнопка Logout */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};