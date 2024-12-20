
import { lazy } from 'react';
import Approval from './pages/Approval';
// const BarangKeluar = lazy(() => import('./pages/BarangKeluar'));;

const ApprovalConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/approval/',
      element: <Approval />,
    },
  ],
};

export default ApprovalConfig;
