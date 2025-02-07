/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showMessage } from "app/store/fuse/messageSlice";
import UserRolesHeader from "./UserRolesHeader";
import UserRolesTable from "./UserRolesTable";
import { getUserInfo } from "app/configs/getUserInfo";
import { fetchApi } from "app/configs/fetchApi";

function UserRoles() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = getUserInfo();
  const userRoles = userInfo;
  let getAllUserResponse;
  let getResponseName;
  let dataLogin;
  if (userRoles) {
    getAllUserResponse = userRoles?.response?.userRoles;
    getResponseName = userRoles?.response;
    dataLogin = userRoles;
  }
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const getData = async () => {
    setLoading(true);
    const api = fetchApi(); // Gunakan instance API dari fetchApi

    api
      .get("/allUser") // Gunakan base URL dari fetchApi
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
        const errStatus = err.response?.status;
        const errMessage = err.response?.data?.message;
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
  useEffect(() => {
    let isUnmout = false;
    if (!isUnmout) {
      getData();
    }
    return () => {
      isUnmout = true;
    };
  }, []);

  return (
    <FusePageCarded
      header={
        <UserRolesHeader getData={getData} data={data} loading={loading} />
      }
      content={
        <UserRolesTable getData={getData} data={data} loading={loading} />
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default UserRoles;
