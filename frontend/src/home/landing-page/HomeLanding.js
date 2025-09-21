import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./HomeLanding.css";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#E98EAD",
      light: "#f0bdcf",
      contrastText: "#47008F",
    },
  },
});

export default function Hero() {
  return (
    <>
      <Box
        id="hero"
        sx={{
          width: "100%",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
            <Typography
              component="h1"
              variant="h1"
              className="text-style"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
                color: "white",
              }}
            >
              Web3 Talent Chain revolutionizes hiring through transparent, secure, and decentralized solutions.
            </Typography>
            <Typography variant="body1" textAlign="center" color="white">
              By connecting startups with skilled contributors, Web3 Talent Chain fosters collaboration, 
              incentivizes quality work with cryptocurrency rewards, and drives the growth of blockchain 
              and open-source innovation.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
            >
              <ThemeProvider theme={theme}>
                <Link to="/Register" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      "&:hover": { backgroundColor: "white" },
                    }}
                  >
                    Explore Now
                  </Button>
                </Link>
              </ThemeProvider>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
