import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Button } from "reactstrap";


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

              <Button>Login</Button>
            </form>
          </CardBody>
        </Card>
      </section>
    );
}
// end

export default Login;
