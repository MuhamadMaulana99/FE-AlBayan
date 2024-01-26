/* eslint-disable react-hooks/exhaustive-deps */
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
import FuseLoading from '@fuse/core/FuseLoading';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useState } from 'react';
import moment from 'moment';

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
  },
  {
    id: 'namaBarang',
    label: 'Nama Barang',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'tglKleuar',
    label: 'Tanggal Keluar',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'jumlahKeluar',
    label: 'Jumalah Keluar',
    minWidth: 170,
    align: 'left',
  },
  // {
  //   id: 'hargaBarang',
  //   label: 'Harga Barang',
  //   minWidth: 170,
  //   align: 'left',
  // },
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
    id: 'aksi',
    label: 'Aksi',
    minWidth: 170,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
];

function createData(no, id, kodeBarang, namaBarang, jmlKeluar, tglKeluar) {
  return { no, id, kodeBarang, namaBarang, jmlKeluar, tglKeluar };
}

export default function BarangKeluarTable(props) {
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
  const dispatch = useDispatch();
  const { dataMasterBarang } = props;
  // console.log(dataMasterBarang, 'dataMasterBarang');
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({
    kodeBarang: null,
    namaBarang: '',
    jmlKeluar: '',
    tglKeluar: null,
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const api = `https://652d2c32f9afa8ef4b26e7f0.mockapi.io/tokoBangunan/v1/suplayer/1/tokoBangunan`;
  const api = `http://ner.grit.id:8006/barangKeluar`;
  // const api = `http://localhost:3000/barangKeluar`;
  const rows = props?.data?.map((item, index) =>
    createData(
      index + 1,
      item?.id,
      item?.kodeBarang,
      item?.namaBarang,
      item?.jmlKeluar,
      item?.tglKeluar
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
    jmlKeluar: dataEdit?.jmlKeluar,
    tglKeluar: dataEdit?.tglKeluar,
  };
  // console.log(dataEdit, 'dataEdit');

  const HandelEdit = (id) => {
    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_API_URL_API_}/barangKeluar/${dataEdit?.id}`, body)
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
      .delete(`${process.env.REACT_APP_API_URL_API_}/barangKeluar/${id}`)
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

  // console.log(dataEdit, 'dataEdit')

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Dialog
        className="py-20"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Barang Keluar</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="m-10">
              <div className="flex justify-between w-full mb-10">
                <div>
                  <Autocomplete
                    disablePortal
                    value={dataEdit?.kodeBarang}
                    getOptionLabel={(option) => option.kodeBarang}
                    onChange={(_, newValue) => {
                      if (newValue) {
                        setDataEdit({
                          ...dataEdit,
                          kodeBarang: newValue,
                          namaBarang: newValue?.namaBarang,
                        });
                      } else {
                        // setDataEdit(null);
                        // setDataEdit('');
                        setDataEdit({ ...dataEdit, kodeBarang: null, namaBarang: '' });
                      }
                    }}
                    id="combo-box-demo"
                    options={dataMasterBarang}
                    // options={top100Films}
                    sx={{ width: 220 }}
                    renderInput={(params) => <TextField {...params} label="Kode Barang" />}
                  />
                </div>
                <div>
                  <TextField
                    value={dataEdit?.namaBarang}
                    disabled
                    onFocus
                    // onChange={(e) => setDataEdit({ ...dataEdit, namaBarang: e.target.value })}
                    id="outlined-basic"
                    label="Nama Barang"
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="flex justify-between w-full gap-10">
                <div className="">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={dayjs(dataEdit?.tglKeluar)}
                      onChange={(date) => {
                        if (date) {
                          setDataEdit({ ...dataEdit, tglKeluar: date });
                        }
                      }}
                      sx={{ width: 220 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className="">
                  <TextField
                    fullWidth
                    value={dataEdit?.jmlKeluar}
                    onChange={(e) => setDataEdit({ ...dataEdit, jmlKeluar: e.target.value })}
                    id="outlined-basic"
                    label="jmlKeluar"
                    type="number"
                    variant="outlined"
                  />
                </div>
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
                  <TableCell>{moment(row?.tglKeluar).format('lll')}</TableCell>
                  <TableCell>{row?.jmlKeluar}</TableCell>
                  {/* <TableCell>{row?.satuan?.label}</TableCell> */}
                  {/* <TableCell>{row?.deskripsi}</TableCell> */}
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
