// import i18next from 'i18next';
// import ar from './navigation-i18n/ar';
// import en from './navigation-i18n/en';
// import tr from './navigation-i18n/tr';

// i18next.addResourceBundle('en', 'navigation', en);
// i18next.addResourceBundle('tr', 'navigation', tr);
// i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: "master",
    title: "Master Data",
    type: "collapse",
    icon: "check_box",
    children: [
      // {
      //   id: 'masterAnalisa',
      //   title: 'Analisa',
      //   // translate: 'Stok Barang',
      //   type: 'item',
      //   icon: 'heroicons-outline:collection',
      //   url: '/apps/masterAnalisa/',
      // },
      {
        id: "masterNasabah",
        title: "Nasabah",
        // translate: 'Stok Barang',
        type: "item",
        icon: "heroicons-outline:collection",
        url: "/apps/masterNasabah/",
      },
      // {
      //   id: 'masterStaff',
      //   title: 'Staff',
      //   // translate: 'Stok Barang',
      //   type: 'item',
      //   icon: 'heroicons-outline:collection',
      //   url: '/apps/masterStaff/',
      // },
    ],
  },
  {
    id: "permohonan",
    title: "Permohonan",
    // translate: 'Barang Keluar',
    type: "item",
    icon: "exit_to_app",
    url: "/apps/permohonan/",
  },
  {
    id: "pengajuan",
    title: "Pengajuan",
    // translate: 'Barang Masuk',
    type: "item",
    icon: "move_to_inbox",
    url: "/apps/pengajuan/",
  },
  {
    id: "angsuran",
    title: "Approval",
    // translate: 'Data Barang',
    type: "item",
    icon: "heroicons-outline:shopping-cart",
    url: "/apps/permohonan/",
  },
  {
    id: "user",
    title: "User",
    // translate: 'User',
    type: "item",
    icon: "heroicons-outline:user-circle",
    url: "/apps/userRoles/",
  },
];

export default navigationConfig;
