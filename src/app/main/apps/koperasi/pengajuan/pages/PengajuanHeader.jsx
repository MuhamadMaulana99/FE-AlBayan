/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
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
import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Autocomplete, TextField } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import moment from 'moment';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import PrintIcon from '@mui/icons-material/Print';
import autoTable from 'jspdf-autotable';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Workbook } from 'exceljs';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const top100Films = [
  { label: 'KG', year: 1994 },
  { label: 'Lusin', year: 1972 },
  { label: 'Bal', year: 1994 },
];

function PengajuanHeader(props) {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const currentDate = moment().format();
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
  const { dataPermohonanApprove } = props;
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [getNameFile, setgetNameFile] = useState('');
  const [stateBody, setStateBody] = useState({
    penjualan: 0,
    namaNasabah: null,
    rekening: null,
    hargaPokok: 0,
    biaya: 0,
    labaUsaha: 0,
    pendapatanLain: 0,
    jumlahPendapatan: 0,
    kebutuhanRumahTangga: 0,
    biayaPendidikan: 0,
    biayaLainnya: 0,
    jumlahBiayaLuarUsaha: 0,
    pendapatanBersih: null,
    rasioAngsuran: 0,
    jangkaWaktu: 0,
    nominalPermohonan: 0,
    tujuanPembiayaan: null,
    jaminan: null,
    biayaLainya: null,
    accPermohonan: 0,
    nomorAkad: null,
    status: null,
    statusBy:
      dataLogin?.roleUser === 'admin' || dataLogin?.roleUser === 'Kasir'
        ? null
        : getResponseName?.name,
    statusAt:
      dataLogin?.roleUser === 'admin' || dataLogin?.roleUser === 'Kasir' ? null : currentDate,
    foto: null,
  });
  const [getDataBody, setgetDataBody] = useState({});
  console.log(getDataBody, 'stateBody');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setgetDataBody({});
    setStateBody({
      namaNasabah: null,
      rekening: null,
      penjualan: 0,
      hargaPokok: 0,
      biaya: 0,
      labaUsaha: 0,
      pendapatanLain: 0,
      jumlahPendapatan: 0,
      kebutuhanRumahTangga: 0,
      biayaPendidikan: 0,
      biayaLainnya: 0,
      jumlahBiayaLuarUsaha: 0,
      pendapatanBersih: null,
      rasioAngsuran: 0,
      jangkaWaktu: 0,
      biayaLainya: null,
      nominalPermohonan: 0,
      tujuanPembiayaan: null,
      jaminan: null,
      accPermohonan: 0,
      nomorAkad: null,
      status: null,
      statusBy: null,
      statusAt: null,
      foto: null,
    });
  };

  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}/Pengajuan`, getDataBody)
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

  // const handleFileChange = async (event) => {
  //   const selectedFile = event.target.files[0];
  //   console.log(selectedFile, 'selectedFile')

  //   if (selectedFile) {
  //     const base64String = await convertToBase64(selectedFile);
  //     console.log('Base64 String:', selectedFile);
  //     setgetNameFile(selectedFile);
  //     setStateBody({ ...stateBody, foto: base64String });
  //     // Kirim atau lakukan sesuatu dengan string base64 di sini
  //   }
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = '';
  //   }
  // };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile, 'selectedFile');

    if (selectedFile) {
      const base64String = await convertToBase64(selectedFile);
      console.log('Base64 String:', base64String);
      setgetNameFile(selectedFile);
      setStateBody({ ...stateBody, foto: base64String });
      // Kirim atau lakukan sesuatu dengan string base64 di sini
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // const file = event.target.files[0];
    // setSelectedFile(file);
  };

  const handleClearFile = () => {
    setStateBody({ ...stateBody, foto: null });
    setgetNameFile(null);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  function calculatePercentage(part, whole) {
    return (part / whole) * 100;
  }

  const countLabaUsaha =
    parseInt(stateBody?.penjualan, 10) -
    parseInt(stateBody?.hargaPokok, 10) -
    parseInt(stateBody?.biaya, 10);
  const countJumlahPendapatan =
    parseInt(countLabaUsaha, 10) + parseInt(stateBody?.pendapatanLain, 10);
  const countJumlahBiayaLuarUsaha =
    parseInt(stateBody?.kebutuhanRumahTangga, 10) +
    parseInt(stateBody?.biayaPendidikan, 10) +
    parseInt(stateBody?.biayaLainnya, 10);
  const countPendapatanBersih = countLabaUsaha + countJumlahPendapatan - countJumlahBiayaLuarUsaha;
  const countAccPermohonan =
    (parseInt(stateBody?.rasioAngsuran, 10) / 100) *
    countPendapatanBersih *
    parseInt(stateBody?.jangkaWaktu, 10);

  const resultAcc = calculatePercentage(100, countAccPermohonan);
  // console.log(`${Math.round(resultAcc)}%`, 'resss');

  useEffect(() => {
    setgetDataBody({
      penjualan: stateBody?.penjualan,
      namaNasabah: stateBody?.rekening?.namaNasabah,
      rekening: stateBody?.rekening?.rekening,
      hargaPokok: stateBody?.hargaPokok,
      biaya: stateBody?.biaya,
      biayaLainya: stateBody?.biayaLainya,
      labaUsaha: countLabaUsaha,
      pendapatanLain: stateBody?.pendapatanLain,
      jumlahPendapatan: countJumlahPendapatan,
      kebutuhanRumahTangga: stateBody?.kebutuhanRumahTangga,
      biayaPendidikan: stateBody?.biayaPendidikan,
      jumlahBiayaLuarUsaha: countJumlahBiayaLuarUsaha,
      pendapatanBersih: countPendapatanBersih,
      rasioAngsuran: stateBody?.rasioAngsuran,
      jangkaWaktu: stateBody?.jangkaWaktu,
      nominalPermohonan: stateBody?.nominalPermohonan,
      tujuanPembiayaan: stateBody?.tujuanPembiayaan,
      jaminan: stateBody?.jaminan,
      accPermohonan: countAccPermohonan,
      nomorAkad: stateBody?.nomorAkad,
      status: stateBody?.status,
      statusBy: stateBody?.statusBy,
      statusAt: stateBody?.statusAt,
      foto: null,
      // foto: `data:${getNameFile?.type};base64,${stateBody?.foto}`,
    });
  }, [stateBody]);

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
            <div className="flex flex-wrap gap-5 p-10">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={dataPermohonanApprove}
                value={stateBody?.rekening}
                getOptionLabel={(option) => option.rekening}
                sx={{ width: 300 }}
                onChange={(e, newValue) => {
                  // console.log(newValue, '1000000');
                  setStateBody({ ...stateBody, rekening: newValue });
                }}
                renderInput={(params) => <TextField {...params} label="Data Nasabah" />}
              />
              <TextField
                value={stateBody?.penjualan}
                onChange={(e) => {
                  setStateBody({ ...stateBody, penjualan: e.target.value });
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                }}
                id="outlined-basic"
                label="Penjualan"
                type="number"
                variant="outlined"
              />
              <TextField
                value={stateBody?.hargaPokok}
                onChange={(e) => {
                  setStateBody({ ...stateBody, hargaPokok: e.target.value });
                  // settriggerAccBasil({ ...stateBody, accBasil: stateBody?.staffBasil})
                }}
                id="outlined-basic"
                label="Harga Pokok"
                type="number"
                variant="outlined"
              />
              <TextField
                value={stateBody?.biaya}
                onChange={(e) => setStateBody({ ...stateBody, biaya: e.target.value })}
                id="outlined-basic"
                label="Biaya"
                type="number"
                variant="outlined"
              />

              <TextField
                value={stateBody?.pendapatanLain}
                onChange={(e) => setStateBody({ ...stateBody, pendapatanLain: e.target.value })}
                id="outlined-basic"
                label="Pendapatan Lain"
                type="number"
                variant="outlined"
              />

              <TextField
                value={stateBody?.kebutuhanRumahTangga}
                onChange={(e) =>
                  setStateBody({ ...stateBody, kebutuhanRumahTangga: e.target.value })
                }
                id="outlined-basic"
                label="Kebutuhan Rumah Tangga"
                type="number"
                variant="outlined"
              />
              <TextField
                value={stateBody?.biayaPendidikan}
                onChange={(e) => setStateBody({ ...stateBody, biayaPendidikan: e.target.value })}
                id="outlined-basic"
                label="Biaya Pendidikan"
                type="number"
                variant="outlined"
              />
              <TextField
                value={stateBody?.biayaLainya}
                onChange={(e) => setStateBody({ ...stateBody, biayaLainya: e.target.value })}
                id="outlined-basic"
                label="Biaya Lainnya"
                type="number"
                variant="outlined"
              />

              <TextField
                value={stateBody?.rasioAngsuran}
                onChange={(e) => setStateBody({ ...stateBody, rasioAngsuran: e.target.value })}
                id="outlined-basic"
                label="Rasio Angsuran"
                helperText="persen%"
                type="number"
                variant="outlined"
              />

              <TextField
                value={stateBody?.jangkaWaktu}
                onChange={(e) => setStateBody({ ...stateBody, jangkaWaktu: e.target.value })}
                id="outlined-basic"
                label="Jangka Waktu"
                helperText="bulan cnth 1bulan"
                type="number"
                variant="outlined"
              />
              <TextField
                value={stateBody?.nominalPermohonan}
                onChange={(e) => setStateBody({ ...stateBody, nominalPermohonan: e.target.value })}
                id="outlined-basic"
                label="Nominal Pemohonan"
                type="number"
                variant="outlined"
              />
              <TextField
                value={stateBody?.tujuanPembiayaan}
                onChange={(e) => setStateBody({ ...stateBody, tujuanPembiayaan: e.target.value })}
                id="outlined-basic"
                label="Tujuan Pembiyaan"
                type="text"
                variant="outlined"
              />
              <TextField
                value={stateBody?.jaminan}
                onChange={(e) => setStateBody({ ...stateBody, jaminan: e.target.value })}
                id="outlined-basic"
                label="Jaminan"
                type="text"
                variant="outlined"
              />

              <TextField
                value={stateBody?.nomorAkad}
                onChange={(e) => setStateBody({ ...stateBody, nomorAkad: e.target.value })}
                id="outlined-basic"
                label="Nomor Akad"
                type="text"
                variant="outlined"
              />
              <div className="mt-4 ">
                {!getNameFile && (
                  <div>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => document.getElementById('fileInput').click()}
                    >
                      Upload file
                    </Button>
                    <VisuallyHiddenInput id="fileInput" type="file" onChange={handleFileChange} />
                  </div>
                )}
                <div>
                  {getNameFile && (
                    <div>
                      {/* <p>Selected File: {getNameFile.name}</p> */}
                      <Button variant="contained" endIcon={<CloseIcon onClick={handleClearFile} />}>
                        {getNameFile === '' ? '' : getNameFile?.name}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <ul>
                <li>Laba Usaha = penjualan - hargaPokok - biayaUsaha : {getDataBody?.labaUsaha}</li>
                <li>
                  Jumlah Pendapatan = labaUsaha + pendapatanLain : {getDataBody?.jumlahPendapatan}
                </li>
                <li>
                  Jumlah Biaya Luar Usaha = kebutuhanRumahTangga + biayaPendidikan + Biaya Lainnya :
                  {getDataBody?.jumlahBiayaLuarUsaha}
                </li>
                <li>
                  Pendapatan Bersih = labaUsaha + JumlahPendapatan - jumlahBiayaLuarUsaha :
                  {getDataBody?.pendapatanBersih}
                </li>
                <li>
                  Acc Permohonan = (rasio angsuran / 100) * pendapatanBersih * jangkaWaktu :
                  {getDataBody?.accPermohonan}
                </li>
              </ul>
            </div>
            {/* <div className='"flex flex-wrap gap-5 p-10'>
              <TextField
                value={stateBody?.labaUsaha}
                // defaultValue={stateBody?.staffBasil}
                onChange={(e) => setStateBody({ ...stateBody, labaUsaha: e.target.value })}
                id="outlined-basic"
                label="Laba Usaha"
                type="number"
                helperText="penjualan - hargaPokok - biayaUsaha"
                variant="outlined"
              />
              <TextField
                value={stateBody?.jumlahPendapatan}
                onChange={(e) => setStateBody({ ...stateBody, jumlahPendapatan: e.target.value })}
                id="outlined-basic"
                label="Jumlah Pendapatan"
                helperText="labaUsaha + pendapatanLain"
                type="number"
                variant="outlined"
              />
              <TextField
                value={stateBody?.jumlahBiayaLuarUsaha}
                onChange={(e) =>
                  setStateBody({ ...stateBody, jumlahBiayaLuarUsaha: e.target.value })
                }
                id="outlined-basic"
                label="Jumlah Biaya Luar Usaha"
                type="number"
                helperText="kebutuhanRumahTangga  + biayaPendidikan + Biaya Lainnya"
                variant="outlined"
              />
              <TextField
                value={stateBody?.pendapatanBersih}
                onChange={(e) => setStateBody({ ...stateBody, pendapatanBersih: e.target.value })}
                id="outlined-basic"
                label="Pendapatan Bersih"
                helperText="labaUsaha - JumlahPendapatan - jumlahBiayaLuarUsaha"
                type="number"
                variant="outlined"
              />
              <TextField
                value={stateBody?.accPermohonan}
                onChange={(e) => setStateBody({ ...stateBody, accPermohonan: e.target.value })}
                id="outlined-basic"
                label="Acc Permohonan"
                helperText="(rasio angsuran / 100) * pendapatanBersih * jangkaWaktu"
                type="number"
                variant="outlined"
              />
            </div> */}
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
          Pengajuan
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

export default PengajuanHeader;
