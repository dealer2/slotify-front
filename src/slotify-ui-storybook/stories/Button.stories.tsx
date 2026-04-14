import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../features/core/components/slotify-ui/src/Button';
import { Stack } from '@mui/material';
import { Delete, Edit, ExpandMore, Settings } from '@mui/icons-material';

const startIcons = {
  undefined: undefined,
  Delete: <Delete />,
  Edit: <Edit />,
  Settings: <Settings />,
};

const endIcons = {
  undefined: undefined,
  ExpandMore: <ExpandMore />,
};

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'select' },
    },
    startIcon: {
      options: Object.keys(startIcons),
      mapping: startIcons,
      control: { type: 'select' },
    },
    endIcon: {
      options: Object.keys(endIcons),
      mapping: endIcons,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: {
    children: 'Button text',
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Button text',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    children: 'Button text',
    variant: 'text',
  },
};

export const WithStartIcon: Story = {
  args: {
    children: 'Button text',
    startIcon: <Edit />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'Button text',
    endIcon: <ExpandMore />,
  },
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button disabled>Contained</Button>
      <Button variant="outlined" disabled>
        Outlined
      </Button>
      <Button variant="text" disabled>
        Text
      </Button>
    </Stack>
  ),
};