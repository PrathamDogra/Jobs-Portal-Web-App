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
import * as yup from "yup";

import { changePassword } from "../actions/resetPasswordAction";

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

const initialObj = {
  password: null,
  confirmPassword: null,
  token: null,
};

const schema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
  token: yup.string().required(),
});

export default function ResetPassword() {
  const classes = useStyles();
  const [obj, setObj] = useState(initialObj);
  const [validationErrorList, setValidationErrorList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const resetToken = useSelector(
    (state) => state.resetPasswordReducer.resetToken
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
    if (resetToken != null) {
      setObj({ ...obj, token: resetToken });
    }
  }, [isAuthenticated, resetToken]);

  const handleChange = (event) => {
    setObj({
      ...obj,
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

    const isValid = await schema.isValid(obj);

    if (isValid) {
      dispatch(changePassword(obj, history));
      setObj(initialObj);
    } else {
      try {
        await schema.validate(obj, { abortEarly: false });
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
      <Card className={classes.root}>
        <CardContent>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Reset Your Password
            </Typography>
            <br />
            <Typography variant="body3" gutterBottom>
              Enter your new password below.
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="New password"
                name="password"
                autoFocus
                onChange={handleChange}
                value={obj.password}
                onBlur={handleOnBlur(validationErrorList.indexOf("password"))}
                error={
                  validationErrorList.indexOf("password") > -1 ? true : false
                }
                helperText={
                  validationErrorList.indexOf("password") > -1
                    ? "Enter Password"
                    : ""
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="confirmPassword"
                label="Confirm new password"
                name="confirmPassword"
                onChange={handleChange}
                value={obj.confirmPassword}
                onBlur={handleOnBlur(
                  validationErrorList.indexOf("confirmPassword")
                )}
                error={
                  validationErrorList.indexOf("confirmPassword") > -1
                    ? true
                    : false
                }
                helperText={
                  validationErrorList.indexOf("confirmPassword") > -1
                    ? "Enter Password"
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
                Reset
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
