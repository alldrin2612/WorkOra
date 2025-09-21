import React, { useState } from "react";
 import { Box, TextField, IconButton, Typography, Paper } from "@mui/material";
 import SendIcon from "@mui/icons-material/Send";
 
 const API_KEY = "AIzaSyCsurkZoCMCxjhcrfQakXrHSLVmQti8m-s";
 const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
 
 const PROMPT = `You are a help chatbot for the WorkOra Talent Chain startup platform. Answer questions only related to the TalentChain project. If a question is out of context, respond with 'Question out of context'.
 
 Project Details:
 TalentChain is a blockchain-based web application where startups, especially those in the open-source environment, can post campaigns with rewards in ETH. Freelancers can view these campaigns and express interest. Startups can assign freelancers to campaigns, and upon successful completion, freelancers receive ETH rewards.
 
 Startup Features:
 1. **Dashboard:**
    - View analytics including:
      - Total number of campaigns created by the startup till date.
      - Total number of campaigns completed.
      - ETH transaction history.
      - Number of ongoing campaigns.
      - A bar chart showing the number of campaigns created per month.
 
 2. **Creating and Managing Campaigns:**
    - Navigate to the 'Campaign' option in the drawer.
    - Click 'Create New Campaign' to create a campaign.
    - View the list of all created campaigns under the 'Campaign' section.
    - Click 'View' on a campaign to access its details:
      - Campaign Name (Editable)
      - Campaign Description (Editable)
      - App Link (Editable)
      - Guide Link (Editable)
      - Documentation Link (Editable)
      - Forum Link (Editable)
      - Skills Required (Editable)
      - Repository Link (Editable)
      - Campaign Start Date
      - Prize
      - Campaign Status
      - List of interested freelancers with an 'Assign' button.
      - Option to view freelancer profiles.
      - List of assigned freelancers (name & photo).
 
 3. **Exploring Freelancers:**
    - Click 'Explore' in the navigation drawer to see a list of freelancers.
    - Click 'View Profile' to see a freelancer's profile.
 
 4. **Rewarding Freelancers:**
    - Click 'Freelancer Gifting' in the navigation drawer.
    - View a list of freelancers who have completed campaigns along with the ETH reward they deserve.
    - Click 'Send Reward' to open MetaMask and transfer ETH.
 
 5. **Managing Startup Profile:**
    - Click 'Account' in the navigation drawer.
    - Edit startup profile photo, name, and company type.
 
 Answer user questions strictly based on these details. If a query is unrelated, respond with 'Question out of context'.`;
 
 const ChatBotStartup = () => {
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
 
   const handleSend = async () => {
     if (!input.trim()) return;
 
     const newMessages = [...messages, { text: input, sender: "user" }];
     setMessages(newMessages);
     setInput("");
 
     try {
       const response = await fetch(API_URL, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ contents: [{ parts: [{ text: PROMPT + "\n\nUser: " + input + "\nBot:" }] }] })
       });
       const data = await response.json();
       const botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "Question out of context";
       setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
     } catch (error) {
       setMessages([...newMessages, { text: "Error getting response", sender: "bot" }]);
     }
   };
 
   return (
     <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", padding: 2 }}>
       <Typography variant="h5" textAlign="center" gutterBottom>
         Help ChatBot
       </Typography>
       <Paper sx={{ height: 400, overflowY: "auto", padding: 2, marginBottom: 2 }}>
         {messages.map((msg, index) => (
           <Typography
             key={index}
             sx={{
               textAlign: msg.sender === "user" ? "right" : "left",
               margin: "8px 0",
               padding: "8px",
               backgroundColor: msg.sender === "user" ? "#e3f2fd" : "#f3e5f5",
               borderRadius: "10px",
             }}
           >
             {msg.text}
           </Typography>
         ))}
       </Paper>
       <Box display="flex">
         <TextField
           fullWidth
           variant="outlined"
           placeholder="Ask about TalentChain..."
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyPress={(e) => e.key === "Enter" && handleSend()}
         />
         <IconButton color="primary" onClick={handleSend}>
           <SendIcon />
         </IconButton>
       </Box>
     </Box>
   );
 };
 
 export default ChatBotStartup;