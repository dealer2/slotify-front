import i18n from "i18next";
import { Button, Box } from "@mui/material";

const LangSwitcher = () => {
  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}>
      <Button variant="outlined" onClick={() => i18n.changeLanguage("ru")}>RU</Button>
      <Button variant="outlined" onClick={() => i18n.changeLanguage("en")}>EN</Button>
    </Box>
  );
};

export default LangSwitcher;