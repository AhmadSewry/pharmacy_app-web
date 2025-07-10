import React from "react";
import { ProductsData } from "../../../../screens/homePage/data/ProductsData";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

function PersonalCareCosmetics() {
  const filteredProducts = ProductsData.filter(
    (product) => product.category === "Personal Care & Cosmetics"
  );

  return (
    <div>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Personal Care & Cosmetics
      </Typography>

      <Grid container spacing={2}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
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
          ))
        ) : (
          <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
            No personal care or cosmetics products found.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default PersonalCareCosmetics;
