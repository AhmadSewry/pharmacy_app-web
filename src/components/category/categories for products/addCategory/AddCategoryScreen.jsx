import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  LinearProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { CloudUpload, Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AddCategoryForm = ({ open, onClose }) => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Basic validation
      if (!file.type.match("image.*")) {
        setErrorMessage("Please select an image file (JPEG, PNG)");
        setOpenError(true);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size should be less than 5MB");
        setOpenError(true);
        return;
      }
      setSelectedFile(file);
      setValue("image", URL.createObjectURL(file)); // For preview
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return "";

    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5200/api/ProductCategory",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.image || ""; // Return the image URL from server
    } catch (error) {
      console.error("Upload error:", error);
      let message = "Failed to upload image";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      setErrorMessage(message);
      setOpenError(true);
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Upload image first if selected
      const imageUrl = selectedFile ? await uploadImage() : "";
      if (selectedFile && !imageUrl) return; // Stop if upload failed

      // Prepare payload according to your API spec
      const payload = {
        name: data.name,
        image: imageUrl,
        products: [], // Empty array as required
      };

      // Create the category
      const response = await axios.post(
        "http://localhost:5200/api/ProductCategory",
        payload
      );

      console.log("Category created:", response.data);
      setOpenSuccess(true);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating category:", error);
      let message = "Failed to create category";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      setErrorMessage(message);
      setOpenError(true);
    }
  };

  const resetForm = () => {
    reset();
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setErrorMessage("");
  };

  const handleCloseDialog = () => {
    if (!isUploading) {
      resetForm();
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              {t("Add New Category")}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDialog}
              disabled={isUploading}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Category Name *"
              variant="outlined"
              fullWidth
              {...register("name", {
                required: "Category name is required",
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters",
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isUploading}
            />

            {/* File Upload Section */}
            <Box>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                disabled={isUploading}
              />
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                onClick={() => fileInputRef.current.click()}
                fullWidth
                disabled={isUploading}
                sx={{ py: 1.5 }}
              >
                {selectedFile ? selectedFile.name : "Upload Category Image"}
              </Button>

              {isUploading && (
                <Box sx={{ width: "100%", mt: 1 }}>
                  <LinearProgress
                    variant={uploadProgress ? "determinate" : "indeterminate"}
                    value={uploadProgress}
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    textAlign="center"
                  >
                    {uploadProgress
                      ? `${uploadProgress}% uploaded`
                      : "Uploading..."}
                  </Typography>
                </Box>
              )}

              {watch("image") && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={watch("image")}
                    alt="Preview"
                    style={{
                      maxHeight: 150,
                      maxWidth: "100%",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDialog}
            disabled={isUploading}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
            disabled={isUploading || !watch("name")}
          >
            {isUploading ? "Saving..." : "Save Category"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifications */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setOpenSuccess(false)}>
          Category created successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setOpenError(false)}
          sx={{ whiteSpace: "pre-line" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCategoryForm;
