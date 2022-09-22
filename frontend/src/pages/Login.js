import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Button } from "reactstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function Login({ login }) {
  const [formData, setFormData] = useState({
    username : '',
    password : ''
  });
  const history = useHistory();

  function handleChange (evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
    history.push("/");
  }

  return (
      <Card>
        <CardBody className="center">
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
              <InputGroup.Text id="username-label">Username</InputGroup.Text>
                <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="username-label"
                value={formData.username}
                onChange={handleChange} />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="pass-label">Password</InputGroup.Text>
                <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="pass-label"
                value={formData.password}
                onChange={handleChange} />
              </InputGroup>

              <Button>Login</Button>
            </Form>
          </CardBody>
        </Card>
    );
}

export default Login;
