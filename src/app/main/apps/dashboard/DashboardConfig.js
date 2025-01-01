
import Dashboard from './pages/Dashboard';
// const BarangKeluar = lazy(() => import('./pages/BarangKeluar'));;

const DashboardConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/dashboard/',
      element: <Dashboard />,
    },
  ],
};

export default DashboardConfig;
