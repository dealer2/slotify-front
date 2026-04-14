import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material";
import type { Branch } from "../api/types";

interface BranchFormProps {
  branches: Branch[];
}

const BranchForm = ({ branches }: BranchFormProps) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Branches
      </Typography>

      <Grid container spacing={2}>
        {branches.map(branch => (
          <Grid item xs={12} key={branch.id}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6">{branch.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {branch.address}, {branch.city}, {branch.postalCode}
                </Typography>
                <Typography variant="body2">
                  Phone: {branch.phone} | Email: {branch.email}
                </Typography>
                <Typography variant="body2">
                  Latitude: {branch.latitude}, Longitude: {branch.longitude}
                </Typography>
                <Typography variant="body2">
                  Country ID: {branch.countryId}
                </Typography>
                <Chip
                  label={branch.active ? "Active" : "Inactive"}
                  color={branch.active ? "success" : "default"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BranchForm;