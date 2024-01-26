/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FuseLoading from '@fuse/core/FuseLoading';
import Button from '@mui/material/Button';
import moment from 'moment';
import dayjs from 'dayjs';

const top100Films = [
  { label: 'KG', year: 1994 },
  { label: 'Lusin', year: 1972 },
  { label: 'Bal', year: 1994 },
];

const columns = [
  { id: 'no', label: 'NO', minWidth: 170, align: 'left' },
  {
    id: 'kodeBarang',
    label: 'Kode Barang',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'namaBarang',
    label: 'Nama Barang',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'hargaBarang',
    label: 'Harga Barang',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'tglMasuk',
    label: 'Tanggal Masuk',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'supllayer',
    label: 'supllayer',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'jumlahMasuk',
    label: 'Jumlah Masuk',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'satuan',
    label: 'Stauan',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'aksi',
    label: 'Aksi',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];

function createData(
  no,
  id,
  kodeBarang,
  namaBarang,
  hargaBarang,
  tglMasuk,
  supllayer,
  jumlahMasuk,
  satuan
) {
  return { no, id, kodeBarang, namaBarang, hargaBarang, tglMasuk, supllayer, jumlahMasuk, satuan };
}

export default function BarangMasukTable(props) {
  const userRoles = JSON.parse(localStorage.getItem('userRoles'));
  let getAllUserResponse;
  let getResponseName;
  let dataLogin;
  if (userRoles) {
    getAllUserResponse = userRoles?.response?.userRoles;
    getResponseName = userRoles?.response;
    dataLogin = JSON.parse(getAllUserResponse);
  }
  const dataMasterSuplayer = props?.dataMasterSuplayer;
  const dataMasterBarang = props?.dataMasterBarang;
  // console.log(props, 'pp')
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [dataEdit, setDataEdit] = React.useState({
    kodeBarang: '',
    namaBarang: '',
    supllayer: '',
    jumlahMasuk: '',
    hargaBarang: '',
    tglMasuk: null,
    satuan: null,
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const api = `https://6530fba34d4c2e3f333c280d.mockapi.io/barang/barang`;
  // const api = `http://ner.grit.id:8006/barangMasuk`;
  const api = `http://localhost:3000/barangMasuk`;
  const rows = props?.data?.map((item, index) =>
    createData(
      index + 1,
      item?.id,
      item?.kodeBarang,
      item?.namaBarang,
      item?.hargaBarang,
      item?.tglMasuk,
      item?.supllayer,
      item?.jumlahMasuk,
      item?.satuan
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
  };
  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    kodeBarang: JSON.stringify(dataEdit?.kodeBarang),
    namaBarang: dataEdit?.namaBarang,
    hargaBarang: dataEdit?.hargaBarang,
    tglMasuk: dataEdit?.tglMasuk,
    supllayer: JSON.stringify(dataEdit?.supllayer),
    jumlahMasuk: dataEdit?.jumlahMasuk,
    satuan: JSON.stringify(dataEdit?.satuan),
  };
  // console.log(body, 'body');

  const HandelEdit = (id) => {
    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_API_URL_API_}/barangMasuk/${dataEdit?.id}`, body)
      .then((res) => {
        props?.getData();
        handleClose();
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Berhasil Di Edit',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
        handleClose();
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
        console.log(err);
      });
  };
  const HandelDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${process.env.REACT_APP_API_URL_API_}/barangMasuk/${id}`)
      .then((res) => {
        props?.getData();
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Berhasil Di Hapus',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        const errStatus = err.response.status;
        const errMessage = err.response.data.message;
        let messages = '';
        if (errStatus === 401) {
          messages = 'Unauthorized!!';
          window.location.href = '/login';
        } else if (errStatus === 500) {
          messages = 'Server Error!!';
        } else if (errStatus === 404) {
          messages = 'Not Found Error!!!';
        } else if (errStatus === 408) {
          messages = 'TimeOut Error!!';
        } else if (errStatus === 400) {
          messages = errMessage;
        } else {
          messages = 'Something Wrong!!';
        }
        dispatch(
          showMessage({
            message: messages,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
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

  console.log(dataLogin?.roleUser, 'getAllUserResponse');

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Dialog
        className="py-20"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Barang Masuk</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-2 gap-16 mt-10 mb-10">
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
                  value={dataEdit?.kodeBarang}
                  getOptionLabel={(option) => option.kodeBarang}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setDataEdit({
                        ...dataEdit,
                        kodeBarang: newValue,
                        namaBarang: newValue?.namaBarang,
                      });
                    }
                  }}
                  id="combo-box-demo"
                  options={dataMasterBarang}
                  // options={top100Films}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Kode Barang" />}
                />
              </div>
              <div>
                <TextField
                  value={dataEdit?.namaBarang}
                  disabled
                  onChange={(e) => setDataEdit({ ...dataEdit, namaBarang: e.target.value })}
                  id="outlined-basic"
                  label="Nama Barang"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  value={dataEdit?.hargaBarang}
                  onChange={(e) => setDataEdit({ ...dataEdit, hargaBarang: e.target.value })}
                  id="outlined-basic"
                  label="Harga Barang"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  value={dataEdit?.jumlahMasuk}
                  onChange={(e) => setDataEdit({ ...dataEdit, jumlahMasuk: e.target.value })}
                  id="outlined-basic"
                  type="number"
                  label="Jummlah Masuk"
                  variant="outlined"
                />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Date"
                    value={dayjs(dataEdit.tglMasuk)}
                    onChange={(date) => setDataEdit({ ...dataEdit, tglMasuk: date })}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
                  value={dataEdit?.satuan}
                  onChange={(_, newValue) => setDataEdit({ ...dataEdit, satuan: newValue })}
                  id="combo-box-demo"
                  options={top100Films}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Satuan" />}
                />
              </div>
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
                  value={dataEdit?.supllayer}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => setDataEdit({ ...dataEdit, supllayer: newValue })}
                  id="combo-box-demo"
                  options={dataMasterSuplayer}
                  // options={top100Films}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Supllayer" />}
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
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              // console.log(row, 'oo');
              return (
                <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>{row?.kodeBarang?.kodeBarang}</TableCell>
                  <TableCell>{row?.namaBarang}</TableCell>
                  <TableCell>{row?.hargaBarang}</TableCell>
                  <TableCell>{moment(row?.tglMasuk).format('LL')}</TableCell>
                  <TableCell>{row?.supllayer?.name}</TableCell>
                  <TableCell>{row?.jumlahMasuk}</TableCell>
                  <TableCell>{row?.satuan?.name}</TableCell>
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
                          disabled={dataLogin?.roleUser === 'User'}
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
