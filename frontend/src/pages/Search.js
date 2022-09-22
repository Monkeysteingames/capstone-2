import React, { useState } from "react";
import MoviesQueryList from "../movie/MovieListQuery";
import { Card, CardBody, Button,  } from "reactstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FaSearch } from "react-icons/fa";
import "./Pages.css";

function Search() {
  const [formData, setFormData] = useState({
    query : ''
  });
  const [query, setQuery] = useState(null);

  function handleChange (evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setQuery(formData.query);
  }

  return (
    <div className="queried-movies">
      {!query ?
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="search"><FaSearch/>Search </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="query"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search"
                  value={formData.query}
                  onChange={handleChange} />
                </InputGroup>
              <Button type="submit">Update</Button>
            </Form>
         </CardBody>
        </Card>
        :
        <MoviesQueryList query={query} />
      }
    </div>
  );
}

export default Search;
