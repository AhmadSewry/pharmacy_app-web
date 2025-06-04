import { Button, colors, IconButton } from "@mui/material";
import { Box, display, justifyContent, styled } from "@mui/system";
import { slideInBottom, slideInRight } from "../animation/Animation";

export const Product = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
}));
export const ProductImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "100%",
  backgroundColor: "--light-gray",
  padding: "10px",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
}));
export const ProductActionButton = styled(IconButton)(() => ({
  backgroundColor: "white",
  margin: 4,
}));

export const ProductFavButton = styled(ProductActionButton)(
  ({ isfav, theme }) => ({
    color: isfav ? "blue" : "green",
  })
);
export const ProductAddToCart = styled(Button)(({ show, theme }) => ({
  width: "120px",
  fontSize: "12px",
  backgroundColor: "green",
  opacity: 0.9,
  animation:
    show && `${slideInBottom} 0.5s cubic-bezier(0.250,0.460,0.450,0.940) both`,
}));
export const ProductMetaWrapper = styled(Box)(({ theme }) => ({
  padding: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const ProductActionsWrapper = styled(Box)(({ show, theme }) => ({
  display: show ? "visible" : "none",
  position: "absolute",
  right: 0,
  top: "20%",
  animation: show && `${slideInRight}`,
}));
