import React from 'react';

import {
  Row, Col, Card, CardBody
} from 'reactstrap';
import SearchPanel from './SearchPanel';
import QuestionTabs from './QuestionTabs';

const Home = (props) => {
  
  return (
    // Show Div Full Page => container-fluid
    <div className="container mb-5">
      <Row>
        <Col xs="12"><SearchPanel /></Col>
      </Row>
      <Row>
        <Col xs="12" md="12">
          <Card outline color="info">
            <CardBody>
              <QuestionTabs />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;