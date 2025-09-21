import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, NavLink } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Avatar, CircularProgress, Container, TextField, Button, Box, Chip } from "@mui/material";
import { Search, CalendarToday } from "@mui/icons-material";
import { SiEthereum } from "react-icons/si";

const fetchCampaigns = async ({ pageParam = 1 }) => {
  const { data } = await axios.post("http://localhost:4000/api/freelancer/explore-campaigns", {
    page: pageParam,
    limit: 10
  });
  return data;
};

const CampaignList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { ref, inView } = useInView();

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
  });

  const filteredCampaigns = data?.pages.flatMap((page) => page.campaigns) || [];

  const handleViewCampaign = (startupId, campaignId) => {
    navigate(`/freelancer/campaign/view/${startupId}/${campaignId}`);
  };
  
  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#252526" }}>Explore Campaigns</Typography>
        
{/* Updated NavLink to Create Campaign Page */}
<Button 
  component={NavLink} 
  to="/freelancer/campaign/applied-campaign"  // ✅ Fixed path
  sx={{ 
    color: "white", 
    backgroundColor: '#252526', 
    borderColor: "#252526", 
    borderWidth: "2px", 
    '&:hover': { backgroundColor: "white", color: "#252526", borderColor: "#252526", borderWidth: "2px" } 
  }} 
  variant="outlined"
>
  Applied Campaigns
</Button>

      </Box>
      
      <Container sx={{ mt: 4, backgroundColor: "#f8f9ff", borderRadius: 4, p: 4, boxShadow: 2 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Search sx={{ mr: 1, color: "gray" }} />
          <TextField 
            fullWidth 
            placeholder="Search campaigns" 
            variant="outlined" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        
        {data?.pages.length === 0 ? (
          <Grid container justifyContent="center">
            <Typography>No campaigns available</Typography>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {filteredCampaigns.filter((campaign) => 
              campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((campaign, index) => (
              <Grid item xs={12} sm={6} md={4} key={campaign.campaignId} ref={index === filteredCampaigns.length - 1 ? ref : null}>
                <Card sx={{ p: 2, borderRadius: 3, display: "flex", alignItems: "center", gap: 2, boxShadow: 3, backgroundColor: "white", height: 320 }}>
                  <Avatar 
                    src={campaign.startupImage} 
                    alt={campaign.startupName} 
                    sx={{ width: 110, height: 110, border: "3px solid #ddd" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {campaign.campaignName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontWeight="bold">
                      {campaign.startupName}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1} gap={1}>
                      <CalendarToday fontSize="small" color="primary" />
                      <Typography variant="body2" color="textSecondary">
                        {campaign.campaignStartDate}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mt={1} gap={1}>
                      <Chip label="Budget" variant="outlined" size="small" />
                      <Typography variant="body2" fontWeight="bold" color="textSecondary" display="flex" alignItems="center">
                        {campaign.campaignBudget} <SiEthereum size={14} color="#3C3C3D" />
                      </Typography>
                    </Box>
                    <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                      {campaign.skills.slice(0, 4).map((skill, index) => (
                        <Chip key={index} label={skill} variant="outlined" sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "#5a67d8", borderColor: "#c3dafe", backgroundColor: "#ebf4ff" }} />
                      ))}
                    </Box>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      onClick={() => handleViewCampaign(campaign.startupId, campaign.campaignId)}
                      
                      sx={{ mt: 2,backgroundColor: "#252526", borderRadius: 20, textTransform: "none", fontWeight: "bold" }}
                    >
                      View Campaign
                    </Button>
                                    {/* <Button 
                                      sx={{ 
                                        marginTop: 1, 
                                        backgroundColor: "#252526", 
                                        color: "#fff", 
                                        "&:hover": { backgroundColor: "#3a3a3a" } 
                                      }} 
                                      variant="contained" 
                                      fullWidth
                                    >
                                      View Campaign
                                    </Button> */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {isFetchingNextPage && <Grid container justifyContent="center"><CircularProgress /></Grid>}
      </Container>
    </>
  );
};

export default CampaignList;
