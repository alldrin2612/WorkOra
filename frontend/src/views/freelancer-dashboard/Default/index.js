import { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { NavLink } from 'react-router-dom';
import EarningCard from "./EarningCard";
import TotalView from "./TotalView";
import PopularCard from "./PopularCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import CompleteProfileCard from "./CompleteProfileCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "store/constant";
import YouTubeIcon from '@mui/icons-material/YouTube';
import Button from "@mui/material/Button";

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [showCompleteProfileCard, setShowCompleteProfileCard] = useState(false);
  // const [userType, setUserType] = useState(null);
  const [overallChannelAnalytics, setOverallChannelAnalytics] = useState({});
  // const [avgView, setAvgView] = useState("");
  // const [views, setViews] = useState("");
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  console.log(error)

  useEffect(() => {
    const fetchFreelancerStats = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:4000/api/freelancer/freelancer-stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({}) // Empty body because backend expects POST
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching freelancer stats:', err.message);
        setError(err.message);
      }
    };

    fetchFreelancerStats();
  }, []);

  useEffect(() => {
    const dummyUser = {
      is_freelancer: true,
      is_business: false,
      freelancer: [
        {
          id: 1,
          name: "John Doe",
          slug: "john-doe",
          email: "john@example.com",
          phone: "123-456-7890",
          website: "www.johndoe.com",
          address: "123 Main St",
          country: "USA",
          description: "Tech and gaming freelancer",
          instagram: "https://instagram.com/johndoe",
          facebook: "https://facebook.com/johndoe",
          annual_revenue: 50000,
          industry: "Tech",
          pincode: "90210",
          user: 1
        }

      ],
      business: []
    };

    // localStorage.setItem('user', JSON.stringify(dummyUser));
    localStorage.setItem('youtubeAccessToken', 'dummyAccessToken123');
    localStorage.setItem('youtubeRefreshToken', 'dummyRefreshToken123');

    const payload1 = dummyUser;
    let payload = payload1;

    if (payload1.is_freelancer === true) {
      payload = payload.freelancer[0];
      // setUserType("freelancer");
    } else if (payload1.is_business === true) {
      payload = payload.business[0];
      // setUserType("business");
    }

    const hasNullValues = payload && Object.values(payload).some(value => value === null);


    const fetchData = () => {
      // const dummyData = {
      //   overallChannelAnalytics: {
      //     views: "100",
      //     averageViewDuration: "20"
      //   }
      // };

      const dummyOverallChannelAnalytics = {
        averageViewPercentage: 72.5,
        subscribersGained: 500,
        comments: 120,
        likes: 350
      };

      const dummyMonthlyAnalytics = [
        /* dummy monthly data */

        { month: 'Jan', views: 1200, likes: 400, subscribersGained: 50 },
        { month: 'Feb', views: 1500, likes: 500, subscribersGained: 60 },
        { month: 'Mar', views: 1800, likes: 600, subscribersGained: 70 },
        { month: 'Apr', views: 1400, likes: 450, subscribersGained: 55 },
        { month: 'May', views: 1600, likes: 480, subscribersGained: 58 },
        { month: 'Jun', views: 1900, likes: 630, subscribersGained: 75 },
        { month: 'Jul', views: 1700, likes: 520, subscribersGained: 65 },
        { month: 'Aug', views: 1300, likes: 400, subscribersGained: 52 },
        { month: 'Sep', views: 1550, likes: 530, subscribersGained: 60 },
        { month: 'Oct', views: 2000, likes: 700, subscribersGained: 80 },
        { month: 'Nov', views: 1450, likes: 470, subscribersGained: 57 },
        { month: 'Dec', views: 2100, likes: 800, subscribersGained: 85 }
      ];

      setMonthlyAnalytics(dummyMonthlyAnalytics);
      setOverallChannelAnalytics(dummyOverallChannelAnalytics);
      // setAvgView(dummyData.overallChannelAnalytics.averageViewDuration);
      // setViews(dummyData.overallChannelAnalytics.views);
      setLoading(false);
    };

    fetchData();
    setShowCompleteProfileCard(hasNullValues);
  }, []);

  const youtubeAccessToken = localStorage.getItem("youtubeAccessToken");
  const youtubeRefreshToken = localStorage.getItem("youtubeRefreshToken");

  return (
    <Grid container spacing={gridSpacing}>
      {showCompleteProfileCard && (
        <Grid item sm={12} xs={12} md={12} lg={12} component={NavLink} to="/freelancer/completeprofile">
          <CompleteProfileCard isLoading={isLoading} />
        </Grid>
      )}
      {!youtubeAccessToken || !youtubeRefreshToken ? (
        <Grid item xs={12} sm={12} md={6} lg={12}>
          <Box sx={{ width: 1, height: "400px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 24 }}>Your Youtube account is not connected</Typography>
            <Button
              component={NavLink} to="http://localhost:7000/login"
              sx={{ marginTop: "20px", paddingX: "40px", paddingY: "10px", fontSize: "14px", backgroundColor: "red" }}
              variant="contained"
              tabIndex={-1}
              startIcon={<YouTubeIcon />}
            >
              Connect Youtube
            </Button>
          </Box>
        </Grid>
      ) : (
        <>
          {/* Your existing JSX for cards and analytics */}

          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} completedCampaigns={stats?.completedCampaigns} />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalView isLoading={isLoading} totalRewards={stats?.totalRewards} />
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeDarkCard isLoading={isLoading} assignedCampaignsCount={stats?.assignedCampaignsCount} />
                  </Grid>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <TotalIncomeLightCard isLoading={isLoading} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={8}>
                <TotalGrowthBarChart isLoading={isLoading} overallChannelAnalytics={overallChannelAnalytics} monthlyAnalytics={monthlyAnalytics} />
              </Grid>
              <Grid item xs={12} md={4}>
                <PopularCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>

        </>
      )}
    </Grid>
  );
};

export default Dashboard;
