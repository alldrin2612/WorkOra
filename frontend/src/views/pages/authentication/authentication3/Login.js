import "./login.css";
import { useState, useEffect } from "react";
import img3 from "./assets/Group3.png";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import useGoogleLoginHook from './GoogleLogin/useGoogleLoginHook';
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = await response.json();

        // Store the token in localStorage
        localStorage.setItem("authToken", data.token);

        if (!data.existingUser) {
          navigate("/accounttype");
        } else {
          setUserType(data.role);
          localStorage.setItem("user", JSON.stringify({role: data.role, image: data.image, name: data.name}));
        }

        // fetchUserType();
        setLoading(false); // Stop loading animation
        console.log("Login successful");
      } else {
        // const errorResponse = await response.json();
        setError("Email or Password Invalid"); // Custom error message

        setOpenSnackbar(true);
        setLoading(false); // Stop loading animation
      }
    } catch (error) {
      setError("Network error. Please try again later.");
      setOpenSnackbar(true);
      setLoading(false); // Stop loading animation
    }
  };

  // const fetchUserType = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const response = await fetch(
  //       "https://influverse-backend.onrender.com/user_is",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       const { is_business, is_freelancer } = data;
  //       setUserType(
  //         is_freelancer ? "freelancer" : is_business ? "business" : null,
  //       );
  //       localStorage.setItem("user", JSON.stringify(data));
  //     } else {
  //       console.error("Failed to fetch user type");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user type:", error);
  //   }
  // };

  useEffect(() => {
    if (userType === "startup") {
      navigate("/startup/dashboard");
    } else if (userType === "freelancer") {
      navigate("/freelancer/dashboard");
    }
  }, [userType, navigate]);

  const googleLogin = useGoogleLoginHook();

  return (
    <div className="app">
      <div className="app-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {/* <img src={img2} alt="img1" /> */}
        </motion.div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="app-title">Login</div>
            <TextField
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              sx={{ width: 1, marginBottom: "15px" }}
            />
            <TextField
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              sx={{ width: 1 }}
            />

            {/* <div className="forgot-password" style={{ marginTop: "10px" }}>
              <Typography component={NavLink} to="/forgot-password">
                Forgot password?
              </Typography>
            </div> */}

            {/* Conditionally render loading spinner */}
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <CircularProgress />
              </div>
            ) : (
              <Button
                type="submit"
                className="font-sty"
                variant="contained"
                size="large"
                sx={{ marginTop: "20px", backgroundColor: "#252526", width: 1 }}
              >
                Login
              </Button>
            )}

            {/* Sign in with Google button */}
            <Button
              variant="outlined"
              size="large"
              sx={{
                marginTop: "20px",
                width: 1,
                borderColor: "#4285F4",
                color: "#4285F4",
                "&:hover": {
                  borderColor: "#357AE8",
                  backgroundColor: "#F5F5F5",
                },
              }}
              onClick={googleLogin}
            >
              Sign in with Google
            </Button>

            <div className="next-bttn" style={{ marginTop: "10px" }}>
              Create new account
              <Typography
                sx={{ paddingLeft: "5px" }}
                component={NavLink}
                to="/register"
              >
                Register
              </Typography>
            </div>
          </form>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={error}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <img src={img3} alt="img1" />
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
