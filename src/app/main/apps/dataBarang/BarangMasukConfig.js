import i18next from 'i18next';

import en from '../i18n/en';
import tr from '../i18n/tr';
import ar from '../i18n/ar';
import DataBarang from './pages/DataBarang';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
const DataBarangkConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/dataBarang/',
      element: <DataBarang />,
    },
  ],
};

export default DataBarangkConfig;
