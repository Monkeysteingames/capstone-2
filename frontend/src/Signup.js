import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Button } from "reactstrap";
import "./App.css";


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
    <section>
      <Card>
        <CardBody>
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                <b>Username: </b>
                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange} />
                </label>
              </p>

              <p>
                <label>
                <b>Password: </b>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange} />
                </label>
              </p>

              <p>
                <label>
                <b>First name: </b>
                <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange} />
                </label>
              </p>

              <p>
                <label>
                <b>Last name: </b>
                <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange} />
                </label>
              </p>

              <p>
                <label>
                <b>Email: </b>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange} />
                </label>
              </p>

              <Button>Sign up</Button>
            </form>
          </CardBody>
        </Card>
      </section>
    );
}
// end

export default Signup;
