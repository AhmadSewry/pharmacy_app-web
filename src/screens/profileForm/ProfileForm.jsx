import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  Snackbar,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

function ProfileForm() {
  const [selectedRole, setSelectedRole] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenError(false);
  };

  const onSubmit = async (data) => {
    const requestPayload = {
      password: data.password,
      personName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      hireDate: new Date().toISOString(),
      salary: data.salary,
      numberOfCertificate: data.numberCertificate,
      role: selectedRole,
      userName: data.username, // ✅ هذا ضروري لـ Identity
      uesrId: "00000000-0000-0000-0000-000000000000", // أو احذفه إذا لا يستخدم فعليًا
    };

    try {
      const response = await axios.post(
        "http://localhost:5200/api/Employee",
        requestPayload
      );
      console.log("✅ تم إنشاء المستخدم:", response.data);
      setOpenSuccess(true);
    } catch (error) {
      console.log("❌ خطأ في الإرسال:", error.response?.data);
      const errorDetails = error.response?.data?.errors;
      const firstError = errorDetails
        ? Object.values(errorDetails)[0][0]
        : "حدث خطأ أثناء الإرسال.";
      setErrorMessage(firstError);
      setOpenError(true);
    }
  };

  const regphone = /^(?:\+963|00963)\d{9}$/;
  const regCertificate = /^\d{7}$/;
  const regEmail = /^\S+@\S+\.\S+$/;
  const { t } = useTranslation();

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "80%",
        padding: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction={"row"} gap={2}>
        <TextField
          error={Boolean(errors.firstName)}
          helperText={
            errors.firstName
              ? t("Enter FirstName with at least 3 characters.")
              : null
          }
          {...register("firstName", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label={t("First Name")}
          variant="filled"
        />
        <TextField
          error={Boolean(errors.lastName)}
          helperText={
            errors.lastName
              ? t("Enter LastName with at least 3 characters.")
              : null
          }
          {...register("lastName", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label={t("Last Name")}
          variant="filled"
        />
      </Stack>

      <TextField
        error={Boolean(errors.email)}
        helperText={errors.email ? t("Enter a valid email address") : null}
        {...register("email", { required: true, pattern: regEmail })}
        label={t("Email")}
        variant="filled"
      />

      <TextField
        error={Boolean(errors.phone)}
        helperText={
          errors.phone
            ? t("Phone must start with +963 or 00963 followed by 9 digits")
            : null
        }
        {...register("phone", { required: true, pattern: regphone })}
        label={t("Phone")}
        variant="filled"
      />

      <TextField
        error={Boolean(errors.numberCertificate)}
        helperText={
          errors.numberCertificate
            ? t("Certificate number must be exactly 7 digits")
            : null
        }
        {...register("numberCertificate", {
          required: true,
          pattern: regCertificate,
        })}
        label={t("Certificate Number")}
        variant="filled"
      />

      <TextField
        error={Boolean(errors.username)}
        helperText={
          errors.username ? t("Username must be at least 3 characters") : null
        }
        {...register("username", { required: true, minLength: 3 })}
        label={t("Username")}
        variant="filled"
      />

      <TextField
        error={Boolean(errors.password)}
        helperText={
          errors.password ? t("Password must be at least 3 characters") : null
        }
        {...register("password", { required: true, minLength: 3 })}
        label={t("Password")}
        type="password"
        variant="filled"
      />

      <TextField
        error={Boolean(errors.salary)}
        helperText={errors.salary ? t("Enter salary as a number") : null}
        {...register("salary", { required: true, valueAsNumber: true })}
        label={t("Salary")}
        type="number"
        variant="filled"
      />

      <FormControl fullWidth variant="filled">
        <InputLabel id="role-label">{t("Role")}</InputLabel>
        <Select
          labelId="role-label"
          value={selectedRole}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="Admin">{t("Admin")}</MenuItem>
          <MenuItem value="User">{t("User")}</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ textAlign: "right" }}>
        <Button
          type="submit"
          sx={{ textTransform: "capitalize" }}
          variant="contained"
        >
          {t("Create New Employee")}
        </Button>

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
            {t("Account created successfully")}
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
    </Box>
  );
}

export default ProfileForm;
