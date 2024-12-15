import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function SignInPage() {
  // const api = `http://localhost:3000`;
  const dispatch = useDispatch();
  const [userName, setuserName] = useState('');
  const [passWord, setpassWord] = useState('');
  const [err, seterr] = useState(false);

  const handleSubmitLogin = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_API_}/login`, {
        username: userName,
        password: passWord,
      })
      .then((res) => {
        window.location.href = '/apps/dataBarang/';
        localStorage.setItem('userRoles', JSON.stringify(res?.data));
        dispatch(
          showMessage({
            message: 'Welcome Rizal',
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'success',
          })
        );
      })
      .catch((error) => {
        localStorage.removeItem('userRoles');
        seterr(true);
        dispatch(
          showMessage({
            message: 'Password atau username salah!!',
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'error',
          })
        );
      });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          {/* <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" /> */}

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Login
          </Typography>
          {/* <div className="flex items-baseline mt-2 font-medium">
            <Typography>Tidak Punya Akun?</Typography>
            <Link className="ml-4" to="/sign-up">
              Daftar
            </Link>
          </div> */}
          <div>
            <TextField
              // {...field}
              className="mb-24"
              label="Email"
              autoFocus
              type="email"
              error={err}
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              // {...field}
              className="mb-24"
              label="Password"
              type="password"
              error={err}
              value={passWord}
              onChange={(e) => setpassWord(e.target.value)}
              variant="outlined"
              required
              fullWidth
            />
          </div>

          <Button
            variant="contained"
            color="secondary"
            className=" w-full mt-16"
            aria-label="Sign in"
            onClick={handleSubmitLogin}
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            type="submit"
            size="large"
          >
            Login
          </Button>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Selamat Datang</div>
            <div> DI APLIKASI</div>
            <div> KOPERASI SYARIAH BMI</div>
            {/* <div> Di Toko Koperasi Al-Bayan</div> */}
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            memiliki kepribadian yang kuat, berwatak pejuang dan memiliki pula kemampuan untuk
            mengembangkan diri dan keluarganya serta bertanggungjawab atas pembangunan umat dan
            bangsa.
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;
