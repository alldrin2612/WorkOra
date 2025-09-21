import { lazy } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";
import PropTypes from "prop-types";
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// ==============================|| LOADABLE PAGES ||============================== //

const DashboardDefault = Loadable(lazy(() => import("views/freelancer-dashboard/Default")));
const Setting = Loadable(lazy(() => import("views/setting/freelancer/Setting")));
const CompleteProfilefreelancer = Loadable(lazy(() => import("views/completeprofile/freelancers/CompleteProfile")));
const Campaign = Loadable(lazy(() => import("views/campaign/freelancer/CampaignList")));
const ViewCampaign = Loadable(lazy(() => import("views/campaign/freelancer/ViewCampaign")));
const SelectedCampaign = Loadable(lazy(() => import("views/campaign/freelancer/SelectedCampaign")));
const CampaignDraft = Loadable(lazy(() => import("views/campaign/freelancer/Draft")));
const AppliedCampaign = Loadable(lazy(() => import("views/campaign/freelancer/AppliedCampaign")));
const AppliedCampaignDetails = Loadable(lazy(() => import("views/campaign/freelancer/AppliedCampaignDetails")));

const Event = Loadable(lazy(() => import("views/event/freelancer_event/FreelancerEvent")));
const ExploreEvent = Loadable(lazy(() => import("views/event/freelancer_event/ExploreEvent")));
const SelectedEvent = Loadable(lazy(() => import("views/event/freelancer_event/SelectedEvent")));
const ChatBotFreelancer = Loadable(lazy(() => import("views/campaign/freelancer/ChatBotFreelancer"))); // Added ChatBotFreelancer
const Gifting = Loadable(lazy(() => import("views/freelancer_gifting/freelancer/AcceptedGift")));

const Account = Loadable(lazy(() => import("views/accounts/freelancer/account")));
const Try = Loadable(lazy(() => import("views/Try")));
const Youtube = Loadable(lazy(() => import("views/youtube/Youtube")));
const Tasks = Loadable(lazy(() => import("views/tasks/Tasks")));
const ViewTasks = Loadable(lazy(() => import("views/tasks/ViewTasks")));

// ==============================|| PROTECTED ROUTE ||============================== //

const ProtectedRoute = ({ children }) => {
  const { userType, authToken, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!authToken || userType !== "freelancer")) {
      navigate("/login");
    }
  }, [authToken, userType, isLoading, navigate]);

  return isLoading ? null : userType === "freelancer" ? children : null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/freelancer",
  element: <MainLayout />,
  children: [
    { path: "dashboard", element: <ProtectedRoute><DashboardDefault /></ProtectedRoute> },
    { path: "account", element: <ProtectedRoute><Account /></ProtectedRoute> },
    { path: "setting", element: <ProtectedRoute><Setting /></ProtectedRoute> },
    { path: "try", element: <Try /> },
    { path: "completeprofile", element: <ProtectedRoute><CompleteProfilefreelancer /></ProtectedRoute> },
    { path: "chatbot", element: <ProtectedRoute><ChatBotFreelancer /></ProtectedRoute> },

    {
      path: "campaign",
      children: [
        { path: "", element: <ProtectedRoute><Campaign /></ProtectedRoute> },
        { path: "view/:startupId/:campaignId", element: <ProtectedRoute><ViewCampaign /></ProtectedRoute> },
        { path: "applied-campaign", element: <ProtectedRoute><AppliedCampaign /></ProtectedRoute> },
        { path: "applied-campaign-details/:startupId/:campaignId", element: <ProtectedRoute><AppliedCampaignDetails /></ProtectedRoute> },
        { path: ":slug/:id", element: <ProtectedRoute><SelectedCampaign /></ProtectedRoute> },
        { path: "draft/:id/:slug", element: <ProtectedRoute><CampaignDraft /></ProtectedRoute> },
         // Added ChatBotFreelancer route
      ]
    },

    {
      path: "event",
      children: [
        { path: "", element: <ProtectedRoute><Event /></ProtectedRoute> },
        { path: "explore", element: <ProtectedRoute><ExploreEvent /></ProtectedRoute> },
        { path: ":slug/:id", element: <ProtectedRoute><SelectedEvent /></ProtectedRoute> },
      ]
    },

    {
      path: "gifting",
      children: [
        { path: "", element: <ProtectedRoute><Gifting /></ProtectedRoute> },
        // You can add gift request routes here later if needed
      ]
    },

    { path: "youtube", element: <Youtube /> },
    { path: "tasks", element: <ProtectedRoute><Tasks /></ProtectedRoute> },
    { path: "view-tasks/:startupId/:campaignId", element: <ProtectedRoute><ViewTasks /></ProtectedRoute> },
  ]
};

export default MainRoutes;
