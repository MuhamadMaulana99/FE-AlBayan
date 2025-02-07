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
import { getUserInfo, handleError } from "app/configs/getUserInfo";
import { fetchApi } from "app/configs/fetchApi";

function PermohonanHeader(props) {
  const { searchTerm, setSearchTerm } = props;
  const dispatch = useDispatch();
  const currentDate = moment().format();
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
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const [stateBody, setStateBody] = useState({
    id_users: null,
    id_mst_nasabah: null,
    saldoTabungan: null,
  });

  const body = {
    id_users: userInfo?.userInfo?.user?.id,
    id_mst_nasabah: stateBody?.id_mst_nasabah,
    saldoTabungan: stateBody?.saldoTabungan?.replace(/[^\d]/g, ""),
  };
  // console.log(body, "body");
  // console.log(userInfo?.userInfo?.user?.id, "userInfo");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStateBody({
      id_users: null,
      id_mst_nasabah: null,
      saldoTabungan: null,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetchApi().post("/permohonan", body);
      props.getData();
      handleClose();
      dispatch(
        showMessage({
          message: "Data Berhasil Ditambahkan",
          autoHideDuration: 2000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
          variant: "success",
        })
      );
    } catch (err) {
      handleClose();
      handleError(err);
    } finally {
      setLoading(false);
    }
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
                  setStateBody({
                    ...stateBody,
                    id_mst_nasabah: newValue?.id_mst_nasabah,
                    id_users: userInfo?.userInfo?.user?.id,
                  });
                  // setStateBody({
                  //   ...stateBody,
                  //   id_users: userInfo?.userInfo?.user?.id,
                  // });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Data Nasabah" />
                )}
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
            onClick={handleSubmit}
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
