import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Grid, Container } from "@mui/material";
import {
  products,
  ProductsData,
} from "../../screens/homePage/data/ProductsData";
import React from "react";
import SingleProduct from "./SingleProduct";

export default function Products() {
  const theme = useTheme();
  const renderProdcuts = ProductsData.map((product) => (
    <Grid
      item
      key={product.id}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <SingleProduct product={product}></SingleProduct>
    </Grid>
  ));
  return (
    <Container>
      <Grid
        container
        justifyContent={"center"}
        sx={{ margin: "20px 4px 10px 4px" }}
      >
        {renderProdcuts}
      </Grid>
    </Container>
  );
}
