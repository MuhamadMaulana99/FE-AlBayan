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

  console.log(rows, 'rows')
  

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
