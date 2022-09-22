import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/Login/action";
import { useDispatch, useSelector } from "react-redux";
import {
  errorMessageSelector,
  hasErrorSelector,
  isLoginSelector,
} from "../store/Login/selector";
import { Button, Card, Form } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = useSelector(isLoginSelector);
  const hasError = useSelector(hasErrorSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/dishpoll");
    }
  }, [navigate, isLogin]);

  const handleUserNameChange = ({ target: { value } }) => {
    setUserName(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(userName, password));
  };

  return (
    <>
      <Card style={{ width: "18rem", margin: "auto" }}>
        <Card.Body>
          <Card.Title>LOGIN</Card.Title>
          <Card.Text>
            <Form onSubmit={loginHandler}>
              <Form.Group className="mb-3" controlId="logindetails">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  onChange={handleUserNameChange}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
                {hasError && (
                  <Form.Text className="text-primary">{errorMessage}</Form.Text>
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
