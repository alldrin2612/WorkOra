import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import ImenuItem from '../../../../menu-items/Iindex';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {

  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        // Retrieve the access token from local storage
        const accessToken = localStorage.getItem('authToken');

        if (!accessToken) {
          console.error('Access token not found in local storage.');
          return;
        }

        const response = await fetch("http://localhost:4000/api/auth/user_is", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          }
        });
        const data = await response.json();

        // Check if user is a startup or freelancer
        if (data.role=='startup') {
          setUserType('startup');
        } else if (data.role=='freelancer') {
          setUserType('freelancer');
        } else {
          console.error('User type not recognized.');
        }
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserType();
  }, []);

  const navItems = userType === 'startup' ? (
    menuItem.items.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    })
  ) : (
    ImenuItem.items.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    })
  );

  return <>{navItems}</>;
};

export default MenuList;
