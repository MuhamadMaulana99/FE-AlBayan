/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import ApprovalHeader from "./ApprovalHeader";
import ApprovalTable from "./ApprovalTable";
import { handleErrors } from "app/configs/getUserInfo";
import { fetchApi } from "app/configs/fetchApi";

function Approval() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataPermohonanApprove, setDatadataPermohonanApprove] = useState([]);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const getData = async () => {
    setLoading(true);
    try {
      const api = fetchApi();
      const response = await api.get("/Pengajuan");
      setData(response?.data);
    } catch (err) {
      handleErrors(err, setData);
    } finally {
      setLoading(false);
    }
  };

  const getDataPermohonanApprove = async () => {
    setLoading(true);
    try {
      const api = fetchApi();
      const response = await api.get("/permohonanByApprove");
      setDatadataPermohonanApprove(response?.data);
    } catch (err) {
      handleErrors(err, setDatadataPermohonanApprove);
    } finally {
      setLoading(false);
    }
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
        <ApprovalHeader
          dataPermohonanApprove={dataPermohonanApprove}
          getData={getData}
          data={data}
          loading={loading}
        />
      }
      content={
        <ApprovalTable
          dataPermohonanApprove={dataPermohonanApprove}
          getData={getData}
          data={data}
          loading={loading}
        />
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default Approval;
