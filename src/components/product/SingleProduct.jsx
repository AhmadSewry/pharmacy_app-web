import React from "react";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductFavButton,
  ProductImage,
} from "../../screens/homePage/styles/Products";
import ProductMeta from "./ProductMeta";
import { Stack } from "@mui/material";

export default function SingleProduct({ product }) {
  // const imagePath = require(`../../images/medicine1.jpg`);
  return (
    <>
      <Product>
        <ProductImage src={product.image} alt={product.name}></ProductImage>
        <ProductMeta product={product}></ProductMeta>
        <ProductActionsWrapper>
          <Stack direction={"column"}>
            <ProductActionButton>
              <FitScreenOutlinedIcon color="green" />
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductAddToCart variant="contained">Add to Cart</ProductAddToCart>
    </>
  );
}
