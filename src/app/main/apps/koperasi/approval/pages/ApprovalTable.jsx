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
import { useState } from "react";
import ExcelJS from "exceljs";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import FuseAnimate from "@fuse/core/FuseAnimate";
import DataAturanFuzzy from "./DataAturanFuzzy";


const top100Films = [
  { label: "KG", year: 1994 },
  { label: "Lusin", year: 1972 },
  { label: "Bal", year: 1994 },
];

const columns = [
  {
    id: "no",
    label: "NO",
    minWidth: 170,
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
    id: "nilaizAAkhir",
    label: "Nilai Z Akhir",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "aproval",
    label: "Approval",
    minWidth: 170,
    align: "left",
    textSytle: "",
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  no,
  id,
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
    id,
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

export default function ApprovalTable(props) {
  const userRoles = JSON.parse(localStorage.getItem("userRoles"));
  let getAllUserResponse;
  let getResponseName;
  let dataLogin;
  if (userRoles) {
    getAllUserResponse = userRoles?.response?.userRoles;
    getResponseName = userRoles?.response;
    dataLogin = JSON.parse(getAllUserResponse);
  }
  const dataMasterSuplayer = props?.dataMasterSuplayer;
  const dispatch = useDispatch();
  const { dataMasterBarang } = props;
  // console.log(getResponseName, "getResponseName");
  const [data, setData] = useState([]);
  const [getDataEdit, setgetDataEdit] = useState({});
  const [dataEdit, setDataEdit] = useState({
    id: null,
    penjualan: null,
    hargaPokok: "",
    biaya: "",
    labaUsaha: null,
    pendapatanLain: null,
    jumlahPendapatan: null,
    kebutuhanRumahTangga: null,
    biayaPendidikan: null,
    biayaLainya: null,
    jumlahBiayaLuarUsaha: null,
    pendapatanBersih: null,
    rasioAngsuran: null,
    jangkaWaktu: null,
    nominalPermohonan: null,
    tujuanPembiayaan: null,
    jaminan: null,
    accPermohonan: null,
    nomorAkad: null,
    status: null,
    statusBy: null,
    statusAt: null,
    foto: null,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
  const handleClickOpen = (id, row) => {
    setOpen(true);
    setDataEdit(row);
    setDataEdit({
      id: row?.id,
      penjualan: row?.penjualan,
      hargaPokok: row?.hargaPokok,
      biaya: row?.biaya,
      labaUsaha: row?.hargaPokok,
      pendapatanLain: row?.biaya,
      jumlahPendapatan: row?.jumlahPendapatan,
      kebutuhanRumahTangga: row?.kebutuhanRumahTangga,
      biayaPendidikan: row?.biayaPendidikan,
      biayaLainya: row?.biayaLainya,
      jumlahBiayaLuarUsaha: row?.jumlahBiayaLuarUsaha,
      pendapatanBersih: row?.pendapatanBersih,
      rasioAngsuran: row?.rasioAngsuran,
    });
    setgetDataEdit(row);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    penjualan: dataEdit?.penjualan,
    hargaPokok: dataEdit?.hargaPokok,
    biaya: dataEdit?.biaya,
    labaUsaha: dataEdit?.labaUsaha,
    pendapatanLain: dataEdit?.pendapatanLain,
    jumlahPendapatan: dataEdit?.jumlahPendapatan,
    kebutuhanRumahTangga: dataEdit?.kebutuhanRumahTangga,
    biayaPendidikan: dataEdit?.biayaPendidikan,
    jumlahBiayaLuarUsaha: dataEdit?.jumlahBiayaLuarUsaha,
    pendapatanBersih: dataEdit?.pendapatanBersih,
    rasioAngsuran: dataEdit?.rasioAngsuran,
  };
  // console.log(body, 'body');

  const HandelEdit = (id) => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_}/pengajuan/${dataEdit?.id}`,
        body
      )
      .then((res) => {
        props?.getData();
        handleClose();
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Berhasil Di Edit",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
          })
        );
      })
      .catch((err) => {
        handleClose();
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
        console.log(err);
      });
  };
  const HandelApprove = (id, row) => {
    setLoading(true);
    if (dataLogin?.roleUser === "Kasir" || dataLogin?.roleUser === "Admin") {
      axios
        .put(`${process.env.REACT_APP_API_URL_API_}/pengajuanByApprove/${id}`, {
          status: getResponseName?.name,
        })
        .then((res) => {
          props?.getData();
          handleClose();
          setLoading(false);
          dispatch(
            showMessage({
              message: `Data Berhasil Di Approve oleh ${getResponseName?.name}`,
              autoHideDuration: 2000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              variant: "success",
            })
          );
        })
        .catch((err) => {
          handleClose();
          setLoading(false);
          const errStatus = err.response.status;
          const errMessage = err.response.data.message;
          let messages = "";
          if (errStatus === 401) {
            messages = "Unauthorized!!";
            window.location.href = "/login";
          } else if (errStatus === 500) {
            messages = "Server Error!!";
          } else if (errStatus === 404) {
            messages = "Not Found Error!!!";
          } else if (errStatus === 408) {
            messages = "TimeOut Error!!";
          } else if (errStatus === 400) {
            messages = errMessage;
          } else {
            messages = "Something Wrong!!";
          }
          dispatch(
            showMessage({
              message: messages,
              autoHideDuration: 2000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              variant: "error",
            })
          );
          console.log(err);
        });
    } else {
      dispatch(
        showMessage({
          message: "Silahkan Hubungi Kasir Untuk Aprove ",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "warning",
        })
      );
    }
  };
  const HandelDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${process.env.REACT_APP_API_URL_API_}/pengajuan/${id}`)
      .then((res) => {
        props?.getData();
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Berhasil Di Hapus",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
          })
        );
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = "";
        if (errStatus === 401) {
          messages = "Unauthorized!!";
          window.location.href = "/login";
        } else if (errStatus === 500) {
          messages = "Server Error!!";
        } else if (errStatus === 404) {
          messages = "Not Found Error!!!";
        } else if (errStatus === 408) {
          messages = "TimeOut Error!!";
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = "Something Wrong!!";
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
        console.log(err);
      });
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

  const downloadPDF = () => {
    const doc = new jsPDF("landscape");

    // Filter out the 'aksi' column
    const filteredColumns = columns.filter((column) => column.id !== "aksi");

    // Table headers from the filtered columns
    const tableColumn = filteredColumns.map((column) => column.label);

    // Generate table rows using the mapped rows data
    const tableRows = rows?.map((item, index) => [
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
      item?.foto,
    ]);

    // Table styling adjustments
    const tableStyle = {
      headStyles: {
        fillColor: [0, 0, 255], // blue color for header
        textColor: [255, 255, 255], // white text color
        fontSize: 10,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },
      bodyStyles: {
        fontSize: 8,
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        // Adjust the width of the columns based on content
        0: { cellWidth: 15 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        // 5: { cellWidth: 30 },
        // 6: { cellWidth: 30 },
        // 7: { cellWidth: 30 },
        // 8: { cellWidth: 30 },
        // 9: { cellWidth: 30 },
        // 10: { cellWidth: 30 },
        // You can continue setting widths for other columns as needed
      },
    };

    // Add title or other content on the first page
    doc.text("Data Table Report", 10, 10);

    // Add the table to the PDF
    doc.autoTable(tableColumn, tableRows, tableStyle);

    // Save the PDF file
    doc.save("data.pdf");
  };

  // Fungsi untuk ekspor ke Excel
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Filter out the 'aksi' column and create the worksheet columns
    const filteredColumns = columns.filter((column) => column.id !== "aksi");
    worksheet.columns = filteredColumns.map((column) => ({
      header: column.label,
      key: column.id,
      width: column?.id === "no" ? 5 : 20,
    }));

    // Generate data rows using the mapped rows data
    rows?.map((item, index) => {
      worksheet.addRow({
        no: index + 1,
        id: item?.id,
        penjualan: item?.penjualan,
        hargaPokok: item?.hargaPokok,
        biaya: item?.biaya,
        labaUsaha: item?.labaUsaha,
        pendapatanLain: item?.pendapatanLain,
        jumlahPendapatan: item?.jumlahPendapatan,
        kebutuhanRumahTangga: item?.kebutuhanRumahTangga,
        biayaPendidikan: item?.biayaPendidikan,
        biayaLainya: item?.biayaLainya,
        jumlahBiayaLuarUsaha: item?.jumlahBiayaLuarUsaha,
        pendapatanBersih: item?.pendapatanBersih,
        rasioAngsuran: item?.rasioAngsuran,
        jangkaWaktu: item?.jangkaWaktu,
        nominalPermohonan: item?.nominalPermohonan,
        tujuanPembiayaan: item?.tujuanPembiayaan,
        jaminan: item?.jaminan,
        accPermohonan: item?.accPermohonan,
        nomorAkad: item?.nomorAkad,
        status: item?.status,
        statusBy: item?.statusBy,
        statusAt: item?.statusAt,
        foto: item?.foto,
      });
    });

    // Save the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.xlsx";
    link.click();
  };

  // console.log(rows, "rows");

  // Fungsi Keanggotaan Trapezoidal
  // const fuzzyMembership = (x, a, b, c, d) => {
  //   if (x <= a || x >= d) return 0;
  //   if (x >= b && x <= c) return 1;
  //   if (x > a && x < b) return (x - a) / (b - a);
  //   if (x > c && x < d) return (d - x) / (d - c);
  // };

  // const fuzzyTsukamoto = (pendapatan, pengajuan, jangkaWaktu, nominalJaminan) => {
  //   // Keanggotaan Pendapatan
  //   const pendapatanSedikit = fuzzyMembership(pendapatan, 0, 0, 2000000, 4000000);
  //   const pendapatanSedang = fuzzyMembership(pendapatan, 2000000, 4000000, 6000000, 8000000);
  //   const pendapatanBanyak = fuzzyMembership(pendapatan, 6000000, 8000000, 10000000, 12000000);

  //   // Keanggotaan Pengajuan
  //   const pengajuanSedikit = fuzzyMembership(pengajuan, 0, 0, 3000000, 5000000);
  //   const pengajuanSedang = fuzzyMembership(pengajuan, 3000000, 5000000, 7000000, 10000000);
  //   const pengajuanBanyak = fuzzyMembership(pengajuan, 7000000, 10000000, 12000000, 15000000);

  //   // Keanggotaan Jangka Waktu
  //   const waktuPendek = fuzzyMembership(jangkaWaktu, 0, 0, 3, 6);
  //   const waktuSedang = fuzzyMembership(jangkaWaktu, 3, 6, 9, 12);
  //   const waktuPanjang = fuzzyMembership(jangkaWaktu, 9, 12, 15, 18);

  //   // Keanggotaan Nominal Jaminan
  //   const jaminanKecil = fuzzyMembership(nominalJaminan, 0, 0, 5000000, 7000000);
  //   const jaminanSedang = fuzzyMembership(nominalJaminan, 5000000, 7000000, 8500000, 10000000);
  //   const jaminanBesar = fuzzyMembership(nominalJaminan, 8500000, 10000000, 12000000, 15000000);

  //   // Aturan Fuzzy Tsukamoto
  //   const aturan = [
  //     { nilai: 2000000, min: Math.min(pendapatanSedikit, pengajuanSedikit, waktuPendek, jaminanKecil) },
  //     { nilai: 8000000, min: Math.min(pendapatanBanyak, pengajuanBanyak, waktuPanjang, jaminanBesar) },
  //     { nilai: 5000000, min: Math.min(pendapatanSedang, pengajuanSedang, waktuSedang, jaminanSedang) }
  //   ];

  //   // Hitung Z dan total keanggotaan
  //   const totalZ = aturan.reduce((sum, { nilai, min }) => sum + nilai * min, 0);
  //   const totalKeanggotaan = aturan.reduce((sum, { min }) => sum + min, 0);

  //   // Defuzzifikasi
  //   const hasil = totalKeanggotaan === 0 ? 0 : totalZ / totalKeanggotaan;

  //   return hasil.toFixed(2);
  // };

  // const hasil = fuzzyTsukamoto(4000000, 5000000, 3, 1000000);
  // console.log("Hasil Fuzzy Tsukamoto:", hasil);

  const nomPendapatan = 6200000;
  const nomPengajuan = 9000000;
  const nomJangkaWaktu = 5;
  const nomJaminan = 8000000;

  const valPendapatanSedikit = 2000000;
  const valPendapatanSedang = 4000000;
  const valPendapatanBanyak = 8000000;

  const valPengajuanSedikit = 3000000;
  const valPengajuanSedang = 5000000;
  const valPengajuanBanyak = 10000000;

  const valJangkaWaktuPendek = 3;
  const valJangkaWaktuSedang = 6;
  const valJangkaWaktuPanjang = 12;

  const valJaminanKecil = 5000000;
  const valJaminanSedang = 7000000;
  const valJaminanBesar = 10000000;

  const valLayak = 95;
  const valTidakLayak = 50;

  const PendapatanSedikit = null;
  const pendapatanSedang = null;
  const pendapatanBanyak = null;

  const fuzzyMembershipKecil = (nilaiInput, kecil, sedang, besar) => {
    if (nilaiInput <= kecil) {
      return 1; // Nilai penuh jika <= kecil
    }
    if (nilaiInput > kecil && nilaiInput < sedang) {
      return (sedang - nilaiInput) / (sedang - kecil); // Nilai antara kecil dan sedang
    }
    if (nilaiInput >= sedang) {
      return 0; // Nilai di luar rentang
    }
  };

  const fuzzyMembershipSedang = (nilaiInput, kecil, sedang, besar) => {
    if (nilaiInput >= kecil && nilaiInput < sedang) {
      return (nilaiInput - kecil) / (sedang - kecil);
    }
    if (nilaiInput === sedang) {
      return 1;
    }
    if (nilaiInput > sedang && nilaiInput <= besar) {
      return (besar - nilaiInput) / (besar - sedang);
    }
    return 0; // Nilai di luar rentang
  };

  const fuzzyMembershipBanyak = (nilaiInput, kecil, sedang, besar) => {
    // console.log(nilaiInput, 'nilaiInput')
    // console.log(sedang, 'sedang')
    // console.log(besar, 'besar')
    if (nilaiInput <= sedang) {
      return 0; // Nilai penuh 0 jika <= sedang
    }
    if (nilaiInput > sedang && nilaiInput < besar) {
      return (nilaiInput - sedang) / (besar - sedang); // Nilai antara sedang dan besar
    }
    if (nilaiInput >= besar) {
      return 1; // Nilai penuh 1 jika >= besar
    }
  };
  const fuzzyMembershipTidakLayak = (nilaiInput, TidakLayak, layak) => {
    // console.log(nilaiInput, 'nilaiInput');
    // console.log(TidakLayak, 'TidakLayak');
    // console.log(layak, 'layak');

    if (nilaiInput <= TidakLayak) {
      return 1; // Keanggotaan penuh dalam kategori Tidak Layak
    }
    if (nilaiInput > TidakLayak && nilaiInput < layak) {
      return (layak - nilaiInput) / (layak - TidakLayak); // Keanggotaan parsial
    }
    if (nilaiInput >= layak) {
      return 0; // Tidak termasuk kategori Tidak Layak
    }

    // Return default jika terjadi kesalahan input
    return null;
  };
  const fuzzyMembershipLayak = (nilaiInput, TidakLayak, layak) => {
    // console.log(nilaiInput, 'nilaiInput')
    // console.log(TidakLayak, 'TidakLayak')
    // console.log(layak, 'layak')
    if (nilaiInput <= TidakLayak) {
      return 0; // Nilai penuh 0 jika <= sedang
    }
    if (nilaiInput > TidakLayak && nilaiInput < layak) {
      return (nilaiInput - TidakLayak) / (layak - TidakLayak); // Nilai antara sedang dan besar
    }
    if (nilaiInput >= layak) {
      return 1; // Nilai penuh 1 jika >= besar
    }
  };

  function resultPendapatan(nomPendapatan) {
    if (nomPendapatan < valPendapatanSedikit) {
      const sedikitPendapatan = fuzzyMembershipKecil(
        nomPendapatan,
        valPendapatanSedikit,
        valPendapatanSedang,
        valPendapatanBanyak
      );
      return {
        pendapatan: {
          sedikitPendapatan,
        },
      };
    } else if (
      nomPendapatan >= valPendapatanSedikit &&
      nomPendapatan <= valPendapatanSedang
    ) {
      const sedikitPendapatan = fuzzyMembershipKecil(
        nomPendapatan,
        valPendapatanSedikit,
        valPendapatanSedang,
        valPendapatanBanyak
      );
      const sedangPendapatan = fuzzyMembershipSedang(
        nomPendapatan,
        valPendapatanSedikit,
        valPendapatanSedang,
        valPendapatanBanyak
      );
      return {
        pendapatan: {
          sedikitPendapatan,
          sedangPendapatan,
        },
      };
    } else if (
      nomPendapatan > valPendapatanSedang &&
      nomPendapatan <= valPendapatanBanyak
    ) {
      const sedangPendapatan = fuzzyMembershipSedang(
        nomPendapatan,
        valPendapatanSedikit,
        valPendapatanSedang,
        valPendapatanBanyak
      );
      const banyakPendapatan = fuzzyMembershipBanyak(
        nomPendapatan,
        valPendapatanSedikit,
        valPendapatanSedang,
        valPendapatanBanyak
      );
      return {
        pendapatan: {
          sedangPendapatan,
          banyakPendapatan,
        },
      };
    } else {
      const banyakPendapatan = fuzzyMembershipBanyak(
        nomPendapatan,
        valPendapatanSedikit,
        valPendapatanSedang,
        valPendapatanBanyak
      );
      return {
        pendapatan: {
          banyakPendapatan,
        },
      };
    }
  }
  function resultPengajuan(nomPengajuan) {
    if (nomPengajuan < valPengajuanSedikit) {
      const sedikittPengajuan = fuzzyMembershipKecil(
        nomPengajuan,
        valPengajuanSedikit,
        valPengajuanSedang,
        valPengajuanBanyak
      );
      return {
        pengajuan: {
          sedikittPengajuan,
        },
      };
    } else if (
      nomPengajuan >= valPengajuanSedikit &&
      nomPengajuan <= valPengajuanSedang
    ) {
      const sedikittPengajuan = fuzzyMembershipKecil(
        nomPengajuan,
        valPengajuanSedikit,
        valPengajuanSedang,
        valPengajuanBanyak
      );
      const sedangtPengajuan = fuzzyMembershipSedang(
        nomPengajuan,
        valPengajuanSedikit,
        valPengajuanSedang,
        valPengajuanBanyak
      );
      return {
        pengajuan: {
          sedikittPengajuan,
          sedangtPengajuan,
        },
      };
    } else if (
      nomPengajuan > valPengajuanSedang &&
      nomPengajuan <= valPengajuanBanyak
    ) {
      const sedangtPengajuan = fuzzyMembershipSedang(
        nomPengajuan,
        valPengajuanSedikit,
        valPengajuanSedang,
        valPengajuanBanyak
      );
      const banyaktPengajuan = fuzzyMembershipBanyak(
        nomPengajuan,
        valPengajuanSedikit,
        valPengajuanSedang,
        valPengajuanBanyak
      );
      return {
        pengajuan: {
          sedangtPengajuan,
          banyaktPengajuan,
        },
      };
    } else {
      const banyaktPengajuan = fuzzyMembershipBanyak(
        nomPengajuan,
        valPengajuanSedikit,
        valPengajuanSedang,
        valPengajuanBanyak
      );
      return {
        pengajuan: {
          banyaktPengajuan,
        },
      };
    }
  }
  function resultJangkaWaktu(nomJangkaWaktu) {
    if (nomJangkaWaktu < valJangkaWaktuPendek) {
      const pendekJangkaWaktu = fuzzyMembershipKecil(
        nomJangkaWaktu,
        valJangkaWaktuPendek,
        valJangkaWaktuSedang,
        valJangkaWaktuPanjang
      );
      return {
        jangkaWaktu: {
          pendekJangkaWaktu,
        },
      };
    } else if (
      nomJangkaWaktu >= valJangkaWaktuPendek &&
      nomJangkaWaktu <= valJangkaWaktuSedang
    ) {
      const pendekJangkaWaktu = fuzzyMembershipKecil(
        nomJangkaWaktu,
        valJangkaWaktuPendek,
        valJangkaWaktuSedang,
        valJangkaWaktuPanjang
      );
      const sedangJangkaWaktu = fuzzyMembershipSedang(
        nomJangkaWaktu,
        valJangkaWaktuPendek,
        valJangkaWaktuSedang,
        valJangkaWaktuPanjang
      );
      return {
        jangkaWaktu: {
          pendekJangkaWaktu,
          sedangJangkaWaktu,
        },
      };
    } else if (
      nomJangkaWaktu > valJangkaWaktuSedang &&
      nomJangkaWaktu <= valJangkaWaktuPanjang
    ) {
      const sedangJangkaWaktu = fuzzyMembershipSedang(
        nomJangkaWaktu,
        valJangkaWaktuPendek,
        valJangkaWaktuSedang,
        valJangkaWaktuPanjang
      );
      const panjangJangkaWaktu = fuzzyMembershipBanyak(
        nomJangkaWaktu,
        valJangkaWaktuPendek,
        valJangkaWaktuSedang,
        valJangkaWaktuPanjang
      );
      return {
        jangkaWaktu: {
          sedangJangkaWaktu,
          panjangJangkaWaktu,
        },
      };
    } else {
      const panjangJangkaWaktu = fuzzyMembershipBanyak(
        nomJangkaWaktu,
        valJangkaWaktuPendek,
        valJangkaWaktuSedang,
        valJangkaWaktuPanjang
      );
      return {
        jangkaWaktu: {
          panjangJangkaWaktu,
        },
      };
    }
  }
  function resultJaminan(nomJaminan) {
    if (nomJaminan < valJaminanKecil) {
      const kecilJaminan = fuzzyMembershipKecil(
        nomJaminan,
        valJaminanKecil,
        valJaminanSedang,
        valJaminanBesar
      );
      return {
        jaminan: {
          kecilJaminan,
        },
      };
    } else if (
      nomJaminan >= valJaminanKecil &&
      nomJaminan <= valJaminanSedang
    ) {
      const kecilJaminan = fuzzyMembershipKecil(
        nomJaminan,
        valJaminanKecil,
        valJaminanSedang,
        valJaminanBesar
      );
      const sedangJaminan = fuzzyMembershipSedang(
        nomJaminan,
        valJaminanKecil,
        valJaminanSedang,
        valJaminanBesar
      );
      return {
        jaminan: {
          kecilJaminan,
          sedangJaminan,
        },
      };
    } else if (nomJaminan > valJaminanSedang && nomJaminan <= valJaminanBesar) {
      const sedangJaminan = fuzzyMembershipSedang(
        nomJaminan,
        valJaminanKecil,
        valJaminanSedang,
        valJaminanBesar
      );
      const hasilBesarJaminan = fuzzyMembershipBanyak(
        nomJaminan,
        valJaminanKecil,
        valJaminanSedang,
        valJaminanBesar
      );
      return {
        jaminan: {
          sedangJaminan,
          hasilBesarJaminan,
        },
      };
    } else {
      const hasilBesarJaminan = fuzzyMembershipBanyak(
        nomJaminan,
        valJaminanKecil,
        valJaminanSedang,
        valJaminanBesar
      );
      return {
        jaminan: {
          hasilBesarJaminan,
        },
      };
    }
  }
  function resultLayakTidakLayak(nomLayakTidakLayak) {
    // console.log(nomLayakTidakLayak, 'nomLayakTidakLayak')

    if (nomLayakTidakLayak <= valTidakLayak) {
      const hasilTidakLayak = fuzzyMembershipTidakLayak(
        nomLayakTidakLayak,
        valTidakLayak,
        valLayak
      );
      return { hasilTidakLayak };
    } else if (
      nomLayakTidakLayak > valTidakLayak &&
      nomLayakTidakLayak <= valLayak
    ) {
      const hasilTidakLayak = fuzzyMembershipTidakLayak(
        nomLayakTidakLayak,
        valTidakLayak,
        valLayak
      );
      const hasilLayak = fuzzyMembershipLayak(
        nomLayakTidakLayak,
        valTidakLayak,
        valLayak
      );
      return { hasilTidakLayak, hasilLayak };
    } else {
      const hasilLayak = fuzzyMembershipLayak(
        nomLayakTidakLayak,
        valTidakLayak,
        valLayak
      );
      return { hasilLayak };
    }
  }

  const pendapatan = resultPendapatan(nomPendapatan);
  const pengajuan = resultPengajuan(nomPengajuan);
  const jangkaWaktu = resultJangkaWaktu(nomJangkaWaktu);
  const jaminan = resultJaminan(nomJaminan);

  const hasilGabungan = {};

  // Fungsi untuk menggabungkan nilai dari objek
  const mergeObjects = (target, source) => {
    for (const [key, value] of Object.entries(source)) {
      if (target.hasOwnProperty(key)) {
        // Jika kunci sudah ada, gabungkan nilainya menjadi array
        target[key] = Array.isArray(target[key])
          ? [...target[key], value]
          : [target[key], value];
      } else {
        // Jika kunci belum ada, tambahkan nilai baru
        target[key] = value;
      }
    }
  };

  // Gabungkan objek-objek tersebut
  mergeObjects(hasilGabungan, pendapatan);
  mergeObjects(hasilGabungan, pengajuan);
  mergeObjects(hasilGabungan, jangkaWaktu);
  mergeObjects(hasilGabungan, jaminan);

  // Return objek hasil gabungan
  // return hasilGabungan;
  console.log(hasilGabungan, "hasilGabungan");

  // console.log(resultPendapatan(nomPendapatan), "pendapatan");
  // console.log(resultPengajuan(nomPengajuan), "pengajuan");
  // console.log(resultJangkaWaktu(nomJangkaWaktu), "jangkaWaktu");
  // console.log(resultJaminan(nomJaminan), "jaminan");
  function calculateCombinations(data) {
    const keys = Object.keys(data);
    const combinations = [];
  
    function combine(current, depth) {
      if (depth === keys.length) {
        // Periksa jika salah satu nilai adalah 0, maka abaikan kombinasi ini
        const hasZeroValue = Object.values(current).some((item) => item.value === 0);
        if (!hasZeroValue) {
          combinations.push(current);
        }
        return;
      }
  
      const key = keys[depth];
      const values = data[key];
  
      for (const [label, value] of Object.entries(values)) {
        combine(
          {
            ...current,
            [key]: { label, value },
          },
          depth + 1
        );
      }
    }
  
    combine({}, 0);
    return combinations;
  }
  
  // Contoh data hasilGabungan
  
  // Hitung kombinasi dan cetak hasil
  const combinations = calculateCombinations(hasilGabungan);
  
  combinations.forEach((combo, index) => {
    const aggregatedValue = Object.values(combo).reduce(
      (acc, item) => acc * item.value, // Mengalikan semua nilai value
      1
    );
  
    console.log(`${index + 1}:`, combo, `Value: ${aggregatedValue}`);
  
    // Mencari nilai terkecil dari combo
    const values = Object.values(combo).map((item) => item.value); // Ekstrak semua nilai value dari combo
    const minValue = Math.min(...values); // Cari nilai terkecil
  
    // console.log(`Nilai terkecil dari combo ${index + 1}:`, minValue);
  });
  console.log(DataAturanFuzzy, 'DataAturanFuzzy')
  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className="flex flex-auto items-center gap-4 grid-rows-1 ">
        <div className="flex items-left mt-10 ml-20 w-1/2 flex-col md:flex-row md:items-center md:mt-0">
          <div className="w-full flex">
            <div>
              <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={downloadPDF}
                >
                  <PictureAsPdfIcon className="mr-2" />
                  <div className="hidden md:contents">Export To PDF</div>
                </Button>
              </FuseAnimate>
            </div>
            <div className="ml-10">
              <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={exportExcel}
                >
                  <PrintIcon className="mr-2" />
                  <div className="hidden md:contents">Export To Excel</div>
                </Button>
              </FuseAnimate>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        className="py-20"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="mt-10">
              <div className="flex gap-5">
                <TextField
                  fullWidth
                  value={dataEdit?.penjualan}
                  onChange={(e) => {
                    setDataEdit({
                      ...dataEdit,
                      penjualan: e.target.value,
                    });
                  }}
                  id="outlined-basic"
                  label="No Akad"
                  type="number"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  value={dataEdit?.hargaPokok}
                  onChange={(e) => {
                    setDataEdit({
                      ...dataEdit,
                      hargaPokok: e.target.value,
                    });
                  }}
                  id="outlined-basic"
                  label="Staff Basil"
                  type="number"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  value={dataEdit?.biaya}
                  onChange={(e) => {
                    setDataEdit({
                      ...dataEdit,
                      biaya: e.target.value,
                    });
                  }}
                  id="outlined-basic"
                  label="Staff Pokok"
                  type="number"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  value={dataEdit?.labaUsaha}
                  onChange={(e) => {
                    setDataEdit({
                      ...dataEdit,
                      labaUsaha: e.target.value,
                    });
                  }}
                  id="outlined-basic"
                  label="Acc Basil"
                  type="number"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  value={dataEdit?.pendapatanLain}
                  onChange={(e) => {
                    setDataEdit({
                      ...dataEdit,
                      pendapatanLain: e.target.value,
                    });
                  }}
                  id="outlined-basic"
                  label="Acc Pokok"
                  type="number"
                  variant="outlined"
                />
              </div>
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
                // console.log(row, 'oo');
                function formatRupiah(amount) {
                  return (
                    "Rp. " +
                    amount.toLocaleString("id-ID", { minimumFractionDigits: 0 })
                  );
                }
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>
                      {row?.namaNasabah === null ? "-" : row?.namaNasabah}
                    </TableCell>
                    <TableCell>
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
