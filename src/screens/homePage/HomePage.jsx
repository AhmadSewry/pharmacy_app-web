import { Container } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import { AppBarHeader } from "./styles/BannerContainer";
import Promotion from "../../components/promotions/Promotion";

function HomePage() {
  return (
    <Container>
      <AppBarHeader>Medications</AppBarHeader>
      <Banner></Banner>
      <Promotion></Promotion>
    </Container>
  );
}

export default HomePage;
