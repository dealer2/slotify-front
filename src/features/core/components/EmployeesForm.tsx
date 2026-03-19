// EmployeesForm.tsx
import { Box, TextField, Button, Typography, IconButton, MenuItem } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
}

interface Props {
  employees: Employee[];
  onSave: (data: Employee[]) => void;
}

const EmployeesForm = ({ employees, onSave }: Props) => {
  const [employeeList, setEmployeeList] = useState<Employee[]>(employees || []);
  const [newEmployee, setNewEmployee] = useState<Employee>({ firstName: "", lastName: "", email: "", phone: "", role: "", branch: "" });

  const handleAdd = () => {
    setEmployeeList(prev => [...prev, newEmployee]);
    setNewEmployee({ firstName: "", lastName: "", email: "", phone: "", role: "", branch: "" });
  };

  const handleDelete = (index: number) => {
    setEmployeeList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSave(employeeList);
  };

  return (
    <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>Employees</Typography>

      {employeeList.map((emp, i) => (
        <Box key={i} sx={{ mb: 1, display: "flex", alignItems: "center" }}>
          <Typography sx={{ flex: 1 }}>{emp.firstName} {emp.lastName} — {emp.role}</Typography>
          <IconButton onClick={() => handleDelete(i)}><DeleteIcon /></IconButton>
        </Box>
      ))}

      <TextField label="First Name" value={newEmployee.firstName} onChange={e => setNewEmployee(prev => ({ ...prev, firstName: e.target.value }))} fullWidth margin="dense"/>
      <TextField label="Last Name" value={newEmployee.lastName} onChange={e => setNewEmployee(prev => ({ ...prev, lastName: e.target.value }))} fullWidth margin="dense"/>
      <TextField label="Email" value={newEmployee.email} onChange={e => setNewEmployee(prev => ({ ...prev, email: e.target.value }))} fullWidth margin="dense"/>
      <TextField label="Phone" value={newEmployee.phone} onChange={e => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))} fullWidth margin="dense"/>
      <TextField label="Role" value={newEmployee.role} onChange={e => setNewEmployee(prev => ({ ...prev, role: e.target.value }))} fullWidth margin="dense"/>
      <TextField label="Branch" value={newEmployee.branch} onChange={e => setNewEmployee(prev => ({ ...prev, branch: e.target.value }))} fullWidth margin="dense"/>

      <Button sx={{ mt: 1 }} onClick={handleAdd} variant="outlined">Add Employee</Button>
      <Button sx={{ mt: 2 }} onClick={handleSubmit} variant="contained">Save Employees</Button>
    </Box>
  );
};

export default EmployeesForm;