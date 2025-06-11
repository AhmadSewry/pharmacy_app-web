import React from "react";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FitScreenOutlinedIcon from "@mui/icons-material/FitScreenOutlined";
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductImage,
} from "../../screens/homePage/styles/Products";
import ProductMeta from "./ProductMeta";
import { Stack } from "@mui/material";
import useDialogModel from "../../screens/homePage/hooks/useDialogModel";
import ProductDetails from "../../components/productDetails/ProductDetails";

export default function SingleProduct({ product = {} }) {
  // Default empty object

  const [
    ProductDetailDialog,
    showProductDetailDialog,
    closeProductDetailDialog,
  ] = useDialogModel(ProductDetails);

  return (
    <>
      <Product>
        <ProductImage
          onClick={() => showProductDetailDialog(product)}
          src={product.image || "/default-product-image.png"}
          alt={product.name || "Product"}
        />
        <ProductMeta product={product} />
        <ProductActionsWrapper>
          <Stack direction={"column"}>
            <ProductActionButton>
              <FitScreenOutlinedIcon color="green" />
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductAddToCart variant="contained">Add to Cart</ProductAddToCart>
      <ProductDetailDialog product={product} />
    </>
  );
}
