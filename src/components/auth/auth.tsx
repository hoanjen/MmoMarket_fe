import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TransitionProps } from '@mui/material/transitions';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tab,
  Tabs,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { isEmail } from 'class-validator';
import { AuthApi } from '../../api/auth/auth';

import Cookies from 'js-cookie';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OauthButton({ className }: { className?: string }) {
  return (
    <div className={`flex justify-between gap-4 px-0 ${className ? className : ''}`}>
      <Button
        variant="contained"
        color="primary"
        className="w-[120px] h-10 pl-1"
        style={{ textTransform: 'none', fontWeight: 600 }}
        startIcon={<MicrosoftIcon></MicrosoftIcon>}
      >
        Microsoft
      </Button>
      <Button
        variant="contained"
        color="error"
        className="w-[120px] h-10"
        style={{ textTransform: 'none', fontWeight: 600 }}
        startIcon={<GoogleIcon></GoogleIcon>}
      >
        Google
      </Button>
      <Button
        variant="contained"
        color="inherit"
        className="w-[120px] h-10 ml-1"
        style={{ textTransform: 'none', fontWeight: 600 }}
        startIcon={<GitHubIcon></GitHubIcon>}
      >
        Github
      </Button>
    </div>
  );
}

function FormLogin({ setIsLogin, handleClose }: { setIsLogin: React.Dispatch<boolean>; handleClose: Function }) {
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const [invalidField, setInvalidField] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setInvalidField({
        password: values.password ? invalidField.password : true,
        email: values.email ? invalidField.email : true,
      });
    } else {
      const data = await AuthApi.login({
        email: values.email,
        password: values.password,
      });
      if (!data) {
        toast.error('email or password invalid!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
      if (data && data.statusCode === 400) {
        toast.error('email or password invalid!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
      if (data && data.statusCode === 200) {
        Cookies.set('access_token', data.data.access_token);
        Cookies.set('refresh_token', data.data.refresh_token);
        Cookies.set('user_id', data.data.user_id);
        toast.success('Login successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        setIsLogin(true);
        location.reload();
        handleClose();
      }
    }
  };

  return (
    <div className=" flex flex-col justify-center  text-center space-y-4">
      <p className="text-black font-bold py-2">Đăng nhập bằng tài khoản</p>
      <OauthButton className="mt-4"></OauthButton>
      <p className="font-medium text-slate-500 my-4">HOẶC</p>
      <Box component="form" className="flex flex-col space-y-4" onSubmit={handleSubmit} noValidate>
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            required
            label="Email"
            error={invalidField.email}
            value={values.email}
            name="email"
            onChange={(e) => {
              console.log('value', e.target.value);
              setValues({ ...values, email: e.target.value });
              setInvalidField({
                ...invalidField,
                email: !isEmail(e.target.value),
              });
            }}
          />
          <FormHelperText sx={{ marginLeft: '4px' }}>
            <span className="text-red-500">{invalidField.email ? 'Email invalid' : ''}</span>
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            error={invalidField.password}
            value={values.password}
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
              if (e.target.value && e.target.value.length < 2) {
                setInvalidField({ ...invalidField, password: true });
              } else {
                setInvalidField({ ...invalidField, password: false });
              }
            }}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText sx={{ marginLeft: '4px' }}>
            <span className="text-red-500">{invalidField.password ? 'Password invalid' : ''}</span>
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className="w-full h-10 pl-1"
          style={{ textTransform: 'none', fontWeight: 600 }}
          type="submit"
        >
          Đăng nhập
        </Button>
      </Box>
    </div>
  );
}

function FormRegister() {
  const [values, setValues] = useState<{
    username: string;
    email: string;
    password: string;
    term: boolean;
    otp: string;
  }>({
    username: '',
    email: '',
    password: '',
    otp: '',
    term: false,
  });

  const [invalidField, setInvalidField] = useState<{
    username: boolean;
    email: boolean;
    password: boolean;
    term: boolean;
    otp: boolean;
  }>({
    username: false,
    email: false,
    password: false,
    term: false,
    otp: false,
  });
  const [otpSent, setOtpSent] = useState(false);

  // Add countdown timer state
  const [countdown, setCountdown] = useState(0);

  // Function to handle sending OTP
  const handleSendOtp = async () => {
    if (!isEmail(values.email)) {
      setInvalidField({ ...invalidField, email: true });
      return;
    }

    // Call API to send OTP
    await AuthApi.sendMail({ email: values.email });

    toast.success(`Đã gửi mã OTP đến ${values.email}, kiểm tra email của bạn`, {
      position: 'top-right',
      autoClose: 2000,
    });

    setOtpSent(true);
    // Start countdown from 60 seconds
    setCountdown(60);
  };

  // Effect to handle countdown timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && otpSent) {
      // Reset otpSent when countdown reaches 0
      setOtpSent(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, otpSent]);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!values.email || !values.password || !values.username || !values.term) {
      setInvalidField({
        password: values.password ? invalidField.password : true,
        email: values.email ? invalidField.email : true,
        username: values.username ? invalidField.username : true,
        term: values.term ? invalidField.term : true,
        otp: values.term ? invalidField.otp : true,
      });
    } else {
      const data = await AuthApi.signUp({
        username: values.username,
        email: values.email,
        password: values.password,
        otp: parseInt(values.otp),
      });

      if (data && data.statusCode === 200) {
        toast.success('Đăng ký thành công !!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
      if (data && data.statusCode === 400) {
        toast.error('Email hoặc username đã tồn tại !!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    }
  };
  return (
    <div className="flex flex-col justify-center space-y-4">
      <p className="font-bold text-black text-center py-2">Đăng ký tài khoản mới</p>
      <OauthButton className="mt-4"></OauthButton>
      <div className="text-center">HOẶC</div>
      <Box className="flex flex-col space-y-4" component="form" noValidate onSubmit={handleSubmit}>
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-input-username">Username</InputLabel>
          <OutlinedInput
            id="outlined-input-username"
            required
            label="Username"
            error={invalidField.username}
            value={values.username}
            onChange={(e) => {
              setValues({ ...values, username: e.target.value });
              if (values.username.length < 2) {
                setInvalidField({ ...invalidField, username: true });
              } else {
                setInvalidField({ ...invalidField, username: false });
              }
            }}
            name="username"
          />
          <FormHelperText id="outlined-helper-username">
            <span className="text-red-500">{invalidField.username ? 'Username invalid' : ''}</span>
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-input-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-input-email"
            required
            label="Email"
            error={invalidField.email}
            value={values.email}
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
              setInvalidField({
                ...invalidField,
                email: !isEmail(e.target.value),
              });
            }}
            name="email"
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSendOtp}
                  disabled={countdown > 0 || !values.email || invalidField.email}
                  sx={{ mr: -1, height: '32px', minWidth: '60px' }}
                >
                  {countdown > 0 ? `${countdown}s` : 'Gửi'}
                </Button>
              </InputAdornment>
            }
          />
          <FormHelperText id="outlined-helper-email">
            <span className="text-red-500">{invalidField.email ? 'Email invalid' : ''}</span>
          </FormHelperText>
        </FormControl>

        {/* New OTP input field */}
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-input-otp">Mã OTP</InputLabel>
          <OutlinedInput
            id="outlined-input-otp"
            required
            label="Mã OTP"
            error={invalidField.otp}
            value={values.otp}
            onChange={(e) => {
              setValues({ ...values, otp: e.target.value });
              setInvalidField({
                ...invalidField,
                otp: e.target.value.length < 5,
              });
            }}
            name="otp"
            placeholder="Nhập mã OTP từ email"
          />
          <FormHelperText id="outlined-helper-otp">
            <span className="text-red-500">{invalidField.otp ? 'OTP invalid' : ''}</span>
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            error={invalidField.password}
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
              if (values.password.length < 2) {
                setInvalidField({ ...invalidField, password: true });
              } else {
                setInvalidField({ ...invalidField, password: false });
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText id="outlined-helper-password">
            <span className="text-red-500">{invalidField.password ? 'Password invalid' : ''}</span>
          </FormHelperText>
        </FormControl>
        <FormControl required component="fieldset" sx={{ maxWidth: 412, m: 3, marginX: 0 }} variant="standard">
          <FormControlLabel
            required={false}
            control={
              <Checkbox
                checked={values.term}
                onClick={() => {
                  setValues({ ...values, term: !values.term });
                  setInvalidField({
                    ...invalidField,
                    term: values.term ? true : false,
                  });
                }}
                sx={{
                  paddingBottom: 4,
                }}
              />
            }
            label="Tôi đồng ý chia sẻ thông tin và đồng ý với Chính sách bảo mật dữ liệu cá nhân"
          />
          <FormHelperText
            sx={{
              paddingLeft: 4,
            }}
          >
            <span className="text-red-500">{invalidField.term ? 'You have not agreed' : ''}</span>
          </FormHelperText>
        </FormControl>

        <Button variant="contained" color="primary" type="submit" style={{ textTransform: 'none', fontWeight: 600 }}>
          Đăng ký
        </Button>
      </Box>
    </div>
  );
}

