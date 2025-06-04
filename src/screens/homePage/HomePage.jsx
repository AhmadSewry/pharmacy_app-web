import { Container } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import { AppBarHeader } from "./styles/BannerContainer";
import Promotion from "../../components/Promotion";
import Products from "../../components/product/Products";

function HomePage() {
  return (
    <Container>
      <AppBarHeader>Medications</AppBarHeader>
      <Banner></Banner>
      <Promotion></Promotion>
      <Products ></Products>
    </Container>
  );
}

export default HomePage;
