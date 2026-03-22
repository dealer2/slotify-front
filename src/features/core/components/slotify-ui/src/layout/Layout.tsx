import { styled } from "@mui/material";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { AppTopBar } from "./AppTopBar";

const Main = styled("div")({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

const Flex = styled("div")({
  display: "flex",
  flexGrow: 1,
});

const Content = styled("main")({
  flexGrow: 1,
  padding: 16,
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Main>
      <AppTopBar toggleSidebar={toggleSidebar} open={open} />

      <Flex>
        <Sidebar open={open} />

        <Content>{children}</Content>
      </Flex>
    </Main>
  );
};
