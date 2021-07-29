import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import { createJob } from "../actions/jobAction";

const styles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    // width: "1000px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h7">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          style={{ marginLeft: "55%" }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const intialObj = {
  title: null,
  description: null,
  location: null,
};

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  location: yup.string().required(),
});

const JobModal = ({ show, onHide }) => {
  const classes = styles();
  const [job, setJob] = useState(intialObj);
  const [validationErrorList, setValidationErrorList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!show) {
      setValidationErrorList([]);
    }
  }, [show]);

  const handleJob = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
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

    const isValid = await schema.isValid(job);

    if (isValid) {
      dispatch(createJob(job));
      onHide();
      setValidationErrorList([]);
    } else {
      try {
        await schema.validate(job, { abortEarly: false });
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
    <Dialog
      onClose={onHide}
      aria-labelledby="customized-dialog-title"
      open={show}
      //   width="100px"
    >
      <DialogTitle id="customized-dialog-title" onClose={onHide}>
        Enter the details of the Job
      </DialogTitle>
      <DialogContent dividers>
        {/* <form className={classes.form} onSubmit={onSubmit} validate> */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Job Title"
          name="title"
          autoFocus
          onChange={handleJob}
          onBlur={handleOnBlur(validationErrorList.indexOf("title"))}
          error={validationErrorList.indexOf("title") > -1 ? true : false}
          helperText={
            validationErrorList.indexOf("title") > -1 ? "Enter Title" : ""
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="description"
          label="Job Description"
          type="text"
          id="description"
          onChange={handleJob}
          multiline
          maxRows={5}
          onBlur={handleOnBlur(validationErrorList.indexOf("description"))}
          error={validationErrorList.indexOf("description") > -1 ? true : false}
          helperText={
            validationErrorList.indexOf("description") > -1
              ? "Enter description"
              : ""
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="location"
          label="Job Location"
          type="text"
          id="location"
          onChange={handleJob}
          onBlur={handleOnBlur(validationErrorList.indexOf("location"))}
          error={validationErrorList.indexOf("location") > -1 ? true : false}
          helperText={
            validationErrorList.indexOf("location") > -1 ? "Enter location" : ""
          }
        />
        {/* </form> */}
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="primary" onClick={onSubmit}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobModal;
