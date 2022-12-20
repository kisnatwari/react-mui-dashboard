import Cookies from "universal-cookie";
import {
  Button,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stack
} from "@mui/material";

import {
  Link
} from "react-router-dom";

import useHttp from "../../hooks/useHttp";

import MediaQuery from "react-responsive";

import {
  useState,
  useEffect
} from "react";

import SweetAlert from 'react-bootstrap-sweetalert';

import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const response = useSelector(response => response);
  const cookie = new Cookies();

  const signupForm = {
    fullname: "er saurav",
    mobile: "9199987267",
    email: "ersaurav08@gmail.com",
    password: "S@w3fdsfsdfd"
  }
  const signupFormError = {
    fullname: {
      state: false,
      message: ""
    },
    mobile: {
      state: false,
      message: ""
    },
    email: {
      state: false,
      message: ""
    },
    password: {
      state: false,
      message: ""
    }
  }
  const [input, setInput] = useState(signupForm);
  const [error, setError] = useState(signupFormError);
  const [checked, setChecked] = useState(false);
  const [sweetAlert, setSweetAlert] = useState({
    state: false,
    title: "",
    icon: "default",
    message: ""
  });

  const Alert = () => {
    const alert = (
      <>
        <SweetAlert
          show={sweetAlert.state}
          title={sweetAlert.title}
          type={sweetAlert.icon}
          customButtons={
            <>
              <Button onClick={() => setSweetAlert({ state: false })} variant="outlined" color="warning" sx={{ py: 1, mr: 2 }}>Cancel</Button>
              <Button variant="contained" color="success" sx={{ py: 1 }} component={Link} to="/admin-panel">Login</Button>
            </>
          }
          onConfirm={() => { }}
        >
          {sweetAlert.message}
        </SweetAlert>
      </>
    );
    return alert;
  }

  const fullnameValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    return setError((oldData) => {
      return {
        ...oldData,
        [key]: isRequired
      }
    })
  }

  const mobileValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    const isMinLength = minLength(input, 4);
    const isMaxLength = maxLength(input, 13);
    return setError((oldData) => {
      return {
        ...oldData,
        [key]: (isRequired.state && isRequired) ||
          (isMinLength.state && isMinLength) ||
          isMaxLength
      }
    });
  }

  const emailValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    const isEmail = emailSyntax(input);
    return setError((oldData) => {
      return {
        ...oldData,
        [key]: (isRequired.state && isRequired) || isEmail
      }
    });
  }

  const passwordValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    const isMinLength = minLength(input, 8);
    const isMaxLength = maxLength(input, 15);
    const isStrong = strongPassword(input);
    return setError((oldData) => {
      return {
        ...oldData,
        [key]: (isRequired.state && isRequired) ||
          (isStrong.state && isStrong) ||
          (isMinLength.state && isMinLength) ||
          isMaxLength
      }
    });
  }

  const required = (input) => {
    const value = input.value.trim();
    if (value.length === 0) {
      return {
        state: true,
        message: "This field is required"
      }
    }
    else {
      return {
        state: false,
        message: ""
      }
    }
  }

  const emailSyntax = (input) => {
    const value = input.value.trim();
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regExp.test(value)) {
      return {
        state: false,
        message: ""
      }
    }
    else {
      return {
        state: true,
        message: "Email is not valid"
      }
    }
  }

  const strongPassword = (input) => {
    const value = input.value.trim();
    const regExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=)/g;
    if (regExp.test(value)) {
      return {
        state: false,
        message: ""
      }
    }
    else {
      return {
        state: true,
        message: "Password contain uppercase, lowercase, symbols and numbers"
      }
    }
  }

  const minLength = (input, requiredLength) => {
    const value = input.value.trim();
    if (value.length < requiredLength) {
      return {
        state: true,
        message: `Minimum ${requiredLength} characters required`
      }
    }
    else {
      return {
        state: false,
        message: ""
      }
    }
  }

  const maxLength = (input, requiredLength) => {
    const value = input.value.trim();
    if (value.length > requiredLength) {
      return {
        state: true,
        message: `Maximum ${requiredLength} characters required`
      }
    }
    else {
      return {
        state: false,
        message: ""
      }
    }
  }

  const updateValue = (e) => {
    const input = e.target;
    const key = input.name;
    const value = input.value;
    return setInput((oldData) => {
      return {
        ...oldData,
        [key]: value
      }
    })
  }

  const validateOnSubmit = () => {
    let valid = true;
    for (let key in input) {
      if (input[key].length === 0) {
        valid = false;
        setError((oldData) => {
          return {
            ...oldData,
            [key]: {
              state: true,
              message: "This field is required"
            }
          }
        });
      }
    }
    return valid;
  }

  const register = (e) => {
    e.preventDefault();
    const isValid = validateOnSubmit();
    if (isValid) {
      dispatch({ type: "Success" });
      /* return setRequest({
        method: "post",
        url: "/signup",
        data: input
      }); */
    }
  }

  const design = (
    <>
      <Grid container>
        <Grid item>
          <MediaQuery minWidth={1224}>
            <img src="images/auth.svg" alt="auth" width="100%" />
          </MediaQuery>
          <MediaQuery maxWidth={1224}>
            <img src="images/mobile-auth.png" alt="auth" width="100%" />
          </MediaQuery>
        </Grid>
        <Grid item sx={{ p: 5 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Register
          </Typography>
          <form onSubmit={register}>
            <Stack direction="column" spacing={3}>
              <TextField
                error={error.fullname.state}
                helperText={error.fullname.message}
                label="Fullname"
                variant="outlined"
                name="fullname"
                value={input.fullname}
                onChange={updateValue}
                onBlur={fullnameValidation}
                onInput={fullnameValidation}
              />
              <TextField
                error={error.mobile.state}
                helperText={error.mobile.message}
                type="number"
                label="Mobile"
                variant="outlined"
                name="mobile"
                value={input.mobile}
                onChange={updateValue}
                onBlur={mobileValidation}
                onInput={mobileValidation}
              />
              <TextField
                error={error.email.state}
                helperText={error.email.message}
                label="Email"
                variant="outlined"
                name="email"
                value={input.email}
                onChange={updateValue}
                onBlur={emailValidation}
                onInput={emailValidation}
              />
              <TextField
                error={error.password.state}
                helperText={error.password.message}
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                value={input.password}
                onChange={updateValue}
                onBlur={passwordValidation}
                onInput={passwordValidation}
              />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormGroup>
                  <FormControlLabel
                    label="I accept terms and conditions"
                    control={<Checkbox checked={checked} color="warning" onChange={() => setChecked(!checked)} />}
                  />
                </FormGroup>
                <Button type="button" component={Link} to="login">Already have an account</Button>
              </Stack>
              <div>
                <Button
                  disabled={
                    error.fullname.state ||
                    error.mobile.state ||
                    error.email.state ||
                    error.password.state ||
                    !checked
                  }
                  type="submit"
                  sx={{ py: 1 }}
                  variant="contained"
                >Signup</Button>
              </div>
            </Stack>
          </form>
          <Alert />
        </Grid>
      </Grid>
    </>
  );
  return design;
}
export default Signup;
