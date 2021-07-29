import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as yup from "yup";

import { loginUser } from "../actions/userAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const initialUser = {
  email: null,
  password: null,
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required("Password is required").min(6),
});

const Login = () => {
  const classes = useStyles();
  const [user, setUser] = useState(initialUser);
  const [validationErrorList, setValidationErrorList] = useState([]);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const dispatch = useDispatch();
  const history = useHistory();

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = await schema.isValid(user);

    if (isValid) {
      dispatch(loginUser(user));
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
          Sign in
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
            autoComplete="current-password"
            onChange={handleUser}
            onBlur={handleOnBlur(validationErrorList.indexOf("password"))}
            error={validationErrorList.indexOf("password") > -1 ? true : false}
            helperText={
              validationErrorList.indexOf("password") > -1
                ? "Invalid Password"
                : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forget">Forgot password?</Link>
            </Grid>
            <Grid item>
              {"Don't have an account? "}
              <Link to="/signup">{"Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
