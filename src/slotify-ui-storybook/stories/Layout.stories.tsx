import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from '../../features/core/components/slotify-ui/src/layout/Layout';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof Layout> = {
  title: 'Layout/MainLayout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  render: () => (
    <Layout>
      <Box>
        <Typography variant="h4">Page Content</Typography>
        <Typography>
          This is how your app content will look inside the layout.
        </Typography>
      </Box>
    </Layout>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Layout>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography>Some content here...</Typography>
        <Typography>More content...</Typography>
      </Box>
    </Layout>
  ),
};