import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const SearchPanel = (props) => {
  return (
    <div>
      <Jumbotron fluid className="align-items-center">
        <Container fluid>
          <div >
            <fieldset className="field-container">
              <input type="text" placeholder="อาการแบบนี้ถือเป็น bipolar หรือไม่..." className="field" />
              <div className="icons-container">
                <div className="icon-search"></div>
                <div className="icon-close">
                  <div className="x-up"></div>
                  <div className="x-down"></div>
                </div>
              </div>
            </fieldset>
          </div>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default SearchPanel;

