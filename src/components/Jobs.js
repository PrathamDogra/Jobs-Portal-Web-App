import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import Avatar from "@material-ui/core/Avatar";
import LocationOnIcon from "@material-ui/icons/LocationOnOutlined";
import { setShowJobDetails, setJobIdSelected } from "../actions/jobAction";
import JobModal from "./JobModal";

const useStyles = makeStyles({
  root: {
    width: 400,
    margin: "10px",
  },
  media: {
    height: 140,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    margin: "24px",
    alignItems: "center",
  },
  header: {
    display: "flex",
  },
  margin: {
    margin: "0 10px",
  },
  icon: {
    color: "black",
  },
});

const Jobs = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const jobs = useSelector((state) => state.jobReducer.jobs);
  const [jobArr, setJobArr] = useState(jobs);

  const dispatch = useDispatch();

  const openJobModal = () => {
    setOpenModal(true);
  };

  const closeJobModal = () => {
    setOpenModal(false);
  };
  const handleJobClick = (id) => {
    dispatch(setShowJobDetails(true));
    dispatch(setJobIdSelected(id));
  };
  useEffect(() => {
    if (jobs !== undefined) {
      setJobArr(jobs);
    }
  }, [jobs]);

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.margin}>
          <Typography variant="h6" gutterBottom>
            Jobs posted by you
          </Typography>
        </div>
        <div className={classes.margin}>
          <Button variant="contained" color="primary" onClick={openJobModal}>
            Post Job
          </Button>
        </div>
      </div>
      {jobArr.length ? (
        jobArr.map((job) => {
          return (
            <Card className={classes.root} key={job.id}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {job.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {job.description}
                  </Typography>
                  <div style={{ display: "flex", margin: "5px" }}>
                    <Avatar>
                      <LocationOnIcon className={classes.icon} />
                    </Avatar>
                    <div style={{ margin: "3px" }}>
                      <Typography gutterBottom variant="h5" component="h4">
                        {job.location}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleJobClick(job.id)}
                >
                  More Info
                </Button>
              </CardActions>
            </Card>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "space-between",
            marginTop: "10%",
          }}
        >
          <Avatar>
            <NotInterestedIcon />
          </Avatar>
          <div style={{ margin: "5px", fontWeight: "bold", fontSize: "16px" }}>
            {"Your posted jobs will show here!"}
          </div>
        </div>
      )}

      <JobModal show={openModal} onHide={closeJobModal} />
    </div>
  );
};

export default Jobs;
