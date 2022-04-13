import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "./Card";

const TileView = ({ data }) => {
  return (
    <Row>
      {data.map((d) => (
        <Col lg={4}>
          <Card d={d} />
        </Col>
      ))}
    </Row>
  );
};

export default TileView;
