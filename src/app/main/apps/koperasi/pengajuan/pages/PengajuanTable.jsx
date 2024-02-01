/* eslint-disable no-nested-ternary */
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
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
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
import { useState } from 'react';

const top100Films = [
  { label: 'KG', year: 1994 },
  { label: 'Lusin', year: 1972 },
  { label: 'Bal', year: 1994 },
];

const columns = [
  { id: 'no', label: 'NO', minWidth: 170, align: 'left' },
  {
    id: 'penjualan',
    label: 'Penjualan',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'hargaPokok',
    label: 'Harga Pokok',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'biaya',
    label: 'Biaya',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'labaUsaha',
    label: 'Laba Usaha',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'pendapatanLain',
    label: 'Pemdapatan Lain',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'jumlahPendapatan',
    label: 'Jumlah Pendapatan',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'kebutuhanRumahTangga',
    label: 'Kebutuhan Rumah Tangga',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'biayaPendidikan',
    label: 'Biaya Pendidikan',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'KasirAt',
    label: 'Biaya Lainnya',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'KasirAt',
    label: 'Jumlah Biaya Luar Usaha',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'pendapatanBersih',
    label: 'Pendapatan Bersih',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'status',
    label: 'Rasio Angsuran',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'stokBarang',
    label: 'Jangka Waktu',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'satuan',
    label: 'Nominal Permohonan',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'deskripsi',
    label: 'Tujuan Pembiayaan',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'deskripsi',
    label: 'Jaminan',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'deskripsi',
    label: 'Acc Permohonan',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'deskripsi',
    label: 'No Akad',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'deskripsi',
    label: 'Status',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'deskripsi',
    label: 'StatusBy',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'deskripsi',
    label: 'StatusAt',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'deskripsi',
    label: 'Foto',
    minWidth: 170,
    align: 'left',
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
  penjualan,
  hargaPokok,
  biaya,
  labaUsaha,
  pendapatanLain,
  jumlahPendapatan,
  kebutuhanRumahTangga,
  biayaPendidikan,
  biayaLainnya,
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
    penjualan,
    hargaPokok,
    biaya,
    labaUsaha,
    pendapatanLain,
    jumlahPendapatan,
    kebutuhanRumahTangga,
    biayaPendidikan,
    biayaLainnya,
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
  const [getDataEdit, setgetDataEdit] = useState({});
  const [dataEdit, setDataEdit] = useState({
    id: null,
    penjualan: null,
    hargaPokok: '',
    biaya: '',
    labaUsaha: null,
    pendapatanLain: null,
    jumlahPendapatan: null,
    kebutuhanRumahTangga: null,
    biayaPendidikan: null,
    biayaLainnya: null,
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
  let rows = props?.data;
  if (dataLogin?.roleUser === 'Staff') {
    rows = props?.data.filter((word) => word.jumlahPendapatan === getResponseName?.name);
  }

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
      item?.biayaLainnya,
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
      biayaLainnya: row?.biayaLainnya,
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
  console.log(body, 'body');

  const HandelEdit = (id) => {
    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_API_URL_API_}/angsuran/${dataEdit?.id}`, body)
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
      .delete(`${process.env.REACT_APP_API_URL_API_}/angsuran/${id}`)
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
                  <TableCell>{row?.penjualan === null ? '-' : row?.penjualan}</TableCell>
                  <TableCell>{row?.hargaPokok === null ? '-' : row?.hargaPokok}</TableCell>
                  <TableCell>{row?.biaya === null ? '-' : row?.biaya}</TableCell>
                  <TableCell>{row?.labaUsaha === null ? '-' : row?.labaUsaha}</TableCell>
                  <TableCell>{row?.pendapatanLain === null ? '-' : row?.pendapatanLain}</TableCell>
                  <TableCell>
                    {row?.jumlahPendapatan === null ? '-' : row?.jumlahPendapatan}
                  </TableCell>
                  <TableCell>
                    {row?.kebutuhanRumahTangga === null ? '-' : row?.kebutuhanRumahTangga}
                  </TableCell>
                  <TableCell>
                    {row?.biayaPendidikan === null ? '-' : row?.biayaPendidikan}
                  </TableCell>
                  <TableCell>{row?.biayaLainnya === null ? '-' : row?.biayaLainnya}</TableCell>
                  <TableCell>
                    {row?.jumlahBiayaLuarUsaha === null ? '-' : row?.jumlahBiayaLuarUsaha}
                  </TableCell>
                  <TableCell>
                    {row?.pendapatanBersih === null ? '-' : row?.pendapatanBersih}
                  </TableCell>
                  <TableCell>{row?.rasioAngsuran === null ? '-' : row?.rasioAngsuran}</TableCell>
                  <TableCell>{row?.jangkaWaktu === null ? '-' : row?.jangkaWaktu}</TableCell>
                  <TableCell>
                    {row?.nominalPermohonan === null ? '-' : row?.nominalPermohonan}
                  </TableCell>
                  <TableCell>
                    {row?.tujuanPembiayaan === null ? '-' : row?.tujuanPembiayaan}
                  </TableCell>
                  <TableCell>{row?.jaminan === null ? '-' : row?.jaminan}</TableCell>
                  <TableCell>{row?.accPermohonan === null ? '-' : row?.accPermohonan}</TableCell>
                  <TableCell>{row?.nomorAkad === null ? '-' : row?.nomorAkad}</TableCell>
                  <TableCell>{row?.status === null ? '-' : row?.status}</TableCell>
                  <TableCell>{row?.statusBy === null ? '-' : row?.statusBy}</TableCell>
                  <TableCell>{row?.foto === null ? '-' : row?.foto}</TableCell>
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
                          onClick={() => handleClickOpen(row.id, row)}
                          color="info"
                          disabled={dataLogin?.roleUser === 'Staff' && row?.labaUsaha !== null}
                          className=""
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton
                          onClick={(e) => HandelDelete(row.id)}
                          color="error"
                          disabled={dataLogin?.roleUser === 'Staff' && row?.labaUsaha !== null}
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
