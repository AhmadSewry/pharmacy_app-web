import React from "react";
import { ProductsData } from "../../../../../../screens/homePage/data/ProductsData";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

function ColdFlu() {
  const filteredProducts = ProductsData.filter(
    (product) => product.category === "Cold & Flu"
  );

  return (
    <Grid container spacing={2}>
      {filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
              sx={{ borderRadius: "12px 12px 0 0" }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {product.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ColdFlu;
