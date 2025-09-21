import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Box,
} from "@mui/material";

export default function Setting() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveSettings = () => {
    // Handle save logic here (e.g., send to backend)
    alert("Settings saved!");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "white",
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        mt: 5,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Profile Info */}
      <Typography variant="subtitle1" gutterBottom>
        Profile Information
      </Typography>
      <TextField fullWidth label="Full Name" sx={{ mb: 2 }} />
      <TextField fullWidth label="Email Address" sx={{ mb: 2 }} />

      {/* Change Password */}
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
        Change Password
      </Typography>
      <TextField
        fullWidth
        label="Current Password"
        type="password"
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        fullWidth
        label="New Password"
        type="password"
        sx={{ mb: 2 }}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      {/* Notifications */}
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
        Notifications
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={emailNotif}
            onChange={(e) => setEmailNotif(e.target.checked)}
          />
        }
        label="Email Notifications"
      />
      <FormControlLabel
        control={
          <Switch
            checked={smsNotif}
            onChange={(e) => setSmsNotif(e.target.checked)}
          />
        }
        label="SMS Notifications"
      />

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleSaveSettings}
          sx={{
            backgroundColor: "#252526",
            "&:hover": { backgroundColor: "#1e1e1e" },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}
