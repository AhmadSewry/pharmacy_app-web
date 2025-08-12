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

function PurshaseItem({ onAddProduct }) {
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5200/api/Product");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAdd = () => {
    if (!selectedMedicine || !price || !quantity) {
      alert("يرجى إدخال جميع البيانات");
      return;
    }

    const selectedProductObj = products.find(
      (p) => p.productId === selectedMedicine
    );

    onAddProduct({
      productId: selectedMedicine,
      name: selectedProductObj?.name || "",
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    });

    // تفريغ الحقول
    setSelectedMedicine("");
    setPrice("");
    setQuantity("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormControl variant="filled" fullWidth>
        <InputLabel id="medicine-select-label">Select Product</InputLabel>
        <Select
          labelId="medicine-select-label"
          value={selectedMedicine}
          onChange={(e) => setSelectedMedicine(e.target.value)}
        >
          {products.map((prod) => (
            <MenuItem key={prod.productId} value={prod.productId}>
              {prod.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" gap={2}>
        <TextField
          label="Price"
          type="number"
          variant="filled"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          inputProps={{ min: "0", step: "0.01" }}
        />
        <TextField
          label="Quantity"
          type="number"
          variant="filled"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{ min: "0", step: "1" }}
        />
      </Stack>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        sx={{ alignSelf: "flex-end" }}
      >
        إضافة المنتج
      </Button>
    </Box>
  );
}

export default PurshaseItem;
