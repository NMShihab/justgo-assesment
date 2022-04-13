import React from "react";
import { Table } from "react-bootstrap";
import "../css/TableContainer.css";

const TableContainer = ({ data }) => {
  return (
    <Table className="table-bordered">
      <thead className="">
        <tr className="table-head">
          <th>Name</th>
          <th>Registration</th>
          <th>Username</th>
        </tr>
      </thead>

      <tbody>
        {data.map((d) => (
          <tr key={d.login.uuid}>
            <td>
              <div className="img-name-container">
                <img src={d.picture.thumbnail} alt={d.name.first} />
                <div className="name-email-container">
                  <p>
                    <span className="large-font">
                      {d?.name?.last}, {d?.name?.first}
                    </span>{" "}
                    <br />
                    {d?.email}
                  </p>
                </div>
              </div>
            </td>
            <td>{d.registered.date}</td>
            <td>{d.login.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableContainer;
