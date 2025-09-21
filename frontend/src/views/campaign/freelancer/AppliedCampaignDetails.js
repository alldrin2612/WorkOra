import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Avatar, Stack, Box, Link, Divider, Chip } from "@mui/material";
import { useParams } from "react-router-dom";

const AppliedCampaignDetails = () => {
  const { startupId, campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/freelancer/campaign-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startupId, campaignId }),
        });

        const data = await response.json();
        if (response.ok) {
          const {
            campaignDetails,
            startupName,
            startupImage,
          } = data;

          setCampaign({
            ...campaignDetails,
            startupName,
            logo: startupImage,
          });
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [startupId, campaignId]);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (!campaign) return <Typography align="center">Campaign not found</Typography>;

  return (
    <Card sx={{ mt: 4, p: 3, backgroundColor: "#fffefc", borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar src={campaign.logo} alt={campaign.startupName} sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold" color="#2c3e50">{campaign.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              by {campaign.startupName}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Description:</strong> {campaign.desc}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" sx={{ mb: 1 }}><strong>Prize:</strong> {campaign.prize}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}><strong>Start Date:</strong> {campaign.start_date}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}><strong>Status:</strong> 
          <Chip label={campaign.status} color={campaign.status === "Active" ? "success" : "default"} variant="outlined" />
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}><strong>Required Skills:</strong> {(campaign.skills || []).join(", ")}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" sx={{ mb: 1 }}><strong>Important Links:</strong></Typography>
        <ul>
          {campaign.repository && <li><Link href={campaign.repository} target="_blank">Repository</Link></li>}
          {campaign.app_link && <li><Link href={campaign.app_link} target="_blank">App Link</Link></li>}
          {campaign.guide_link && <li><Link href={campaign.guide_link} target="_blank">User Guide</Link></li>}
          {campaign.documentation_link && <li><Link href={campaign.documentation_link} target="_blank">Developer Docs</Link></li>}
          {campaign.forum_link && <li><Link href={campaign.forum_link} target="_blank">Governance Forum</Link></li>}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AppliedCampaignDetails;
