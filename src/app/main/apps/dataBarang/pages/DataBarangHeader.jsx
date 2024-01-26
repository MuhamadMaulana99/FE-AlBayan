/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
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

const top100Films = [
  { label: 'KG', year: 1994 },
  { label: 'Lusin', year: 1972 },
  { label: 'Bal', year: 1994 },
];

function DataBarangHeader(props) {
  const dispatch = useDispatch();
  const data = props?.data;
  // const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [kodeBarang, setkodeBarang] = useState('');
  const [namaBarang, setnamaBarang] = useState('');
  const [hargaBarang, sethargaBarang] = useState('');
  const [deskripsi, setdeskripsi] = useState('');
  const [jumlahMasuk, setjumlahMasuk] = useState(0);
  const [satuan, setsatuan] = useState(null);

  const body = {
    kodeBarang,
    namaBarang,
    hargaBarang,
    deskripsi,
    jumlahMasuk,
    satuan: JSON.stringify(satuan),
  };
  // const api = `https://652d2c32f9afa8ef4b26e7f0.mockapi.io/tokoBangunan/v1/suplayer/1/tokoBangunan`;
  const api = `http://ner.grit.id:8006/dataBarangs`;
  // const api = `http://localhost:3000/dataBarangs`;

  const handleClose = () => {
    setOpen(false);
    setkodeBarang('');
    setnamaBarang('');
    sethargaBarang('');
    setdeskripsi('');
    setjumlahMasuk(0);
  };
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}/dataBarangs`, body)
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
  const DataForBody = [];
  const dataFinal = [];
  const datas = {
    no: null,
    kodeBarang: null,
    namaBarang: null,
    stock: null,
  };
  for (let index = 0; index < data.length; index++) {
    dataFinal.push({
      ...datas,
      no: index + 1,
      kodeBarang: data[index].kodeBarang?.kodeBarang,
      namaBarang: data[index].kodeBarang?.namaBarang,
      stock: data[index].jumlahMasuk,
    });
  }

  for (let index = 0; index < data.length; index++) {
    if (data.length !== 0) {
      DataForBody.push(Object.values(dataFinal[index]));
    }
  }
  const downloadPDF = () => {
    const image = 'bangunan.jpeg';
    const img = new Image();
    img.src = image;
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.addImage(image, 'JPEG', 10, 10, 100, 100);
    doc.text(`Laporan Data Barang KARYA PUTRA 2 Tanggal ${moment().format('LL')}`, 20, 20);
    doc.text(`jl.Kademangan RT. 05/02`, 400, 50);
    doc.text(`Kel - Kademangan Setu, Tangsel`, 374, 70);
    doc.text(``, 20, 20);
    const index = 0;
    doc.setFontSize(10);
    autoTable(doc, {
      theme: 'striped',
      margin: { top: 95 },
      head: [['No', 'Kode Barang', 'Nama Barang', 'Stok Barang']],
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
    doc.save(`Data Barang ${moment().format('LL')}.pdf`);
  };
  // console.log(data, 'data');
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('Data Barang');
    const worksheet = workbook.getWorksheet('Data Barang');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'Data Barang';
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

    /* Column headers */
    worksheet.getRow(6).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 10 },
      { key: 'data_b', width: 20 },
      { key: 'data_c', width: 20 },
      { key: 'data_d', width: 20 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    data.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}`,
        data_b: data?.kodeBarang?.kodeBarang,
        data_c: data?.kodeBarang?.namaBarang,
        data_d: data.jumlahMasuk,
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Data darang Tanggal ${moment().format('LL')}${fileExtension}`);
    })();
  }
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tambah Barang</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-2 gap-16 mt-10 mb-10">
              <div>
                <TextField
                  value={kodeBarang}
                  onChange={(e) => setkodeBarang(e.target.value)}
                  id="outlined-basic"
                  label="Kode Barang"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  value={namaBarang}
                  onChange={(e) => setnamaBarang(e.target.value)}
                  id="outlined-basic"
                  label="Nama Barang"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  value={hargaBarang}
                  onChange={(e) => sethargaBarang(e.target.value)}
                  id="outlined-basic"
                  label="Harga Barang"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  value={jumlahMasuk}
                  onChange={(e) => setjumlahMasuk(e.target.value)}
                  id="outlined-basic"
                  type="number"
                  label="Stok Barang"
                  variant="outlined"
                />
              </div>
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
                  value={satuan}
                  onChange={(_, newValue) => {
                    setsatuan(newValue);
                  }}
                  id="combo-box-demo"
                  options={top100Films}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Satuan" />}
                />
              </div>
              <div className="col-span-2 ">
                <TextField
                  fullWidth
                  value={deskripsi}
                  onChange={(e) => setdeskripsi(e.target.value)}
                  id="outlined-basic"
                  label="Deskripsi"
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
          <Button
            variant="contained"
            disabled={
              kodeBarang === '' ||
              namaBarang === '' ||
              hargaBarang === '' ||
              jumlahMasuk <= 0 ||
              deskripsi === ''
            }
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
          Data Barang
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
    </div>
  );
}

export default DataBarangHeader;
