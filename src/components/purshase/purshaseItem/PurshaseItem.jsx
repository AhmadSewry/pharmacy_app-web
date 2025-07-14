import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";

function PurshaseItem() {
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const medicineList = [
    "Paracetamol",
    "Ibuprofen",
    "Amoxicillin",
    "Cetirizine",
    "Metformin",
  ]; // You can replace this with dynamic data if needed

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
        <InputLabel id="medicine-select-label">Select Medicine</InputLabel>
        <Select
          labelId="medicine-select-label"
          value={selectedMedicine}
          onChange={(e) => setSelectedMedicine(e.target.value)}
        >
          {medicineList.map((med) => (
            <MenuItem key={med} value={med}>
              {med}
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
    </Box>
  );
}

export default PurshaseItem;
