import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../store/Dishes/action";
import { allDishesStateSelector } from "../store/Dishes/selector";

function Result() {
  const [score, setScore] = useState(new Map());
  const [data, setData] = useState([]);
  const rank1Score = 30;
  const rank2Score = 20;
  const rank3Score = 10;
  const allDishes = useSelector(allDishesStateSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = () => {
      const res = JSON.parse(localStorage.getItem("dishPoll"));
      const scoreMap = new Map();
      for (const [_, value] of Object.entries(res)) {
        if (value[1] !== null) {
          scoreMap.set(value[1], (scoreMap.get(value[1]) || 0) + rank1Score);
        }
        if (value[2] !== null) {
          scoreMap.set(value[2], (scoreMap.get(value[2]) || 0) + rank2Score);
        }
        if (value[3] !== null) {
          scoreMap.set(value[3], (scoreMap.get(value[3]) || 0) + rank3Score);
        }
      }

      setScore(scoreMap);
    };

    loadData();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(getDishes());
    })();
  }, [dispatch]);
  useEffect(() => {
    let result = allDishes?.map((dish) => {
      if (score.has(dish?.id)) {
        return { ...dish, point: score.get(dish?.id) };
      } else {
        const temp = { ...dish, point: 0 };
        return temp;
      }
    });
    result?.sort((a, b) => b.point - a.point);
    setData(result);
  }, [score, allDishes]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Navbar bg="secondary" variant="primart">
        <Container>
          <Navbar className="me-auto">
            <Nav.Link href="/dishpoll">Dishes</Nav.Link>
          </Navbar>
        </Container>
      </Navbar>
      <Table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>name</td>
            <td>point</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.dishName}</td>
                <td>{data.point}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Result;
