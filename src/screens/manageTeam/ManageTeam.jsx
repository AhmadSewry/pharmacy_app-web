import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
} from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  Edit as EditIcon,
  Visibility,
  VisibilityOff,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";

function ManageTeam() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5200/api/Employee");
      setRows(response.data);
    } catch (error) {
      console.error("فشل جلب البيانات:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (row) => {
    setSelectedEmployee({ ...row, password: "" });
    setShowPassword(false);
    setOpenEdit(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5200/api/Employee/${selectedEmployee.employeeID}`,
        selectedEmployee
      );
      setOpenEdit(false);
      fetchEmployees();
    } catch (error) {
      console.error("فشل التحديث:", error);
    }
  };

  const handleChange = (e) => {
    setSelectedEmployee({
      ...selectedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleDeleteClick = (row) => {
    setEmployeeToDelete(row);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5200/api/Employee/${employeeToDelete.employeeID}`);
      setOpenDeleteDialog(false);
      setEmployeeToDelete(null);
      fetchEmployees();
    } catch (error) {
      console.error("فشل حذف الموظف:", error);
    }
  };

  const columns = [
    {
      field: "employeeID",
      headerName: "ID",
      flex: 0.7,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "personName",
      headerName: "Full Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "numberOfCertificate",
      headerName: "Certificates",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hireDate",
      headerName: "Hire Date",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => dayjs(row.hireDate).format("YYYY-MM-DD"),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { role } }) => (
        <Box
          sx={{
            backgroundColor: role === "Admin" ? theme.palette.secondary.dark : "#107163",
            p: "5px",
            width: "99px",
            textAlign: "center",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {role === "Admin" && <AdminPanelSettingsOutlined sx={{ color: "white" }} fontSize="small" />}
          {role === "User" && <LockOpenOutlined sx={{ color: "white" }} fontSize="small" />}
          <Typography sx={{ fontSize: "13px", color: "white" }}>{role}</Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="تعديل الموظف">
            <IconButton onClick={() => handleEdit(row)} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف الموظف">
            <IconButton onClick={() => handleDeleteClick(row)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Box sx={{ p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.employeeID}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>

      {/* Dialog تعديل */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>تعديل بيانات الموظف</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Full Name" name="personName" value={selectedEmployee?.personName || ""} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Username" name="userName" value={selectedEmployee?.userName || ""} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Email" name="email" value={selectedEmployee?.email || ""} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Phone" name="phone" value={selectedEmployee?.phone || ""} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Certificates" name="numberOfCertificate" value={selectedEmployee?.numberOfCertificate || ""} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Role" name="role" value={selectedEmployee?.role || ""} onChange={handleChange} />
          <TextField
            fullWidth
            margin="dense"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={selectedEmployee?.password || ""}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>إلغاء</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            حفظ التعديلات
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog تأكيد الحذف */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          هل أنت متأكد أنك تريد حذف الموظف{" "}
          <strong>{employeeToDelete?.personName}</strong>؟
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            إلغاء
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageTeam;
