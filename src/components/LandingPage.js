import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";

import image from "../assets/LandingImg.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textTransform: "none",
  },
  img: {
    height: "auto",
    width: "100%",
  },

  headText: {
    position: "relative",
  },
  textOnImage: {
    position: "absolute",
    left: "5%",
    bottom: "60%",
    fontSize: "32px",
    color: "white",
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  const ToLogin = (props) => <Link to="/login" {...props} />;

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: "#303F60" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              MyJobs
            </Typography>
            <Button
              color="inherit"
              className={classes.button}
              component={ToLogin}
            >
              Login / SignUp
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.headText}>
        <div className={classes.img}>
          <img src={image} className={classes.img} alt="My Jobs portal" />
        </div>
        <div className={classes.textOnImage}>
          <h2> Welcome to MyJobs </h2>
          <h5 style={{ color: "#1A253C" }}> Login/SignUp to Get started</h5>
        </div>
      </div>
    </>
  );
}
