/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import AngsuranHeader from './AngsuranHeader';
import AngsuranTable from './AngsuranTable';

function Angsuran() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [optionNoAkad, setOptionNoAkad] = useState([]);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_}/angsuran`)
      .then((res) => {
        setData(res?.data);
        setLoading(false);
        // console.log(res.data, 'rrr');
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
  const getMasterStaff = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL_API_}/pengajuanByNoAkad`)
      .then((res) => {
        setOptionNoAkad(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setOptionNoAkad([]);
        setLoading(false);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
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
  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
      getMasterStaff();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  return (
    <FusePageCarded
      header={
        <AngsuranHeader
          optionNoAkad={optionNoAkad}
          getData={getData}
          data={data}
          loading={loading}
        />
      }
      content={
        <AngsuranTable
          optionNoAkad={optionNoAkad}
          getData={getData}
          data={data}
          loading={loading}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Angsuran;
