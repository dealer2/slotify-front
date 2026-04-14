import { Box, Card, Chip, IconButton, Stack, Typography } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { Edit } from "@mui/icons-material";
import { Button } from "../Button";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

interface BranchCardProps {
  readonly title: string;
  readonly status: string;
  readonly address: string;
  readonly onEdit?: () => void;
  readonly onMore?: () => void;
}

export function BranchCard({
  title,
  status,
  address,
  onEdit,
  onMore,
}: BranchCardProps) {
  return (
    <Card
      sx={{
        boxShadow: "4px 4px 15px 0px #0000001A",
        border: "1px solid #E4E4E4",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ flexWrap: "wrap" }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  lineHeight: "28px",
                  wordBreak: "break-word",
                  flexShrink: 1,
                }}
              >
                {title}
              </Typography>

              <Chip
                label={status}
                size="small"
                sx={{
                  backgroundColor: "#675FDE",
                  color: "#FFFFFF",
                  fontWeight: 400,
                  fontSize: "10px",
                  height: "22px",
                }}
              />
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="flex-start"
              sx={{ minWidth: 0 }}
            >
              <PlaceOutlinedIcon
                sx={{ fontSize: 20, color: "#646464", mt: "2px" }}
              />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#646464",
                  wordBreak: "break-word",
                }}
              >
                {address}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
          <Button
            variant="outlined"
            startIcon={<Edit sx={{ width: 14, height: 14 }} />}
            onClick={onEdit}
            sx={{
              border: "1px solid #D2D2D2",
              borderRadius: "10px",
              color: "#464646",
              fontSize: 10,
              fontWeight: 500,
              padding: "8px 10px",
              whiteSpace: "nowrap",
            }}
          >
            Edit Branch
          </Button>

          <IconButton
            onClick={onMore}
            sx={{
              border: "1px solid #D2D2D2",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            <MoreVertOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
