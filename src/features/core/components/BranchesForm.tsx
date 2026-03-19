// BranchesForm.tsx
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface Branch {
  name: string;
  address: string;
  phone: string;
  workingHours: string;
}

interface Props {
  branches: Branch[];
  onSave: (data: Branch[]) => void;
}

const BranchesForm = ({ branches, onSave }: Props) => {
  const [branchList, setBranchList] = useState<Branch[]>(branches || []);
  const [newBranch, setNewBranch] = useState<Branch>({ name: "", address: "", phone: "", workingHours: "" });

  const handleAdd = () => {
    setBranchList(prev => [...prev, newBranch]);
    setNewBranch({ name: "", address: "", phone: "", workingHours: "" });
  };

  const handleDelete = (index: number) => {
    setBranchList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSave(branchList);
  };

  return (
    <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>Branches</Typography>

      {branchList.map((branch, i) => (
        <Box key={i} sx={{ mb: 1, display: "flex", alignItems: "center" }}>
          <Typography sx={{ flex: 1 }}>{branch.name} — {branch.address}</Typography>
          <IconButton onClick={() => handleDelete(i)}><DeleteIcon /></IconButton>
        </Box>
      ))}

      <TextField label="Name" value={newBranch.name} onChange={e => setNewBranch(prev => ({ ...prev, name: e.target.value }))} fullWidth margin="dense"/>
      <TextField label="Address" value={newBranch.address} onChange={e => setNewBranch(prev => ({ ...prev, address: e.target.value }))} fullWidth margin="dense"/>
      <TextField label="Phone" value={newBranch.phone} onChange={e => setNewBranch(prev => ({ ...prev, phone: e.target.value }))} fullWidth margin="dense"/>
      <TextField label="Working Hours" value={newBranch.workingHours} onChange={e => setNewBranch(prev => ({ ...prev, workingHours: e.target.value }))} fullWidth margin="dense"/>
      <Button sx={{ mt: 1 }} onClick={handleAdd} variant="outlined">Add Branch</Button>
      <Button sx={{ mt: 2 }} onClick={handleSubmit} variant="contained">Save Branches</Button>
    </Box>
  );
};

export default BranchesForm;