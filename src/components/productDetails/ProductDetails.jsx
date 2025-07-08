import { Box, Typography, Button, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import IncDec from "../ui";
import { useTranslation } from "react-i18next";

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
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();
  const location = useLocation();
  const product = location.state;
  const { t } = useTranslation();
  return (
    <Box sx={{ padding: theme.spacing(4) }}>
      <Typography variant="h4">{product?.name || "Product Details"}</Typography>
      <ProductDetailsWrapper>
        <Box sx={{ mb: 4 }}>
          <img
            src={product?.image || "/default-product-image.png"}
            alt={product?.name || "Product image"}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
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
          <Box sx={{ mt: 4 }}>
            <IncDec
              quantity={quantity}
              onIncrement={() => setQuantity((prev) => Math.min(prev + 1, 100))}
              onDecrement={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor:
                theme.palette.mode === "light" ? "#107163" : "gold",
            }}
          >
            {t("Add to Cart")}
          </Button>
        </ProductDetailsInfoWrapper>
      </ProductDetailsWrapper>
    </Box>
  );
}

export default ProductDetails;
