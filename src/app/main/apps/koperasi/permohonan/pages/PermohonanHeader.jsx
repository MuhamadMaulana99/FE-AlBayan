/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, TextField } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import moment from 'moment';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import PrintIcon from '@mui/icons-material/Print';
import autoTable from 'jspdf-autotable';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Workbook } from 'exceljs';
import { useEffect } from 'react';

const top100Films = [
  { label: 'KG', year: 1994 },
  { label: 'Lusin', year: 1972 },
  { label: 'Bal', year: 1994 },
];

function PermohonanHeader(props) {
  const dispatch = useDispatch();
  const currentDate = moment().format();
  const { dataNasabah } = props
  const userRoles = JSON.parse(localStorage.getItem('userRoles'));
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
    const result = dataNasabah.filter((item) => item.mstRekening === stateBody?.rekening?.mstRekening);
    setgetDataNasabahById(result)
  }, [stateBody?.rekening, dataNasabah]);
  console.log(getDataNasabahById, 'dataNasabah');
  console.log(stateBody, 'dataNasabah');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}/permohonan`, stateBody)
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
        console.log(err);
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
            message: `${err?.response?.data?.data?.namaBarang}${messages}`,
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
  };

  const DataForBody = [];
  const dataFinal = [];
  const datas = {
    no: null,
    kodeBarang: null,
    namaBarang: null,
    stock: null,
    tanggalKeluar: null,
  };
  for (let index = 0; index < data.length; index++) {
    dataFinal.push({
      ...datas,
      no: index + 1,
      kodeBarang: data[index].kodeBarang?.kodeBarang,
      namaBarang: data[index].kodeBarang?.namaBarang,
      stock: data[index].jmlKeluar,
      tanggalKeluar: moment(data[index].tglKeluar).format('YYYY-DD-MM'),
    });
  }

  for (let index = 0; index < data.length; index++) {
    if (data.length !== 0) {
      DataForBody.push(Object.values(dataFinal[index]));
    }
  }
  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`Laporan Data Barang Keluar KARYA PUTRA 2 Tanggal ${moment().format('LL')}`, 20, 20);
    doc.text(`jl.Kademangan RT. 05/02`, 400, 50);
    doc.text(`Kel - Kademangan Setu, Tangsel`, 374, 70);
    const index = 0;
    doc.setFontSize(10);
    autoTable(doc, {
      theme: 'striped',
      margin: { top: 95 },
      head: [['No', 'Kode Barang', 'Nama Barang', 'Stok Barang', 'Tanggal']],
      headStyles: { fontSize: 7, halign: 'center' },
      columnStyles: {
        0: { fontSize: 7, halign: 'center' },
        1: { fontSize: 7, halign: 'center' },
        2: { fontSize: 7, halign: 'center' },
        3: { fontSize: 7, halign: 'center' },
        4: { fontSize: 7, halign: 'center' },
        5: { fontSize: 7, halign: 'center' },
        6: { fontSize: 7, halign: 'center' },
        7: { fontSize: 7, halign: 'center' },
        // 7: { fontSize: 7, halign: 'center' },
      },

      body: DataForBody,
      // body: [DataPDF, DataPDF],
    });
    doc.save(`Data Barang Keluar ${moment().format('LL')}.pdf`);
  };
  // console.log(data, 'data');
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('Data Barang Keluar');
    const worksheet = workbook.getWorksheet('Data Barang Keluar');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'Barang Keluar';
    worksheet.getCell('A1').alignment = { horizontal: 'left' };

    worksheet.mergeCells('A3', 'B3');

    worksheet.getCell('C5').alignment = { horizontal: 'left' };

    /* Header Table */
    worksheet.getCell('A7').value = 'NO';
    worksheet.getCell('A7').alignment = { horizontal: 'center' };

    worksheet.getCell('B7').value = 'Kode Barang';
    worksheet.getCell('B7').alignment = { horizontal: 'center' };

    worksheet.getCell('C7').value = 'Nama Barang';
    worksheet.getCell('C7').alignment = { horizontal: 'center' };

    worksheet.getCell('D7').value = 'Stok';
    worksheet.getCell('D7').alignment = { horizontal: 'center' };

    worksheet.getCell('E7').value = 'Tanggal Keluar';
    worksheet.getCell('E7').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(6).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 10 },
      { key: 'data_b', width: 20 },
      { key: 'data_c', width: 20 },
      { key: 'data_d', width: 20 },
      { key: 'data_e', width: 20 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
    and calling worksheet.addRow()
    */
    data.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}`,
        data_b: data?.kodeBarang?.kodeBarang,
        data_c: data?.kodeBarang?.namaBarang,
        data_d: data.jmlKeluar,
        data_e: moment(data.tglKeluar).format('YYYY-DD-MM'),
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Data barang Keluar Tanggal ${moment().format('LL')}${fileExtension}`);
    })();
  }

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Dialog
        open={open}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tambah Pengajuan</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div class="flex flex-wrap gap-5 p-10">
              {/* <TextField
                value={stateBody?.rekening}
                disabled
                onChange={(e) => {
                  setStateBody({ ...stateBody, rekening: e.target.value })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                }}
                id="outlined-basic"
                label="Rekeningt"
                variant="outlined"
              /> */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={dataNasabah}
                value={stateBody?.rekening}
                getOptionLabel={(option) => option.mstRekening}
                sx={{ width: 300 }}
                onChange={(e, newValue) => {
                  setStateBody({ ...stateBody, rekening: newValue })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                }}
                renderInput={(params) => <TextField {...params} label="Movie" />}
              />
              <TextField
                value={getDataNasabahById[0]?.nama}
                InputProps={{
                  readOnly: true,
                }}
                onChange={(e) => {
                  setStateBody({ ...stateBody, namaNasabah: getDataNasabahById?.nama })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
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
                value={getDataNasabahById[0]?.mstjenisKelamin}
                onChange={(e) => {
                  setStateBody({ ...stateBody, jenisKelamin: e.target.value })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
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
                  setStateBody({ ...stateBody, alamat: e.target.value })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
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
                  setStateBody({ ...stateBody, kecamatan: e.target.value })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
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
                  setStateBody({ ...stateBody, kabupaten: e.target.value })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
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
                  setStateBody({ ...stateBody, provinsi: e.target.value })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                }}
                id="outlined-basic"
                label="Provinsi"
                variant="outlined"
              />
              <TextField
                value={stateBody?.saldoTabungan}
                onChange={(e) => {
                  setStateBody({ ...stateBody, saldoTabungan: e.target.value })
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
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
      <div className="w-full flex justify-evenly">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight"
        >
          Permohonan
        </Typography>
        <div className="flex flex-auto items-center gap-4 grid-rows-1 ">
          <div className="flex items-left mt-10 ml-20 w-1/2 flex-col md:flex-row md:items-center md:mt-0">
            <div className="w-full flex">
              <div>
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <Button color="primary" variant="contained" onClick={downloadPDF}>
                    <PictureAsPdfIcon className="mr-2" />
                    <div className="hidden md:contents">Export To PDF</div>
                  </Button>
                </FuseAnimate>
              </div>
              <div className="ml-10">
                <FuseAnimate animation="transition.slideLeftIn" delay={100}>
                  <Button variant="contained" color="success" onClick={exportExcel}>
                    <PrintIcon className="mr-2" />
                    <div className="hidden md:contents">Export To Excel</div>
                  </Button>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            disableUnderl
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
          {dataLogin?.roleUser === 'admin' ? (
            <Button
              className=""
              onClick={handleClickOpen}
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              Add
            </Button>
          ) : dataLogin?.roleUser === 'Kasir' ? (
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
