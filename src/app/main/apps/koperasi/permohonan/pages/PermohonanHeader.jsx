/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import { Autocomplete, TextField } from "@mui/material";
import moment from "moment";

function PermohonanHeader(props) {
  const { searchTerm, setSearchTerm } = props;
  const dispatch = useDispatch();
  const currentDate = moment().format();
  const { dataNasabah } = props;
  const userRoles = JSON.parse(localStorage.getItem("userRoles"));
  let getAllUserResponse;
  let getResponseName;
  let dataLogin;
  if (userRoles) {
    getAllUserResponse = userRoles?.response?.userRoles;
    getResponseName = userRoles?.response;
    dataLogin = JSON.parse(getAllUserResponse);
  }
  const data = props?.data;
  const { masterStaff } = props;
  const [loading, setLoading] = React.useState(true);
  const [getDataNasabahById, setgetDataNasabahById] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [stateBody, setStateBody] = useState({
    namaNasabah: getDataNasabahById?.nama,
    rekening: null,
    jenisKelamin: null,
    alamat: null,
    kecamatan: null,
    kabupaten: null,
    provinsi: null,
    saldoTabungan: null,
  });

  useEffect(() => {
    const result = dataNasabah.filter(
      (item) => item.mstRekening === stateBody?.rekening?.mstRekening
    );
    setgetDataNasabahById(result);
  }, [stateBody?.rekening, dataNasabah]);
  // console.log(getDataNasabahById, 'sss');
  const body = {
    namaNasabah: JSON.stringify(getDataNasabahById[0]),
    rekening: getDataNasabahById[0]?.mstRekening,
    jenisKelamin: getDataNasabahById[0]?.mstjenisKelamin?.kelamin,
    alamat: getDataNasabahById[0]?.mstAlamat,
    kecamatan: getDataNasabahById[0]?.mstKecamatan,
    kabupaten: getDataNasabahById[0]?.mstKabupaten,
    provinsi: getDataNasabahById[0]?.mstProvinsi,
    saldoTabungan: stateBody?.saldoTabungan?.replace(/[^\d]/g, ""),
  };
  // console.log(body, "body");
  // console.log(stateBody, 'stateBody')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStateBody({
      namaNasabah: null,
      rekening: null,
      jenisKelamin: null,
      alamat: null,
      kecamatan: null,
      kabupaten: null,
      provinsi: null,
      saldoTabungan: null,
    })
  };

  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}/permohonan`, body)
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
        console.log(err);
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
            message: `${err?.response?.data?.data?.namaBarang}${messages}`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "error",
          })
        );
      });
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Dialog
        open={open}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tambah Permohonan</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="flex flex-wrap gap-5 p-10">
              <Autocomplete
                id="combo-box-demo"
                options={dataNasabah}
                value={stateBody?.rekening}
                getOptionLabel={(option) => option.mstRekening}
                sx={{ width: 300 }}
                onChange={(e, newValue) => {
                  setStateBody({ ...stateBody, rekening: newValue });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Data Nasabah" />
                )}
              />
              <TextField
                value={getDataNasabahById[0]?.nama}
                InputProps={{
                  readOnly: true,
                }}
                onChange={(e) => {
                  setStateBody({
                    ...stateBody,
                    namaNasabah: getDataNasabahById?.nama,
                  });
                }}
                id="outlined-basic"
                focused
                label="Nama Nasabah"
                variant="outlined"
              />
              <TextField
                // value={stateBody?.jenisKelamin}
                InputProps={{
                  readOnly: true,
                }}
                focused
                value={getDataNasabahById[0]?.mstRekening}
                onChange={(e) => {
                  setStateBody({ ...stateBody, rekening: e.target.value });
                }}
                id="outlined-basic"
                label="Rekening"
                variant="outlined"
              />
              <TextField
                // value={stateBody?.jenisKelamin}
                InputProps={{
                  readOnly: true,
                }}
                focused
                value={getDataNasabahById[0]?.mstjenisKelamin?.kelamin}
                onChange={(e) => {
                  setStateBody({ ...stateBody, jenisKelamin: e.target.value });
                }}
                id="outlined-basic"
                label="Jenis Kelamin"
                variant="outlined"
              />
              <TextField
                // value={stateBody?.alamat}
                InputProps={{
                  readOnly: true,
                }}
                focused
                value={getDataNasabahById[0]?.mstAlamat}
                onChange={(e) => {
                  setStateBody({ ...stateBody, alamat: e.target.value });
                }}
                id="outlined-basic"
                label="Alamat"
                variant="outlined"
              />
              <TextField
                // value={stateBody?.kecamatan}
                InputProps={{
                  readOnly: true,
                }}
                focused
                value={getDataNasabahById[0]?.mstKecamatan}
                onChange={(e) => {
                  setStateBody({ ...stateBody, kecamatan: e.target.value });
                }}
                id="outlined-basic"
                label="Kecamatan"
                variant="outlined"
              />
              <TextField
                // value={stateBody?.kabupaten}
                InputProps={{
                  readOnly: true,
                }}
                focused
                value={getDataNasabahById[0]?.mstKabupaten}
                onChange={(e) => {
                  setStateBody({ ...stateBody, kabupaten: e.target.value });
                }}
                id="outlined-basic"
                label="Kabupaten"
                variant="outlined"
              />
              <TextField
                // value={stateBody?.provinsi}
                InputProps={{
                  readOnly: true,
                }}
                focused
                value={getDataNasabahById[0]?.mstProvinsi}
                onChange={(e) => {
                  setStateBody({ ...stateBody, provinsi: e.target.value });
                }}
                id="outlined-basic"
                label="Provinsi"
                variant="outlined"
              />
              <TextField
                value={stateBody?.saldoTabungan}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^0-9]/g, "");
                  const formattedValue = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(rawValue);
                  setStateBody({ ...stateBody, saldoTabungan: formattedValue });
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
          <Button
            variant="contained"
            // disabled={
            //   kodeBarang === '' || namaBarang === '' || tglKeluar === '' || jmlKeluar === ''
            // }
            onClick={HandelSubmit}
            autoFocus
          >
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
        Permohonan
      </Typography>
      {/* <div className="flex flex-auto items-center gap-4 grid-rows-1 ">
          <div className="flex items-left mt-10 ml-20 w-1/2 flex-col md:flex-row md:items-center md:mt-0">
            <div className="w-full flex">
              <div>
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled
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
                    disabled
                    onClick={exportExcel}
                  >
                    <PrintIcon className="mr-2" />
                    <div className="hidden md:contents">Export To Excel</div>
                  </Button>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div> */}

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Cari Permohonan"
            className="flex flex-1"
            disableUnderline
            fullWidth
            // value={searchText}
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
          {dataLogin?.roleUser === "admin" ? (
            <Button
              className=""
              onClick={handleClickOpen}
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              Add
            </Button>
          ) : dataLogin?.roleUser === "Kasir" ? (
            <Button
              className=""
              onClick={handleClickOpen}
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              Add
            </Button>
          ) : (
            <Button
              className=""
              onClick={handleClickOpen}
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              Add
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default PermohonanHeader;
