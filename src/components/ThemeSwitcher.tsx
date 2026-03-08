import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface ThemeSwitcherProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

function ThemeSwitcher({ toggleTheme, mode }: ThemeSwitcherProps) {
  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 2000,
      }}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ThemeSwitcher;
