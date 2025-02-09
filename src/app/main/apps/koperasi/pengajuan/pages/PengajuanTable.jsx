/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import FuseLoading from "@fuse/core/FuseLoading";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import FuseAnimate from "@fuse/core/FuseAnimate";
import moment from "moment";
import { getUserInfo } from "app/configs/getUserInfo";
import { fetchApi } from "app/configs/fetchApi";

const columns = [
  {
    id: "no",
    label: "NO",
    minWidth: 60,
    align: "left",
    textSytle: "",
  },
  {
    id: "namaNasabah",
    label: "Nama Nasabah",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "rekening",
    label: "Rekening",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "penjualan",
    label: "Penjualan",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "hargaPokok",
    label: "Harga Pokok",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "biaya",
    label: "Biaya",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "labaUsaha",
    label: "Laba Usaha",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "pendapatanLain",
    label: "Pendapatan Lain",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "jumlahPendapatan",
    label: "Jumlah Pendapatan",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "kebutuhanRumahTangga",
    label: "Kebutuhan Rumah Tangga",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "biayaPendidikan",
    label: "Biaya Pendidikan",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "biayaLainya",
    label: "Biaya Lainnya",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "jumlahBiayaLuarUsaha",
    label: "Jumlah Biaya Luar Usaha",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "pendapatanBersih",
    label: "Pendapatan Bersih",
    minWidth: 170,
    align: "left",
    textSytle: "font-bold",
  },
  {
    id: "rasioAngsuran",
    label: "Rasio Angsuran",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "jangkaWaktu",
    label: "Jangka Waktu",
    minWidth: 170,
    align: "left",
    textSytle: "font-bold",
  },
  {
    id: "nominslPermohonan",
    label: "Nominal Permohonan",
    minWidth: 170,
    align: "left",
    textSytle: "font-bold",
  },
  {
    id: "tujuanPembiayaan",
    label: "Tujuan Pembiayaan",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "jaminan",
    label: "Jaminan",
    minWidth: 170,
    align: "left",
    textSytle: "font-bold",
  },
  {
    id: "accPermohonan",
    label: "Max Pembiayaan",
    minWidth: 170,
    align: "left",
    textSytle: "font-bold",
  },
  // {
  //   id: "noAkad",
  //   label: "No Akad",
  //   minWidth: 170,
  //   align: "left",
  //   textSytle: "",
  // },
  // {
  //   id: "approve",
  //   label: "Aprove",
  //   minWidth: 170,
  //   align: "left",
  //   textSytle: "",
  // },
  {
    id: "statusBy",
    label: "StatusBy",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "statusAt",
    label: "StatusAt",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "statusPengajuan",
    label: "Status Pengajuan",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "aksi",
    label: "Aksi",
    minWidth: 170,
    align: "center",
    textSytle: "",
    // format: (value) => value.toFixed(2),
  },
];

function convertToInteger(currency) {
  try {
    // Validasi input harus berupa string
    if (typeof currency !== "string") {
      throw new Error("Input harus berupa string.");
    }

    // Hapus semua karakter yang bukan angka
    let angka = currency.replace(/[^0-9]/g, "");

    // Pastikan hasilnya tidak kosong
    if (angka === "") {
      throw new Error("Nilai angka tidak valid.");
    }

    // Ubah menjadi integer
    return parseInt(angka, 10);
  } catch (error) {
    console.error(error.message);
    return 0; // Nilai default jika terjadi kesalahan
  }
}

