import React, { useState } from "react";
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

// This mock data is structured to match the JSON response you provided.
const mockSaleData = [
  {
    id: 1,
    saleDate: "2025-08-21T20:00:30.794Z",
    totalAmount: 125.75, // Assuming a mock total amount
    employeeName: "Ahmed",
    saleItems: [
      {
        id: 101,
        productID: 15,
        name: "Ibuprofen 200mg", // Added name for display purposes
        quantity: 3,
        price: 15.25,
      },
      {
        id: 102,
        productID: 23,
        name: "Antiseptic Spray",
        quantity: 2,
        price: 19.5,
      },
      {
        id: 103,
        productID: 41,
        name: "Vitamin C Tablets",
        quantity: 1,
        price: 26.0,
      },
    ],
  },
];

function Sales() {
  const [sale] = useState(mockSaleData[0]); // Get the first (and only) sale transaction from the mock data
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
      >
        {t("Sale Receipt")}
      </Typography>

      <Card sx={{ mt: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>{t("Item")}</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {t("Price")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {t("Quantity")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {t("Subtotal")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sale.saleItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.name || `Product ID: ${item.productID}`}
                </TableCell>
                <TableCell align="center">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={3}
                align="right"
                sx={{ fontWeight: "bold", fontSize: "18px" }}
              >
                {t("Total Amount")}:
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "18px" }}
              >
                ${sale.totalAmount.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {t("Employee")}: {sale.employeeName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("Date")}: {new Date(sale.saleDate).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
}

export default Sales;
