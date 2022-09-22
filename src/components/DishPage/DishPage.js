import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../../store/Dishes/action";
import { allDishesStateSelector } from "../../store/Dishes/selector";
import { logout } from "../../store/Login/action";
import Dish from "./Dish/Dish";
import { Button, Container, Nav, Navbar, Row } from "react-bootstrap";
import { userDetailStateSelector } from "../../store/Login/selector";
import { useNavigate } from "react-router-dom";

function DishPage() {
  const dispatch = useDispatch();
  const allDishes = useSelector(allDishesStateSelector);
  const userDetail = useSelector(userDetailStateSelector);
  const navigate = useNavigate();

  const [rank1, setRank1] = useState(null);
  const [rank2, setRank2] = useState(null);
  const [rank3, setRank3] = useState(null);

  const isButtonDisabled = (id, rank) => {
    if (rank === "rank1" && rank1 === id) {
      return false;
    } else if (rank1 === id && rank !== "rank1") {
      return true;
    }
    if (rank === "rank2" && rank2 === id) {
      return false;
    } else if (rank2 === id && rank !== "rank2") {
      return true;
    }
    if (rank === "rank3" && rank3 === id) {
      return false;
    } else if (rank3 === id && rank !== "rank3") {
      return true;
    }
    if (rank === "rank1" && !rank1) {
      return false;
    }
    if (rank === "rank2" && !rank2) {
      return false;
    }
    if (rank === "rank3" && !rank3) {
      return false;
    }
    return true;
  };

  const handleRank1Click = (id) => {
    if (rank1 === null) {
      setRank1(id);
    } else {
      setRank1(null);
    }
  };

  const handleRank2Click = (id) => {
    if (rank2 === null) {
      setRank2(id);
    } else {
      setRank2(null);
    }
  };

  const handleRank3Click = (id) => {
    if (rank3 === null) {
      setRank3(id);
    } else {
      setRank3(null);
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getDishes());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (userDetail) {
      let dishPoll = JSON.parse(localStorage.getItem("dishPoll")) || {};
      if (dishPoll[`${userDetail?.id}`]) {
        setRank1(dishPoll[`${userDetail.id}`][1]);
        setRank2(dishPoll[`${userDetail.id}`][2]);
        setRank3(dishPoll[`${userDetail.id}`][3]);
      }
    } else {
      navigate("/");
    }
  }, [navigate, userDetail]);

  useEffect(() => {
    console.log(rank1, rank2, rank3);
    let dishPoll = JSON.parse(localStorage.getItem("dishPoll")) || {};
    if (userDetail && (rank1 || rank2 || rank3)) {
      dishPoll[`${userDetail.id}`] = {
        ...dishPoll[`${userDetail.id}`],
        1: rank1,
        2: rank2,
        3: rank3,
      };
      localStorage.setItem("dishPoll", JSON.stringify(dishPoll));
    }
  }, [rank1, rank2, rank3, userDetail]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate(-1);
  };
  return (
    <>
      <Navbar bg="secondary" variant="secondary">
        <Container>
          <Navbar className="me-auto">
            <Nav.Link href="/result">Result</Nav.Link>
          </Navbar>
          <Button onClick={logoutHandler}>Logout</Button>
        </Container>
      </Navbar>
      <Row xs={12} md={2} lg={4} className="justify-content-center">
        {allDishes?.map((dish) => (
          <Dish
            dish={dish}
            handleRank1Click={handleRank1Click}
            handleRank2Click={handleRank2Click}
            handleRank3Click={handleRank3Click}
            isDishDisabled={isButtonDisabled}
          ></Dish>
        ))}
      </Row>
    </>
  );
}

export default DishPage;
