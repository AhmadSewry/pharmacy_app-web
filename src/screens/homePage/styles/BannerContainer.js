import { styled, Typography } from "@mui/material";
import { Box } from "@mui/material";

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "left",
  width: "100%",
  height: "100%",
  padding: "0px 0px",
  color: "white",
  backgroundColor:
    theme.palette.mode === "light" ? "var(--light-green)" : "var(--light-gray)",
}));
export const BannerContent = styled(Box)(({ src, theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: 420,
  padding: "30px",
}));
export const BannerImage = styled("img")(({ src }) => ({
  src: src,
  width: "500px",
  objectFit: "cover", // Ensure proper image scaling
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
export const AppBarHeader = styled(Typography)((theme) => ({
  padding: "4px",
  flexGrow: 1,
  fontSize: "4em",
  fontFamily: '"Montez", cursive',
}));
