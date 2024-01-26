import i18next from 'i18next';

import en from '../i18n/en';
import tr from '../i18n/tr';
import ar from '../i18n/ar';
import UserRoles from './pages/UserRoles';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
const UserRolesConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/userRoles/',
      element: <UserRoles />,
    },
  ],
};

export default UserRolesConfig;
