import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { IsEmail, isEmail } from "class-validator";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OauthButton({ className }: { className?: string }) {
  return (
    <div
      className={`flex justify-between gap-4 px-0 ${
        className ? className : ""
      }`}
    >
      <Button
        variant="contained"
        color="primary"
        className="w-[120px] h-10 pl-1"
        style={{ textTransform: "none", fontWeight: 600 }}
        startIcon={<MicrosoftIcon></MicrosoftIcon>}
      >
        Microsoft
      </Button>
      <Button
        variant="contained"
        color="error"
        className="w-[120px] h-10"
        style={{ textTransform: "none", fontWeight: 600 }}
        startIcon={<GoogleIcon></GoogleIcon>}
      >
        Google
      </Button>
      <Button
        variant="contained"
        color="inherit"
        className="w-[120px] h-10 ml-1"
        style={{ textTransform: "none", fontWeight: 600 }}
        startIcon={<GitHubIcon></GitHubIcon>}
      >
        Github
      </Button>
    </div>
  );
}

function FormLogin() {
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
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
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setInvalidField({
        password: values.password ? invalidField.password : true,
        email: values.email ? invalidField.email : true,
      });
    }
    console.log("SUBMITED");
  };

  return (
    <div className=" flex flex-col justify-center  text-center space-y-4">
      <h2 className="text-black font-bold py-2">Đăng nhập bằng tài khoản</h2>
      <OauthButton className="mt-4"></OauthButton>
      <p className="font-medium text-slate-500 my-4">HOẶC</p>
      <Box
        component="form"
        className="flex flex-col  space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
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
              setValues({ ...values, email: e.target.value });
              if (values.email) {
                setInvalidField({
                  ...invalidField,
                  email: !isEmail(values.email),
                });
              } else {
                setInvalidField({
                  ...invalidField,
                  email: !isEmail(values.email),
                });
              }
            }}
          />
          <FormHelperText sx={{ marginLeft: "4px" }}>
            <p className="text-red-500">
              {invalidField.email ? "Email invalid" : ""}
            </p>
          </FormHelperText>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            error={invalidField.password}
            value={values.password}
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
              if (values.password.length < 2) {
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
          <FormHelperText sx={{ marginLeft: "4px" }}>
            <p className="text-red-500">
              {invalidField.password ? "Password invalid" : ""}
            </p>
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className="w-full h-10 pl-1"
          style={{ textTransform: "none", fontWeight: 600 }}
          type="submit"
        >
          Đăng nhập
        </Button>
      </Box>
    </div>
  );
}

export default function DialogAuth() {
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
      <Button variant="contained" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ padding: 0 }}
      >
        <DialogTitle sx={{ minWidth: "500px", padding: 0 }}>
          <Box sx={{ width: "100%", height: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { display: "none" },
              }}
              textColor="primary"
            >
              <Tab
                label="Đăng Nhập"
                value={1}
                className=" w-1/2 h-full "
                sx={{
                  ...(value === 1
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#e7e7e7" }),
                  fontWeight: 600,
                }}
              />
              <Tab
                label="Đăng ký"
                value={2}
                className=" w-1/2 h-full"
                sx={{
                  backgroundColor: value === 2 ? "white" : "#e7e7e7",
                  fontWeight: 600,
                }}
              />
            </Tabs>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="p-5"
          >
            <div>
              <FormLogin></FormLogin>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