export default function DialogAuth({ setIsLogin }: { setIsLogin: React.Dispatch<boolean> }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <div className="flex gap-4">
        <Button
          variant="contained"
          onClick={() => {
            handleClickOpen();
            setValue(1);
          }}
        >
          Đăng nhập
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleClickOpen();
            setValue(2);
          }}
        >
          Đăng ký
        </Button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ padding: 0 }}
      >
        <DialogTitle sx={{ minWidth: '500px', padding: 0 }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { display: 'none' },
              }}
              textColor="primary"
            >
              <Tab
                label="Đăng Nhập"
                value={1}
                className=" w-1/2 h-full "
                sx={{
                  ...(value === 1 ? { backgroundColor: 'white' } : { backgroundColor: '#e7e7e7' }),
                  fontWeight: 600,
                }}
              />
              <Tab
                label="Đăng ký"
                value={2}
                className=" w-1/2 h-full"
                sx={{
                  backgroundColor: value === 2 ? 'white' : '#e7e7e7',
                  fontWeight: 600,
                }}
              />
            </Tabs>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" className="p-5" component={'span'}>
            <div>
              {value === 1 ? (
                <FormLogin setIsLogin={setIsLogin} handleClose={handleClose}></FormLogin>
              ) : (
                <FormRegister></FormRegister>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
