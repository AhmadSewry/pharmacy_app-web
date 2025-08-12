import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";
import PurshaseItem from "../../components/purshase/purshaseItem/PurshaseItem";
import { Snackbar, Alert } from "@mui/material";

function Purshase() {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success, error, info, warning
  
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("http://localhost:5200/api/Supplier");
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

  const handleSubmit = async () => {
    const payload = {
      supplierID: selectedSupplier,
      purchaseDate: date || new Date().toISOString(),
      discount: parseFloat(discount),
      totalAmount: parseFloat(totalAmount),
      purchaseItems: purchaseItems.map((p) => ({
        productID: p.productId,
        quantity: p.quantity,
        price: p.price,
        batches: []
      })),
    };
  
    try {
      const res = await axios.post("http://localhost:5200/api/Purchase", payload);
      console.log("Purchase Added:", res.data);
    
      setSnackbarMessage("تمت إضافة الفاتورة بنجاح");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    
      // إفراغ الحقول بعد الإضافة
      setSelectedSupplier("");
      setDate("");
      setDiscount(0);
      setTotalAmount(0);
      setPurchaseItems([]);
    } catch (err) {
      console.error("Error adding purchase:", err);
    
      setSnackbarMessage("فشل في حفظ الفاتورة");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    
  };
  
  

  return (
    <Box sx={{ width: "80%", padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
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

      <FormControl variant="filled" fullWidth>
        <InputLabel id="supplier-label">Supplier</InputLabel>
        <Select
          labelId="supplier-label"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
        >
          {suppliers.map((sup) => (
            <MenuItem key={sup.supplierId} value={sup.supplierId}>
              {sup.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <PurshaseItem onAddProduct={handleAddProduct} />

      {/* عرض المنتجات المضافة */}
      {purchaseItems.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <h3>المنتجات المضافة:</h3>
          {purchaseItems.map((item, index) => (
            <p key={index}>
              {item.name} - {item.quantity} × {item.price}
            </p>
          ))}
        </Box>
      )}
<Button
  variant="contained"
  color="primary"
  onClick={handleSubmit}
>
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

export default Purshase;
