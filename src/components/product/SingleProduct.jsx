import React from "react";
import { Product, ProductImage } from "../../screens/homePage/styles/Products";
import ProductMeta from "./ProductMeta";

export default function SingleProduct({ product }) {
  return (
    <Product>
      <ProductImage src={product.Image}></ProductImage>
      <ProductMeta product={product}></ProductMeta>
    </Product>
  );
}
