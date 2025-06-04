import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "../../screens/homePage/styles/Products";

export default function ProductMeta({ product }) {
  return (
    <ProductMetaWrapper>
      <Typography variant="h6" lineHeight={2}>
        {product.name}
      </Typography>
      <Typography variant="caption">${product.price}</Typography>
    </ProductMetaWrapper>
  );
}
