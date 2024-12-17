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
import { useState } from "react";
import moment from "moment";
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
  { id: "no", label: "NO", minWidth: 170, align: "left" },
  {
    id: "nomorAkad",
    label: "Nomor Akad",
    minWidth: 170,
    align: "left",
  },
  {
    id: "namaNasabah",
    label: "Nama Nasabah",
    minWidth: 170,
    align: "left",
  },
  {
    id: "staffBasil",
    label: "Staff Basil",
    minWidth: 170,
    align: "left",
  },
  {
    id: "staffPokok",
    label: "Staff Pokok",
    minWidth: 170,
    align: "left",
  },
  {
    id: "accBasil",
    label: "Acc Basil",
    minWidth: 170,
    align: "left",
  },
  {
    id: "accPokok",
    label: "Acc Pokok",
    minWidth: 170,
    align: "left",
  },
  {
    id: "staffBy",
    label: "Staff By",
    minWidth: 170,
    align: "left",
  },
  {
    id: "staffAt",
    label: "Staff At",
    minWidth: 170,
    align: "left",
  },
  {
    id: "KasirBy",
    label: "Kasir By",
    minWidth: 170,
    align: "left",
  },
  {
    id: "KasirAt",
    label: "Kasir At",
    minWidth: 170,
    align: "left",
  },
  {
    id: "lokasiPembayaran",
    label: "Lokasi Pembayaran",
    minWidth: 170,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "left",
  },
  // {
  //   id: 'stokBarang',
  //   label: 'Stok Barang',
  //   minWidth: 170,
  //   align: 'left',
  // },
  // {
  //   id: 'satuan',
  //   label: 'Satuan',
  //   minWidth: 170,
  //   align: 'left',
  // },
  // {
  //   id: 'deskripsi',
  //   label: 'Desskripsi',
  //   minWidth: 170,
  //   align: 'left',
  // },
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
  id,
  nomorAkad,
  namaNasabah,
  staffBasil,
  staffPokok,
  accBasil,
  accPokok,
  staffBy,
  staffAt,
  kasirBy,
  kasirAtt,
  lokasiPembayaran,
  status
) {
  return {
    no,
    id,
    nomorAkad,
    namaNasabah,
    staffBasil,
    staffPokok,
    accBasil,
    accPokok,
    staffBy,
    staffAt,
    kasirBy,
    kasirAtt,
    lokasiPembayaran,
    status,
  };
}

