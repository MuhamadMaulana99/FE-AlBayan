/* eslint-disable react-hooks/rules-of-hooks */
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const jenKel = [
  { kelamin: 'Laki-laki', id: 1 },
  { kelamin: 'Perempuan', id: 2 },
];

function MasterNasabahHeader(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [nama, setnama] = useState('');
  const [stateBody, setStateBody] = useState({
    nama: null,
    mstRekening: null,
    mstNik: null,
    mstjenisKelamin: null,
    mstAlamat: null,
    mstKecamatan: null,
    mstKabupaten: null,
    mstProvinsi: null,
  });
  // console.log(stateBody, 'stateBody')
  const body = {
    nama: stateBody?.nama,
    mstNik: stateBody?.mstNik,
    mstjenisKelamin: JSON.stringify(stateBody?.mstjenisKelamin),
    mstRekening: stateBody?.mstRekening,
    mstAlamat: stateBody?.mstAlamat,
    mstKecamatan: stateBody?.mstKecamatan,
    mstKabupaten: stateBody?.mstKabupaten,
    mstProvinsi: stateBody?.mstProvinsi,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setnama('');
    setStateBody({
      nama: null,
      mstRekening: null,
      mstNik: null,
      mstjenisKelamin: null,
      mstAlamat: null,
      mstKecamatan: null,
      mstKabupaten: null,
      mstProvinsi: null,
    });
  };
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}/masterNasabah`, body)
      .then((res) => {
        // setData(res?.data);
        props.getData();
        handleClose();
        setLoading(false);
        dispatch(
          showMessage({
            message: 'Data Berhasil Tambahkan',
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
        // setData([]);
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

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tambah Master Kasir</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-2 gap-16 mt-10 mb-10">
              <div className="flex flex-wrap gap-5 p-10">
                <TextField
                  value={stateBody?.nama}
                  onChange={(e) => {
                    setStateBody({ ...stateBody, nama: e.target.value });
                    // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                  }}
                  id="outlined-basic"
                  label="Nama Nasabah"
                  variant="outlined"
                />
                <TextField
                  value={stateBody?.mstRekening}
                  onChange={(e) => {
                    setStateBody({ ...stateBody, mstRekening: e.target.value });
                    // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                  }}
                  id="outlined-basic"
                  label="No Rek"
                  variant="outlined"
                />
                <TextField
                  value={stateBody?.mstNik}
                  onChange={(e) => {
                    setStateBody({ ...stateBody, mstNik: e.target.value });
                    // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                  }}
                  id="outlined-basic"
                  label="Nik"
                  variant="outlined"
                />
                <div className="mt-10 w-full">
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.kelamin}
                    value={stateBody?.mstjenisKelamin}
                    onChange={(e, newValue) => {
                      setStateBody({ ...stateBody, mstjenisKelamin: newValue });
                      // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                    }}
                    options={jenKel}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Jenis Kelamin" />}
                  />
                </div>
                <TextField
                  value={stateBody?.mstAlamat}
                  onChange={(e) => {
                    setStateBody({ ...stateBody, mstAlamat: e.target.value });
                    // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                  }}
                  id="outlined-basic"
                  label="Alamat"
                  variant="outlined"
                />
                <TextField
                  value={stateBody?.mstKecamatan}
                  onChange={(e) => {
                    setStateBody({ ...stateBody, mstKecamatan: e.target.value });
                    // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                  }}
                  id="outlined-basic"
                  label="Kecamatan"
                  variant="outlined"
                />
                <TextField
                  value={stateBody?.mstKabupaten}
                  onChange={(e) => {
                    setStateBody({ ...stateBody, mstKabupaten: e.target.value });
                    // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                  }}
                  id="outlined-basic"
                  label="Kabupaten"
                  variant="outlined"
                />
                <TextField
                  value={stateBody?.mstProvinsi}
                  onChange={(e) => {
                    setStateBody({ ...stateBody, mstProvinsi: e.target.value });
                    // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                  }}
                  id="outlined-basic"
                  label="Provinsi"
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
          <Button variant="contained" onClick={HandelSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Master Nasabah
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Cari Barang"
            className="flex flex-1"
            disableUnderline
            fullWidth
            // value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            // onChange={(ev) => dispatch(setProductsSearchText(ev))}
          />
        </Paper>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            // component={Link}
            // to="/apps/e-commerce/products/new"
            onClick={handleClickOpen}
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default MasterNasabahHeader;
