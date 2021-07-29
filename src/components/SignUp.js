import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as yup from "yup";

import { registerUser } from "../actions/userAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialUser = {
  email: null,
  userRole: 0,
  password: null,
  confirmPassword: null,
  name: null,
  skills: null,
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  userRole: yup.number().required(),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  name: yup.string().required(),
  skills: yup.string().required(),
});

export default function SignUp() {
  const classes = useStyles();
  const [user, setUser] = useState(initialUser);
  const [validationErrorList, setValidationErrorList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  const handleUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnBlur = (key) => (event) => {
    event.preventDefault();
    const newValidationErrorList = validationErrorList.filter(
      (s, sidx) => sidx !== key
    );
    setValidationErrorList(newValidationErrorList);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const isValid = await schema.isValid(user);

    if (isValid) {
      dispatch(registerUser(user, history));
    } else {
      try {
        await schema.validate(user, { abortEarly: false });
      } catch (err) {
        if (err.inner) {
          let tempList = [];

          err.inner.forEach((element) => {
            tempList.push(element.path);
          });
          setValidationErrorList(tempList);
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleUser}
            onBlur={handleOnBlur(validationErrorList.indexOf("email"))}
            error={validationErrorList.indexOf("email") > -1 ? true : false}
            helperText={
              validationErrorList.indexOf("email") > -1 ? "Invalid Email" : ""
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleUser}
            onBlur={handleOnBlur(validationErrorList.indexOf("password"))}
            error={validationErrorList.indexOf("password") > -1 ? true : false}
            helperText={
              validationErrorList.indexOf("password") > -1
                ? "Password should be max of 6 characters"
                : ""
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={handleUser}
            onBlur={handleOnBlur(
              validationErrorList.indexOf("confirmPassword")
            )}
            error={
              validationErrorList.indexOf("confirmPassword") > -1 ? true : false
            }
            helperText={
              validationErrorList.indexOf("confirmPassword") > -1
                ? "Password must match"
                : ""
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            onChange={handleUser}
            onBlur={handleOnBlur(validationErrorList.indexOf("name"))}
            error={validationErrorList.indexOf("name") > -1 ? true : false}
            helperText={
              validationErrorList.indexOf("name") > -1 ? "Enter Name" : ""
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="skills"
            label="Skills"
            name="skills"
            multiline
            maxRows={5}
            onChange={handleUser}
            onBlur={handleOnBlur(validationErrorList.indexOf("skills"))}
            error={validationErrorList.indexOf("skills") > -1 ? true : false}
            helperText={
              validationErrorList.indexOf("skills") > -1 ? "Enter Skills" : ""
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
