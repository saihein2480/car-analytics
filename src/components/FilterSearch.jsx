import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const FilterSearch = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onFilter(query);
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="success" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterSearch;
