import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";
import axios from "axios";
import Loader from "./Loader";

const PieChart = () => {
  const [state, setState] = useState([]);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const url = "http://localhost:5000/users/pie";

  useEffect(() => {
    setTimeout(() => {
      axios(url, { cancelToken: source.token })
        .then((res) => setState(res.data))
        .catch((err) => {
          console.log(err);
        });
    }, 6000);
  }, []);

  const handleClick = () => {
    console.log("cancellation request");
    source.cancel("request cancelled");
  };
  return (
    <div
      className="row"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="col col-lg-9 col-md-9 col-sm-12">
        {!state.data ? (
          <Loader />
        ) : (
          <Chart
            // width={"500px"}
            // height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={state.data}
            options={{
              title: "Users",
              // Just add this option
              is3D: true,
            }}
            rootProps={{ "data-testid": "2" }}
          />
        )}
      </div>
      <div className="col col-lg-3 col-md-3 col-sm-12">
        <Link to="/">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Page 1
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PieChart;
