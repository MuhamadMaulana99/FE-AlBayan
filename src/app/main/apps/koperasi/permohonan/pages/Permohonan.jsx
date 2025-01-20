/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import PermohonanTable from "./PermohonanTable";
import PermohonanHeader from "./PermohonanHeader";

function Permohonan() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataNasabah, setDataNasabah] = useState([]);
  // console.log(dataNasabah, 'dataNasabah');
  const [searchTerm, setSearchTerm] = useState("");

  console.log(data, "dataa");
  const filteredUsers = data?.filter((user) =>
    user?.namaNasabah?.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const getData = async () => {
    setLoading(true);
    const response = await axios
      .get(`${process.env.REACT_APP_API_URL_API_}/Permohonan`)
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
  const getdataNasabah = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL_API_}/masterNasabah`)
      .then((res) => {
        setDataNasabah(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setDataNasabah([]);
        setLoading(false);
        const errStatus = err?.response?.status;
        const errMessage = err?.response?.data?.message;
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
  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
      getdataNasabah();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  return (
    <FusePageCarded
      header={
        <PermohonanHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dataNasabah={dataNasabah}
          getData={getData}
          data={filteredUsers}
          loading={loading}
        />
      }
      content={
        <PermohonanTable
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dataNasabah={dataNasabah}
          getData={getData}
          data={filteredUsers}
          loading={loading}
        />
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default Permohonan;
