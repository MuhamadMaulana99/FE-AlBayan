/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import PengajuanHeader from "./PengajuanHeader";
import PengajuanTable from "./PengajuanTable";
import { fetchApi } from "app/configs/fetchApi";
import { tambahNamaRe, tambahNamaReApprove } from "app/configs/getUserInfo";

function Pengajuan() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataPermohonanApprove, setDatadataPermohonanApprove] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // console.log(dataPermohonanApprove, "dataPermohonanApprove");
  const filteredUsers = data?.filter((user) =>
    user?.nasabah?.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasilMerge = tambahNamaReApprove(dataPermohonanApprove);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const getDataFromApi = async (endpoint, setDataFunction) => {
    setLoading(true);
    const api = fetchApi(); // Gunakan instance fetchApi

    try {
      const response = await api.get(endpoint);
      setDataFunction(response?.data);
      setLoading(false);
    } catch (err) {
      setDataFunction([]);
      setLoading(false);
      const messages = handleError(err);
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
    }
  };

  // Menggunakan getDataFromApi untuk getData
  const getData = async () => {
    await getDataFromApi(
      `${process.env.REACT_APP_API_URL_API_}/Pengajuan`,
      setData
    );
  };

  // Menggunakan getDataFromApi untuk getDataPermohonanApprove
  const getDataPermohonanApprove = () => {
    getDataFromApi(
      `${process.env.REACT_APP_API_URL_API_}/permohonanByApprove`,
      setDatadataPermohonanApprove
    );
  };
  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
      getDataPermohonanApprove();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  return (
    <FusePageCarded
      header={
        <PengajuanHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dataPermohonanApprove={dataPermohonanApprove}
          getData={getData}
          data={filteredUsers}
          loading={loading}
          hasilMerge={hasilMerge}
        />
      }
      content={
        <PengajuanTable
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dataPermohonanApprove={dataPermohonanApprove}
          getData={getData}
          data={filteredUsers}
          loading={loading}
          hasilMerge={hasilMerge}
        />
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default Pengajuan;
