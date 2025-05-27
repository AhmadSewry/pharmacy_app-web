import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
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
  const onSubmit = () => {
    console.log("dddddddddddd");
  };
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
              ? "Enter FirstName Please but It needs to be more than four characters."
              : null
          }
          {...register("firstName", { required: true, minLength: 3 })}
          sx={{ flex: 1 }}
          label="FirstName"
          variant="filled"
        />
        <TextField sx={{ flex: 1 }} label="LastName" variant="filled" />
      </Stack>

      <TextField label="Phone" variant="filled" />
      <TextField label="NumberCertificate" variant="filled" />
      <TextField label="Enter UserName Employe" variant="filled" />
      <TextField label="Enter PassWord Employe" variant="filled" />

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
      </Box>
    </Box>
  );
}

export default ProfileForm;
