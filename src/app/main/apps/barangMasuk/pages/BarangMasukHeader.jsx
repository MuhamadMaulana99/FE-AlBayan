/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable new-cap */
/* eslint-disable func-names */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const top100Films = [
  { label: 'KG', year: 1994 },
  { label: 'Lusin', year: 1972 },
  { label: 'Bal', year: 1994 },
];
function BarangMasukHeader(props) {
  const dispatch = useDispatch();
  const data = props?.data;
  const { dataMasterBarang } = props;
  const { dataMasterSuplayer } = props;
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dataSatuan, setdataSatuan] = useState(null);
  const [kodeBarang, setkodeBarang] = useState(null);
  const [namaBarang, setnamaBarang] = useState('');
  const [hargaBarang, sethargaBarang] = useState('');
  const [supllayer, setsupllayer] = useState(null);
  const [jumlahMasuk, setjumlahMasuk] = useState(0);
  const [satuan, setsatuan] = useState(null);
  const [tglMasuk, settglMasuk] = useState(null);
  // console.log(dataSatuan, 'datasatuan');

  const body = {
    kodeBarang: JSON.stringify(kodeBarang),
    namaBarang,
    hargaBarang,
    supllayer: JSON.stringify(supllayer),
    jumlahMasuk,
    satuan: JSON.stringify(satuan),
    tglMasuk: moment(tglMasuk).format(),
  };
  // const api = `https://6530fba34d4c2e3f333c280d.mockapi.io/barang/barang`;
  // const api = `http://localhost:3000/barangMasuk`;
  // const api = `http://ner.grit.id:8006`;
  const api = `http://localhost:3000`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setkodeBarang('');
    setnamaBarang('');
    sethargaBarang('');
    setsupllayer('');
    setjumlahMasuk(0);
  };
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}/barangMasuk`, body)
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
  const getDataSatuan = async () => {
    setLoading(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_}/mstSatuan`)
      .then((res) => {
        setdataSatuan(res?.data);
        setLoading(false);
        // console.log(res.data, 'rrr');
      })
      .catch((err) => {
        setdataSatuan([]);
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

  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getDataSatuan();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  const DataForBody = [];
  const dataFinal = [];
  const datas = {
    no: null,
    kodeBarang: null,
    namaBarang: null,
    hargaBarang: null,
    supllayer: null,
    satuan: null,
    stock: null,
    tglMasuk: null,
  };
  for (let index = 0; index < data.length; index++) {
    dataFinal.push({
      ...datas,
      no: index + 1,
      kodeBarang: data[index].kodeBarang?.kodeBarang,
      namaBarang: data[index].kodeBarang?.namaBarang,
      hargaBarang: data[index].hargaBarang,
      supllayer: data[index].supllayer?.name,
      satuan: data[index].satuan?.name,
      stock: data[index].jumlahMasuk,
      tglMasuk: moment(data[index].tglMasuk).format('YYYY-DD-MM'),
    });
  }

  for (let index = 0; index < data.length; index++) {
    if (data.length !== 0) {
      DataForBody.push(Object.values(dataFinal[index]));
    }
  }
  const downloadPDF = () => {
    const doc = new jsPDF('l', 'pt', 'legal');
    doc.text(`Laporan Data Barang Masuk KARYA PUTRA 2 Tanggal ${moment().format('LL')}`, 20, 20);
    doc.text(`jl.Kademangan RT. 05/02`, 400, 50);
    doc.text(`Kel - Kademangan Setu, Tangsel`, 374, 70);
    const index = 0;
    doc.setFontSize(10);
    autoTable(doc, {
      theme: 'striped',
      margin: { top: 95 },
      head: [
        [
          'No',
          'Kode Barang',
          'Nama Barang',
          'Harga Barang',
          'Supllayer',
          'Satuan',
          'Stok Barang',
          'Tanggal Masuk',
        ],
      ],
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
    doc.save(`Data Barang Masuk ${moment().format('LL')}.pdf`);
  };
  // console.log(data, 'data');
  function exportExcel() {
    // create workbook by api.
    const workbook = new Workbook();
    // must create one more sheet.
    const sheet = workbook.addWorksheet('Data Barang Masuk');
    const worksheet = workbook.getWorksheet('Data Barang Masuk');

    /* TITLE */
    worksheet.mergeCells('A1', 'G1');
    worksheet.getCell('A1').value = 'Barang Masuk';
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

    worksheet.getCell('D7').value = 'Harga Barang';
    worksheet.getCell('D7').alignment = { horizontal: 'center' };

    worksheet.getCell('E7').value = 'Supllayer';
    worksheet.getCell('E7').alignment = { horizontal: 'center' };

    worksheet.getCell('F7').value = 'Satuan';
    worksheet.getCell('F7').alignment = { horizontal: 'center' };

    worksheet.getCell('G7').value = 'Stock';
    worksheet.getCell('G7').alignment = { horizontal: 'center' };

    worksheet.getCell('H7').value = 'Tanggal Masuk';
    worksheet.getCell('H7').alignment = { horizontal: 'center' };

    /* Column headers */
    worksheet.getRow(6).values = [''];
    worksheet.columns = [
      { key: 'data_a', width: 10 },
      { key: 'data_b', width: 20 },
      { key: 'data_c', width: 20 },
      { key: 'data_d', width: 20 },
      { key: 'data_e', width: 20 },
      { key: 'data_f', width: 20 },
      { key: 'data_g', width: 20 },
      { key: 'data_h', width: 20 },
    ];
    /* Now we use the keys we defined earlier to insert your data by iterating through arrData
		and calling worksheet.addRow()
		*/
    data.forEach(function (data, index) {
      worksheet.addRow({
        data_a: `${index + 1}`,
        data_b: data?.kodeBarang?.kodeBarang,
        data_c: data?.kodeBarang?.namaBarang,
        data_d: data.hargaBarang,
        data_e: data.supllayer?.name,
        data_f: data.satuan?.name,
        data_g: data.jumlahMasuk,
        data_h: moment(data.tglKeluar).format('YYYY-DD-MM'),
      });
    });

    (async () => {
      const buffer = await workbook.xlsx.writeBuffer();
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const fileExtension = '.xlsx';

      const blob = new Blob([buffer], { type: fileType });

      saveAs(blob, `Data barang Masuk Tanggal ${moment().format('LL')}${fileExtension}`);
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
        <DialogTitle id="alert-dialog-title">Tambah Barang Masuk</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-2 gap-16 mt-10 mb-10">
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
                  value={kodeBarang}
                  getOptionLabel={(option) => option.kodeBarang}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setkodeBarang(newValue);
                      setnamaBarang(newValue?.namaBarang);
                    } else {
                      setkodeBarang(null);
                      setnamaBarang('');
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
                  value={namaBarang}
                  disabled
                  // onChange={(e) => setnamaBarang(e.target.value)}
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
                  label="Jummlah Masuk"
                  variant="outlined"
                />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Date"
                    value={tglMasuk}
                    onChange={(date) => {
                      settglMasuk(date);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
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
                  options={dataSatuan}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Satuan" />}
                />
              </div>
              <div className="col-span-2">
                <Autocomplete
                  disablePortal
                  fullWidth
                  value={supllayer}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setsupllayer(newValue);
                    } else {
                      setsupllayer(null);
                    }
                  }}
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
          <Button
            variant="contained"
            disabled={
              kodeBarang === '' ||
              namaBarang === '' ||
              hargaBarang === '' ||
              jumlahMasuk <= 0 ||
              supllayer === ''
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
          Barang Masuk
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
            placeholder="Search products"
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
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default BarangMasukHeader;
