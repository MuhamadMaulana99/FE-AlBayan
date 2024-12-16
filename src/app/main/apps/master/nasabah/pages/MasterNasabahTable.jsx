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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import { useDispatch } from "react-redux";
import ExcelJS from 'exceljs';
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseAnimate from "@fuse/core/FuseAnimate";
import jsPDF from "jspdf";

const columns = [
  { id: "no", label: "NO", minWidth: 170, align: "left" },
  {
    id: "nama",
    label: "Nama",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "nik",
    label: "NIK",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "norek",
    label: "No Rek",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "jenisKelamin",
    label: "Jenis Kelamin",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "alamat",
    label: "Alamat",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "kecamatan",
    label: "Kecamatan",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "kabupaten",
    label: "Kabupaten",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "provinsi",
    label: "Provinsi",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
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
  id,
  nama,
  mstNik,
  mstRekening,
  mstjenisKelamin,
  mstAlamat,
  mstKecamatan,
  mstKabupaten,
  mstProvinsi
) {
  return {
    no,
    id,
    nama,
    mstNik,
    mstRekening,
    mstjenisKelamin,
    mstAlamat,
    mstKecamatan,
    mstKabupaten,
    mstProvinsi,
  };
}

const jenKel = [
  { kelamin: "Laki-laki", id: 1 },
  { kelamin: "Perempuan", id: 2 },
];

export default function MasterNasabahTable(props) {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [dataEdit, setDataEdit] = React.useState({
    id: null,
    nama: null,
    mstNik: null,
    mstRekening: null,
    mstjenisKelamin: null,
    mstAlamat: null,
    mstKecamatan: null,
    mstKabupaten: null,
    mstProvinsi: null,
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = props?.data?.map((item, index) =>
    createData(
      index + 1,
      item?.id,
      item?.nama,
      item?.mstNik,
      item?.mstRekening,
      item?.mstjenisKelamin,
      item?.mstAlamat,
      item?.mstKecamatan,
      item?.mstKabupaten,
      item?.mstProvinsi
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatRekening = (value) => {
    const cleaned = value.replace(/\D/g, ""); // Hapus non-digit
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})?$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(".");
    }
    return value;
  };

  const handleClickOpen = (id, row) => {
    setOpen(true);
    setDataEdit({
      id: row?.id,
      nama: row?.nama,
      mstNik: row?.mstNik,
      mstRekening: row?.mstRekening,
      mstjenisKelamin: row?.mstjenisKelamin,
      mstAlamat: row?.mstAlamat,
      mstKecamatan: row?.mstKecamatan,
      mstKabupaten: row?.mstKabupaten,
      mstProvinsi: row?.mstProvinsi,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    nama: dataEdit?.nama,
    mstNik: dataEdit?.mstNik,
    mstRekening: dataEdit?.mstRekening,
    mstjenisKelamin: JSON.stringify(dataEdit?.mstjenisKelamin),
    mstAlamat: dataEdit?.mstAlamat,
    mstKecamatan: dataEdit?.mstKecamatan,
    mstKabupaten: dataEdit?.mstKabupaten,
    mstProvinsi: dataEdit?.mstProvinsi,
  };

  const HandelEdit = (id) => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL_API_}/masterNasabah/${dataEdit?.id}`,
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
      .delete(`${process.env.REACT_APP_API_URL_API_}/masterNasabah/${id}`)
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
  // console.log(rows, 'rows')
  const downloadPDF = () => {
    const doc = new jsPDF("landscape");
    const filteredColumns = columns.filter(column => column.id !== "aksi");
    const tableColumn = filteredColumns.map((column) => column.label); // Mendapatkan header kolom
    const tableRows = rows.map((row, index) => [
      index + 1,
      row?.nama,
      row?.mstNik,
      formatRekening(row?.mstRekening),
      row?.mstjenisKelamin?.kelamin,
      row?.mstAlamat,
      row?.mstKecamatan,
      row?.mstKabupaten,
      row?.mstProvinsi,
    ]);

    doc.autoTable(tableColumn, tableRows);
    doc.save("data.pdf");
  };

  // Fungsi untuk ekspor ke Excel
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Menambahkan header
    const filteredColumns = columns.filter(column => column.id !== "aksi");
    worksheet.columns = filteredColumns.map((column) => ({
      header: column.label,
      key: column.id,
      width: column?.id === 'no' ? 5 : 20,
    }));

    // Menambahkan data ke worksheet
    rows.map((row, index) => {
      worksheet.addRow({
        no: index + 1,
        nama: row?.nama,
        nik: row?.mstNik,
        norek: formatRekening(row?.mstRekening),
        jenisKelamin: row?.mstjenisKelamin?.kelamin,
        alamat: row?.mstAlamat,
        kecamatan: row?.mstKecamatan,
        kabupaten: row?.mstKabupaten,
        provinsi: row?.mstProvinsi,
      });
    });

    console.log(rows, 'rows')

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
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Master Barang</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-2 gap-16 mt-10 mb-10">
              {/* First row */}
              <div className="flex flex-wrap gap-5 p-10">
                <TextField
                  value={dataEdit?.nama}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, nama: e.target.value })
                  }
                  id="outlined-basic"
                  label="Nama Nasabah"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  value={dataEdit?.mstNik}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, mstNik: e.target.value })
                  }
                  id="outlined-basic"
                  label="No Rek"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  value={dataEdit?.mstRekening}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, mstRekening: e.target.value })
                  }
                  id="outlined-basic"
                  label="No Rek"
                  variant="outlined"
                  fullWidth
                />
                <div className="mt-10 w-full">
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.kelamin}
                    value={dataEdit?.mstjenisKelamin}
                    onChange={(e, newValue) =>
                      setDataEdit({ ...dataEdit, mstjenisKelamin: newValue })
                    }
                    options={jenKel}
                    renderInput={(params) => (
                      <TextField {...params} label="Jenis Kelamin" />
                    )}
                  />
                </div>
              </div>

              {/* Second row */}
              <div className="flex flex-wrap gap-5 p-10">
                <TextField
                  value={dataEdit?.mstAlamat}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, mstAlamat: e.target.value })
                  }
                  id="outlined-basic"
                  label="Alamat"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  value={dataEdit?.mstKecamatan}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, mstKecamatan: e.target.value })
                  }
                  id="outlined-basic"
                  label="Kecamatan"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  value={dataEdit?.mstKabupaten}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, mstKabupaten: e.target.value })
                  }
                  id="outlined-basic"
                  label="Kabupaten"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  value={dataEdit?.mstProvinsi}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, mstProvinsi: e.target.value })
                  }
                  id="outlined-basic"
                  label="Provinsi"
                  variant="outlined"
                  fullWidth
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
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row?.nama}</TableCell>
                    <TableCell>{row?.mstNik}</TableCell>
                    <TableCell>{formatRekening(row?.mstRekening)}</TableCell>
                    <TableCell>{row?.mstjenisKelamin?.kelamin}</TableCell>
                    <TableCell>{row?.mstAlamat}</TableCell>
                    <TableCell>{row?.mstKecamatan}</TableCell>
                    <TableCell>{row?.mstKabupaten}</TableCell>
                    <TableCell>{row?.mstProvinsi}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <div>
                          <IconButton
                            onClick={() => handleClickOpen(row.id, row)}
                            color="info"
                            className=""
                          >
                            <EditIcon />
                          </IconButton>
                        </div>
                        <div>
                          <IconButton
                            onClick={(e) => HandelDelete(row.id)}
                            color="error"
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
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
