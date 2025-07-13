import React, { useState } from "react";
import {
  Card,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IncDec from "../../components/ui";
import CartData from "./CartData";
import { useTranslation } from "react-i18next";

function Cart() {
  const [cartItems, setCartItems] = useState(CartData);
  const theme = useTheme();
  const { t } = useTranslation();

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div style={{ width: "100%", marginLeft: "5%", marginRight: "5%" }}>
      <h1 style={{ textAlign: "center", fontFamily: '"Montez", cursive' }}>
        {t("Your Cart")}
      </h1>
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
                {t("Total")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {t("Remove")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell
                  align="center"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <IncDec
                    quantity={item.quantity}
                    onIncrement={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    onDecrement={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  {(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <HighlightOffIcon
                    sx={{
                      fontSize: "25px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemove(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                {t("Total")}: ${total}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    px: 5,
                    py: 1.5,
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: '"Montez", cursive',
                    borderRadius: "30px",
                    backgroundColor:
                      theme.palette.mode === "light" ? "#107163" : "#ffd700",
                    color: theme.palette.mode === "light" ? "white" : "black",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light" ? "#0d5f53" : "#f5c400",
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
                    },
                  }}
                >
                  🛒 {t("Checkout")}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default Cart;
