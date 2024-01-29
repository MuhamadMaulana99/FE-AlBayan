
import { lazy } from 'react';
import Permohonan from './pages/Permohonan';
// const BarangKeluar = lazy(() => import('./pages/BarangKeluar'));;

const PermohonanConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/permohonan/',
      element: <Permohonan />,
    },
  ],
};

export default PermohonanConfig;
