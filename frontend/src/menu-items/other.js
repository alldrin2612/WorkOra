// assets
import { IconUser, IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconUser, IconSettings };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/startup/account',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'Setting',
      title: 'Setting',
      type: 'item',
      url: '/startup/setting',
      icon: icons.IconSettings,
      external: true,
    }
  ]
};

export default other;
