/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import FuseLoading from "@fuse/core/FuseLoading";
import { getUserInfo } from "app/configs/getUserInfo";
import { fetchApi } from "app/configs/fetchApi";

const columns = [
  { id: "no", label: "NO", minWidth: 170, align: "left" },
  {
    id: "username",
    label: "username",
    minWidth: 170,
    align: "left",
  },
  // {
  //   id: "password",
  //   label: "Pasword",
  //   minWidth: 170,
  //   align: "left",
  // },
  {
    id: "userRole",
    label: "UserRoles",
    minWidth: 170,
    align: "left",
  },
  {
    id: "aksi",
    label: "Aksi",
    minWidth: 170,
    align: "center",
  },
];
const role = [
  { roleUser: "Super Admin", id: 1 },
  { roleUser: "Admin", id: 2 },
  { roleUser: "User", id: 3 },
];
function getRoleById(id) {
  return role.find((role) => role.id === id);
}

function createData(no, id_users, username, password, userRoles) {
  return { no, id_users, username, password, userRoles };
}

export default function UserRolesTable(props) {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [dataEdit, setDataEdit] = React.useState({
    id_users: null,
    username: "",
    password: "",
    userRoles: "",
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const rows = props?.data?.map((item, index) =>
    createData(
      index + 1,
      item?.id_users,
      item?.username,
      item?.password,
      item?.userRoles
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClickOpen = (id, row) => {
    setOpen(true);
    setDataEdit({
      id_users: row?.id_users,
      username: row?.username,
      password: row?.password,
      userRoles: row?.userRoles,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    username: dataEdit?.username,
    password: dataEdit?.password,
    userRoles: JSON.stringify(dataEdit?.userRoles),
  };

  const HandelEdit = (id) => {
    setLoading(true);
    const api = fetchApi(); // Gunakan instance API dari fetchApi

    api
      .put(`/allUser/${dataEdit?.id_users}`, body) // Menggunakan base URL dari fetchApi
      .then((res) => {
        props?.getData();
        handleClose();
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Berhasil Di Edit",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
          })
        );
      })
      .catch((err) => {
        handleClose();
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
          messages = "Something Went Wrong!!";
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

  const HandelDelete = (id) => {
    setLoading(true);
    const api = fetchApi(); // Gunakan instance API dari fetchApi

    api
      .delete(`/allUser/${id}`) // Menggunakan base URL dari fetchApi
      .then((res) => {
        props?.getData();
        setLoading(false);
        dispatch(
          showMessage({
            message: "Data Berhasil Di Hapus",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
          })
        );
      })
      .catch((err) => {
        setData([]);
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
          messages = "Something Went Wrong!!";
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
  if (props?.loading) {
    return <FuseLoading />;
  }
  if (rows?.length === 0) {
    return (
      <div className="m-10 h-full w-full flex justify-center items-center">
        <div>
          <Alert severity="info">Data Kosong</Alert>
        </div>
      </div>
    );
  }
  // console.log(dataEdit, 'dataEdit')

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="mt-10">
              <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-demo"
                value={getRoleById(dataEdit?.userRoles)}
                getOptionLabel={(option) => option.roleUser}
                onChange={(_, newValue) => {
                  if (newValue) {
                    setDataEdit({ ...dataEdit, userRoles: newValue });
                  } else {
                    setDataEdit(null);
                  }
                }}
                options={role}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Role" />}
              />
            </div>
            <div className="grid grid-cols-2 gap-16 mt-10 mb-10">
              <div>
                <TextField
                  value={dataEdit?.username}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, username: e.target.value })
                  }
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  value={dataEdit?.password}
                  onChange={(e) =>
                    setDataEdit({ ...dataEdit, password: e.target.value })
                  }
                  id="outlined-basic"
                  label="Pasword"
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
          <Button variant="contained" onClick={HandelEdit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                // console.log(row, 'oo');
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row?.username}</TableCell>
                    {/* <TableCell>{row?.password}</TableCell> */}
                    <TableCell>
                      {getRoleById(row?.userRoles)?.roleUser}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center">
                        <div>
                          <IconButton
                            onClick={() => handleClickOpen(row.id_users, row)}
                            color="info"
                            disabled={dataLogin?.roleUser === "User"}
                            className=""
                          >
                            <EditIcon />
                          </IconButton>
                        </div>
                        <div>
                          <IconButton
                            onClick={(e) => HandelDelete(row.id_users)}
                            color="error"
                            disabled={
                              dataLogin?.roleUser === "User" ||
                              dataLogin?.roleUser === "Admin"
                            }
                            className=""
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
