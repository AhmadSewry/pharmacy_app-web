import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

function PainRelief() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    description: "",
    categoryID: 0, // Product.CategoryId
    minimumStockLevel: 0,
    sellprice: 0,
    productType: "",
    manufacturer: "",
    activeIngredient: "",
    medicineCategoryID: 0, // Medicine.CategoryID
    medicineTypeId: 0,
    isRequiredDescription: false,
    imageFile: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    sellprice: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({ name: "", sellprice: "" });
    setNewMedicine({
      name: "",
      description: "",
      categoryID: 0,
      minimumStockLevel: 0,
      sellprice: 0,
      productType: "",
      manufacturer: "",
      activeIngredient: "",
      medicineCategoryID: 0,
      medicineTypeId: 0,
      isRequiredDescription: false,
      imageFile: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setNewMedicine({
        ...newMedicine,
        [name]: files[0],
      });
    } else {
      setNewMedicine({
        ...newMedicine,
        [name]: type === "checkbox" ? checked : value,
      });
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    let hasError = false;
    const newErrors = { name: "", sellprice: "" };

    if (!newMedicine.name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    if (!newMedicine.sellprice || parseFloat(newMedicine.sellprice) <= 0) {
      newErrors.sellprice = "Price must be positive";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      try {
        const formData = new FormData();
        formData.append("Name", newMedicine.name);
        formData.append("Description", newMedicine.description);
        formData.append("CategoryId", newMedicine.categoryID); // Product.CategoryId
        formData.append("MinimumStockLevel", newMedicine.minimumStockLevel);
        formData.append("SellPrice", newMedicine.sellprice);
        formData.append("ProductType", newMedicine.productType);

        if (newMedicine.imageFile) {
          formData.append("Image", newMedicine.imageFile);
        }

        // ✅ مفاتيح Medicine مركبة
        formData.append("Medicine.Manufacturer", newMedicine.manufacturer);
        formData.append(
          "Medicine.ActiveIngredient",
          newMedicine.activeIngredient
        );
        formData.append("Medicine.CategoryID", newMedicine.medicineCategoryID);
        formData.append("Medicine.MedicineTypeId", newMedicine.medicineTypeId);
        formData.append(
          "Medicine.IsRequiredDescription",
          newMedicine.isRequiredDescription
        );

        const response = await axios.post(
          "http://localhost:5200/api/Product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setProducts([...products, response.data]);
        handleClose();
      } catch (error) {
        console.error(error);
        alert("Error adding product. Check console.");
      }
    }
  };

  const productTypes = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection",
    "Ointment",
    "Drops",
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Pain Relief Products
          </Typography>
        </Box>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Min Stock</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Active Ingredient</TableCell>
              <TableCell>Requires Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productId || product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description || "N/A"}</TableCell>
                <TableCell>${product.sellPrice?.toFixed(2)}</TableCell>
                <TableCell>{product.minimumStockLevel}</TableCell>
                <TableCell>{product.productType || "N/A"}</TableCell>
                <TableCell>
                  {product.medicine?.manufacturer || "N/A"}
                </TableCell>
                <TableCell>
                  {product.medicine?.activeIngredient || "N/A"}
                </TableCell>
                <TableCell>
                  {product.medicine?.isRequiredDescription ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={8} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                  sx={{ mt: 2 }}
                >
                  Add Medicine
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Medicine</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: "400px",
              pt: 2,
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={newMedicine.name}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Description"
              name="description"
              value={newMedicine.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Product Category ID"
              name="categoryID"
              type="number"
              value={newMedicine.categoryID}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Minimum Stock Level"
              name="minimumStockLevel"
              type="number"
              value={newMedicine.minimumStockLevel}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Sell Price"
              name="sellprice"
              type="number"
              value={newMedicine.sellprice}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ step: 0.01, min: 0 }}
              error={!!errors.sellprice}
              helperText={errors.sellprice}
            />
            <TextField
              select
              label="Product Type"
              name="productType"
              value={newMedicine.productType}
              onChange={handleChange}
              fullWidth
            >
              {productTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Manufacturer"
              name="manufacturer"
              value={newMedicine.manufacturer}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Active Ingredient"
              name="activeIngredient"
              value={newMedicine.activeIngredient}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Medicine Category ID"
              name="medicineCategoryID"
              type="number"
              value={newMedicine.medicineCategoryID}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Medicine Type ID"
              name="medicineTypeId"
              type="number"
              value={newMedicine.medicineTypeId}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newMedicine.isRequiredDescription}
                  onChange={handleChange}
                  name="isRequiredDescription"
                />
              }
              label="Requires Description"
            />
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            {newMedicine.imageFile && (
              <Typography variant="body2">
                Selected: {newMedicine.imageFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Medicine
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PainRelief;
