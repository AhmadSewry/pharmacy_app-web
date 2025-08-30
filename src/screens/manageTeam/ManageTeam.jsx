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
  Tabs,
  Tab,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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
import { useTranslation } from "react-i18next";
import { host } from "../../App";

function ManageTeam() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(host+"/api/Employee");
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
    setTabIndex(0);
    setOpenEdit(true);
  };

  const handleChange = (e) => {
    setSelectedEmployee({
      ...selectedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setSelectedEmployee({
      ...selectedEmployee,
      role: e.target.value,
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
      await axios.delete(
        host+`/api/Employee/${employeeToDelete.employeeID}`
      );
      setOpenDeleteDialog(false);
      setEmployeeToDelete(null);
      fetchEmployees();
    } catch (error) {
      console.error("فشل حذف الموظف:", error);
    }
  };

  const handleSaveInfo = async () => {
    try {
      const updatedData = {
        employeeID: selectedEmployee.employeeID,
        personName: selectedEmployee.personName,
        userName: selectedEmployee.userName,
        email: selectedEmployee.email,
        phone: selectedEmployee.phone,
        salary: selectedEmployee.salary,
        role: selectedEmployee.role,
      };
      await axios.put(
        host+`/api/Employee/${selectedEmployee.employeeID}`,
        updatedData
      );
      setOpenEdit(false);
      fetchEmployees();
    } catch (error) {
      console.error("فشل التحديث:", error);
    }
  };

  const handleSavePassword = async () => {
    try {
      const updatedData = {
        employeeID: selectedEmployee.employeeID,
        personName: selectedEmployee.personName,
        userName: selectedEmployee.userName,
        email: selectedEmployee.email,
        phone: selectedEmployee.phone,
        salary: selectedEmployee.salary,
        role: selectedEmployee.role,
        password: selectedEmployee.password, // أرسلها ضمن الجسم الأساسي
      };
      await axios.put(
        host+`/api/Employee/${selectedEmployee.employeeID}`,
        updatedData
      );
      setOpenEdit(false);
      fetchEmployees();
    } catch (error) {
      console.error("فشل تغيير كلمة المرور:", error);
    }
  };

  const columns = [
    {
      field: "employeeID",
      headerName: t("ID"),
      flex: 0.7,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "personName",
      headerName: t("Full Name"),
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userName",
      headerName: t("Username"),
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: t("Email"),
      flex: 1.2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: t("Phone"),
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "numberOfCertificate",
      headerName: t("Certificates"),
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "salary",
      headerName: t("Salary"),
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hireDate",
      headerName: t("Hire Date"),
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => dayjs(row.hireDate).format("YYYY-MM-DD"),
    },
    {
      field: "role",
      headerName: t("Role"),
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { role } }) => (
        <Box
          sx={{
            backgroundColor:
              role === "Admin" ? theme.palette.secondary.dark : "#107163",
            p: "5px",
            width: "99px",
            textAlign: "center",
            borderRadius: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {role === "Admin" && (
            <AdminPanelSettingsOutlined
              sx={{ color: "white" }}
              fontSize="small"
            />
          )}
          {role === "User" && (
            <LockOpenOutlined sx={{ color: "white" }} fontSize="small" />
          )}
          <Typography sx={{ fontSize: "13px", color: "white" }}>
            {role}
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: t("Actions"),
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="edit employee">
            <IconButton onClick={() => handleEdit(row)} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete employee">
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

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>تعديل بيانات الموظف</DialogTitle>
        <DialogContent>
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
            centered
          >
            <Tab label="تعديل البيانات" />
            <Tab label="تغيير كلمة المرور" />
          </Tabs>

          {tabIndex === 0 && (
            <>
              <TextField
                fullWidth
                margin="dense"
                label="Full Name"
                name="personName"
                value={selectedEmployee?.personName || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Username"
                name="userName"
                value={selectedEmployee?.userName || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                value={selectedEmployee?.email || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Phone"
                name="phone"
                value={selectedEmployee?.phone || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Salary"
                name="salary"
                value={selectedEmployee?.salary || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Certificates"
                name="numberOfCertificate"
                value={selectedEmployee?.numberOfCertificate || ""}
                disabled
              />

              <FormControl fullWidth margin="dense">
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  value={selectedEmployee?.role || ""}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {tabIndex === 1 && (
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>إلغاء</Button>
          {tabIndex === 0 ? (
            <Button
              onClick={handleSaveInfo}
              variant="contained"
              color="primary"
            >
              حفظ التعديلات
            </Button>
          ) : (
            <Button
              onClick={handleSavePassword}
              variant="contained"
              color="primary"
            >
              تغيير كلمة المرور
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
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
