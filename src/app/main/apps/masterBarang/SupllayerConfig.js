/* eslint-disable import/extensions */
import i18next from 'i18next';

import en from '../i18n/en';
import tr from '../i18n/tr';
import ar from '../i18n/ar';
import Supllayer from './pages/Supllayer';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
const SupllayerConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/suplliyer/',
      element: <Supllayer />,
    },
  ],
};

export default SupllayerConfig;
