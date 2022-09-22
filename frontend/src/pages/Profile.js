import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Button, CardTitle } from "reactstrap";
import UserContext from "../context/UserContext";
import MovieCheckApi from '../api/movieCheckApi';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username : currentUser.username,
    password : '',
    firstName : currentUser.firstName,
    lastName : currentUser.lastName,
    email : currentUser.email
  });
  const history = useHistory();

  function handleChange (evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  // the API patch request can only take: { password, firstName, lastName, email } 
  // we need the username to add to the params to tell the DB which user we're updating/patching

  async function handleSubmit(evt) {
    evt.preventDefault();

    let updateData = {
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
    let updatedUser;

    try { 
      const username = formData.username;
      updatedUser = await MovieCheckApi.updateUser(username, updateData);
    } catch (e) {
      console.error(e);
    };

    setCurrentUser(updatedUser);
    history.push("/");
  };

  return (
      <Card>
        <CardBody>
            <CardTitle>{formData.username}</CardTitle>
              <Form onSubmit={handleSubmit}>
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

                <InputGroup className="mb-3">
                <InputGroup.Text id="password">Confirm password</InputGroup.Text>
                    <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="password"
                    value={formData.password}
                    onChange={handleChange} />
                  </InputGroup>
              <Button type="submit">Update</Button>
            </Form>
          </CardBody>
        </Card>
    );
}
// end

export default Profile;
