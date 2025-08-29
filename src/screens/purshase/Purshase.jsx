import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Stack,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Typography,
  Paper,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import PurchaseItem from "../../components/purshase/purshaseItem/PurshaseItem";

function Purchase() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState("");
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Supplier");
        setSuppliers(res.data || []);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      }
    };
    fetchSuppliers();
  }, []);

  const handleAddProduct = (product) => {
    setPurchaseItems((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (indexToRemove) => {
    setPurchaseItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (!selectedSupplier) {
      setSnackbarMessage("الرجاء اختيار المورد");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (purchaseItems.length === 0) {
      setSnackbarMessage("يجب إضافة منتج واحد على الأقل");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const payload = {
      supplierID: selectedSupplier.supplierId,
      purchaseDate: date ? new Date(date).toISOString() : new Date().toISOString(),
      discount: parseFloat(discount) || 0,
      totalAmount: parseFloat(totalAmount) || 0,
      purchaseItems: purchaseItems.map((p) => ({
        productID: p.productId,
        quantity: totalQuantity,
        price: p.price,
        batches: [
          {
            quantity: p.quantity,
            barcode: p.barcode || "",
            batchNumber: p.batchNumber || "",
            expirationDate: p.expirationDate || new Date().toISOString(),
          },
        ],
      })),
    };

    try {
      const res = await axios.post("http://localhost:5000/api/Purchase", payload);
      console.log("Purchase Added:", res.data);

      setSnackbarMessage("تمت إضافة الفاتورة بنجاح");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setSelectedSupplier(null);
      setDate("");
      setDiscount(0);
      setTotalAmount(0);
      setTotalQuantity(0);
      setPurchaseItems([]);
    } catch (err) {
      console.error("Error adding purchase:", err);

      setSnackbarMessage("فشل في حفظ الفاتورة");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "auto",
      }}
    >
      <Stack direction={"row"} gap={2}>
        <TextField
          sx={{ flex: 1 }}
          label="Date"
          variant="filled"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Total Amount"
          variant="filled"
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
        />
      </Stack>

      <TextField
        label="Discount"
        variant="filled"
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />

      {/* مكون البحث والاختيار معًا */}
      <Autocomplete
        options={suppliers}
        getOptionLabel={(option) => option.name}
        value={selectedSupplier}
        onChange={(event, newValue) => setSelectedSupplier(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="اختر المورد" variant="filled" />
        )}
        isOptionEqualToValue={(option, value) => option.supplierId === value.supplierId}
        clearOnEscape
        sx={{ mt: 1 }}
      />
       <TextField
          label="Total quantity"
          variant="filled"
          type="number"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
        />

      <PurchaseItem onAddProduct={handleAddProduct} />

      {purchaseItems.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">المنتجات المضافة:</Typography>
          {purchaseItems.map((item, index) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                mt: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              elevation={2}
            >
              <Typography>
                {item.name} - الكمية: {item.quantity} × السعر: {item.price}
              </Typography>
              <IconButton
                color="error"
                onClick={() => handleRemoveProduct(index)}
                aria-label="حذف المنتج"
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        حفظ الفاتورة
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Purchase;
