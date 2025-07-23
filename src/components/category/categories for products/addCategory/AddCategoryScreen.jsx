import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Box,
  LinearProgress,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
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

  const categoryOptions = [
    "medicines",
    "baby & maternity care",
    "personal care & cosmetics",
    "first aid and medical supplies",
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
      setValue("image", URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data.name);
      if (selectedFile) {
        formData.append("Image", selectedFile);
      }

      const response = await axios.post(
        "http://localhost:5200/api/ProductCategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
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
    } finally {
      setIsUploading(false);
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
              label="Category *"
              variant="outlined"
              fullWidth
              disabled={isUploading}
              {...register("name", {
                required: "Please enter a category name",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

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
