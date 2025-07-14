import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Snackbar,
  Alert,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function ManageSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [supplierToEdit, setSupplierToEdit] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const regPhone = /^\d{10}$/;
  const regEmail = /^\S+@\S+\.\S+$/;

  const handleOpenDialog = () => {
    reset();
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCloseSuccess = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccess(false);
  };

  const handleCloseError = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenError(false);
  };

  const loadSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5200/api/Supplier");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setErrorMessage("Failed to load suppliers.");
      setOpenError(true);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  // إنشاء مورد جديد
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5200/api/Supplier", data);
      await loadSuppliers();
      reset();
      setOpenSuccess(true);
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("حدث خطأ أثناء الإرسال.");
      setOpenError(true);
    }
  };

  // فتح دياكولوج التعديل مع ملء القيم
  const openEditDialog = (supplier) => {
    setSupplierToEdit(supplier);
    setValue("name", supplier.name);
    setValue("email", supplier.email);
    setValue("phone", supplier.phone);
    setEditDialogOpen(true);
  };

  // حفظ التعديلات مع إضافة supplierId في جسم الطلب
  const onEditSubmit = async (data) => {
    if (!supplierToEdit) return;

    const payload = {
      supplierId: supplierToEdit.supplierId,
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    try {
      await axios.put(`http://localhost:5200/api/Supplier/${supplierToEdit.supplierId}`, payload);
      await loadSuppliers();
      setEditDialogOpen(false);
      setSupplierToEdit(null);
      reset();
      setOpenSuccess(true);
    } catch (error) {
      console.error("Error updating supplier:", error);
      setErrorMessage("فشل تحديث المورد.");
      setOpenError(true);
    }
  };

  // تأكيد الحذف
  const confirmDelete = (supplier) => {
    setSupplierToDelete(supplier);
    setDeleteDialogOpen(true);
  };

  // تنفيذ الحذف
  const handleDelete = async () => {
    if (!supplierToDelete) return;

    try {
      await axios.delete(`http://localhost:5200/api/Supplier/${supplierToDelete.supplierId}`);
      await loadSuppliers();
      setDeleteDialogOpen(false);
      setSupplierToDelete(null);
      setOpenSuccess(true);
    } catch (error) {
      console.error("Error deleting supplier:", error);
      setErrorMessage("فشل حذف المورد.");
      setOpenError(true);
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%", maxWidth: "100vw", overflowX: "auto" }}>
      <Typography variant="h4" gutterBottom>
        {t("Manage Suppliers")}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t("This is where you can manage all your pharmacy suppliers.")}
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3, width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("Name")}</TableCell>
              <TableCell>{t("Email")}</TableCell>
              <TableCell>{t("Phone")}</TableCell>
              <TableCell>{t("Actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.supplierId}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => openEditDialog(supplier)}
                    sx={{ mr: 1 }}
                    aria-label={t("Edit")}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => confirmDelete(supplier)}
                    aria-label={t("Delete")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={handleOpenDialog}>
        {t("Add Supplier")}
      </Button>

      {/* Dialog لإضافة مورد */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{t("Create New Supplier")}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={Boolean(errors.name)}
              helperText={
                errors.name
                  ? t("Enter supplier name with at least 3 characters")
                  : null
              }
              {...register("name", { required: true, minLength: 3 })}
              label={t("Supplier Name")}
              variant="filled"
              fullWidth
            />
            <TextField
              error={Boolean(errors.email)}
              helperText={
                errors.email ? t("Enter a valid email address") : null
              }
              {...register("email", { required: true, pattern: regEmail })}
              label={t("Email")}
              variant="filled"
              fullWidth
            />
            <TextField
              error={Boolean(errors.phone)}
              helperText={
                errors.phone
                  ? t("Phone must contain exactly 10 digits")
                  : null
              }
              {...register("phone", { required: true, pattern: regPhone })}
              label={t("Phone")}
              variant="filled"
              fullWidth
            />
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={handleCloseDialog}>{t("Cancel")}</Button>
              <Button type="submit" variant="contained">
                {t("Submit")}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog لتعديل مورد */}
      <Dialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          reset();
          setSupplierToEdit(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{t("Edit Supplier")}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onEditSubmit)}
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={Boolean(errors.name)}
              helperText={
                errors.name
                  ? t("Enter supplier name with at least 3 characters")
                  : null
              }
              {...register("name", { required: true, minLength: 3 })}
              label={t("Supplier Name")}
              variant="filled"
              fullWidth
            />
            <TextField
              error={Boolean(errors.email)}
              helperText={
                errors.email ? t("Enter a valid email address") : null
              }
              {...register("email", { required: true, pattern: regEmail })}
              label={t("Email")}
              variant="filled"
              fullWidth
            />
            <TextField
              error={Boolean(errors.phone)}
              helperText={
                errors.phone
                  ? t("Phone must contain exactly 10 digits")
                  : null
              }
              {...register("phone", { required: true, pattern: regPhone })}
              label={t("Phone")}
              variant="filled"
              fullWidth
            />
            <DialogActions sx={{ px: 0 }}>
              <Button
                onClick={() => {
                  setEditDialogOpen(false);
                  reset();
                  setSupplierToEdit(null);
                }}
              >
                {t("Cancel")}
              </Button>
              <Button type="submit" variant="contained">
                {t("Save")}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog لتأكيد الحذف */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{t("Confirm Deletion")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("Are you sure you want to delete this supplier?")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            {t("Cancel")}
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {t("Operation completed successfully")}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openError}
        autoHideDuration={4000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ManageSuppliers;
