import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Grid,
  Chip,
  Stack
} from '@mui/material';

const Gifting = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCompletedCampaigns = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const res = await fetch('http://localhost:4000/api/startup/completed-campaigns', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok && data.completedCampaigns) {
          const formattedCampaigns = data.completedCampaigns.map(campaign => ({
            id: campaign.campaignId,
            name: campaign.name,
            startDate: campaign.start_date,
            prize: parseFloat(campaign.prize),
            status: campaign.status,
            completedBy: campaign.freelancers.map(f => ({
              name: f.name,
              avatar: f.image,
              walletAddress: f.walletaddress,
              id: f.freelancerId
            }))
          }));

          setCampaigns(formattedCampaigns);
        } else {
          console.error('Failed to load campaigns:', data);
        }
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    fetchCompletedCampaigns();
  }, []);

  const handleSendPrize = async (prizeAmount, recipientAddress, campaignId, freelancerId) => {
    try {
      // Dummy gifting: directly record reward on backend and show confirmation
      const token = localStorage.getItem('authToken');

      const res = await fetch('http://localhost:4000/api/startup/rewards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          freelancerId,
          campaignId
        })
      });

      const rewardResponse = await res.json();

      if (res.ok) {
        alert('Gift sent');
        // Optionally refresh campaign list
        setCampaigns(prev =>
          prev.map(c => c.id === campaignId ? { ...c, status: 'Reward Sent' } : c)
        );
      } else {
        console.error('Failed to record reward:', rewardResponse);
        alert('Failed to record gift. Please try again.');
      }

    } catch (err) {
      console.error('Gift action failed:', err);
      alert(`Gift failed: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Gifting Center
      </Typography>

      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {campaign.name}
                </Typography>

                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Start Date:</strong> {campaign.startDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Prize:</strong> {campaign.prize} ETH
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong>{' '}
                    <Chip
                      label={campaign.status}
                      color={
                        campaign.status === 'Completed' ? 'success' :
                          campaign.status === 'Reward Sent' ? 'warning' : 'default'
                      }
                      size="small"
                    />
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mt={2} flexWrap="wrap">
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      <strong>Completed by:</strong>
                    </Typography>
                    {campaign.completedBy.length > 0 && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar src={campaign.completedBy[0].avatar} sx={{ width: 24, height: 24 }} />
                        <Typography variant="body2">{campaign.completedBy[0].name}</Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </CardContent>

              <CardActions sx={{ justifyContent: 'flex-end', pr: 2, pb: 2 }}>
                {campaign.completedBy.length > 0 && campaign.status === 'Completed' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleSendPrize(
                        campaign.prize,
                        campaign.completedBy[0].walletAddress,
                        campaign.id,
                        campaign.completedBy[0].id
                      )
                    }
                  >
                    Send Prize
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gifting;
