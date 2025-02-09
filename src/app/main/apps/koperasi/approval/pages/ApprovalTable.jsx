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
import { getUserInfo, handleErrors } from "app/configs/getUserInfo";
import { fetchApi } from "app/configs/fetchApi";

const columns = [
  {
    id: "no",
    label: "NO",
    minWidth: 50,
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
    label: "Nilai Z Terbobot",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "keputusan",
    label: "Keputusan",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
  {
    id: "aksi",
    label: "Aksi",
    minWidth: 170,
    align: "left",
    textSytle: "",
  },
];

function createData(
  no,
  id,
  nasabah,
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
    nasabah,
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
  const dispatch = useDispatch();
  const userInfo = getUserInfo();
  const userRoles = userInfo?.userInfo?.user?.userRoles;
  const userName = userInfo?.userInfo?.user?.username;
  // console.log(userInfo?.userInfo?.user, 'userInfo')
  const [openNotifikasi, setOpenNotifikasi] = useState(false);
  const [getDataEdit, setgetDataEdit] = useState({});
  const [trigger, setTrigger] = useState({
    id_pengajuans: null,
    row: null,
    trueFalse: null,
    trigger: null,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = props?.data;

  rows?.map((item, index) =>
    createData(index + 1, item?.id, item?.nasabah, item?.status)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClickOpenNotifikasi = (
    id_pengajuans,
    row,
    trueFalse,
    trigger
  ) => {
    setTrigger({ id_pengajuans, row, trueFalse, trigger });
    setOpenNotifikasi(true);
    setgetDataEdit({
      id: row?.id_pengajuans,
      trueFalse,
    });
  };
  const handleCloseNotifikasi = () => {
    setOpenNotifikasi(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const HandelApprove = async (id, row, layakOrNot) => {
    setLoading(true);

    if (userRoles !== "1") {
      dispatch(
        showMessage({
          message: "Silahkan Hubungi Admin Untuk Approval",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "warning",
        })
      );
      setLoading(false);
      return;
    }

    try {
      const api = fetchApi();
      await api.put(`/pengajuanByApprove/${getDataEdit?.id}`, {
        status: getDataEdit?.trueFalse,
      });

      props?.getData();
      handleClose();
      handleCloseNotifikasi();

      dispatch(
        showMessage({
          message: `Data Berhasil Di Approve oleh ${userName}`,
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "success",
        })
      );
    } catch (err) {
      handleErrors(err);
    } finally {
      setLoading(false);
    }
  };

  const HandleNotifikasi = (kelayakan) => {
    dispatch(
      showMessage({
        message: `Nasabah Sudah Approval: ${kelayakan}`,
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "warning",
      })
    );
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
  console.log(trigger, "trigger");

  function extractInteger(harga) {
    if (typeof harga !== "string") {
      return 0; // Kembalikan 0 jika input bukan string
    }

    const angka = parseInt(harga.replace(/[^0-9]/g, ""), 10);
    return isNaN(angka) ? 0 : angka; // Kembalikan 0 jika hasilnya NaN
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
      item?.namaNasabah,
      fuzzySakamotos(
        item?.jumlahPendapatan,
        item?.nominalPermohonan,
        item?.jangkaWaktu,
        extractInteger(item?.jaminan)
      ),
      item?.status === null ? "-" : item?.status,
      ,
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
        1: { cellWidth: 82 },
        2: { cellWidth: 82 },
        3: { cellWidth: 82 },
      },
    };

    // Add title or other content on the first page
    doc.text("Data Table Keputusan", 10, 10);

    // Add the table to the PDF
    doc.autoTable(tableColumn, tableRows, tableStyle);

    // Save the PDF file
    doc.save("Keputusan.pdf");
  };

  // Fungsi untuk ekspor ke Excel
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Keputusan");

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
        namaNasabah: item?.namaNasabah,
        nilaizAAkhir: fuzzySakamotos(
          item?.jumlahPendapatan,
          item?.nominalPermohonan,
          item?.jangkaWaktu,
          extractInteger(item?.jaminan)
        ),
        keputusan: item?.status === null ? "-" : item?.status,
      });
    });

    // Save the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Keputusan.xlsx";
    link.click();
  };

  const fuzzySakamotos = (
    valuePendapatan,
    valuePengajuan,
    valueJangkaWaktu,
    valueJaminan
  ) => {
    const nomPendapatan = valuePendapatan;
    const nomPengajuan = valuePengajuan;
    const nomJangkaWaktu = valueJangkaWaktu;
    const nomJaminan = valueJaminan;
    // const nomPendapatan = 10000000;
    // const nomPengajuan = 60000000;
    // const nomJangkaWaktu = 7;
    // const nomJaminan = 570000;

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

    const valLayak = 90;
    const valTidakLayak = 10;

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

    // pendapatan 3,5
    // pendapatanSedikit 2

    function resultPendapatan(nomPendapatan) {
      // console.log(nomPendapatan < valPendapatanSedikit, 'nomPendapatan < valPendapatanSedikit')
      if (nomPendapatan < valPendapatanSedikit) {
        const SEDIKIT = fuzzyMembershipKecil(
          nomPendapatan,
          valPendapatanSedikit,
          valPendapatanSedang,
          valPendapatanBanyak
        );
        return {
          pendapatan: {
            SEDIKIT,
          },
        };
      } else if (
        nomPendapatan >= valPendapatanSedikit &&
        nomPendapatan <= valPendapatanSedang
      ) {
        const SEDIKIT = fuzzyMembershipKecil(
          nomPendapatan,
          valPendapatanSedikit,
          valPendapatanSedang,
          valPendapatanBanyak
        );
        const SEDANG = fuzzyMembershipSedang(
          nomPendapatan,
          valPendapatanSedikit,
          valPendapatanSedang,
          valPendapatanBanyak
        );
        return {
          pendapatan: {
            SEDIKIT,
            SEDANG,
          },
        };
      } else if (
        nomPendapatan > valPendapatanSedang &&
        nomPendapatan <= valPendapatanBanyak
      ) {
        const SEDANG = fuzzyMembershipSedang(
          nomPendapatan,
          valPendapatanSedikit,
          valPendapatanSedang,
          valPendapatanBanyak
        );
        const BANYAK = fuzzyMembershipBanyak(
          nomPendapatan,
          valPendapatanSedikit,
          valPendapatanSedang,
          valPendapatanBanyak
        );
        return {
          pendapatan: {
            SEDANG,
            BANYAK,
          },
        };
      } else {
        const BANYAK = fuzzyMembershipBanyak(
          nomPendapatan,
          valPendapatanSedikit,
          valPendapatanSedang,
          valPendapatanBanyak
        );
        return {
          pendapatan: {
            BANYAK,
          },
        };
      }
    }
    function resultPengajuan(nomPengajuan) {
      if (nomPengajuan < valPengajuanSedikit) {
        const SEDIKIT = fuzzyMembershipKecil(
          nomPengajuan,
          valPengajuanSedikit,
          valPengajuanSedang,
          valPengajuanBanyak
        );
        return {
          pengajuan: {
            SEDIKIT,
          },
        };
      } else if (
        nomPengajuan >= valPengajuanSedikit &&
        nomPengajuan <= valPengajuanSedang
      ) {
        const SEDIKIT = fuzzyMembershipKecil(
          nomPengajuan,
          valPengajuanSedikit,
          valPengajuanSedang,
          valPengajuanBanyak
        );
        const SEDANG = fuzzyMembershipSedang(
          nomPengajuan,
          valPengajuanSedikit,
          valPengajuanSedang,
          valPengajuanBanyak
        );
        return {
          pengajuan: {
            SEDIKIT,
            SEDANG,
          },
        };
      } else if (
        nomPengajuan > valPengajuanSedang &&
        nomPengajuan <= valPengajuanBanyak
      ) {
        const SEDANG = fuzzyMembershipSedang(
          nomPengajuan,
          valPengajuanSedikit,
          valPengajuanSedang,
          valPengajuanBanyak
        );
        const BANYAK = fuzzyMembershipBanyak(
          nomPengajuan,
          valPengajuanSedikit,
          valPengajuanSedang,
          valPengajuanBanyak
        );
        return {
          pengajuan: {
            SEDANG,
            BANYAK,
          },
        };
      } else {
        const BANYAK = fuzzyMembershipBanyak(
          nomPengajuan,
          valPengajuanSedikit,
          valPengajuanSedang,
          valPengajuanBanyak
        );
        return {
          pengajuan: {
            BANYAK,
          },
        };
      }
    }
    function resultJangkaWaktu(nomJangkaWaktu) {
      if (nomJangkaWaktu < valJangkaWaktuPendek) {
        const PENDEK = fuzzyMembershipKecil(
          nomJangkaWaktu,
          valJangkaWaktuPendek,
          valJangkaWaktuSedang,
          valJangkaWaktuPanjang
        );
        return {
          jangkaWaktu: {
            PENDEK,
          },
        };
      } else if (
        nomJangkaWaktu >= valJangkaWaktuPendek &&
        nomJangkaWaktu <= valJangkaWaktuSedang
      ) {
        const PENDEK = fuzzyMembershipKecil(
          nomJangkaWaktu,
          valJangkaWaktuPendek,
          valJangkaWaktuSedang,
          valJangkaWaktuPanjang
        );
        const SEDANG = fuzzyMembershipSedang(
          nomJangkaWaktu,
          valJangkaWaktuPendek,
          valJangkaWaktuSedang,
          valJangkaWaktuPanjang
        );
        return {
          jangkaWaktu: {
            PENDEK,
            SEDANG,
          },
        };
      } else if (
        nomJangkaWaktu > valJangkaWaktuSedang &&
        nomJangkaWaktu <= valJangkaWaktuPanjang
      ) {
        const SEDANG = fuzzyMembershipSedang(
          nomJangkaWaktu,
          valJangkaWaktuPendek,
          valJangkaWaktuSedang,
          valJangkaWaktuPanjang
        );
        const PANJANG = fuzzyMembershipBanyak(
          nomJangkaWaktu,
          valJangkaWaktuPendek,
          valJangkaWaktuSedang,
          valJangkaWaktuPanjang
        );
        return {
          jangkaWaktu: {
            SEDANG,
            PANJANG,
          },
        };
      } else {
        const PANJANG = fuzzyMembershipBanyak(
          nomJangkaWaktu,
          valJangkaWaktuPendek,
          valJangkaWaktuSedang,
          valJangkaWaktuPanjang
        );
        return {
          jangkaWaktu: {
            PANJANG,
          },
        };
      }
    }
    function resultJaminan(nomJaminan) {
      if (nomJaminan < valJaminanKecil) {
        const KECIL = fuzzyMembershipKecil(
          nomJaminan,
          valJaminanKecil,
          valJaminanSedang,
          valJaminanBesar
        );
        return {
          jaminan: {
            KECIL,
          },
        };
      } else if (
        nomJaminan >= valJaminanKecil &&
        nomJaminan <= valJaminanSedang
      ) {
        const KECIL = fuzzyMembershipKecil(
          nomJaminan,
          valJaminanKecil,
          valJaminanSedang,
          valJaminanBesar
        );
        const SEDANG = fuzzyMembershipSedang(
          nomJaminan,
          valJaminanKecil,
          valJaminanSedang,
          valJaminanBesar
        );
        return {
          jaminan: {
            KECIL,
            SEDANG,
          },
        };
      } else if (
        nomJaminan > valJaminanSedang &&
        nomJaminan <= valJaminanBesar
      ) {
        const SEDANG = fuzzyMembershipSedang(
          nomJaminan,
          valJaminanKecil,
          valJaminanSedang,
          valJaminanBesar
        );
        const BESAR = fuzzyMembershipBanyak(
          nomJaminan,
          valJaminanKecil,
          valJaminanSedang,
          valJaminanBesar
        );
        return {
          jaminan: {
            SEDANG,
            BESAR,
          },
        };
      } else {
        const BESAR = fuzzyMembershipBanyak(
          nomJaminan,
          valJaminanKecil,
          valJaminanSedang,
          valJaminanBesar
        );
        return {
          jaminan: {
            BESAR,
          },
        };
      }
    }

    function resultValueZ(nilaiKombinasi, tf) {
      if (tf === true) {
        return nilaiKombinasi * valLayak;
      } else if (tf === false) {
        return nilaiKombinasi * valTidakLayak;
      } else {
        return null;
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

    function calculateCombinations(data) {
      const keys = Object.keys(data);
      const combinations = [];

      function combine(current, depth) {
        if (depth === keys.length) {
          // Periksa jika salah satu nilai adalah 0, maka abaikan kombinasi ini
          const hasZeroValue = Object.values(current).some(
            (item) => item.value === 0
          );
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

    // Hitung kombinasi dan cetak hasil
    const combinations = calculateCombinations(hasilGabungan);
    const trueFalse = [];
    const allValueZ = [];
    const valueCombine = [];
    const ValueCariAturan = [];
    const preZTerbobot = [];
    const alfaPredikat = [];

    combinations.forEach((combo, index) => {
      const valueCombo = [
        combo.pendapatan.value,
        combo.pengajuan.value,
        combo.jangkaWaktu.value,
        combo.jaminan.value,
      ];
      const mathMins = Math.min(...valueCombo);
      const cariAturan = (pendapatan, pengajuan, jangkaWaktu, jaminan) => {
        return DataAturanFuzzy.find(
          (aturan) =>
            aturan.pendapatan === pendapatan &&
            aturan.pengajuan === pengajuan &&
            aturan.jangkaWaktu === jangkaWaktu &&
            aturan.jaminan === jaminan
        );
      };

      const aturanTerkait = cariAturan(
        combo?.pendapatan?.label,
        combo?.pengajuan?.label,
        combo?.jangkaWaktu?.label,
        combo?.jaminan?.label
      );
      ValueCariAturan.push(aturanTerkait);
      const resultCombineZ = resultValueZ(mathMins, aturanTerkait?.result);
      trueFalse.push(aturanTerkait?.result);
      allValueZ.push(resultCombineZ);
      valueCombine.push(mathMins);
      if (aturanTerkait?.result) {
        preZTerbobot.push(
          valTidakLayak + mathMins * (valLayak - valTidakLayak)
        );
      } else {
        preZTerbobot.push(valLayak - mathMins * (valLayak - valTidakLayak));
      }
      alfaPredikat.push(mathMins);

      // Mencari nilai terkecil dari combo
    });

    const formattedNumbersPreZTerbobot = preZTerbobot?.map((num) =>
      parseFloat(num.toFixed(2))
    );
    const formattedNumbersAlfaPredikat = alfaPredikat?.map((num) =>
      parseFloat(num.toFixed(2))
    );

    // Mengalikan kedua array berdasarkan indeks
    const sigmaAlfaPredikatXZ = formattedNumbersAlfaPredikat
      .map((value, index) => value * formattedNumbersPreZTerbobot[index])
      .reduce((sum, current) => sum + current, 0);

    const sigmaAlfaPredikat = formattedNumbersAlfaPredikat.reduce(
      (total, num) => total + num,
      0
    );

    const zTerbobot = sigmaAlfaPredikatXZ / sigmaAlfaPredikat;

    // Rumus preZTerbobotTidakLayak = valLayak - alfaPredikat * (valLayak - valTidakLayak)
    // Rumus preZTerbobotLayak = valTidakLayak + alfaPredikat * (valLayak - valTidakLayak)

    return parseFloat(zTerbobot.toFixed(2));
  };

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
        open={openNotifikasi}
        onClose={handleCloseNotifikasi}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Keputusan</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {trigger?.trigger === "edit" ? (
              <>
                <div>
                  <Button
                    onClick={() =>
                      handleClickOpenNotifikasi(trigger?.id, trigger?.row, true)
                    }
                    color="info"
                    variant="contained"
                  >
                    Layak
                  </Button>
                  <Button
                    onClick={() =>
                      handleClickOpenNotifikasi(
                        trigger?.id,
                        trigger?.row,
                        false
                      )
                    }
                    color="warning"
                    variant="contained"
                  >
                    Tidak Layak
                  </Button>
                </div>
              </>
            ) : (
              <div>
                Apakah anda yakin dengan keputusan
                {trigger?.trueFalse === true ? (
                  <span className="font-bold"> "Layak"</span>
                ) : (
                  <span className="font-bold"> "Tidak Layak" </span>
                )}{" "}
                ini?
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {trigger?.trigger === "edit" ? (
            <>
              <Button onClick={handleCloseNotifikasi}>Tutup</Button>
              {/* <Button onClick={HandelApprove} autoFocus>
                Simpan
              </Button> */}
            </>
          ) : (
            <>
              <Button onClick={handleCloseNotifikasi}>Tutup</Button>
              <Button onClick={HandelApprove} autoFocus>
                Simpan
              </Button>
            </>
          )}
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
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>
                      {row?.nasabah?.nama === null ? "-" : row?.nasabah?.nama}
                    </TableCell>
                    <TableCell>
                      {fuzzySakamotos(
                        row?.pendapatanBersih,
                        row?.nominalPermohonan,
                        extractInteger(row?.jangkaWaktu),
                        extractInteger(row?.jaminan)
                      )}
                    </TableCell>
                    <TableCell>
                      {row?.status === null || row?.status === "" ? (
                        <div>
                          <Button
                            onClick={() =>
                              handleClickOpenNotifikasi(row?.id, row, true)
                            }
                            color="info"
                            variant="contained"
                          >
                            Layak
                          </Button>
                          <Button
                            onClick={() =>
                              handleClickOpenNotifikasi(row?.id, row, false)
                            }
                            color="warning"
                            variant="contained"
                          >
                            Tidak Layak
                          </Button>
                        </div>
                      ) : row?.status === "1" ? (
                        <Button
                          onClick={() => HandleNotifikasi("Layak")}
                          color="info"
                          variant="contained"
                        >
                          Layak
                        </Button>
                      ) : row?.status === "0" ? (
                        <Button
                          onClick={() => HandleNotifikasi("Tidak Layak")}
                          color="warning"
                          variant="contained"
                        >
                          Tidak Layak
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          variant="contained"
                          onClick={() => HandleNotifikasi("Error")}
                        >
                          {row?.status === null || row?.status === ""
                            ? "-"
                            : row?.status}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="success"
                        disabled={row?.status === null || row?.status === ""}
                        variant="contained"
                        onClick={() =>
                          handleClickOpenNotifikasi(row?.id, row, true, "edit")
                        }
                      >
                        Edit
                      </Button>
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
