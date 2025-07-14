import React, { useState } from "react";
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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

function ManageSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const regPhone = /^(?:\+963|00963)\d{9}$/;
  const regEmail = /^\S+@\S+\.\S+$/;

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCloseSuccess = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccess(false);
  };

  const handleCloseError = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenError(false);
  };

  const onSubmit = (data) => {
    try {
      setSuppliers([...suppliers, data]);
      reset();
      setOpenSuccess(true);
      setOpenDialog(false);
    } catch {
      setErrorMessage("حدث خطأ أثناء الإرسال.");
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

      {/* Suppliers Table */}
      <TableContainer component={Paper} sx={{ mb: 3, width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("Name")}</TableCell>
              <TableCell>{t("Email")}</TableCell>
              <TableCell>{t("Phone")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier, index) => (
              <TableRow key={index}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Supplier Button */}
      <Button variant="contained" onClick={handleOpenDialog}>
        {t("Add Supplier")}
      </Button>

      {/* Dialog Form */}
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
                  ? t(
                      "Phone must start with +963 or 00963 followed by 9 digits"
                    )
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

      {/* Success Snackbar */}
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
          {t("Supplier created successfully")}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
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
