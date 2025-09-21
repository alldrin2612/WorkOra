// auth.js
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [userType, setUserType] = useState(null); // Track user type
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(authToken)
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/user_is", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${authToken}`,
          }
        });
        const data = await response.json();

        console.log("This is null"+data.role)
        if (data.role=='startup') {
          setUserType('startup');
        } else if (data.role=='freelancer') {
          setUserType('freelancer');
        } else {
          console.error('User type not recognized.');
        }

        console.log(userType)

        localStorage.setItem("user", JSON.stringify(data) );
      } catch (error) {
        console.error('Error fetching user type:', error);
      }finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
    };

    fetchData();
  }, [authToken]);

  // Function to update authToken
  const updateAuthToken = (newToken) => {
    setAuthToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  return { userType, authToken, updateAuthToken, isLoading }; // Return authToken along with userType and updateAuthToken function
};
