import AngsuranConfig from './koperasi/angsuran/AngsuranConfig';
import PengajuanConfig from './koperasi/pengajuan/PengajuanConfig';
import AnalisaConfig from './master/analisa/AnalisaConfig';
import KasirConfig from './master/kasir/KasirConfig';
import StaffConfig from './master/staff/StaffConfig';
import SupllayerConfig from './supllayer/SupllayerConfig';
import UserRolesConfig from './userRoles/UserRolesConfig';

const appsConfigs = [
  SupllayerConfig,
  UserRolesConfig,
  AnalisaConfig,
  KasirConfig,
  StaffConfig,
  AngsuranConfig,
  PengajuanConfig
];

export default appsConfigs;