export default function AngsuranTable(props) {
  const { optionNoAkad } = props;
  const currentDate = moment().format();
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
  // console.log(dataMasterBarang, 'dataMasterBarang');
  const [data, setData] = useState([]);
  const [getDataEdit, setgetDataEdit] = useState({});
  const [dataEdit, setDataEdit] = useState({
    id: null,
    nomorAkad: null,
    namaNasabah: null,
    staffBasil: "",
    staffPokok: "",
    accBasil: null,
    accPokok: null,
    staffBy: null,
    staffAt: null,
    kasirBy: null,
    kasirAtt: null,
    lokasiPembayaran: null,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let rows = props?.data;
  if (dataLogin?.roleUser === "Staff") {
    rows = props?.data.filter((word) => word.staffBy === getResponseName?.name);
  }

  rows?.map((item, index) =>
    createData(
      index + 1,
      item?.id,
      item?.nomorAkad,
      item?.namaNasabah,
      item?.staffBasil,
      item?.staffPokok,
      item?.accBasil,
      item?.accPokok,
      item?.staffBy,
      item?.staffAt,
      item?.kasirBy,
      item?.kasirAtt,
      item?.lokasiPembayaran
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
      nomorAkad: row?.nomorAkad,
      staffBasil: row?.staffBasil,
      staffPokok: row?.staffPokok,
      accBasil: row?.staffBasil,
      accPokok: row?.staffPokok,
      staffBy: row?.staffBy,
      staffAt: row?.staffAt,
      kasirBy: row?.kasirBy,
      kasirAtt: row?.kasirAtt,
      lokasiPembayaran: row?.lokasiPembayaran,
    });
    setgetDataEdit(row);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    nomorAkad: JSON.stringify(dataEdit?.nomorAkad),
    namaNasabah: dataEdit?.namaNasabah,
    staffBasil: dataEdit?.staffBasil,
    staffPokok: dataEdit?.staffPokok,
    accBasil: dataEdit?.accBasil,
    accPokok: dataEdit?.accPokok,
    staffBy: dataEdit?.staffBy,
    staffAt: dataEdit?.staffAt,
    kasirBy:
      dataLogin?.roleUser === "Admin" || dataLogin?.roleUser === "Kasir"
        ? getResponseName?.name
        : null,
    kasirAtt:
      dataLogin?.roleUser === "Admin" || dataLogin?.roleUser === "Kasir"
        ? currentDate
        : null,
    lokasiPembayaran: dataEdit?.lokasiPembayaran,
  };
  // console.log(body, 'body');

  const HandelEdit = (id) => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_}/angsuran/${dataEdit?.id}`,
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
  const HandelDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${process.env.REACT_APP_API_URL_API_}/angsuran/${id}`)
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
  // console.log(rows, 'rrr')
  const downloadPDF = () => {
    const doc = new jsPDF("landscape");

    // Filter out the 'aksi' column
    const filteredColumns = columns.filter((column) => column.id !== "aksi");

    // Table headers from the filtered columns
    const tableColumn = filteredColumns.map((column) => column.label);

    // Generate table rows using the mapped rows data
    const tableRows = rows?.map((item, index) => [
      index + 1,
      item?.id || "",
      item?.nomorAkad?.nomorAkad || "",
      item?.nomorAkad?.namaNasabah || "",
      item?.staffBasil || "",
      item?.staffPokok || "",
      item?.accBasil || "",
      item?.accPokok || "",
      item?.staffBy || "",
      item?.staffAt || "",
      item?.kasirBy || "",
      item?.kasirAtt || "",
      item?.lokasiPembayaran || "",
    ]);

    // Table styling adjustments
    const tableStyle = {
      headStyles: {
        fillColor: [0, 102, 255], // Header warna biru
        textColor: [255, 255, 255], // Teks header putih
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
        // Sesuaikan lebar kolom
        0: { cellWidth: 10 }, // No
        1: { cellWidth: 20 }, // ID
        2: { cellWidth: 30 }, // Nomor Akad
        3: { cellWidth: 35 }, // Nama Nasabah
        4: { cellWidth: 30 }, // Staff Basil
        5: { cellWidth: 30 }, // Staff Pokok
        6: { cellWidth: 30 }, // Acc Basil
        7: { cellWidth: 30 }, // Acc Pokok
        8: { cellWidth: 30 }, // Staff By
        9: { cellWidth: 30 }, // Staff At
        10: { cellWidth: 30 }, // Kasir By
        11: { cellWidth: 30 }, // Kasir Att
        12: { cellWidth: 35 }, // Lokasi Pembayaran
      },
    };

    // Judul pada halaman pertama
    doc.text("Laporan Data Nasabah", 14, 15);

    // Tambahkan tabel menggunakan autoTable
    doc.autoTable({
      head: [tableColumn], // Header kolom
      body: tableRows, // Isi tabel
      ...tableStyle,
      margin: { top: 20 }, // Margin atas agar tidak menimpa judul
      didDrawPage: (data) => {
        // Tambahkan nomor halaman di footer
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(`Page ${pageCount}`, 270, 200); // Posisi footer kanan bawah
      },
    });

    // Simpan PDF dengan nama file
    doc.save("laporan_data_nasabah.pdf");
  };

  // Fungsi untuk ekspor ke Excel
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Angsuram");

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
        id: item?.id || "",
        nomorAkad: item?.nomorAkad?.nomorAkad || "",
        namaNasabah: item?.nomorAkad?.namaNasabah || "",
        staffBasil: item?.staffBasil || "",
        staffPokok: item?.staffPokok || "",
        accBasil: item?.accBasil || "",
        accPokok: item?.accPokok || "",
        staffBy: item?.staffBy || "",
        staffAt: item?.staffAt || "",
        kasirBy: item?.kasirBy || "",
        kasirAtt: item?.kasirAtt || "",
        lokasiPembayaran: item?.lokasiPembayaran || "",
      });
    });

    // Save the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "laporan_data_nasabah.xlsx";
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
              {dataLogin?.roleUser === "Admin" ? (
                <div className="flex gap-5">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={optionNoAkad}
                    value={dataEdit?.nomorAkad}
                    getOptionLabel={(option) => option.nomorAkad}
                    sx={{ width: 300 }}
                    onChange={(e, newValue) => {
                      setDataEdit({ ...dataEdit, nomorAkad: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="No Akad" />
                    )}
                  />
                  <TextField
                    fullWidth
                    value={dataEdit?.staffBasil}
                    onChange={(e) => {
                      setDataEdit({ ...dataEdit, staffBasil: e.target.value });
                      // settriggerAccBasil({ ...dataEdit, accBasil: dataEdit?.staffBasil})
                    }}
                    id="outlined-basic"
                    label="Staff Basil"
                    type="number"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    value={dataEdit?.staffPokok}
                    onChange={(e) =>
                      setDataEdit({ ...dataEdit, staffPokok: e.target.value })
                    }
                    id="outlined-basic"
                    label="Staff Pokok"
                    type="number"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    value={dataEdit?.accBasil}
                    // defaultValue={dataEdit?.staffBasil}
                    onChange={(e) =>
                      setDataEdit({ ...dataEdit, accBasil: e.target.value })
                    }
                    id="outlined-basic"
                    label="Acc Basil"
                    type="number"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    value={dataEdit?.accPokok}
                    onChange={(e) =>
                      setDataEdit({ ...dataEdit, accPokok: e.target.value })
                    }
                    id="outlined-basic"
                    label="Acc Pokok"
                    type="number"
                    variant="outlined"
                  />
                </div>
              ) : dataLogin?.roleUser === "Kasir" ? (
                <div className="flex gap-5">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={optionNoAkad}
                    value={dataEdit?.nomorAkad}
                    getOptionLabel={(option) => option.nomorAkad}
                    sx={{ width: 300 }}
                    onChange={(e, newValue) => {
                      setDataEdit({ ...dataEdit, nomorAkad: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="No Akad" />
                    )}
                  />
                  <TextField
                    fullWidth
                    value={dataEdit?.accBasil}
                    // defaultValue={dataEdit?.staffBasil}
                    onChange={(e) =>
                      setDataEdit({ ...dataEdit, accBasil: e.target.value })
                    }
                    id="outlined-basic"
                    label="Acc Basil"
                    type="number"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    value={dataEdit?.accPokok}
                    onChange={(e) =>
                      setDataEdit({ ...dataEdit, accPokok: e.target.value })
                    }
                    id="outlined-basic"
                    label="Acc Pokok"
                    type="number"
                    variant="outlined"
                  />
                </div>
              ) : (
                <div className="flex gap-5">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={optionNoAkad}
                    value={dataEdit?.nomorAkad}
                    getOptionLabel={(option) => option.nomorAkad}
                    sx={{ width: 300 }}
                    onChange={(e, newValue) => {
                      setDataEdit({ ...dataEdit, nomorAkad: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="No Akad" />
                    )}
                  />
                  <TextField
                    fullWidth
                    value={dataEdit?.staffBasil}
                    onChange={(e) => {
                      setDataEdit({ ...dataEdit, staffBasil: e.target.value });
                      // settriggerAccBasil({ ...dataEdit, accBasil: dataEdit?.staffBasil})
                    }}
                    id="outlined-basic"
                    label="Staff Basil"
                    type="number"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    value={dataEdit?.staffPokok}
                    onChange={(e) =>
                      setDataEdit({ ...dataEdit, staffPokok: e.target.value })
                    }
                    id="outlined-basic"
                    label="Staff Pokok"
                    type="number"
                    variant="outlined"
                  />
                </div>
              )}
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
                // console.log(row, 'oo');
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>
                      {row?.nomorAkad === null
                        ? "-"
                        : row?.nomorAkad?.nomorAkad}
                    </TableCell>
                    <TableCell>
                      {row?.namaNasabah === null ? "-" : row?.namaNasabah}
                    </TableCell>
                    <TableCell>
                      {row?.staffBasil === null ? "-" : row?.staffBasil}
                    </TableCell>
                    <TableCell>
                      {row?.staffPokok === null ? "-" : row?.staffPokok}
                    </TableCell>
                    <TableCell>
                      {row?.accBasil === null ? "-" : row?.accBasil}
                    </TableCell>
                    <TableCell>
                      {row?.accPokok === null ? "-" : row?.accPokok}
                    </TableCell>
                    <TableCell>
                      {row?.staffBy === null ? "-" : row?.staffBy}
                    </TableCell>
                    <TableCell>
                      {row?.staffAt === null
                        ? "-"
                        : moment(row?.staffAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                    </TableCell>
                    <TableCell>
                      {row?.kasirBy === null ? "-" : row?.kasirBy}
                    </TableCell>
                    <TableCell>
                      {row?.kasirAtt === null
                        ? "-"
                        : moment(row?.kasirAtt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                    </TableCell>
                    <TableCell>
                      {row?.lokasiPembayaran === null
                        ? "-"
                        : row?.lokasiPembayaran}
                    </TableCell>
                    <TableCell>
                      {row?.accBasil === null ? (
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
                            onClick={(e) => HandelDelete(row.id)}
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
