import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { getResetPasswordToken } from "../actions/resetPasswordAction";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    marginTop: theme.spacing(8),
  },
  paper: {
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

export default function ForgetPassword() {
  const [error, setError] = useState(false);
  const classes = useStyles();
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const invalidEmail = useSelector(
    (state) => state.resetPasswordReducer.invalidEmail
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
    if (invalidEmail) {
      setError(invalidEmail);
    }
  }, [isAuthenticated, invalidEmail]);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(getResetPasswordToken(email, history));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.root}>
        <CardContent>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Forgot your password?
            </Typography>
            <br />
            <Typography variant="body3" gutterBottom>
              Enter the email associated with your account and we’ll send you
              instructions to reset your password.
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmail}
                error={error ? true : false}
                helperText={error ? "Invalid Email" : null}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
