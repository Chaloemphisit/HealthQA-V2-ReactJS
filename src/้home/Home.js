import React from 'react';

import { Card, CardBody, Container, Jumbotron } from 'reactstrap';
import QuestionTabs from './QuestionTabs';
import './style.css'

// import { Input } from 'antd';

// const Search = Input.Search;

const Home = (props) => {

  return (
    // Show Div Full Page => container-fluid
    <div className="container-fluid mb-5">
      <Jumbotron fluid className="align-items-center">
        <Container fluid>
          <div >
            <fieldset className="field-container">
              <input type="text" placeholder="อาการแบบนี้ถือเป็น bipolar หรือไม่..." className="field" />
              <div className="icons-container">
                <div className="icon-search"></div>
              </div>
            </fieldset>
          </div>
        </Container>
      </Jumbotron>

      <Card outline color="info">
        <CardBody>
          <QuestionTabs />
        </CardBody>
      </Card>
    </div >
  );
}

export default Home;