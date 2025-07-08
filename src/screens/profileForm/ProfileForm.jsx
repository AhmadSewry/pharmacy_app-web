import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function ProfileForm() {
  const [selectedRole, setSelectedRole] = useState("");

  const handleSelectChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const onSubmit = (data) => {
    console.log("🚀 بيانات النموذج:", {
      userName: data.username,
      personName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      hireDate: new Date().toISOString(),
      salary: data.salary,
      numberOfCertificate: data.numberCertificate,
      role: selectedRole,
    });
    handleClick();
  };

  const regphone = /^(?:\+963|00963)\d{9}$/;
  const regCertificate = /^\d{7}$/;
  const regEmail = /^\S+@\S+\.\S+$/;

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
            Boolean(errors.firstName)
              ? "Enter FirstName with at least 3 characters."
              : null
          }
          {...register("firstName", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label="First Name"
          variant="filled"
        />
        <TextField
          error={Boolean(errors.lastName)}
          helperText={
            Boolean(errors.lastName)
              ? "Enter LastName with at least 3 characters."
              : null
          }
          {...register("lastName", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label="Last Name"
          variant="filled"
        />
      </Stack>

      <TextField
        error={Boolean(errors.email)}
        helperText={
          Boolean(errors.email) ? "Enter a valid email address" : null
        }
        {...register("email", {
          required: true,
          pattern: regEmail,
        })}
        label="Email"
        variant="filled"
      />

      <TextField
        error={Boolean(errors.phone)}
        helperText={
          Boolean(errors.phone)
            ? "Phone must start   with +963 or 00963 followed by 9 digits"
            : null
        }
        {...register("phone", {
          required: true,
          pattern: regphone,
        })}
        label="Phone"
        variant="filled"
      />

      <TextField
        error={Boolean(errors.numberCertificate)}
        helperText={
          Boolean(errors.numberCertificate)
            ? "Certificate number must be exactly 7 digits"
            : null
        }
        {...register("numberCertificate", {
          required: true,
          pattern: regCertificate,
        })}
        label="Certificate Number"
        variant="filled"
      />

      <TextField
        error={Boolean(errors.username)}
        helperText={
          Boolean(errors.username)
            ? "Username must be at least 3 characters"
            : null
        }
        {...register("username", { required: true, minLength: 3 })}
        label="Username"
        variant="filled"
      />

      <TextField
        error={Boolean(errors.password)}
        helperText={
          Boolean(errors.password)
            ? "Password must be at least 3 characters"
            : null
        }
        {...register("password", { required: true, minLength: 3 })}
        label="Password"
        type="password"
        variant="filled"
      />

      <TextField
        error={Boolean(errors.salary)}
        helperText={
          Boolean(errors.salary) ? "Enter salary as a number" : null
        }
        {...register("salary", { required: true, valueAsNumber: true })}
        label="Salary"
        type="number"
        variant="filled"
      />

      <FormControl fullWidth variant="filled">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={selectedRole}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ textAlign: "right" }}>
        <Button
          type="submit"
          sx={{ textTransform: "capitalize" }}
          variant="contained"
        >
          Create New Employee
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Account created successfully
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default ProfileForm;
