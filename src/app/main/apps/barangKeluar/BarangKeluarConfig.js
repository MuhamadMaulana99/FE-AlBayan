import i18next from 'i18next';

import { lazy } from 'react';
import en from '../i18n/en';
import tr from '../i18n/tr';
import ar from '../i18n/ar';
// import BarangKeluar from './pages/BarangKeluar';
const BarangKeluar = lazy(() => import('./pages/BarangKeluar'));

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);
const BarangKeluarConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/barangKeluar/',
      element: <BarangKeluar />,
    },
  ],
};

export default BarangKeluarConfig;
