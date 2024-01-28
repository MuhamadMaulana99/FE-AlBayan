import BarangKeluarConfig from './barangKeluar/BarangKeluarConfig';
import AngsuranConfig from './koperasi/angsuran/AngsuranConfig';
import AnalisaConfig from './master/analisa/AnalisaConfig';
import KasirConfig from './master/kasir/KasirConfig';
import StaffConfig from './master/staff/StaffConfig';
import SupllayerConfig from './supllayer/SupllayerConfig';
import UserRolesConfig from './userRoles/UserRolesConfig';

const appsConfigs = [
  BarangKeluarConfig,
  SupllayerConfig,
  UserRolesConfig,
  AnalisaConfig,
  KasirConfig,
  StaffConfig,
  AngsuranConfig
];

export default appsConfigs;
