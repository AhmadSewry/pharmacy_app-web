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
  const visibleProducts = ProductsData.slice(0, 11);

  const renderProducts = visibleProducts.map((product) => (
    <Grid
      item
      key={product.id}
      xs={2}
      sm={4}
      md={4}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <SingleProduct product={product} />
    </Grid>
  ));

  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent={"center"}
        sx={{ margin: "20px 4px 10px 4px" }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderProducts}
      </Grid>
    </Container>
  );
}
