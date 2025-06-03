import { styled, Typography } from "@mui/material";
import { Box } from "@mui/material";

export const BannerContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  padding: "0px 0px",
  backgroundColor: "#d3d3d3",
}));
export const BannerContent = styled(Box)(({ src, theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  maxWidth: 420,
  padding: "30px",
}));
export const BannerImage = styled("img")(({ src, theme }) => ({
  src: src,
  width: "500px",
}));
export const BannerTitle = styled(Typography)(() => ({
  lineHeight: 1.5,
  fontSize: "72px",
  marginBottom: "20px",
}));
export const BannerDescription = styled(Typography)(() => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: "3em",
}));
