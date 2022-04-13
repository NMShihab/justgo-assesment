import React from "react";
import "../css/Card.css";

const Card = ({ d }) => {
  return (
    <div className="d-flex m-3  shadow-lg p-3 mb-5 bg-white rounded">
      <div className="tile-image">
        <img src={d.picture.medium} alt={d.login.uuid} />
      </div>

      <div className="ml-2">
        <p>
          <span className="large-font">
            {d?.name?.last}, {d?.name?.first}
          </span>
          <br />
          <span className="medium-font">{d?.email}</span> <br />
          <i class="fa fa-user" aria-hidden="true"></i>
          <span className="small-font"> {d.login.username}</span>
          <br />
          <i class="fa fa-address-card"></i>
          <span className="small-font"> {d.registered.date}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
