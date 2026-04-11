import type { Meta, StoryObj } from "@storybook/react";
import { BranchCard } from "../../features/core/components/slotify-ui/src/card/CardBranch";

const meta: Meta<typeof BranchCard> = {
  title: "Components/BranchCard",
  component: BranchCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    status: {
      control: "text",
    },
    address: {
      control: "text",
    },
    onEdit: {
      action: "edit clicked",
    },
    onMore: {
      action: "more clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BranchCard>;

export const Default: Story = {
  args: {
    title: "Main Office 5",
    status: "Active",
    address: "7821 Innovation Way, Suite 500, Tech City, TC 94103",
  },
};

export const LongText: Story = {
  args: {
    title: "Very Long Office Name Example That Might Overflow",
    status: "Active",
    address:
      "Very long address example to test wrapping behavior in the card component UI layout",
  },
};
