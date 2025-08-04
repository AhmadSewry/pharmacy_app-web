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
import { useLocation } from "react-router-dom";

function AddMedicine() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const categoryIdFromState = location.state?.id || 0;

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    categoryId: categoryIdFromState,
    minimumStockLevel: 0,
    sellPrice: 0,
    manufacturer: "",
    activeIngredient: "",
    productType: "Medicine",
    medicineTypeId: 0, // ✅ جديد
    imageFile: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    sellPrice: "",
    medicineTypeId: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5200/api/MedicineCategory/${categoryIdFromState}`
        );
        setProducts(response.data.medicineResponses || []);
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
    setErrors({ name: "", sellPrice: "", medicineTypeId: "" });
    setNewProduct({
      name: "",
      description: "",
      categoryId: categoryIdFromState,
      minimumStockLevel: 0,
      sellPrice: 0,
      manufacturer: "",
      activeIngredient: "",
      productType: "Medicine",
      medicineTypeId: 0,
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
    const newErrors = { name: "", sellPrice: "", medicineTypeId: "" };

    if (!newProduct.name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    if (!newProduct.sellPrice || parseFloat(newProduct.sellPrice) <= 0) {
      newErrors.sellPrice = "Price must be positive";
      hasError = true;
    }

    if (!newProduct.medicineTypeId || parseInt(newProduct.medicineTypeId) <= 0) {
      newErrors.medicineTypeId = "Medicine Type ID is required";
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
        formData.append("MedicineAddRequest.IsRequiredDescription", "true");

        // ✅ ضروري جدًا:
        formData.append("MedicineAddRequest.CategoryID", newProduct.categoryId);
        formData.append("MedicineAddRequest.MedicineTypeId", newProduct.medicineTypeId);

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

        console.log("Created Product:", response.data);

        // ✅ ضيف المنتج بشكل صحيح مع تفاصيل الدواء
        setProducts((prev) => [
          ...prev,
          {
            productResponse: response.data,
            medicineResponse: {
              manufacturer: newProduct.manufacturer,
              activeIngredient: newProduct.activeIngredient,
              medicineTypeName: `Type ${newProduct.medicineTypeId}`,
            },
          },
        ]);

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
            {products.map((medicine, index) => {
              const product = medicine.productResponse || {};
              const medicineData = medicine.medicineResponse || {};

              return (
                <TableRow key={product.productId || index}>
                  <TableCell>{product.productId || "N/A"}</TableCell>
                  <TableCell>{product.name || "N/A"}</TableCell>
                  <TableCell>{product.description || "N/A"}</TableCell>
                  <TableCell>${product.sellPrice?.toFixed(2) || "N/A"}</TableCell>
                  <TableCell>{product.minimumStockLevel || "N/A"}</TableCell>
                  <TableCell>{medicineData.manufacturer || "N/A"}</TableCell>
                  <TableCell>{medicineData.activeIngredient || "N/A"}</TableCell>
                  <TableCell>{medicineData.medicineTypeName || "N/A"}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={8} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                  sx={{ mt: 2 }}
                >
                  إضافة منتج
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>إضافة منتج جديد</DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mt: 1,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="الاسم"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.name}
              helperText={errors.name || "أدخل اسم المنتج"}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              label="الوصف"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              sx={{ gridColumn: "span 2" }}
            />

            <TextField
              label="المُصنّع"
              name="manufacturer"
              value={newProduct.manufacturer}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="المادة الفعالة"
              name="activeIngredient"
              value={newProduct.activeIngredient}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="نوع الدواء (MedicineTypeId)"
              name="medicineTypeId"
              type="number"
              value={newProduct.medicineTypeId}
              onChange={handleChange}
              required
              error={!!errors.medicineTypeId}
              helperText={errors.medicineTypeId || "أدخل رقم نوع الدواء"}
              fullWidth
            />

            <TextField
              label="رقم الفئة (Category ID)"
              name="categoryId"
              type="number"
              value={newProduct.categoryId}
              disabled
              fullWidth
            />

            <TextField
              label="الحد الأدنى للمخزون"
              name="minimumStockLevel"
              type="number"
              value={newProduct.minimumStockLevel}
              onChange={handleChange}
              inputProps={{ min: 0 }}
              fullWidth
            />

            <TextField
              label="سعر البيع"
              name="sellPrice"
              type="number"
              value={newProduct.sellPrice}
              onChange={handleChange}
              required
              inputProps={{ step: 0.01, min: 0 }}
              error={!!errors.sellPrice}
              helperText={errors.sellPrice || "أدخل سعر البيع"}
              fullWidth
            />

            <Box sx={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: 1 }}>
              <Button variant="outlined" component="label" fullWidth>
                رفع صورة المنتج
                <input
                  type="file"
                  hidden
                  name="imageFile"
                  accept="image/*"
                  onChange={handleChange}
                />
              </Button>

              {newProduct.imageFile && (
                <Box
                  component="img"
                  src={URL.createObjectURL(newProduct.imageFile)}
                  alt="معاينة الصورة"
                  sx={{
                    mt: 1,
                    maxHeight: 150,
                    borderRadius: 1,
                    boxShadow: 1,
                    objectFit: "contain",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            إضافة المنتج
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddMedicine;
