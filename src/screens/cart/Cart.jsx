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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IncDec from "../../components/ui";
import CartData from "./CartData";
function Cart() {
  const [cartItems, setCartItems] = useState(CartData);

  // const [cartItems, setCartItems] = useState([
  //   { id: 1, name: "Cetamol", price: 0.99, quantity: 2 },
  //   { id: 2, name: "Imodium", price: 1.99, quantity: 2 },
  // ]);
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const theme = useTheme();
  return (
    <div style={{ width: "100%", marginLeft: "5%", marginRight: "5%" }}>
      <h1 style={{ marginLeft: "48%", fontFamily: '"Montez", cursive' }}>
        Your Cart
      </h1>
      <Card sx={{ mt: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: "middle", fontWeight: "bold" }}
              >
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Total
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">
                  <IncDec />
                </TableCell>
                <TableCell align="center">
                  {(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      fontSize: "25px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemove(item.id)}
                  >
                    <HighlightOffIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "20px" }}
                colSpan={5}
                align="center"
              >
                Total
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "18px" }}
                colSpan={5}
                align="center"
              >
                Total: ${total}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <div>
                  <Button
                    style={{
                      fontFamily: '"Montez", cursive',
                      backgroundColor:
                        theme.palette.mode === "light" ? "#107163" : "gold",
                      color: theme.palette.mode === "light" ? "black" : "white",
                      borderRadius: "50%",
                      fontSize: "20px",
                    }}
                    size="large"
                  >
                    Checkout
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default Cart;
