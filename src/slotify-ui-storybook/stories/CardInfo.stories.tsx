import type { Meta, StoryObj } from "@storybook/react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { InfoCard } from "../../features/core/components/slotify-ui/src/card/CardInfo";
import { Grid } from "@mui/material";

const meta: Meta<typeof InfoCard> = {
  title: "Components/InfoCard",
  component: InfoCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const Email: Story = {
  args: {
    label: "Corporate Email",
    value: "main-office-5@acmecorp2.com",
    icon: <MailOutlineIcon fontSize="small" />,
  },
};

export const Phone: Story = {
  args: {
    label: "Primary Phone",
    value: "+1(555) 923-4410",
    icon: <PhoneOutlinedIcon fontSize="small" />,
  },
};

export const Timezone: Story = {
  args: {
    label: "Base Timezone",
    value: "(PST) - UTC-8",
    icon: <AccessTimeIcon fontSize="small" />,
  },
};

export const Grouped: Story = {
  render: () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <InfoCard
          label="Corporate Email"
          value="main-office-5@acmecorp2.com"
          icon={<MailOutlineIcon fontSize="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <InfoCard
          label="Primary Phone"
          value="+1(555) 923-4410"
          icon={<PhoneOutlinedIcon fontSize="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <InfoCard
          label="Base Timezone"
          value="(PST) - UTC-8"
          icon={<AccessTimeIcon fontSize="small" />}
        />
      </Grid>
    </Grid>
  ),
};
