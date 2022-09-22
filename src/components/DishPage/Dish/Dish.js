import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Dish({
  dish,
  handleRank1Click,
  handleRank2Click,
  handleRank3Click,
  isDishDisabled,
}) {
  const { dishName, description, image, id } = dish;

  const rank1Click = (e) => {
    handleRank1Click(id);
  };

  const rank2Click = (e) => {
    handleRank2Click(id);
  };

  const rank3Click = (e) => {
    handleRank3Click(id);
  };

  const isDisabled = (text) => {
    return isDishDisabled(id, text);
  };
  return (
    <Card style={{ width: "18rem" }} id={id}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{dishName}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {isDisabled("rank1") ? (
          ""
        ) : (
          <Button variant="success" onClick={rank1Click}>
            Rank 1
          </Button>
        )}
        {isDisabled("rank2") ? (
          ""
        ) : (
          <Button variant="warning" onClick={rank2Click}>
            Rank 2
          </Button>
        )}
        {isDisabled("rank3") ? (
          ""
        ) : (
          <Button variant="danger" onClick={rank3Click}>
            Rank 3
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Dish;
