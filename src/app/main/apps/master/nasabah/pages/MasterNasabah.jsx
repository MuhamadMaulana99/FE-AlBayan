/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useThemeMediaQuery } from "@fuse/hooks";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showMessage } from "app/store/fuse/messageSlice";
import MasterNasabahTable from "./MasterNasabahTable";
import MasterNasabahHeader from "./MasterNasabahHeader";
import { fetchApi } from "app/configs/fetchApi";

function MasterNasabah() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [searchTerm, setSearchTerm] = useState("");

  console.log(data, "dataa");
  const filteredUsers = data?.filter((user) =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getData = async () => {
    setLoading(true);

    const api = fetchApi(); // get an Axios instance with your authorization headers

    try {
      const response = await api.get("/masterNasabah"); // use the baseURL from fetchApi
      setData(response?.data);
      setLoading(false);
    } catch (err) {
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
    }
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
        <MasterNasabahHeader
          getData={getData}
          data={filteredUsers}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      }
      content={
        <MasterNasabahTable
          getData={getData}
          data={filteredUsers}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      }
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default MasterNasabah;
