import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

const categoryOptions = ["Medicines", "Baby Care", "Cosmetics", "Vitamins"]; // Add your real parent categories

const AddCategoryForm = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      parentCategory: data.parentCategory,
      imageUrl: data.imageUrl,
      isActive: data.isActive,
    };

    try {
      const res = await axios.post(
        "http://localhost:5200/api/Category",
        payload
      );
      console.log("✅ Category created:", res.data);
      setOpenSuccess(true);
      reset();
    } catch (error) {
      const err = error.response?.data?.message || "Something went wrong.";
      console.error("❌", err);
      setErrorMessage(err);
      setOpenError(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "80%",
        margin: "auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Add New Category
      </Typography>

      <TextField
        label="Category Name"
        variant="filled"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Slug"
        variant="filled"
        {...register("slug", { required: "Slug is required" })}
        error={!!errors.slug}
        helperText={errors.slug?.message}
      />

      <TextField
        label="Description"
        multiline
        rows={3}
        variant="filled"
        {...register("description")}
      />

      <FormControl variant="filled" fullWidth>
        <InputLabel id="parent-label">Parent Category</InputLabel>
        <Select
          labelId="parent-label"
          defaultValue=""
          {...register("parentCategory")}
        >
          <MenuItem value="">None</MenuItem>
          {categoryOptions.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Image URL" variant="filled" {...register("imageUrl")} />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography>Active</Typography>
        <Switch {...register("isActive")} defaultChecked />
      </Stack>

      <Button type="submit" variant="contained" color="primary">
        Save Category
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Category added successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCategoryForm;
