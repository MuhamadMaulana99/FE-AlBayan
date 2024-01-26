import i18next from 'i18next';

import en from '../i18n/en';
import tr from '../i18n/tr';
import ar from '../i18n/ar';
import BarangMasuk from './pages/BarangMasuk';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
const BarangMasukConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/barangMasuk/',
      element: <BarangMasuk />,
    },
  ],
};

export default BarangMasukConfig;
