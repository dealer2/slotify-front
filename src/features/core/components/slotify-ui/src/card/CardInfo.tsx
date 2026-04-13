import { Card, Stack, Typography, Avatar } from "@mui/material";
import type { ReactNode } from "react";

export interface InfoCardProps {
  readonly label: string;
  readonly value: string;
  readonly icon: ReactNode;
}

export function InfoCard({ label, value, icon }: InfoCardProps) {
  return (
    <Card
      sx={{
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #E4E4E4",
        borderColor: "divider",
        boxShadow: "4px 4px 15px 0px #0000001A",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          sx={{
            width: 40,
            height: 40,
            color: "#675FDE",
            bgcolor: "#E8E7FA",
          }}
        >
          {icon}
        </Avatar>

        <Stack spacing={0.5}>
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "#646464",
              fontWeight: 400,
              fontSize: 14,
            }}
          >
            {label}
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
