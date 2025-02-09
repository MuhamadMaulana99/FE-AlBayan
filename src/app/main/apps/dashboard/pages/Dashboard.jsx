/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import DashboardHeader from "./DashboardHeader";
import DashboardTable from "./DashboardTable";
import DashboardPage from "./DashboardPage";
import { getUserInfo, handleErrors } from "app/configs/getUserInfo";
import { fetchApi } from "app/configs/fetchApi";

function Dashboard() {
  const dispatch = useDispatch();
  const user = getUserInfo();
  // console.log(user, "userrr");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [optionNoAkad, setOptionNoAkad] = useState([]);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetchApi().get("/Pengajuan");
      setData(response.data);
    } catch (err) {
      setData([]);
      const errStatus = err.response?.status || 500;
      const errMessage = err.response?.data?.message || "Something went wrong!";
      handleErrors(errStatus)
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMasterStaff = async () => {
    setLoading(true);
    try {
      const response = await fetchApi().get("/pengajuanByNoAkad");
      setOptionNoAkad(response.data);
    } catch (err) {
      setOptionNoAkad([]);
      const errStatus = err.response?.status || 500;
      const errMessage = err.response?.data?.message || "Something went wrong!";
      handleErrors(errStatus)

      console.error(err);
    } finally {
      setLoading(false);
    }
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
        <DashboardHeader
          optionNoAkad={optionNoAkad}
          getData={getData}
          data={data}
          loading={loading}
        />
      }
      content={
        <DashboardPage
          // optionNoAkad={optionNoAkad}
          // getData={getData}
          data={data}
          // loading={loading}
        />
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default Dashboard;
