import React, { useState } from "react";
import MoviesQueryList from "../movie/MovieListQuery";
import { Card, CardBody, Button } from "reactstrap";
import { FaSearch } from "react-icons/fa";

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
    <div>
        {!query ?
        <Card>
            <CardBody>
                <form onSubmit={handleSubmit}>
                <p>
                    <label>
                    <b>Search: </b>
                    <input
                    type="text"
                    name="query"
                    value={formData.query}
                    onChange={handleChange} />
                    </label>
                </p>
                <Button><FaSearch/></Button>
                </form>
            </CardBody>
        </Card>
        :
        <MoviesQueryList query={query} />
        }
    </div>
    );
}
// end

export default Search;
