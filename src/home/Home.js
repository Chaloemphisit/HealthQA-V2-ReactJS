import React from 'react';

import { Card, CardBody, Container, Jumbotron, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge, Label } from 'reactstrap';
import QuestionTabs from './QuestionTabs';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css'
import { search } from '../util/APIUtils';
import { Spin } from 'antd';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      q: '',
      searchResult: [],
      isLoading: false,
      error: null,
      isFirstLoading: false,

    }

    this.timer = null;

  }

  handleSearch = () => {
    // console.log("Test")
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const inputName = target.name;
  //   const inputValue = target.value;
  //   // console.log(inputName)
  //   this.setState({
  //     [inputName]: inputValue
  //   }, console.log(this.state));
  // }


  handleInputChange(event) {
    const target = event.target;
    const inputValue = target.value;

    clearTimeout(this.timer);
    this.timer = setTimeout(this.handlesearch(inputValue), 5000)
  }

  handlesearch(event) {
    // const target = event.target;
    // const inputValue = target.value;

    this.setState({
      q: event,
      isLoading: true,
    })

    search(event)
      .then(response => {
        console.log(response)
        this.setState({
          searchResult: response,
          isLoading: false
        });
      }).catch(error => {
        if (error.status === 404) {
          this.setState({
            error: true,
            isLoading: false
          });
        } else {
          this.setState({
            error: true,
            isLoading: false
          });
        }
      });

  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>We're sorry, but {error.message || "Something went wrong. Please try again!"}</h1>
          <p>If you are the application owner check the logs for more information.</p>
        </div>
      );
    }
    return (
      // Show Div Full Page => container-fluid
      <div className="container-fluid mb-5">
        <Jumbotron fluid className="align-items-center">
          <Container fluid>
            <div >
              <fieldset className="field-container">
                <input type="text" name="q" onChange={(event) => this.handleInputChange(event)} placeholder="อาการแบบนี้ถือเป็น bipolar หรือไม่..." className="field" />
                <div className="icons-container">
                  <div className="icon-search" onClick={this.handleSearch} ></div>
                </div>
              </fieldset>
            </div>
          </Container>
        </Jumbotron>

        <Card outline color="info">
          <CardBody>
            <Spin spinning={this.state.isLoading} size="large">
              {
                this.state.q ? (

                  <div className="mt-3">
                    {
                      this.state.searchResult.map(
                        (result, index) =>
                          < ListGroup key={index}>
                            <ListGroupItem>
                              <ListGroupItemHeading ><Link to={"/topic/" + result.topicId} className="question-header">{result.topicName}</Link><Badge style={{ marginLeft: '2%' }} pill> ตอบแล้ว {result.answerCount}</Badge></ListGroupItemHeading>
                              <Label style={{ color: '#6C757D' }}> <FontAwesomeIcon icon="question" size="sm" />{"" + result.questionType}</Label>
                              <ListGroupItemText>
                                <Link to={"/topic/" + result.topicId} className="question-body">
                                  {result.topicText}
                                </Link>
                              </ListGroupItemText>
                            </ListGroupItem>
                          </ListGroup >
                      )
                    }
                  </div>
                ) : <QuestionTabs />
              }
            </Spin>
          </CardBody>
        </Card>
      </div >
    );
  }
}
export default Home;