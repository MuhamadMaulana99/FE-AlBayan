/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
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
import ExcelJS from "exceljs";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import FuseAnimate from "@fuse/core/FuseAnimate";
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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Analisa from "../analisa/Analisa";
import { getUserInfo, handleError } from "app/configs/getUserInfo";
import { fetchApi } from "app/configs/fetchApi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const columns = [
  { id: "no", label: "NO", minWidth: 60, align: "left" },
  {
    id: "namaNasabah",
    label: "Nama Nasabah",
    minWidth: 170,
    align: "left",
  },
  {
    id: "rekening",
    label: "Rekening",
    minWidth: 170,
    align: "left",
  },
  {
    id: "saldoTabungan",
    label: "Saldo Tabungan",
    minWidth: 170,
    align: "left",
  },
  {
    id: "persentase",
    label: "Persentase",
    minWidth: 170,
    align: "left",
  },
  {
    id: "statusAnalisa",
    label: "Status Permohonan",
    minWidth: 170,
    align: "left",
  },
  {
    id: "aksi",
    label: "Aksi",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  no,
  id_permohonans,
  nasabah,
  statusPermohonan,
  hasilPermohonan,
  persentase,
  saldoTabungan
) {
  return {
    no,
    id_permohonans,
    nasabah,
    statusPermohonan,
    hasilPermohonan,
    persentase,
    saldoTabungan,
  };
}

