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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Snackbar, Alert } from "@mui/material";

import { useLocation } from "react-router-dom";
import { host } from "../../../../App";

function AddMedicine() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const categoryIdFromState = location.state?.id || 0;
// Snackbar state
// Snackbar state
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success", // success | error | warning | info
});

const handleCloseSnackbar = () => {
  setSnackbar((prev) => ({ ...prev, open: false }));
};


  const [newProduct, setNewProduct] = useState({
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

  // Delete Dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const handleOpenDeleteDialog = (product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setProductToDelete(null);
    setOpenDeleteDialog(false);
  };
  
  const handleConfirmDelete = async () => {
    if (!productToDelete?.productId) return;
  
    try {
      await axios.delete(host+`/api/Product/${productToDelete.productId}`);
      await fetchProducts(); // إعادة تحميل البيانات
      handleCloseDeleteDialog();
      alert("تم حذف المنتج بنجاح");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("فشل في حذف المنتج: " + (error.response?.data?.message || error.message));
    }
  };

  // Edit Dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleOpenEditDialog = (medicine) => {
    setProductToEdit({
      productId: medicine.productResponse.productId,
      name: medicine.productResponse.name || "",
      description: medicine.productResponse.description || "",
      categoryId: medicine.productResponse.categoryProductID || categoryIdFromState,
      minimumStockLevel: medicine.productResponse.minimumStockLevel || 0,
      sellPrice: medicine.productResponse.sellPrice || 0,
      manufacturer: medicine.manufacturer || "",
      activeIngredient: medicine.activeIngredient || "",
      medicineTypeId: medicine.medicineTypeId || 0,
      imageFile: null,
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setProductToEdit(null);
    setOpenEditDialog(false);
  };

  const handleEditChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      setProductToEdit((prev) => ({
        ...prev,
        imageFile: files[0]
      }));
    } else {
      setProductToEdit((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  // const handleUpdateProduct = async () => {
  //   if (!productToEdit?.productId) return;

  //   try {
  //     const formData = new FormData();
      
  //     // بيانات المنتج الأساسية
  //     formData.append("ProductId", productToEdit.productId);
  //     formData.append("Name", productToEdit.name);
  //     formData.append("description", productToEdit.description || "");
  //     formData.append("categoryId", productToEdit.categoryId);
  //     formData.append("MinimumStockLevel", productToEdit.minimumStockLevel || 0);
  //     formData.append("SellPrice", productToEdit.sellPrice);
  //     formData.append("ProductType", "Medicine");

  //     // بيانات الدواء
  //     if (productToEdit.manufacturer) {
  //       formData.append("MedicineUpdateRequest.Manufacturer", productToEdit.manufacturer);
  //     }
  //     if (productToEdit.activeIngredient) {
  //       formData.append("MedicineUpdateRequest.ActiveIngredient", productToEdit.activeIngredient);
  //     }
  //     if (productToEdit.medicineTypeId) {
  //       formData.append("MedicineUpdateRequest.MedicineTypeId", productToEdit.medicineTypeId);
  //     }
  //     formData.append("MedicineUpdateRequest.CategoryId", productToEdit.categoryId);
  //     formData.append("MedicineUpdateRequest.IsRequiredDescription", "true");

  //     // إضافة الصورة إذا كانت موجودة
  //     if (productToEdit.imageFile) {
  //       formData.append("Image", productToEdit.imageFile);
  //     }

  //     const response = await axios.put(
  //       host+`/api/Product/${productToEdit.productId}`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     console.log("Product updated successfully:", response.data);
      
  //     // إعادة تحميل البيانات
  //     await fetchProducts();
  //     handleCloseEditDialog();
  //     alert("تم تعديل المنتج بنجاح");
      
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //     alert("فشل تعديل المنتج: " + (error.response?.data?.message || error.message));
  //   }
  // };

  const handleUpdateProduct = async () => {
    if (!productToEdit?.productId) return;
  
    try {
      const formData = new FormData();
      formData.append("ProductId", productToEdit.productId);
      formData.append("Name", productToEdit.name);
      formData.append("description", productToEdit.description || "");
      formData.append("categoryId", productToEdit.categoryId);
      formData.append("MinimumStockLevel", productToEdit.minimumStockLevel || 0);
      formData.append("SellPrice", productToEdit.sellPrice);
      formData.append("ProductType", "Medicine");
  
      if (productToEdit.manufacturer) {
        formData.append("MedicineUpdateRequest.Manufacturer", productToEdit.manufacturer);
      }
      if (productToEdit.activeIngredient) {
        formData.append("MedicineUpdateRequest.ActiveIngredient", productToEdit.activeIngredient);
      }
      if (productToEdit.medicineTypeId) {
        formData.append("MedicineUpdateRequest.MedicineTypeId", productToEdit.medicineTypeId);
      }
      formData.append("MedicineUpdateRequest.CategoryId", productToEdit.categoryId);
      formData.append("MedicineUpdateRequest.IsRequiredDescription", "true");
  
      if (productToEdit.imageFile) {
        formData.append("Image", productToEdit.imageFile);
      }
  
      const response = await axios.put(
        host+`/api/Product/${productToEdit.productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      console.log("Product updated successfully:", response.data);
  
      await fetchProducts();
      handleCloseEditDialog();
  
      setSnackbar({
        open: true,
        message: "تم تعديل المنتج بنجاح",
        severity: "success",
      });
  
    } catch (error) {
      console.error("Error updating product:", error);
      setSnackbar({
        open: true,
        message: "فشل تعديل المنتج: " + (error.response?.data?.message || error.message),
        severity: "error",
      });
    }
  };
  

  const [errors, setErrors] = useState({
    name: "",
    sellPrice: "",
    medicineTypeId: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        host+`/api/MedicineCategory/${categoryIdFromState}`
      );
      console.log("Fetched products:", response.data);
      setProducts(response.data.medicineResponses || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("فشل في جلب البيانات: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
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
        [name]: type === "number" ? parseFloat(value) || 0 : value,
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
        formData.append("MedicineAddRequest.IsRequiredDescription", "false");
        formData.append("MedicineAddRequest.CategoryID", newProduct.categoryId);
        formData.append("MedicineAddRequest.MedicineTypeId", newProduct.medicineTypeId);

        if (newProduct.imageFile) {
          formData.append("Image", newProduct.imageFile);
        }

        const response = await axios.post(
          host+"/api/Product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Created Product:", response.data);
        
        // إعادة تحميل البيانات
        await fetchProducts();
        handleClose();
        alert("تم إضافة المنتج بنجاح");

      } catch (error) {
        console.error("Error adding product:", error);
        alert("فشل في إضافة المنتج: " + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            Pain Relief Productsmnmnn
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((medicine, index) => {
              const product = medicine.productResponse || {};

              return (
                <TableRow key={product.productId || index}>
                  <TableCell>{product.productId || "N/A"}</TableCell>
                  <TableCell>{product.name || "N/A"}</TableCell>
                  <TableCell>{product.description || "N/A"}</TableCell>
                  <TableCell>${product.sellPrice?.toFixed(2) || "N/A"}</TableCell>
                  <TableCell>{product.minimumStockLevel || "N/A"}</TableCell>
                  <TableCell>{medicine.manufacturer || "N/A"}</TableCell>
                  <TableCell>{medicine.activeIngredient || "N/A"}</TableCell>
                  <TableCell>{medicine.medicineTypeName || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handleOpenEditDialog(medicine)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      color="error"
                      onClick={() => handleOpenDeleteDialog(product)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={9} align="right">
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

      {/* Add Product Dialog */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          هل أنت متأكد أنك تريد حذف هذا المنتج؟
          {productToDelete && (
            <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
              {productToDelete.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>إلغاء</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            نعم، احذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>تعديل المنتج</DialogTitle>
        <DialogContent dividers>
          {productToEdit && (
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mt: 1 }}>
              <TextField
                label="الاسم"
                name="name"
                value={productToEdit.name}
                onChange={handleEditChange}
                fullWidth
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="الوصف"
                name="description"
                value={productToEdit.description}
                onChange={handleEditChange}
                fullWidth
                multiline
                rows={2}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="المُصنّع"
                name="manufacturer"
                value={productToEdit.manufacturer}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                label="المادة الفعالة"
                name="activeIngredient"
                value={productToEdit.activeIngredient}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                label="نوع الدواء (MedicineTypeId)"
                name="medicineTypeId"
                type="number"
                value={productToEdit.medicineTypeId}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                label="سعر البيع"
                name="sellPrice"
                type="number"
                value={productToEdit.sellPrice}
                onChange={handleEditChange}
                inputProps={{ step: 0.01, min: 0 }}
                fullWidth
              />
              <TextField
                label="الحد الأدنى للمخزون"
                name="minimumStockLevel"
                type="number"
                value={productToEdit.minimumStockLevel}
                onChange={handleEditChange}
                inputProps={{ min: 0 }}
                fullWidth
              />
              <TextField
                label="رقم الفئة"
                name="categoryId"
                type="number"
                value={productToEdit.categoryId}
                disabled
                fullWidth
              />
              
              <Box sx={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: 1 }}>
                <Button variant="outlined" component="label" fullWidth>
                  تغيير صورة المنتج
                  <input
                    type="file"
                    hidden
                    name="imageFile"
                    accept="image/*"
                    onChange={handleEditChange}
                  />
                </Button>

                {productToEdit.imageFile && (
                  <Box
                    component="img"
                    src={URL.createObjectURL(productToEdit.imageFile)}
                    alt="معاينة الصورة الجديدة"
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>إلغاء</Button>
          <Button onClick={handleUpdateProduct} variant="contained" color="primary">
            حفظ التعديلات
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
    </>
  );
}

export default AddMedicine;