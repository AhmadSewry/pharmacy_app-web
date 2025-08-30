import React, { useState, useEffect } from "react";
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
  Box,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import { host } from "../../../App";

function AddProduct() {
  const location = useLocation();
  const categoryIdFromState = location.state?.id || "";

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    sellPrice: 0,
    minimumStockLevel: 0,
    categoryId: categoryIdFromState,
    productType: "0", // Normal by default
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({
    productId: null,
    name: "",
    description: "",
    sellPrice: 0,
    minimumStockLevel: 0,
  });
  const openEditDialog = (product) => {
    setEditProduct({
      productId: product.productId,
      name: product.name,
      description: product.description || "",
      sellPrice: product.sellPrice,
      minimumStockLevel: product.minimumStockLevel,
    });
    setEditOpen(true);
  };
    
  const handleEditSave = async () => {
    try {
      const formData = new FormData();
      formData.append("ProductId", editProduct.productId);
      formData.append("Name", editProduct.name);
      formData.append("Description", editProduct.description);
      formData.append("SellPrice", editProduct.sellPrice);
      formData.append("MinimumStockLevel", editProduct.minimumStockLevel);
      // إذا عندك ProductType ضيفه هنا
      // formData.append("ProductType", editProduct.productType);
  
      await axios.put(host+`/api/Product/${editProduct.productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setProducts((prev) =>
        prev.map((p) =>
          p.productId === editProduct.productId ? { ...p, ...editProduct } : p
        )
      );
      setSnackbar({
        open: true,
        message: "Product updated successfully!",
        severity: "success",
      });
      setEditOpen(false);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Error updating product.",
        severity: "error",
      });
    }
  };
  

  const [errors, setErrors] = useState({
    name: "",
    sellPrice: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteId, setDeleteId] = useState(null);
const [confirmOpen, setConfirmOpen] = useState(false);
const askDelete = (id) => {
  setDeleteId(id);
  setConfirmOpen(true);
};
const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          host+`/api/ProductCategory/${categoryIdFromState}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },}
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categoryIdFromState) {
      fetchProducts();
    }
  }, [categoryIdFromState]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrors({ name: "", sellPrice: "" });
    setNewProduct({
      name: "",
      description: "",
      sellPrice: 0,
      minimumStockLevel: 0,
      categoryId: categoryIdFromState,
      productType: "0",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    let hasError = false;
    const newErrors = { name: "", sellPrice: "" };

    if (!newProduct.name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    if (!newProduct.sellPrice || parseFloat(newProduct.sellPrice) <= 0) {
      newErrors.sellPrice = "Price must be positive";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      try {
        const formData = new FormData();
        formData.append("Name", newProduct.name);
        formData.append("Description", newProduct.description);
        formData.append("SellPrice", newProduct.sellPrice);
        formData.append("MinimumStockLevel", newProduct.minimumStockLevel);
        formData.append("CategoryId", newProduct.categoryId);
        formData.append("ProductType", newProduct.productType);

        const response = await axios.post(
          host+"/api/Product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setProducts((prev) => [...prev, response.data]);
        setSnackbar({
          open: true,
          message: "Product added successfully!",
          severity: "success",
        });
        handleClose();
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          message: "Error adding product.",
          severity: "error",
        });
      }
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(host+`/api/Product/${productId}`);
      setProducts(products.filter((p) => p.productId !== productId));
      setSnackbar({
        open: true,
        message: "Product deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Error deleting product.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Products in Category #{categoryIdFromState}
          </Typography>
        </Box>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Min Stock</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productId || product.id}>
                <TableCell>{product.productId || product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description || "N/A"}</TableCell>
                <TableCell>${product.sellPrice?.toFixed(2)}</TableCell>
                <TableCell>{product.minimumStockLevel}</TableCell>
                <TableCell>

                <IconButton
  color="primary"
  onClick={() => openEditDialog(product)}
>
  <EditIcon />
</IconButton>
                <IconButton


  color="error"
  onClick={() => askDelete(product.productId || product.id)}
>
  <DeleteIcon />
</IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={6} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                  sx={{ mt: 2 }}
                >
                  Add Product
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
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
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Sell Price"
              name="sellPrice"
              type="number"
              value={newProduct.sellPrice}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ step: 0.01, min: 0 }}
              error={!!errors.sellPrice}
              helperText={errors.sellPrice}
            />
            <TextField
              label="Minimum Stock Level"
              name="minimumStockLevel"
              type="number"
              value={newProduct.minimumStockLevel}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0 }}
            />

            <TextField
              select
              label="Product Type"
              name="productType"
              value={newProduct.productType}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="0">Normal</MenuItem>
              <MenuItem value="1">Medicine</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    Are you sure you want to delete this product?
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
    <Button
      color="error"
      onClick={() => {
        handleDelete(deleteId);
        setConfirmOpen(false);
      }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
<Dialog open={editOpen} onClose={() => setEditOpen(false)}>
  <DialogTitle>Edit Product</DialogTitle>
  <DialogContent>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 400, pt: 2 }}>
      <TextField
        label="Name"
        value={editProduct.name}
        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
        fullWidth
      />
      <TextField
        label="Description"
        value={editProduct.description}
        onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
        fullWidth
        multiline
        rows={2}
      />
      <TextField
        label="Sell Price"
        type="number"
        value={editProduct.sellPrice}
        onChange={(e) => setEditProduct({ ...editProduct, sellPrice: parseFloat(e.target.value) })}
        fullWidth
        inputProps={{ min: 0, step: 0.01 }}
      />
      <TextField
        label="Minimum Stock Level"
        type="number"
        value={editProduct.minimumStockLevel}
        onChange={(e) => setEditProduct({ ...editProduct, minimumStockLevel: parseInt(e.target.value) })}
        fullWidth
        inputProps={{ min: 0 }}
      />
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleEditSave}>Save</Button>
  </DialogActions>
</Dialog>


      <Snackbar
  anchorOrigin={{ vertical: "top", horizontal: "right" }} // ✅ هنا التعديل
  open={snackbar.open}
  autoHideDuration={4000}
  onClose={() => setSnackbar({ ...snackbar, open: false })}
>
  <Alert
    severity={snackbar.severity}
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    sx={{ width: "100%" }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>

    </>
  );
}

export default AddProduct;
