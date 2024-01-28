
import { lazy } from 'react';
import Pengajuan from './pages/Pengajuan';
// const BarangKeluar = lazy(() => import('./pages/BarangKeluar'));;

const PengajuanConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/pengajuan/',
      element: <Pengajuan />,
    },
  ],
};

export default PengajuanConfig;
