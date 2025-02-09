/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import React, { useState } from "react";
import PermohonanTable from "./PermohonanTable";
import PermohonanHeader from "./PermohonanHeader";
import { fetchApi } from "app/configs/fetchApi";
import { handleError, tambahNamaRe } from "app/configs/getUserInfo";

function Permohonan() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataNasabah, setDataNasabah] = useState([]);
  // console.log(dataNasabah, 'dataNasabah');
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = data?.filter((user) =>
    user?.nasabah?.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasilMerge = tambahNamaRe(dataNasabah);
  // console.log(hasilMerge, 'hasilMerge')

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  // console.log(data, 'datadata')

  // Fungsi untuk mengambil data Permohonan
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetchApi().get("/Permohonan");
      setData(response.data);
    } catch (err) {
      setData([]);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil data Nasabah
  const getDataNasabah = async () => {
    setLoading(true);
    try {
      const response = await fetchApi().get("/masterNasabah");
      setDataNasabah(response.data);
    } catch (err) {
      setDataNasabah([]);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
      getDataNasabah();
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
          hasilMerge={hasilMerge}
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
          hasilMerge={hasilMerge}
        />
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default Permohonan;
