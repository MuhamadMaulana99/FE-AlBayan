/* eslint-disable react-hooks/rules-of-hooks */
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { showMessage } from "app/store/fuse/messageSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const jenKel = [
  { kelamin: "Laki-laki", id: 1 },
  { kelamin: "Perempuan", id: 2 },
];

function MasterNasabahHeader(props) {
  const { searchTerm, setSearchTerm } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [nama, setnama] = useState("");
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState(null);

  const urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
  const urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
  const urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
  const urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

  const unformatRekening = (formattedValue) => {
    return formattedValue?.replace(/\./g, "");
  };

  const formatRekening = (value) => {
    const cleaned = value.replace(/\D/g, ""); // Hapus non-digit
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})?$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join(".");
    }
    return value;
  };

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
  const body = {
    nama: stateBody?.nama,
    mstNik: stateBody?.mstNik,
    mstjenisKelamin: JSON.stringify(stateBody?.mstjenisKelamin),
    mstRekening: unformatRekening(stateBody?.mstRekening),
    mstAlamat: stateBody?.mstAlamat,
    mstKecamatan: stateBody?.mstKecamatan?.nama,
    mstKabupaten: stateBody?.mstKabupaten?.nama,
    mstProvinsi: stateBody?.mstProvinsi?.nama,
  };

  // console.log(body, 'body')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setnama("");
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
            message: "Data Berhasil Tambahkan",
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
        // setData([]);
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

  const fetchProvinsi = async () => {
    const res = await axios.get(urlProvinsi);
    setProvinsi(res.data);
    // console.log(res,'ress')
  };
  // useEffect(() => {
  //   fetchProvinsi();
  // }, []);

  const handleProvinsiChange = async (value) => {
    // console.log(value, 'value')
    setSelectedProvinsi(value);
    setKabupaten([]);
    setKecamatan([]);
    setKelurahan([]);

    if (value) {
      const res = await axios.get(`${urlKabupaten}${value.id}.json`);
      setKabupaten(res.data);
    }
  };

  const handleKabupatenChange = async (value) => {
    setSelectedKabupaten(value);
    setKecamatan([]);
    setKelurahan([]);

    if (value) {
      const res = await axios.get(`${urlKecamatan}${value.id}.json`);
      setKecamatan(res.data);
    }
  };

  const handleKecamatanChange = async (value) => {
    setSelectedKecamatan(value);
    setKelurahan([]);

    if (value) {
      const res = await axios.get(`${urlKelurahan}${value.id}.json`);
      setKelurahan(res.data);
    }
  };
  const handleFocus = (e) => {
    const getId = e.target.id;
    // console.log(getId, ';get')
    switch (getId) {
      case "provinsi":
        fetchProvinsi();
        break;
      case "kabupaten":
        handleKabupatenChange();
        break;
      case "kecamatan":
        handleKecamatanChange();
        break;
      default:
    }
  };

  // console.log(kabupaten, 'kabupaten')
  // console.log(kecamatan, 'kecamatan')
  // console.log(kelurahan, 'kelurahan')
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tambah Master Nasabah</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="container mx-auto px-4 py-10">
              <div className="flex flex-wrap gap-6 p-5 bg-white shadow-md rounded-md">
                <TextField
                  value={stateBody?.nama}
                  onChange={(e) =>
                    setStateBody({ ...stateBody, nama: e.target.value })
                  }
                  id="outlined-basic"
                  label="Nama Nasabah"
                  variant="outlined"
                  className="flex-grow"
                />
                <TextField
                  value={stateBody?.mstRekening}
                  onChange={(e) => {
                    const formatNoRek = formatRekening(e.target.value);
                    setStateBody({ ...stateBody, mstRekening: formatNoRek });
                  }}
                  id="outlined-basic"
                  label="No Rek"
                  variant="outlined"
                  // type='number'
                  inputProps={{ maxLength: 10 }}
                  className="flex-grow"
                />
                <TextField
                  value={stateBody?.mstNik}
                  onChange={(e) => {
                    setStateBody({ ...stateBody, mstNik: e.target.value });
                  }}
                  id="outlined-basic"
                  label="Nik"
                  type="number"
                  inputProps={{
                    maxLength: 10, // Batas maksimum karakter
                  }}
                  variant="outlined"
                  className="flex-grow"
                />
                <Autocomplete
                  disablePortal
                  fullWidth
                  id="combo-box-demo"
                  getOptionLabel={(option) => option.kelamin}
                  value={stateBody?.mstjenisKelamin}
                  onChange={(e, newValue) =>
                    setStateBody({ ...stateBody, mstjenisKelamin: newValue })
                  }
                  options={jenKel}
                  renderInput={(params) => (
                    <TextField {...params} label="Jenis Kelamin" />
                  )}
                  className="flex-grow"
                />
                <Autocomplete
                  fullWidth
                  className="flex-grow"
                  id="provinsi"
                  onFocus={handleFocus}
                  options={provinsi}
                  value={stateBody?.mstProvinsi}
                  getOptionLabel={(option) => option.nama}
                  onChange={(event, newVlue) => {
                    if (newVlue) {
                      handleProvinsiChange(newVlue);
                      setStateBody({ ...stateBody, mstProvinsi: newVlue });
                      // setProvinsi(newVlue)
                    } else {
                      handleProvinsiChange(null);
                      setStateBody({
                        ...stateBody,
                        mstProvinsi: null,
                        mstKabupaten: null,
                        mstKecamatan: null,
                        mstAlamat: null,
                      });
                      setProvinsi([]);
                      setKabupaten([]);
                      setKecamatan([]);
                      setKelurahan([]);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Pilih Provinsi"
                      variant="outlined"
                    />
                  )}
                />
                <Autocomplete
                  fullWidth
                  id="kabupaten"
                  onFocus={handleFocus}
                  options={kabupaten}
                  className="flex-grow"
                  value={stateBody?.mstKabupaten}
                  getOptionLabel={(option) => option.nama}
                  onChange={(event, newVlue) => {
                    if (newVlue) {
                      handleKabupatenChange(newVlue);
                      setStateBody({ ...stateBody, mstKabupaten: newVlue });
                      // setKabupaten(newVlue)
                    } else {
                      handleKabupatenChange(null);
                      setStateBody({
                        ...stateBody,
                        mstKabupaten: null,
                        mstKecamatan: null,
                        mstAlamat: null,
                      });
                      setKabupaten([]);
                      setKecamatan([]);
                      setKelurahan([]);
                    }
                  }}
                  disabled={!selectedProvinsi}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pilih Kabupaten"
                      variant="outlined"
                    />
                  )}
                />
                <Autocomplete
                  fullWidth
                  id="kecamatan"
                  onFocus={handleFocus}
                  options={kecamatan}
                  className="flex-grow"
                  value={stateBody?.mstKecamatan}
                  getOptionLabel={(option) => option.nama}
                  onChange={(event, newVlue) => {
                    if (newVlue) {
                      handleKecamatanChange(newVlue);
                      setStateBody({ ...stateBody, mstKecamatan: newVlue });
                      // setKecamatan(newVlue)
                    } else {
                      handleKecamatanChange(null);
                      setStateBody({
                        ...stateBody,
                        mstKecamatan: null,
                        mstAlamat: null,
                      });
                      setKecamatan([]);
                      setKelurahan([]);
                    }
                  }}
                  disabled={!selectedKabupaten}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pilih Kecamatan"
                      variant="outlined"
                    />
                  )}
                />
                <TextField
                  value={stateBody?.mstAlamat}
                  onChange={(e) =>
                    setStateBody({ ...stateBody, mstAlamat: e.target.value })
                  }
                  id="outlined-basic"
                  label="Alamat"
                  variant="outlined"
                  className="flex-grow"
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
            placeholder="Cari Nasabah"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{
              "aria-label": "Search",
            }}
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
