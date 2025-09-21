// assets
import { IconWorld, IconShadow, IconWindmill, IconGift } from '@tabler/icons-react';

// constant
const icons = {
  IconWorld,
  IconShadow,
  IconWindmill,
  IconGift
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  // title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'sexplore',
      title: 'Explore',
      type: 'item',
      url: '/startup/sexplore',
      icon: icons.IconWorld,
      breadcrumbs: false
    },
    {
      id: 'influvencer-gifting',
      title: 'Gifting',
      type: 'item',
      url: '/startup/gifting-campaigns',
      icon: icons.IconGift,
      breadcrumbs: false
    },
    {
      id: 'startupaskhelp',
      title: 'Ask Help',
      type: 'item',
      icon: icons.IconWindmill,
      url: '/startup/chatbot',
    }
  ]
};

export default utilities;
