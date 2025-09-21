import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

import { GoogleOAuthProvider } from "@react-oauth/google";

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register')));
const AuthRegisterBusiness = Loadable(lazy(() => import('views/pages/authentication/authentication3/businessRegister')));
const AuthRegisterfreelancer = Loadable(lazy(() => import('views/pages/authentication/authentication3/freelancerRegister')));
const AccountType = Loadable(lazy(() => import('views/pages/authentication/AccountType')));
const ConnectWallet = Loadable(lazy(() => import('views/pages/authentication/ConnectWallet')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

//For Google login

const GoogleWrapperLogin = ()=>(
  <GoogleOAuthProvider clientId="686500186047-5ke9qm74k6v9ri8ghjelomqqnqatl5ea.apps.googleusercontent.com">
    <AuthLogin></AuthLogin>
  </GoogleOAuthProvider>
)

const GoogleWrapperRegister = ()=>(
  <GoogleOAuthProvider clientId="686500186047-5ke9qm74k6v9ri8ghjelomqqnqatl5ea.apps.googleusercontent.com">
    <AuthRegister></AuthRegister>
  </GoogleOAuthProvider>
)

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <GoogleWrapperLogin />
    },
    {
      path: 'register',
      children:[
        {
          path: '',
          element: <GoogleWrapperRegister />,
        },
        {
          path: 'business',
          element: <AuthRegisterBusiness />,
        },
        {
          path: 'freelancer',
          element: <AuthRegisterfreelancer />,
        },
      ]
      
    },
    {
      path: 'accounttype',
      element: <AccountType />
    },
    {
      path: 'connectwallet/:type',
      element: <ConnectWallet />
    },
  ]
};

export default AuthenticationRoutes;
