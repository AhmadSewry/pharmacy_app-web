import { Box, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { Product, ProductImage } from "../../screens/homePage/styles/Products";
import { useLocation } from "react-router-dom";

const ProductDetailsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
  flexDirection: "column",
}));

const ProductDetailsInfoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
  marginTop: theme.spacing(2),
}));

function ProductDetails() {
  const theme = useTheme();
  const location = useLocation();
  const product = location.state;
  return (
    <Box
      sx={{
        padding: theme.spacing(4),
      }}
    >
      <Typography variant="h4">{product?.name || "Product Details"}</Typography>
      <ProductDetailsWrapper>
        <Product sx={{ mb: 4, width: "100%" }}>
          <ProductImage
            src={product?.image || "/default-product-image.png"}
            alt={product?.name || "Product image"}
          />
        </Product>
        <ProductDetailsInfoWrapper>
          <Typography variant="subtitle1">
            SKU: {product?.sku || "N/A"}
          </Typography>
          <Typography variant="subtitle1">
            Availability: {product?.stock || 0} in stock
          </Typography>
          <Typography sx={{ lineHeight: 2 }} variant="h4">
            {product?.name || "Unnamed Product"}
          </Typography>
          <Typography variant="body1">
            {product?.description || "No description available."}
          </Typography>
        </ProductDetailsInfoWrapper>
      </ProductDetailsWrapper>
    </Box>
  );
}

export default ProductDetails;