function createData(
  no,
  id_pengajuans,
  rekening,
  penjualan,
  hargaPokok,
  biaya,
  labaUsaha,
  pendapatanLain,
  jumlahPendapatan,
  kebutuhanRumahTangga,
  biayaPendidikan,
  biayaLainya,
  jumlahBiayaLuarUsaha,
  pendapatanBersih,
  rasioAngsuran,
  jangkaWaktu,
  nominalPermohonan,
  tujuanPembiayaan,
  jaminan,
  accPermohonan,
  nomorAkad,
  status,
  statusBy,
  statusAt,
  foto
) {
  return {
    no,
    id_pengajuans,
    rekening,
    penjualan,
    hargaPokok,
    biaya,
    labaUsaha,
    pendapatanLain,
    jumlahPendapatan,
    kebutuhanRumahTangga,
    biayaPendidikan,
    biayaLainya,
    jumlahBiayaLuarUsaha,
    pendapatanBersih,
    rasioAngsuran,
    jangkaWaktu,
    nominalPermohonan,
    tujuanPembiayaan,
    jaminan,
    accPermohonan,
    nomorAkad,
    status,
    statusBy,
    statusAt,
    foto,
  };
}

export default function PengajuanTable(props) {
  const { dataPermohonanApprove } = props;
  const currentDate = moment().format();
  const userInfo = getUserInfo();
  const userRoles = userInfo;
  let getAllUserResponse;
  let getResponseName;
  let dataLogin;
  if (userRoles) {
    getAllUserResponse = userRoles?.response?.userRoles;
    getResponseName = userRoles?.response;
    dataLogin = userInfo;
  }
  const dispatch = useDispatch();
  const [getDataEdit, setgetDataEdit] = useState({});
  const [dataEdit, setDataEdit] = useState({
    id: null,
    penjualan: 0,
    namaNasabah: null,
    rekening: null,
    hargaPokok: 0,
    biaya: 0,
    labaUsaha: 0,
    pendapatanLain: 0,
    jumlahPendapatan: 0,
    kebutuhanRumahTangga: 0,
    biayaPendidikan: 0,
    biayaLainnya: 0,
    jumlahBiayaLuarUsaha: 0,
    pendapatanBersih: null,
    rasioAngsuran: 0,
    jangkaWaktu: 0,
    nominalPermohonan: 0,
    tujuanPembiayaan: null,
    jaminan: 0,
    biayaLainya: 0,
    accPermohonan: 0,
    nomorAkad: null,
    status: null,
    statusBy: dataLogin?.roleUser === "admin" ? null : getResponseName?.name,
    statusAt: dataLogin?.roleUser === "admin" ? null : currentDate,
    foto: null,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [getDataBody, setgetDataBody] = useState({});
  const rows = props?.data;
  // if (dataLogin?.roleUser === 'Staff') {
  //   rows = props?.data.filter((word) => word.jumlahPendapatan === getResponseName?.name);
  // }

  rows?.map((item, index) =>
    createData(
      index + 1,
      item?.id,
      item?.penjualan,
      item?.hargaPokok,
      item?.biaya,
      item?.labaUsaha,
      item?.pendapatanLain,
      item?.jumlahPendapatan,
      item?.kebutuhanRumahTangga,
      item?.biayaPendidikan,
      item?.biayaLainya,
      item?.jumlahBiayaLuarUsaha,
      item?.pendapatanBersih,
      item?.rasioAngsuran,
      item?.jangkaWaktu,
      item?.nominalPermohonan,
      item?.tujuanPembiayaan,
      item?.jaminan,
      item?.accPermohonan,
      item?.nomorAkad,
      item?.status,
      item?.statusBy,
      item?.statusAt,
      item?.foto
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const formatToRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  function parseCurrencyIDR(value) {
    if (!value) return 0;
    return parseInt(String(value).replace(/[^0-9]/g, ""), 10);
  }

  // console.log(dataEdit, "dataEdit");

  const handleClickOpen = (id, row) => {
    setOpen(true);
    setDataEdit(row);
    const formattedDataEdit = {
      id: row?.id_pengajuans,
      penjualan: formatToRupiah(row?.penjualan),
      hargaPokok: formatToRupiah(row?.hargaPokok),
      biaya: formatToRupiah(row?.biaya),
      labaUsaha: formatToRupiah(row?.hargaPokok), // Aslinya sama dengan hargaPokok
      pendapatanLain: formatToRupiah(row?.biaya), // Aslinya sama dengan biaya
      jumlahPendapatan: formatToRupiah(row?.jumlahPendapatan),
      kebutuhanRumahTangga: formatToRupiah(row?.kebutuhanRumahTangga),
      biayaPendidikan: formatToRupiah(row?.biayaPendidikan),
      biayaLainya: formatToRupiah(row?.biayaLainya),
      jumlahBiayaLuarUsaha: formatToRupiah(row?.jumlahBiayaLuarUsaha),
      pendapatanBersih: formatToRupiah(row?.pendapatanBersih),
      rasioAngsuran: row?.rasioAngsuran,
      jangkaWaktu: row?.jangkaWaktu,
      nominalPermohonan: formatToRupiah(row?.nominalPermohonan),
      jaminan: formatToRupiah(row?.jaminan),
      rekening: row?.nasabah,
      tujuanPembiayaan: row?.tujuanPembiayaan,
      nomorAkad: row?.nomorAkad,
    };

    setDataEdit(formattedDataEdit);
    // setgetDataEdit(ParseFormattedDataEdit);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function calculatePercentage(part, whole) {
    return (part / whole) * 100;
  }

  const countLabaUsaha =
    parseInt(convertToInteger(dataEdit?.penjualan), 10) -
    parseInt(convertToInteger(dataEdit?.hargaPokok), 10) -
    parseInt(convertToInteger(dataEdit?.biaya), 10);
  const countJumlahPendapatan =
    parseInt(countLabaUsaha, 10) +
    parseInt(convertToInteger(dataEdit?.pendapatanLain), 10);
  const countJumlahBiayaLuarUsaha =
    parseInt(convertToInteger(dataEdit?.kebutuhanRumahTangga), 10) +
    parseInt(convertToInteger(dataEdit?.biayaPendidikan), 10) +
    parseInt(convertToInteger(dataEdit?.biayaLainya), 10);
  const countPendapatanBersih =
    countJumlahPendapatan - countJumlahBiayaLuarUsaha;
  const countAccPermohonan =
    (parseInt(dataEdit?.rasioAngsuran, 10) / 100) *
    countPendapatanBersih *
    parseInt(dataEdit?.jangkaWaktu, 10);
  // console.log(convertToInteger(dataEdit?.penjualan), 'dataEdit')

  const resultAcc = calculatePercentage(100, countAccPermohonan);

  const bodyEdit = {
    rekening: JSON.stringify(dataEdit?.rekening),
    penjualan: parseCurrencyIDR(dataEdit?.penjualan),
    namaNasabah: dataEdit?.namaNasabah,
    rekening: dataEdit?.rekening,
    hargaPokok: parseCurrencyIDR(dataEdit?.hargaPokok),
    biaya: parseCurrencyIDR(dataEdit?.biaya),
    biayaLainya: parseCurrencyIDR(dataEdit?.biayaLainya),
    labaUsaha: countLabaUsaha,
    pendapatanLain: parseCurrencyIDR(dataEdit?.pendapatanLain),
    jumlahPendapatan: countJumlahPendapatan,
    kebutuhanRumahTangga: parseCurrencyIDR(dataEdit?.kebutuhanRumahTangga),
    biayaPendidikan: parseCurrencyIDR(dataEdit?.biayaPendidikan),
    jumlahBiayaLuarUsaha: countJumlahBiayaLuarUsaha,
    pendapatanBersih: countPendapatanBersih,
    rasioAngsuran: dataEdit?.rasioAngsuran,
    jangkaWaktu: dataEdit?.jangkaWaktu,
    nominalPermohonan: parseCurrencyIDR(dataEdit?.nominalPermohonan),
    tujuanPembiayaan: dataEdit?.tujuanPembiayaan,
    jaminan: parseCurrencyIDR(dataEdit?.jaminan),
    accPermohonan: countAccPermohonan,
    nomorAkad: dataEdit?.nomorAkad,
    status: dataEdit?.status,
    statusBy: dataEdit?.statusBy,
    statusAt: dataEdit?.statusAt,
    foto: null,
  };
  useEffect(() => {
    setgetDataBody({
      rekening: JSON.stringify(dataEdit?.rekening),
      penjualan: parseCurrencyIDR(dataEdit?.penjualan),
      namaNasabah: dataEdit?.namaNasabah,
      hargaPokok: parseCurrencyIDR(dataEdit?.hargaPokok),
      biaya: parseCurrencyIDR(dataEdit?.biaya),
      biayaLainya: parseCurrencyIDR(dataEdit?.biayaLainya),
      labaUsaha: countLabaUsaha,
      pendapatanLain: parseCurrencyIDR(dataEdit?.pendapatanLain),
      jumlahPendapatan: countJumlahPendapatan,
      kebutuhanRumahTangga: parseCurrencyIDR(dataEdit?.kebutuhanRumahTangga),
      biayaPendidikan: parseCurrencyIDR(dataEdit?.biayaPendidikan),
      jumlahBiayaLuarUsaha: countJumlahBiayaLuarUsaha,
      pendapatanBersih: countPendapatanBersih,
      rasioAngsuran: dataEdit?.rasioAngsuran,
      jangkaWaktu: dataEdit?.jangkaWaktu,
      nominalPermohonan: parseCurrencyIDR(dataEdit?.nominalPermohonan),
      tujuanPembiayaan: dataEdit?.tujuanPembiayaan,
      jaminan: parseCurrencyIDR(dataEdit?.jaminan),
      accPermohonan: countAccPermohonan,
      nomorAkad: dataEdit?.nomorAkad,
      status: dataEdit?.status,
      statusBy: dataEdit?.statusBy,
      statusAt: dataEdit?.statusAt,
    });
  }, [dataEdit]);
  // console.log(getDataBody, "getDataBody");

  const HandelEdit = (id, row) => {
    setLoading(true);
    fetchApi()
      .put(`/pengajuan/${dataEdit?.id}`, getDataBody)
      .then((res) => {
        props.getData();
        handleClose();
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Berhasil Diedit",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
            variant: "success",
          })
        );
      })
      .catch((err) => handleApiError(err));
  };

  const HandelDelete = (id) => {
    setLoading(true);
    fetchApi()
      .delete(`/pengajuan/${id}`)
      .then((res) => {
        props.getData();
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Berhasil Dihapus",
            autoHideDuration: 2000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
            variant: "success",
          })
        );
      })
      .catch((err) => handleApiError(err));
  };

  if (props?.loading) {
    return <FuseLoading />;
  }
  if (rows?.length === 0) {
    return (
      <div className="m-10 h-full w-full flex justify-center items-center">
        <div>
          <Alert severity="info">Data Kosong</Alert>
        </div>
      </div>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Dialog
        maxWidth="lg"
        className="py-20"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex flex-wrap gap-5 p-10">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={dataPermohonanApprove}
                value={dataEdit?.rekening}
                getOptionLabel={(option) => option.mstRekening}
                sx={{ width: 370 }}
                onChange={(e, newValue) => {
                  // console.log(newValue, '1000000');
                  setDataEdit({ ...dataEdit, rekening: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Data Nasabah" />
                )}
              />
              <TextField
                value={dataEdit?.penjualan}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);
                  setDataEdit({ ...dataEdit, penjualan: formattedValue });
                  // settriggerAccBasil({ ...dataEdit, accBasil: dataEdit?.staffBasil})
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Penjualan"
                variant="outlined"
              />
              <TextField
                value={dataEdit?.hargaPokok}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);
                  setDataEdit({ ...dataEdit, hargaPokok: formattedValue });
                  // settriggerAccBasil({ ...dataEdit, accBasil: dataEdit?.staffBasil})
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Harga Pokok"
                variant="outlined"
              />
              <TextField
                value={dataEdit?.biaya}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);
                  setDataEdit({ ...dataEdit, biaya: formattedValue });
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Biaya"
                variant="outlined"
              />

              <TextField
                value={dataEdit?.pendapatanLain}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);

                  setDataEdit({
                    ...dataEdit,
                    pendapatanLain: formattedValue,
                  });
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Pendapatan Lain"
                variant="outlined"
              />

              <TextField
                value={dataEdit?.kebutuhanRumahTangga}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);
                  setDataEdit({
                    ...dataEdit,
                    kebutuhanRumahTangga: formattedValue,
                  });
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Kebutuhan Rumah Tangga"
                variant="outlined"
              />
              <TextField
                value={dataEdit?.biayaPendidikan}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);
                  setDataEdit({
                    ...dataEdit,
                    biayaPendidikan: formattedValue,
                  });
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Biaya Pendidikan"
                variant="outlined"
              />
              <TextField
                value={dataEdit?.biayaLainya}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);

                  setDataEdit({ ...dataEdit, biayaLainya: formattedValue });
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Biaya Lainnya"
                variant="outlined"
              />

              <TextField
                value={dataEdit?.rasioAngsuran}
                onChange={(e) =>
                  setDataEdit({ ...dataEdit, rasioAngsuran: e.target.value })
                }
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Rasio Angsuran"
                // helperText="persen%"
                type="number"
                variant="outlined"
              />

              <TextField
                value={dataEdit?.jangkaWaktu}
                onChange={(e) =>
                  setDataEdit({ ...dataEdit, jangkaWaktu: e.target.value })
                }
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Jangka Waktu"
                // helperText="bulan cnth 1bulan"
                type="number"
                variant="outlined"
              />
              <TextField
                value={dataEdit?.nominalPermohonan}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);
                  setDataEdit({
                    ...dataEdit,
                    nominalPermohonan: formattedValue,
                  });
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Nominal Pemohonan"
                variant="outlined"
              />
              <TextField
                value={dataEdit?.tujuanPembiayaan}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    tujuanPembiayaan: e.target.value,
                  })
                }
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Tujuan Pembiyaan"
                type="text"
                variant="outlined"
              />
              <TextField
                value={dataEdit?.jaminan}
                // onChange={(e) =>
                //   setDataEdit({ ...dataEdit, jaminan: e.target.value })
                // }
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);
                  setDataEdit({
                    ...dataEdit,
                    jaminan: formattedValue,
                  });
                }}
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Jaminan"
                type="text"
                variant="outlined"
              />

              <TextField
                value={dataEdit?.nomorAkad}
                onChange={(e) =>
                  setDataEdit({ ...dataEdit, nomorAkad: e.target.value })
                }
                sx={{ width: 370 }}
                id="outlined-basic"
                label="Nomor Akad"
                type="text"
                variant="outlined"
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={HandelEdit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={column?.textSytle}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                console.log(row, "oo");
                function formatRupiah(amount) {
                  return (
                    "Rp. " +
                    amount.toLocaleString("id-ID", { minimumFractionDigits: 0 })
                  );
                }
                console.log(row, "rrr");
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>
                      {row?.nasabah?.nama === null ? "-" : row?.nasabah?.nama}
                    </TableCell>
                    <TableCell>
                      {row?.nasabah?.mstRekening === null
                        ? "-"
                        : row?.nasabah?.mstRekening}
                    </TableCell>
                    <TableCell>
                      {row?.penjualan === null
                        ? "-"
                        : formatRupiah(row?.penjualan)}
                    </TableCell>
                    <TableCell>
                      {row?.hargaPokok === null
                        ? "-"
                        : formatRupiah(row?.hargaPokok)}
                    </TableCell>
                    <TableCell>
                      {row?.biaya === null ? "-" : formatRupiah(row?.biaya)}
                    </TableCell>
                    <TableCell>
                      {row?.labaUsaha === null
                        ? "-"
                        : formatRupiah(row?.labaUsaha)}
                    </TableCell>
                    <TableCell>
                      {row?.pendapatanLain === null
                        ? "-"
                        : formatRupiah(row?.pendapatanLain)}
                    </TableCell>
                    <TableCell>
                      {row?.jumlahPendapatan === null
                        ? "-"
                        : formatRupiah(row?.jumlahPendapatan)}
                    </TableCell>
                    <TableCell>
                      {row?.kebutuhanRumahTangga === null
                        ? "-"
                        : formatRupiah(row?.kebutuhanRumahTangga)}
                    </TableCell>
                    <TableCell>
                      {row?.biayaPendidikan === null
                        ? "-"
                        : formatRupiah(row?.biayaPendidikan)}
                    </TableCell>
                    <TableCell>
                      {row?.biayaLainya === null
                        ? "-"
                        : formatRupiah(row?.biayaLainya)}
                    </TableCell>
                    <TableCell>
                      {row?.jumlahBiayaLuarUsaha === null
                        ? "-"
                        : formatRupiah(row?.jumlahBiayaLuarUsaha)}
                    </TableCell>
                    <TableCell className="font-bold">
                      {row?.pendapatanBersih === null
                        ? "-"
                        : formatRupiah(row?.pendapatanBersih)}
                    </TableCell>
                    <TableCell>
                      {row?.rasioAngsuran === null ? "-" : row?.rasioAngsuran}
                    </TableCell>
                    <TableCell className="font-bold">
                      {row?.jangkaWaktu === null ? "-" : row?.jangkaWaktu}
                    </TableCell>
                    <TableCell className="font-bold">
                      {row?.nominalPermohonan === null
                        ? "-"
                        : formatRupiah(row?.nominalPermohonan)}
                    </TableCell>
                    <TableCell>
                      {row?.tujuanPembiayaan === null
                        ? "-"
                        : row?.tujuanPembiayaan}
                    </TableCell>
                    <TableCell className="font-bold">
                      {row?.jaminan === null
                        ? "-"
                        : formatRupiah(parseInt(row?.jaminan))}
                    </TableCell>
                    <TableCell className="font-bold">
                      {row?.accPermohonan === null
                        ? "-"
                        : formatRupiah(parseInt(row?.accPermohonan))}
                    </TableCell>
                    {/* <TableCell>
                      {row?.nomorAkad === null ? "-" : row?.nomorAkad}
                    </TableCell>
                    <TableCell>
                      {row?.status === null ? (
                        <Button
                          onClick={() => HandelApprove(row?.id, row)}
                          color="warning"
                          variant="contained"
                        >
                          Approve
                        </Button>
                      ) : (
                        <Button color="success" variant="contained">
                          {row?.status === null ? "-" : row?.status}
                        </Button>
                      )}
                    </TableCell> */}
                    <TableCell>
                      {row?.user?.username === null ? "-" : row?.user?.username}
                    </TableCell>
                    <TableCell>
                      {row?.statusAt === null ? "-" : row?.statusAt}
                    </TableCell>
                    <TableCell>
                      {row?.labaUsaha === null ? (
                        <Button color="warning" variant="contained">
                          Uncompleted
                        </Button>
                      ) : (
                        <Button color="success" variant="contained">
                          Completed
                        </Button>
                      )}
                    </TableCell>
                    {/* <TableCell>{row?.deskripsi}</TableCell> */}
                    <TableCell>
                      <div className="flex justify-center">
                        <div>
                          <IconButton
                            onClick={() =>
                              handleClickOpen(row.id_pengajuans, row)
                            }
                            color="info"
                            disabled={
                              dataLogin?.roleUser === "Staff" &&
                              row?.labaUsaha !== null
                            }
                            className=""
                          >
                            <EditIcon />
                          </IconButton>
                        </div>
                        <div>
                          <IconButton
                            onClick={(e) => HandelDelete(row.id_pengajuans)}
                            color="error"
                            disabled={
                              dataLogin?.roleUser === "Staff" &&
                              row?.labaUsaha !== null
                            }
                            className=""
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
