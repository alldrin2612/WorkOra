import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Grid, Typography } from "@mui/material";
import AuthWrapper1 from "../AuthWrapper1";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import img1 from "./assets/register1.png";
import "./login2.css";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; // Loading spinner
import useGoogleLoginHook from './GoogleLogin/useGoogleLoginHook';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Added error state for confirm password
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
  const [password2, setPassword2] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match and meet criteria
    if (formData.password.length < 8 || formData.password.length > 15) {
      setPasswordError("Password must be between 8 and 15 characters");
      return;
    } else {
      setPasswordError("");
    }

    if (formData.password !== password2) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }

    setIsSubmitting(true); // Start loading

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);
        navigate("/accounttype");
      } else {
        const errorResponse = await response.json();
        setEmailError(errorResponse.email ? errorResponse.email[0] : "");
        setPasswordError(errorResponse.password ? errorResponse.password[0] : "");
        setError(errorResponse.password ? errorResponse.password[0] : "");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Network error. Please try again later.");
      setOpenSnackbar(true);
    }

    setIsSubmitting(false); // Stop loading
  };

  const googleLogin = useGoogleLoginHook();

  return (
    <AuthWrapper1>
      <Grid container>
        <Grid xs={6}>
          <Box
            className="image-area"
            sx={{ 
              height: "100vh", 
              width: 1, 
              backgroundColor: "#252526", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center" 
            }}
          >
            <img src={img1} alt="img" style={{ width: "100%", height: "auto" }} />
          </Box>
        </Grid>
        <Grid xs={6}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                padding: "20px",
                backgroundColor: "#F0ECE5",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box sx={{ width: 1, margin: "20px", paddingX: "30px" }}>
                <Typography className="font-sty" sx={{ fontSize: "20px" }}>
                  Welcome to,
                </Typography>
                <Typography className="font-sty" sx={{ fontSize: "30px" }}>
                  Talentify
                </Typography>
              </Box>

              <Box
                sx={{
                  margin: "20px",
                  display: "flex",
                  flexDirection: "column",
                  width: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
              
                <TextField
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  variant="outlined"
                  sx={{ width: "85%", marginY: "20px" }}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />

                <Box sx={{ width: "85%", marginY: "20px" }}>
                  <OutlinedInput
                    sx={{ width: 1 }}
                    name="password"
                    error={Boolean(passwordError)}
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Password"
                  />
                  <Typography variant="caption" color="error">
                    {passwordError}
                  </Typography>
                </Box>

                <Box sx={{ width: "85%", marginY: "20px" }}>
                  <OutlinedInput
                    sx={{ width: 1 }}
                    name="password2"
                    error={Boolean(confirmPasswordError)}
                    value={password2}
                    onChange={handlePassword2}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Confirm Password"
                  />
                  <Typography variant="caption" color="error">
                    {confirmPasswordError}
                  </Typography>
                </Box>

                {/* Sign up with Google button */}
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#252526", width: "85%", marginY: "10px" }}
                  size="large"
                  onClick={googleLogin}
                >
                  Sign Up with Google
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    width: 1,
                    paddingX: "55px",
                    paddingY: "40px",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ display: "flex" }}>
                    Already a user?{" "}
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        paddingLeft: "5px",
                        textDecoration: "none",
                        color: "black",
                      }}
                      component={NavLink}
                      to="/login"
                    >
                      LogIn
                    </Typography>
                  </Typography>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className="font-sty"
                    sx={{ backgroundColor: "#252526" }}
                    endIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />} // Add loading animation
                    disabled={isSubmitting} // Disable button while submitting
                  >
                    {isSubmitting ? "Processing..." : "Next"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={error}
          />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
