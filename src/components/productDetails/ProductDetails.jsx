import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Product, ProductImage } from "../../screens/homePage/styles/Products";

const ProductDetailsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
  flexDirection: { xs: "column", md: "row" },
}));

const ProductDetailsInfoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
  marginTop: { xs: theme.spacing(2), md: 0 },
}));

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}

function ProductDetails({ open, onClose, product = {} }) {
  const theme = useTheme();

  // Return null if dialog isn't open
  if (!open) return null;

  return (
    console.log("Product received:", product),
    (
      <Dialog
        TransitionComponent={SlideTransition}
        variant="permanent"
        open={open}
        fullScreen
        onClose={onClose}
      >
        <DialogTitle sx={{ backgroundColor: theme.palette.grey[300] }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {product.name || "Product Details"}
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <ProductDetailsWrapper>
            <Product sx={{ mr: { md: 4 }, width: { xs: "100%", md: "50%" } }}>
              <ProductImage
                src={product.image || "/default-product-image.png"}
                alt={product.name || "Product image"}
              />
            </Product>
            <ProductDetailsInfoWrapper>
              <Typography variant="subtitle1">
                SKU: {product.sku || "N/A"}
              </Typography>
              <Typography variant="subtitle1">
                Availability: {product.stock || 0} in stock
              </Typography>
              <Typography sx={{ lineHeight: 2 }} variant="h4">
                {product.name || "Unnamed Product"}
              </Typography>
              <Typography variant="body1">
                {product.description || "No description available."}
              </Typography>
            </ProductDetailsInfoWrapper>
          </ProductDetailsWrapper>
        </DialogContent>
      </Dialog>
    )
  );
}

export default ProductDetails;
