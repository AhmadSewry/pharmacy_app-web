import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

const categoryOptions = ["Medicines", "Baby Care", "Cosmetics", "Vitamins"];

const AddCategoryForm = ({ open, onClose }) => {
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
      onClose(); // Close dialog after success
    } catch (error) {
      const err = error.response?.data?.message || "Something went wrong.";
      console.error("❌", err);
      setErrorMessage(err);
      setOpenError(true);
    }
  };

  const handleCloseDialog = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Add New Category
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Image From your files"
              variant="outlined"
              fullWidth
              {...register("imageUrl")}
            />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Active</Typography>
              <Switch {...register("isActive")} defaultChecked />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbars */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Category added successfully!</Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default AddCategoryForm;
