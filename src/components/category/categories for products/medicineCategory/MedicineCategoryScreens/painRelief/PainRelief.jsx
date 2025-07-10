import React from "react";
import { ProductsData } from "../../../../../../screens/homePage/data/ProductsData";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

function PainRelief() {
  const filteredProducts = ProductsData.filter(
    (product) => product.category === "Pain Relief"
  );

  return (
    <Grid container spacing={2}>
      {filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
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

export default PainRelief;
