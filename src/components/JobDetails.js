import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import {
  setShowJobDetails,
  getJob,
  getAllCandidates,
} from "../actions/jobAction";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },

  card: {
    minWidth: 500,
    marginTop: theme.spacing(8),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  button: {
    margin: "10px",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: "48px",
  },
}));

function JobDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const jobId = useSelector((state) => state.jobReducer.jobId);
  const jobDetails = useSelector((state) => state.jobReducer.jobDetails);
  const candidates = useSelector((state) => state.jobReducer.candidates);
  const [appliedList, setAppliedList] = useState([]);

  const handleBack = () => {
    dispatch(setShowJobDetails(false));
  };

  useEffect(() => {
    if (jobId) {
      dispatch(getJob(jobId));
      dispatch(getAllCandidates(jobId));
      setAppliedList([]);
    }

    if (candidates !== undefined) {
      setAppliedList(candidates);
    }
  }, [jobId, candidates]);

  return (
    <>
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">
          <Card className={classes.card}>
            <CardContent>
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  {jobDetails.title}
                </Typography>
                <br />
                <Typography variant="body3" gutterBottom>
                  {jobDetails.description}
                </Typography>
                {/* <Typography variant="button" display="block" gutterBottom>
                  {jobDetails.location}
                </Typography> */}
                <div style={{ display: "flex", margin: "5px" }}>
                  <Avatar>
                    <LocationOnOutlinedIcon />
                  </Avatar>
                  <div style={{ margin: "3px" }}>
                    <Typography gutterBottom variant="h5" component="h4">
                      {jobDetails.location}
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
        <div className={classes.list}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AnnouncementIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="APPLICANTS FOR THIS JOB" />
            </ListItem>
          </List>
          {appliedList.length ? (
            appliedList.map((candidate) => {
              return (
                <List key={candidate.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${candidate.name} ( ${candidate.email})`}
                      secondary={`Skills: ${candidate.skills} `}
                      className={classes.primary}
                    />
                  </ListItem>
                </List>
              );
            })
          ) : (
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="No applications available!" />
              </ListItem>
            </List>
          )}
        </div>

        <div className={classes.button}>
          <Button variant="contained" color="primary" onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    </>
  );
}

export default JobDetails;