const formatRekening = (value) => {
  const cleaned = value?.replace(/\D/g, ""); // Hapus non-digit
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})?$/);
  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join(".");
  }
  return value;
};
export default function PermohonanTable(props) {
  const { dataNasabah } = props;
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
  const dataMasterSuplayer = props?.dataMasterSuplayer;
  const dispatch = useDispatch();
  // console.log(dataAnalisa, 'dataAnalisa');
  const [data, setData] = useState([]);
  const [getDataEdit, setgetDataEdit] = useState({});
  const [getDataNasabahById, setgetDataNasabahById] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsValue, setSelectedItemsValue] = useState([]);
  const [openNotifikasi, setOpenNotifikasi] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataEdit, setDataEdit] = useState({
    id_users: null,
    id_mst_nasabah: null,
    saldoTabungan: null,
    row: null,
  });

  const rows = props?.data;

  const handleClickOpenNotifikasi = () => {
    setOpenNotifikasi(true);
  };
  const handleCloseNotifikasi = () => {
    setOpenNotifikasi(false);
  };

  // if (dataLogin?.roleUser === 'Staff') {
  //   rows = props?.data.filter((word) => word.kabupaten === getResponseName?.name);
  // }
  const propsFromParent = (analisa) => {
    // console.log(analisa, "analisaa");
  };
  // console.log(props, "rows");

  rows?.map((item, index) =>
    createData(
      index + 1,
      item?.id_permohonans,
      item?.nasabah,
      item?.statusPermohonan,
      item?.hasilPermohonan,
      item?.persentase,
      item?.saldoTabungan
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
    // setDataEdit(row);
    setDataEdit({
      id_users: null,
      id_mst_nasabah: row?.nasabah,
      saldoTabungan: row?.saldoTabungan,
      row,
    });
    // setgetDataEdit(row);
    // console.log(row, 'rrrr');
  };
  const handleClose = () => {
    setOpen(false);
    setDataEdit({
      id_users: null,
      id_mst_nasabah: null,
      saldoTabungan: null,
    });
  };
  const [openAnalisa, setopenAnalisa] = useState(false);

  const handleClickopenAnalisa = (row) => {
    if (row?.statusPermohonan === false) {
      setopenAnalisa(true);
      setDataEdit({
        id_users: null,
        id_mst_nasabah: null,
        saldoTabungan: null,
        row,
      });
    } else {
      dispatch(
        showMessage({
          message: `Nasabah ${row?.namaNasabah} Sudah Di Analisa`,
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

  const handleCloseAnalisa = () => {
    setopenAnalisa(false);
    setSelectedItemsValue([]);
    setSelectedItems([]);
  };

  const initialValue = 0;
  const sumSelected = selectedItemsValue.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  // console.log(sumSelected, 'sum');
  function hitungPersentase(nilai, totalNilai) {
    const persen = (nilai / totalNilai) * 100;
    return Math.round(persen);
  }

  const persentase = hitungPersentase(sumSelected, 370);
  // console.log(`Persentase: ${persentase}%`);

  useEffect(() => {
    const result = dataNasabah.filter(
      (item) => item.mstRekening === dataEdit?.namaNasabah?.mstRekening
    );
    setgetDataNasabahById(result);
  }, [dataEdit, dataNasabah]);

  const body = {
    id_users: userInfo?.userInfo?.user?.id,
    id_mst_nasabah: dataEdit?.id_mst_nasabah?.id_mst_nasabah,
    saldoTabungan: dataEdit?.saldoTabungan,
  };
  // console.log(body, "body");

  const HandelEdit = (id) => {
    setLoading(true);
    const api = fetchApi(); // Gunakan instance fetchApi

    api
      .put(`/Permohonan/${dataEdit?.row?.id_permohonans}`, body)
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
        const messages = handleError(err);
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
        setLoading(false);
      });
  };

  const handleSaveAnalisa = (row, id) => {
    setLoading(true);
    const api = fetchApi(); // Gunakan instance fetchApi

    api
      .put(`/approvalPermohonan/${dataEdit?.row?.id_permohonans}`, {
        statusPermohonan: true,
        persentase,
        hasilPermohonan: !(persentase < 70),
      })
      .then((res) => {
        props?.getData();
        handleCloseAnalisa();
        handleCloseNotifikasi();
        setLoading(false);
        dispatch(
          showMessage({
            message: `Nasabah ${row?.namaNasabah} Berhasil Di Approve`,
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
        const messages = handleError(err);
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
        handleCloseAnalisa();
        handleCloseNotifikasi();
        setLoading(false);
      });
  };

  const HandelDelete = (id) => {
    setLoading(true);
    const api = fetchApi(); // Gunakan instance fetchApi

    api
      .delete(`/Permohonan/${id}`)
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
        const messages = handleError(err);
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
        setData([]);
        setLoading(false);
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
    const filteredColumns = columns.filter((column) => column.id !== "aksi");
    const tableColumn = filteredColumns.map((column) => column.label); // Mendapatkan header kolom
    const tableRows = rows.map((row, index) => [
      index + 1,
      row?.namaNasabah,
      formatRekening(row?.rekening),
      row?.jenisKelamin,
      row?.alamat,
      row?.kecamatan,
      row?.kabupaten,
      row?.provinsi,
      row?.saldoTabungan,
      row?.persentase,
      row?.statusPermohonan === false
        ? "Analisa"
        : row?.persentase < 70
        ? "Tidak Layak"
        : "Layak",
    ]);

    doc.autoTable(tableColumn, tableRows);
    doc.save("data.pdf");
  };

  // Fungsi untuk ekspor ke Excel
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Menambahkan header
    const filteredColumns = columns.filter((column) => column.id !== "aksi");
    worksheet.columns = filteredColumns.map((column) => ({
      header: column.label,
      key: column.id,
      width: column?.id === "no" ? 5 : 20,
    }));

    // Menambahkan data ke worksheet
    rows.map((row, index) => {
      worksheet.addRow({
        no: index + 1,
        namaNasabah: row?.namaNasabah,
        rekening: formatRekening(row?.rekening),
        jenisKelamin: row?.jenisKelamin,
        alamat: row?.alamat,
        kecamatan: row?.kecamatan,
        kabupaten: row?.kabupaten,
        provinsi: row?.provinsi,
        saldoTabungan: row?.saldoTabungan,
        persentase: row?.persentase,
        statusAnalisa:
          row?.statusPermohonan === false
            ? "Analisa"
            : row?.persentase < 70
            ? "Tidak Layak"
            : "Layak",
      });
    });
    // Menyimpan file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.xlsx";
    link.click();
  };
  // console.log(dataEdit, 'dataEdit')

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
        <DialogTitle id="alert-dialog-title">Analisa</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah anda yakin dengan analisa ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotifikasi}>Tutup</Button>
          <Button onClick={handleSaveAnalisa} autoFocus>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={openAnalisa}
        onClose={handleCloseAnalisa}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseAnalisa}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Analisis 5C: {persentase}%
            </Typography>
            <Button
              disabled={selectedItemsValue.length === 0}
              autoFocus
              color="inherit"
              onClick={handleClickOpenNotifikasi}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Analisa
          propsFromParent={propsFromParent}
          selectedItems={selectedItems}
          selectedItemsValue={selectedItemsValue}
          setSelectedItems={setSelectedItems}
          setSelectedItemsValue={setSelectedItemsValue}
        />
      </Dialog>
      <Dialog
        className="py-20"
        open={open}
        id="edit"
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
                options={dataNasabah}
                value={dataEdit?.id_mst_nasabah}
                getOptionLabel={(option) => option.mstRekening}
                sx={{ width: 300 }}
                onChange={(e, newValue) => {
                  setDataEdit({ ...dataEdit, id_mst_nasabah: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Data Nasabah" />
                )}
              />
              <TextField
                value={dataEdit?.saldoTabungan}
                onChange={(e) => {
                  setDataEdit({ ...dataEdit, saldoTabungan: e.target.value });
                  // settriggeralamat({ ...stateBody, alamat: stateBody?.rekening})
                }}
                id="outlined-basic"
                label="Saldo "
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
                function formatRupiah(amount) {
                  return (
                    "Rp. " +
                    amount.toLocaleString("id-ID", { minimumFractionDigits: 0 })
                  );
                }
                // console.log(row, 'ooo')
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
                    {/* <TableCell>
                      {row?.nasabah?.mstjenisKelamin === null ? "-" : row?.nasabah?.mstjenisKelamin}
                    </TableCell>
                    <TableCell>
                      {row?.alamat === null ? "-" : row?.alamat}
                    </TableCell>
                    <TableCell>
                      {row?.kecamatan === null ? "-" : row?.kecamatan}
                    </TableCell>
                    <TableCell>
                      {row?.kabupaten === null ? "-" : row?.kabupaten}
                    </TableCell>
                    <TableCell>
                      {row?.provinsi === null ? "-" : row?.provinsi}
                    </TableCell> */}
                    <TableCell>
                      {row?.saldoTabungan === null
                        ? "-"
                        : formatRupiah(row?.saldoTabungan)}
                    </TableCell>
                    <TableCell>{`${
                      row?.persentase === null ? "-" : row?.persentase
                    }%`}</TableCell>
                    <TableCell>
                      {row?.statusPermohonan === false ? (
                        <Button
                          onClick={() => handleClickopenAnalisa(row, row?.id)}
                          color="info"
                          variant="contained"
                        >
                          Analisis 5C
                        </Button>
                      ) : row?.persentase < 70 ? (
                        <Button
                          onClick={() => handleClickopenAnalisa(row, row?.id)}
                          color="warning"
                          variant="contained"
                        >
                          {"Ditolak"}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleClickopenAnalisa(row, row?.id)}
                          color="success"
                          variant="contained"
                        >
                          {"Pengajuan"}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <div>
                          <IconButton
                            onClick={() => handleClickOpen(row.id, row)}
                            color="info"
                            disabled={
                              dataLogin?.roleUser === "Staff" &&
                              row?.accBasil !== null
                            }
                            className=""
                          >
                            <EditIcon />
                          </IconButton>
                        </div>
                        <div>
                          <IconButton
                            onClick={(e) =>
                              HandelDelete(row.id_permohonans)
                            }
                            color="error"
                            disabled={
                              dataLogin?.roleUser === "Staff" &&
                              row?.accBasil !== null
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
