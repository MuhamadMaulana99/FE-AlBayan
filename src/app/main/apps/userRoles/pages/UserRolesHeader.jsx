import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const role = [
  { roleUser: 'Super Admin', id: 1 },
  { roleUser: 'Admin', id: 2 },
  { roleUser: 'User', id: 3 },
];

function UserRolesHeader(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [userRoles, setuserRoles] = useState(null);
  // console.log(userRoles);

  const userRoless = JSON.parse(localStorage.getItem('userRoles'));
  let getAllUserResponse;
  let getResponseName;
  let dataLogin;
  if (userRoless) {
    getAllUserResponse = userRoless?.response?.userRoles;
    getResponseName = userRoless?.response;
    dataLogin = JSON.parse(getAllUserResponse);
  }

  const body = {
    username,
    password,
    userRoles: JSON.stringify(userRoles),
  };
  // const api = `https://652d2c32f9afa8ef4b26e7f0.mockapi.io/tokoBangunan/v1/suplayer`;
  const api = `http://ner.grit.id:8006`;
  // const api = `http://localhost:3000`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const HandelSubmit = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}/register`, body)
      .then((_res) => {
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

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Tambah User</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="mt-10">
              <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-demo"
                value={userRoles}
                getOptionLabel={(option) => option.roleUser}
                onChange={(_, newValue) => {
                  if (newValue) {
                    setuserRoles(newValue);
                  } else {
                    setuserRoles(null);
                  }
                }}
                options={role}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Role" />}
              />
            </div>
            <div className="grid grid-cols-2 gap-16 mt-10 mb-10">
              <div>
                <TextField
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  id="outlined-basic"
                  label="Password"
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
          <Button variant="contained" onClick={HandelSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Data User
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Cari User"
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
            className=""
            // component={Link}
            // to="/apps/e-commerce/products/new"
            onClick={handleClickOpen}
            disabled={dataLogin?.roleUser === 'User'}
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default UserRolesHeader;
