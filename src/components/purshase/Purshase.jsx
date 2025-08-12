import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import PurshaseItem from "../../components/purshase/purshaseItem/PurshaseItem";

function Purshase() {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "80%",
        padding: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction={"row"} gap={2}>
        <TextField
          sx={{ flex: 1 }}
          label="Date"
          variant="filled"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField label="Total Amount" variant="filled" />
      </Stack>

      <TextField label="Discount" variant="filled" />
      <FormControl variant="filled" fullWidth>
        <InputLabel id="supplier-label">Supplier</InputLabel>
        <Select
          labelId="supplier-label"
          value={selectedSupplier}
          onChange={handleSupplierChange}
        >
          <MenuItem value="PharmaOne">PharmaOne</MenuItem>
          <MenuItem value="HealthPlus">HealthPlus</MenuItem>
          <MenuItem value="MediStore">MediStore</MenuItem>
          <MenuItem value="WellCare">WellCare</MenuItem>
        </Select>
      </FormControl>
      <PurshaseItem />
    </Box>
  );
}

export default Purshase;
