import { lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";
import PropTypes from "prop-types";
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/startup-dashboard/Default")),
);

//Complete Profile (Business)
const CompleteProfileBusiness = Loadable(
  lazy(() => import("views/completeprofile/marketing/CompleteProfile")),
);
const Youtube = Loadable(lazy(() => import("views/youtube/Youtube")));

// Setting Page
const Setting = Loadable(lazy(() => import("views/setting/business/Setting")));
// Account Page
const AccountPage = Loadable(
  lazy(() => import("views/accounts/business/Account")),
);
// events
const Event = Loadable(lazy(() => import("views/event/Event")));
const CreateEvent = Loadable(lazy(() => import("views/event/CreateEvent")));
const SelectedEvent = Loadable(lazy(() => import("views/event/SelectedEvent")));
const EditEvent = Loadable(lazy(() => import("views/event/EditEvent")));
//startup explore
const SExplore = Loadable(
  lazy(() => import("views/startup_exploree/SExplore")),
);
// explore
//const Explore = Loadable(lazy(() => import("views/explore/Explore")));
//startup gifting
const Gifting = Loadable(lazy(() => import("views/startup_gifting/Gifting")));

// freelancer gifting
const GiftedfreelancerList = Loadable(
  lazy(() => import("views/freelancer_gifting/GiftedFreelancerList")),
);
const FreelancerProductList = Loadable(
  lazy(() => import("views/freelancer_gifting/ProductList")),
);
const AddProduct = Loadable(
  lazy(() => import("views/freelancer_gifting/AddProduct")),
);
const SendGift = Loadable(
  lazy(() => import("views/freelancer_gifting/components/SendGift")),
);
const GiftingExplore = Loadable(
  lazy(() => import("views/freelancer_gifting/explore_gifting/Explore")),
);

// campaign

const CreateCampaign = Loadable(
  lazy(() => import("views/campaign/startup/CreateCampaign")),
);

const ChatBotStartup = Loadable(
  lazy(() => import("views/campaign/startup/ChatBotStartup")),
);
const EditCampaign = Loadable(
  lazy(() => import("views/campaign/EditCampaign")),
);
const ExploreCampaign = Loadable(
  lazy(() => import("views/campaign/explore/Explore")),
);
const SelectedCampaign = Loadable(
  lazy(() => import("views/campaign/SelectedCampaign")),
);
const CampaignDraft = Loadable(
  lazy(() => import("views/campaign/BusinessDraft/Draft")),
);
const CampaignList2 = Loadable(
  lazy(() => import("views/campaign/startup/CampaignList2")),
);
const ViewCampaign = Loadable(
  lazy(() => import("views/campaign/startup/ViewCampaign")),
);
const ViewFreelancer = Loadable(
  lazy(() => import("views/campaign/startup/ViewFreelancer")),
);

// try
const Try = Loadable(lazy(() => import("views/Try")));

const ProtectedRoute = ({ children }) => {
  const { userType, authToken, isLoading } = useAuth(); // Get the user type, auth token, and loading state from the hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!authToken || userType !== "startup")) {
      navigate("/login"); // Redirect to login if authToken is missing or userType is not 'business' after loading
    }
  }, [authToken, userType, isLoading, navigate]);

  return isLoading ? null : userType === "startup" ? children : null; // Render children if isLoading is false and userType is 'business'
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/startup",
  element: <MainLayout />,
  children: [
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      ),
    },
    {
      path: "chatbot",
      element: (
        <ProtectedRoute>
          <ChatBotStartup />
        </ProtectedRoute>
      ),
    },
    {
      path: "try",
      element: <Try />,
    },

    {
      path: "event",
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Event />
            </ProtectedRoute>
          ),
        },
        {
          path: "create-event",
          element: (
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-event/:id",
          element: (
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          ),
        },
        {
          path: ":id",
          element: (
            <ProtectedRoute>
              <SelectedEvent />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "gifting-campaigns", // or just "gifting" if it's your main gifting view
      element: (
        <ProtectedRoute>
          <Gifting />
        </ProtectedRoute>
      ),
    },

    {
      path: "campaign",
      children: [
        {
          path: "create-campaign",
          element: (
            <ProtectedRoute>
              <CreateCampaign />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-campaign/:campaignId",
          element: (
            <ProtectedRoute>
              <EditCampaign />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "view/:campaignId", // this matches /startup/campaign/view/123 etc.
          element: (
            <ProtectedRoute>
              <ViewCampaign />
            </ProtectedRoute>
          ),
        },

        {
          path: "explore/:campaignId",
          element: (
            <ProtectedRoute>
              <ExploreCampaign />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "campaign-list",
          element: (
            <ProtectedRoute>
              <CampaignList2 />
            </ProtectedRoute>
          ),
        },
        {
          path: ":slug/:id",
          element: (
            <ProtectedRoute>
              <SelectedCampaign />
            </ProtectedRoute>
          ),
        },
        {
          path: "draft/:freelancerId/:campaignId/:amount",
          element: (
            <ProtectedRoute>
              <CampaignDraft />
            </ProtectedRoute>
          ),
        },
        {
          // ADD THIS OUTSIDE "campaign" CHILDREN ARRAY, directly inside children

          path: "freelancer/view/:id", // now it's /startup/freelancer/view/:id
          element: (
            <ProtectedRoute>
              <ViewFreelancer />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "SExplore",
      element: <SExplore />,
    },
    {
      path: "gifting",
      children: [
        {
          path: "freelancerlist",
          element: <GiftedfreelancerList />,
        },
        {
          path: "productlist",
          element: <FreelancerProductList />, // ✅ Now it matches
        },
        {
          path: "addproduct",
          element: <AddProduct />,
        },
        {
          path: "sendgift/:id",
          element: <SendGift />,
        },
        {
          path: "explore",
          element: <GiftingExplore />,
        },
      ],
    },
    {
      path: "Setting",
      element: (
        <ProtectedRoute>
          <Setting />
        </ProtectedRoute>
      ),
    },
    {
      path: "account",
      element: (
        <ProtectedRoute>
          <AccountPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "completeprofile",
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <CompleteProfileBusiness />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "youtube",
      element: <Youtube />,
    },
  ],
};

export default MainRoutes;
