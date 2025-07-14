import React, { useState } from "react";
import { ProductsData } from "../../../../../../screens/homePage/data/ProductsData";
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
} from "@mui/material";

function VitaminsSupplements() {
  const [products, setProducts] = useState(
    ProductsData.filter(
      (product) => product.category === "Vitamins & Supplements"
    )
  );
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    manufacturer: "",
    activeIngredient: "",
    productType: "",
    price: 0,
    minimumStockLevel: 0,
    isRequiredDescription: false,
    category: "Vitamins & Supplements",
  });
  const [errors, setErrors] = useState({ name: "", price: "" });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({ name: "", price: "" });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    const newErrors = { name: "", price: "" };
    let hasError = false;

    if (!newProduct.name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }
    if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
      newErrors.price = "Price must be a positive number";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      const productToAdd = {
        ...newProduct,
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        price: parseFloat(newProduct.price),
        minimumStockLevel: parseInt(newProduct.minimumStockLevel),
      };
      setProducts([...products, productToAdd]);
      handleClose();
      setNewProduct({
        name: "",
        description: "",
        manufacturer: "",
        activeIngredient: "",
        productType: "",
        price: 0,
        minimumStockLevel: 0,
        isRequiredDescription: false,
        category: "Vitamins & Supplements",
      });
    }
  };

  const productTypes = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Powder",
    "Gummies",
    "Liquid",
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Vitamins & Supplements
          </Typography>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="vitamins table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Active Ingredient</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Min Stock</TableCell>
              <TableCell>Requires Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.manufacturer || "N/A"}</TableCell>
                <TableCell>{product.activeIngredient || "N/A"}</TableCell>
                <TableCell>{product.productType || "N/A"}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.minimumStockLevel || "N/A"}</TableCell>
                <TableCell>
                  {product.isRequiredDescription ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={8} align="right">
                <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
                  Add Medicine
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Supplement Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Medicine</DialogTitle>
        <DialogContent>
          <Box
            component="form"
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
              value={newProduct.name}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Manufacturer"
              name="manufacturer"
              value={newProduct.manufacturer}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Active Ingredient"
              name="activeIngredient"
              value={newProduct.activeIngredient}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              label="Product Type"
              name="productType"
              value={newProduct.productType}
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
              label="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ step: "0.01", min: "0" }}
              error={!!errors.price}
              helperText={errors.price}
            />
            <TextField
              label="Minimum Stock Level"
              name="minimumStockLevel"
              type="number"
              value={newProduct.minimumStockLevel}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: "0" }}
            />
            <TextField
              select
              label="Requires Description"
              name="isRequiredDescription"
              value={newProduct.isRequiredDescription}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
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

export default VitaminsSupplements;
