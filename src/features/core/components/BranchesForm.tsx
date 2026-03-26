// src/pages/profile/BranchForm.tsx
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import type { Branch } from "../api/types";

interface Props {
  branches: Branch[];
  onSave: (data: Branch[]) => void;
}

const BranchForm = ({ branches, onSave }: Props) => {
  // стейт для списка филиалов
  const [branchList, setBranchList] = useState<Branch[]>(branches || []);

  // стейт для нового филиала
  const [newBranch, setNewBranch] = useState<Partial<Branch>>({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: ""
  });

  // добавление нового филиала
  const handleAdd = () => {
    setBranchList(prev => [...prev, { ...newBranch, id: Date.now().toString() } as Branch]);
    setNewBranch({ name: "", address: "", city: "", phone: "", email: "", employees: [] });
  };

  // удаление филиала
  const handleDelete = (index: number) => {
    setBranchList(prev => prev.filter((_, i) => i !== index));
  };

  // сохранение изменений
  const handleSubmit = () => {
    onSave(branchList);
  };

  return (
    <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>Branches</Typography>     

      {/* Форма для нового филиала */}
      <TextField
        label="Name"
        value={newBranch.name}
        onChange={e => setNewBranch(prev => ({ ...prev, name: e.target.value }))}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Address"
        value={newBranch.address}
        onChange={e => setNewBranch(prev => ({ ...prev, address: e.target.value }))}
        fullWidth
        margin="dense"
      />
      <TextField
        label="City"
        value={newBranch.city}
        onChange={e => setNewBranch(prev => ({ ...prev, city: e.target.value }))}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Phone"
        value={newBranch.phone}
        onChange={e => setNewBranch(prev => ({ ...prev, phone: e.target.value }))}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Email"
        value={newBranch.email}
        onChange={e => setNewBranch(prev => ({ ...prev, email: e.target.value }))}
        fullWidth
        margin="dense"
      />

      <Button sx={{ mt: 1 }} onClick={handleAdd} variant="outlined">Add Branch</Button>
      <Button sx={{ mt: 2 }} onClick={handleSubmit} variant="contained">Save Branches</Button>
    </Box>
  );
};

export default BranchForm;