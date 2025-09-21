import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import MetaMaskLogo from "./MetaMask.svg";
import Web3 from 'web3';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function AccountType() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const connectToMetaMask = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      console.log('MetaMask is not installed.');
      return;
    }
  
    try {
      const web3 = new Web3(window.ethereum);

      console.log('Web3 instance created:', web3);
  
      // Prompt user to connect wallet & select account
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      if (accounts.length === 0) {
        console.log('No account selected.');
        return;
      }
  
      const selectedAccount = accounts[0];
      console.log('User selected account:', selectedAccount);
  
      const token = localStorage.getItem('authToken');
  
      // Send selected account to backend
      const response = await fetch('http://localhost:4000/api/auth/updatewallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ walletaddress: selectedAccount }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Wallet address saved successfully:', data);
        setIsConnected(true);
  
        // Redirect to the appropriate register page
        if (type === "freelancer") {
          navigate("/register/freelancer");
        } else if (type === "business") {
          navigate("/register/business");
        }
  
      } else {
        console.error('Backend error:', data.message);
      }
  
    } catch (error) {
      console.error('MetaMask connection or backend error:', error);
    }
  };
  

  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Typography sx={{ color: "white", fontSize: 24, marginBottom: "30px" }}>
        Connect Your Wallet
      </Typography>
      <Box
        sx={{
          backgroundColor: "#31304D",
          width: "20%",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          sx={{ width: 1, paddingY:"10px", marginBottom:"10px", color: isConnected ? 'green' : 'white' }}
          startIcon={
            <img
              src={MetaMaskLogo}
              alt="MetaMask Logo"
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
          }
          onClick={connectToMetaMask}
        >
          {isConnected ? "Wallet Connected" : "Connect MetaMask Wallet"}
        </Button>
        
      </Box>
    </Box>
  );
}
