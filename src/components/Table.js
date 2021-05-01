import React, { useState, useEffect } from "react";
import axios from "axios";
import delay from "delay";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const Table = () => {
  const [state, setState] = useState([]);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const url = "http://localhost:5000/users/table";

  useEffect(() => {
    const fetchData = async () => {
      await delay(6000);
      const { data } = await axios.get(url, {
        cancelToken: source.token,
      });
      setState({ data: data, loader: false });
    };
    fetchData();
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
        textAlign: "center",
      }}
    >
      <div className="col col-lg-8 col-md-8 col-sm-12">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Website</th>
            </tr>
          </thead>
          <tbody>
            {!state.data ? (
              <Loader />
            ) : (
              state.data.map((user, index) => {
                return (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td className="list">{user.name}</td>
                    <td className="list">{user.phone}</td>
                    <td className="list">{user.website}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="col col-lg-3 col-md-3 col-sm-12">
        <Link to="/page2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Page 2
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Table;
