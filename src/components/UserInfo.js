import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import TableContainer from "./TableContainer";
import Pagination from "./Pagination";
import axios from "axios";
import TileView from "./TileView";
import "../css/UserInfo.css";

const UserInfo = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const [gender, setGender] = useState("all");
  const [searchKey, setSearchKey] = useState("");
  const [isTileView, setIsTileView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const headers = {
        dataType: "json",
      };
      const res = await axios.get(
        "https://randomuser.me/api/?results=50",
        headers
      );

      const { data } = res;
      setLoading(false);

      setUserData(data.results);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = (gender, userData, searchKey) => {
    var data = userData;
    if (gender !== "all") data = data.filter((d) => d.gender === gender);

    if (searchKey.length > 0) {
      data = data.filter(
        (d) =>
          d.email.includes(searchKey) ||
          d.name.first.includes(searchKey) ||
          d.name.last.includes(searchKey) ||
          d.login.username.includes(searchKey)
      );
    }
    return data;
  };

  const dataUser = filterData(gender, userData, searchKey);

  const indexLastUser = currentPage * userPerPage;
  const indexFirstUser = indexLastUser - userPerPage;
  const currentUserData = dataUser.slice(indexFirstUser, indexLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const genderHandler = (e) => {
    setGender(e.target.value);
  };

  return (
    <Container className="main-container">
      {" "}
      <h2 className="mb-3 mt-3">UserInfo</h2>
      <Row className="justify-content-between mb-3">
        <Col>
          <div className="search-area">
            <i className="fa fa-search"></i>
            <input
              placeholder="Search.."
              onChange={(e) => {
                e.preventDefault();
                setSearchKey(e.target.value);
              }}
            ></input>
          </div>
        </Col>
        <Col className="d-flex">
          <p className="px-3">Filter By:</p>
          <div className="d-flex justify-content-between">
            <div className="px-1">
              <input
                type="radio"
                value="all"
                name="gender"
                id="all"
                onChange={genderHandler}
                defaultChecked={gender === "all"}
              />
              <label className="px-1">All</label>

              <input
                type="radio"
                value="male"
                name="gender"
                id="male"
                onChange={genderHandler}
                defaultChecked={gender === "male"}
              />
              <label className="px-1">Male</label>

              <input
                type="radio"
                value="female"
                name="gender"
                id="female"
                onChange={genderHandler}
                defaultChecked={gender === "female"}
              />
              <label className="px-1">Female</label>
            </div>
          </div>
        </Col>
        <Col>
          <Form className="d-flex justify-content-end">
            <label className="px-2">Tile View</label>
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => setIsTileView(e.target.checked)}
            />
          </Form>
        </Col>
      </Row>
      {loading ? (
        error ? (
          <div className="bg-danger text-center">
            <h1>Somethong Wrong....</h1>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border text-secondary text-center"
              role="status"
              style={{ width: "3rem", height: " 3rem" }}
            >
              <span className="sr-only text-center">Loading...</span>
            </div>
          </div>
        )
      ) : (
        <>
          {isTileView ? (
            <TileView data={currentUserData} />
          ) : (
            <TableContainer data={currentUserData} />
          )}
          <Pagination
            userPerPage={userPerPage}
            totalUsers={dataUser.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </Container>
  );
};

export default UserInfo;
