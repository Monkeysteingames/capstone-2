import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Button } from "reactstrap";
import UserContext from "../context/UserContext";
import MovieCheckApi from '../api/movieCheckApi';


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
    <section>
      <Card>
        <CardBody>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username</label>
                <p className="form-control-plaintext">{formData.username}</p>
              </div>

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

              <p>
                <label>
                <b>Type in password to confirm changes: </b>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange} />
                </label>
              </p>

              <Button>Update</Button>
            </form>
          </CardBody>
        </Card>
      </section>
    );
}
// end

export default Profile;
