import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Button } from "reactstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function Signup({ signup }) {
  const [formData, setFormData] = useState({
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    email : ''
  });
  const history = useHistory();

  function handleChange (evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  // API register post request requires: { username, password, firstName, lastName, email }

  function handleSubmit(evt) {
    evt.preventDefault();
    signup(formData);
    history.push('/');
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

            <InputGroup className="mb-3">
              <InputGroup.Text id="first-name-label">First Name</InputGroup.Text>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                aria-label="First Name"
                aria-describedby="first-name-label"
                value={formData.firstName}
                onChange={handleChange} />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="last-name-label">Last Name</InputGroup.Text>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                aria-label="Last Name"
                aria-describedby="last-name-label"
                value={formData.lastName}
                onChange={handleChange} />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="email-label">Email</InputGroup.Text>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="email-label"
                value={formData.email}
                onChange={handleChange} />
            </InputGroup>

            <Button>Sign Up</Button>
          </Form>
        </CardBody>
      </Card>
    );
}

export default Signup;
