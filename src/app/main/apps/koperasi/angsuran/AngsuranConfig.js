
import { lazy } from 'react';
import Angsuran from './pages/Angsuran';
// const BarangKeluar = lazy(() => import('./pages/BarangKeluar'));;

const AngsuranConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/angsuran/',
      element: <Angsuran />,
    },
  ],
};

export default AngsuranConfig;
