import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Jobs from "./Jobs";
import JobDetails from "./JobDetails";
import { getJobsList } from "../actions/jobAction";

function Dashboard() {
  const showJobDetails = useSelector(
    (state) => state.jobReducer.showJobDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobsList());
  });
  return (
    <div>
      <Navbar />
      {showJobDetails ? <JobDetails /> : <Jobs />}
    </div>
  );
}

export default Dashboard;
