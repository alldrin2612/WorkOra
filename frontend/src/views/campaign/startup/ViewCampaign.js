import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Avatar, Dialog, DialogTitle,
  DialogActions, CircularProgress, Paper, Divider
} from '@mui/material';

const ViewCampaign = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      const accessToken = localStorage.getItem("authToken");
      try {
        const res = await fetch('http://localhost:4000/api/startup/view_campaign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ campaignId }),
        });
        const data = await res.json();
        setCampaign({
          ...data.campaign,
          assignedUsers: data.assignedUsers,
          interestedUsers: data.interestedUsers,
          completedUsers: data.approvalUsers,
        });
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleChange = (field) => (e) => {
    setCampaign((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem("authToken");
    try {
      const res = await fetch('http://localhost:4000/api/startup/update-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          campaignId,
          ...campaign,
        }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  const handleAssign = async (user) => {
    const accessToken = localStorage.getItem("authToken");
    try {
      const res = await fetch('http://localhost:4000/api/startup/assign-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ campaignId, freelancerId: user._id }),
      });
      const data = await res.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error('Error assigning user:', error);
    }
  };

  const handleApprove = async (user) => {
    const accessToken = localStorage.getItem("authToken");
    try {
      const res = await fetch('http://localhost:4000/api/startup/complete-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ campaignId, freelancerId: user._id }),
      });
      const data = await res.json();
      alert(data.message);
      navigate('/startup/campaign/campaign-list');
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleDelete = async () => {
    // Add delete API call here if needed
    alert("Delete functionality not implemented.");
    setOpenDeleteDialog(false);
  };

  const handleReject = (user) => {
    alert(`Rejected user ${user.name}`);
  };

  if (loading || !campaign) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Campaign Details</Typography>
        <Button color="error" onClick={() => setOpenDeleteDialog(true)}>Delete</Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>Edit Campaign</Typography>
        <Divider sx={{ mb: 2 }} />

        <TextField label="Campaign Name" value={campaign.name} onChange={handleChange('name')} fullWidth margin="normal" />
        <TextField label="Description" value={campaign.desc} onChange={handleChange('desc')} fullWidth multiline rows={4} margin="normal" />
        <TextField label="App Link" value={campaign.app_link} onChange={handleChange('app_link')} fullWidth margin="normal" />
        <TextField label="Guide Link" value={campaign.guide_link} onChange={handleChange('guide_link')} fullWidth margin="normal" />
        <TextField label="Documentation Link" value={campaign.documentation_link} onChange={handleChange('documentation_link')} fullWidth margin="normal" />
        <TextField label="Forum Link" value={campaign.forum_link} onChange={handleChange('forum_link')} fullWidth margin="normal" />
        <TextField label="Repository Link" value={campaign.repository} onChange={handleChange('repository')} fullWidth margin="normal" />
        <TextField label="Skills Required" value={campaign.skills} onChange={handleChange('skills')} fullWidth margin="normal" />
        <TextField label="Start Date" value={campaign.start_date} InputProps={{ readOnly: true }} fullWidth margin="normal" />
        <TextField label="Prize" value={campaign.prize} InputProps={{ readOnly: true }} fullWidth margin="normal" />
        <TextField label="Status" value={campaign.status} InputProps={{ readOnly: true }} fullWidth margin="normal" />

        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>Save Changes</Button>
      </Paper>

      {/* Assigned Freelancers */}
      <Section title="Assigned Freelancers">
        {campaign.assignedUsers.length === 0 ? (
          <Typography>No freelancers assigned.</Typography>
        ) : campaign.assignedUsers.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </Section>

      {/* Interested Freelancers */}
      <Section title="Interested Freelancers">
        {campaign.interestedUsers.length === 0 ? (
          <Typography>No interested freelancers.</Typography>
        ) : campaign.interestedUsers.map(user => (
          <UserCard
            key={user._id}
            user={user}
            actions={
              <>
                <Button variant="outlined" sx={{ mr: 1 }} onClick={() => navigate(`/startup/campaign/freelancer/view/${user._id}`)}>
                  View Profile
                </Button>
                <Button variant="contained" onClick={() => handleAssign(user)}>Assign</Button>
              </>
            }
          />
        ))}
      </Section>

      {/* Completed Freelancers */}
      <Section title="Completed Freelancers">
        {campaign.completedUsers.length === 0 ? (
          <Typography>No completed submissions.</Typography>
        ) : campaign.completedUsers.map(user => (
          <UserCard
            key={user._id}
            user={user}
            actions={
              <>
                <Button color="success" variant="contained" sx={{ mr: 1 }} onClick={() => handleApprove(user)}>Approve</Button>
                <Button color="error" variant="contained" onClick={() => handleReject(user)}>Reject</Button>
              </>
            }
          />
        ))}
      </Section>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Are you sure you want to delete this campaign?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Reusable Section Component
const Section = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
    <Paper variant="outlined" sx={{ p: 2 }}>{children}</Paper>
  </Box>
);

// Reusable User Card
const UserCard = ({ user, actions }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    <Avatar src={user.image} sx={{ mr: 2 }} />
    <Box sx={{ flexGrow: 1 }}>
      <Typography>{user.name}</Typography>
    </Box>
    {actions}
  </Box>
);

export default ViewCampaign;
