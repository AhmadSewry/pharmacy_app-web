import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
function ProfileForm() {
  const [selectedRole, setSelectedRole] = useState("");

  const handleSelectChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const {
    register,
    handleSubmit,
    watch,
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

  const onSubmit = () => {
    console.log("dddddddddddd");
    handleClick();
  };

  const regphone = /^(?:\+963|00963)\d{9}$/;
  const regCertificate = /^\d{7}$/;
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
              ? "Enter FirstName Please but It needs to be more than 3 characters."
              : null
          }
          {...register("firstName", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label="FirstName"
          variant="filled"
        />
        <TextField
          error={Boolean(errors.lastName)}
          helperText={
            Boolean(errors.lastName)
              ? "Enter LastName Please but It needs to be more than 3 characters."
              : null
          }
          {...register("lastName", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label="LastName"
          variant="filled"
        />
      </Stack>

      <TextField
        error={Boolean(errors.phone)}
        helperText={
          Boolean(errors.phone)
            ? "Enter a number starting with +963 or 00963 followed by 9 numbers"
            : null
        }
        {...register("phone", {
          required: true,
          minLength: 3,
          pattern: regphone,
        })}
        label="Phone"
        variant="filled"
      />
      <TextField
        error={Boolean(errors.numberCertificate)}
        helperText={
          Boolean(errors.numberCertificate)
            ? "Enter a 7-digit number only please"
            : null
        }
        {...register("numberCertificate", {
          required: true,
          pattern: regCertificate,
        })}
        label="NumberCertificate"
        variant="filled"
      />
      <TextField
        error={Boolean(errors.username)}
        helperText={
          Boolean(errors.username)
            ? "Enter FirstName Please but It needs to be more than four characters."
            : null
        }
        {...register("username", { required: true, minLength: 3 })}
        label="Enter UserName Employe"
        variant="filled"
      />
      <TextField
        error={Boolean(errors.password)}
        helperText={
          Boolean(errors.password)
            ? "Enter FirstName Please but It needs to be more than four characters."
            : null
        }
        {...register("password", { required: true, minLength: 3 })}
        label="Enter PassWord Employe"
        variant="filled"
      />

      <FormControl fullWidth variant="filled">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={selectedRole}
          onChange={handleSelectChange}
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
          Create New Employe
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
            Account created Successfully
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default ProfileForm;
