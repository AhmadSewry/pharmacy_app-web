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
} from "@mui/material";

function PainRelief() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    categoryId: 0,
    minimumStockLevel: 0,
    sellPrice: 0,
    manufacturer: "",
    activeIngredient: "",
    productType: "Medicine",
    imageFile: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    sellPrice: "",
  });

  // ✅ جلب كل المنتجات عند الفتح
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5200/api/Product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setErrors({ name: "", sellPrice: "" });
    setNewProduct({
      name: "",
      description: "",
      categoryId: 0,
      minimumStockLevel: 0,
      sellPrice: 0,
      manufacturer: "",
      activeIngredient: "",
      productType: "Medicine",
      imageFile: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewProduct({ ...newProduct, [name]: files[0] });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
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
        formData.append("CategoryId", newProduct.categoryId);
        formData.append("MinimumStockLevel", newProduct.minimumStockLevel);
        formData.append("SellPrice", newProduct.sellPrice);
        formData.append("ProductType", newProduct.productType);
        formData.append("MedicineAddRequest.Manufacturer", newProduct.manufacturer);
        formData.append("MedicineAddRequest.ActiveIngredient", newProduct.activeIngredient);

        if (newProduct.imageFile) {
          formData.append("Image", newProduct.imageFile);
        }

        const response = await axios.post(
          "http://localhost:5200/api/Product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setProducts((prev) => [...prev, response.data]);
        handleClose();
      } catch (error) {
        console.error(error);
        alert("Error adding product. Check console.");
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Pain Relief Products
          </Typography>
        </Box>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Min Stock</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Active Ingredient</TableCell>
              <TableCell>Type</TableCell>
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
                  {product.medicine?.manufacturer || product.manufacturer || "N/A"}
                </TableCell>
                <TableCell>
                  {product.medicine?.activeIngredient || product.activeIngredient || "N/A"}
                </TableCell>
                <TableCell>{product.productType || "N/A"}</TableCell>
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
              label="Product Category ID"
              name="categoryId"
              type="number"
              value={newProduct.categoryId}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0 }}
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
            {newProduct.imageFile && (
              <Typography variant="body2">
                Selected: {newProduct.imageFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PainRelief;
