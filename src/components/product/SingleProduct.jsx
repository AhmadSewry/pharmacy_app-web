import React from "react";
import { Product, ProductImage } from "../../screens/homePage/styles/Products";
import ProductMeta from "./ProductMeta";

export default function SingleProduct({ product }) {
  // const imagePath = require(`../../images/medicine1.jpg`);
  return (
    <Product>
      <ProductImage src={product.image} alt={product.name}></ProductImage>
      <ProductMeta product={product}></ProductMeta>
    </Product>
  );
}
