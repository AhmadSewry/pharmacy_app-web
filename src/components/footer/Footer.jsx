import {
  Box,
  Button,
  Grid,
  List,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import {
  FooterTitle,
  SubscribeTf,
} from "../../screens/homePage/styles/footer/Footer";

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 5,
        backgroundColor: "gray",
        color: "white",
        p: { xs: 4, md: 10 },
        pt: 12,
        pb: 12,
        fontSize: { xs: "12px", md: "14px" },
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">About us</FooterTitle>
          <Typography variant="caption2">
            We are committed to providing top-quality products and exceptional
            customer service. Our team is passionate about innovation,
            reliability, and your satisfaction.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlinedIcon
                sx={{ mr: 1, color: "blue", cursor: "pointer" }}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon sx={{ mr: 1, color: "black", cursor: "pointer" }} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon sx={{ mr: 1, color: "pink", cursor: "pointer" }} />
            </a>
          </Box>
        </Grid>
        <Grid item md={6} lg={2} ml={"30px"}>
          <FooterTitle variant="body1">information</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                About us
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Order tracking
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Privacy &amp; Policy
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Terms &amp; Conditions
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2} ml={"30px"}>
          <FooterTitle variant="body1">my account</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Login
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                My Cart
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                My Account
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                WishList
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4} ml={"30px"}>
          <FooterTitle variant="body1"> newsLetter</FooterTitle>
          <Stack>
            <SubscribeTf
              color="white"
              label="Email Address"
              variant="standard"
            />
            <Button
              startIcon={<SendIcon />}
              sx={{
                mt: 4,
                mb: 4,
                backgroundColor:
                  theme.palette.mode === "light" ? "#107163" : "gold",
              }}
              variant="contained"
            >
              Subscribe
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
