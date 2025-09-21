import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Custom Hook (must start with "use")
const useGoogleLoginHook = () => {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === "startup") {
      navigate("/startup/dashboard");
    } else if (userType === "freelancer") {
      navigate("/freelancer/dashboard");
    }
  }, [userType, navigate]);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        const token = result.data.token;
        const existingUser = result.data.existingUser;
        const role = result.data.role;
        const name = result.data.name;
        const image = result.data.image;

        console.log(token)

        // Store the token in localStorage
        localStorage.setItem("authToken", token);

        if (!existingUser) {
          navigate("/accounttype");
        } else {
          setUserType(role);
          localStorage.setItem("user", JSON.stringify({role: role, image: image, name: name}));
        }

        console.log("Google Login Successful");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log('Error while Google Login...', e);
    }
  };

  // Return the googleLogin function from useGoogleLogin hook
  return useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
};

export default useGoogleLoginHook;
