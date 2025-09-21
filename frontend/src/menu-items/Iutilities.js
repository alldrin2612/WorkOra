// assets
import { IconBrandCashapp, IconShadow, IconWindmill, IconGift } from '@tabler/icons-react';

// constant
const icons = {
  IconBrandCashapp,
  IconShadow,
  IconWindmill,
  IconGift
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  type: 'group',
  children: [
    {
      id: 'explore',
      title: 'Tasks',
      type: 'item',
      url: '/freelancer/tasks',
      icon: icons.IconBrandCashapp,
      breadcrumbs: false
    },
    {
      id: 'gifts',
      title: 'Gifts',
      type: 'item',
      url: '/freelancer/gifting',
      icon: icons.IconGift,   // use 'icons.IconGift' not 'IconGift'
      breadcrumbs: false
    },
    {
      id: 'freelancerupaskhelp',
      title: 'Ask Help',
      type: 'item',
      icon: icons.IconWindmill,
      url: '/freelancer/chatbot', // Updated to match the ChatBot route
    }
  ]
};

export default utilities;
