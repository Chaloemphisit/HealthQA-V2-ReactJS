import React from 'react';

import {
  Card, CardTitle, Col, Row, Label, UncontrolledTooltip, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from 'react-loading-skeleton';
import AnswerCard from './AnswerCard';
import Answer from './Answer';
import { API_BASE_URL } from '../constants';
import { Notification } from 'antd';
import './style.css';

export default class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: {
        topicId: '',
        topicName: '',
        topicText: '',
        height: '',
        wieght: '',
        ageY: '',
        ageM: '',
        ageD: '',
        gender: '',
        disease: '',
        questionPurpose: '',
        questionType: '',
        username: '',
        answerCount: '',
        createDate: '',
        comments: []
      },
      isLoading: false,
      error: null
    }
  }


  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    fetch(API_BASE_URL + "/topic/" + this.props.match.params.id)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(topic => this.setState({ topic, isLoading: false }))
      .catch(error => {
        this.setState({ error, isLoading: false })
        Notification.error({
          message: 'Health QA',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      });
  }

  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return (
        <div style={{ textAlign: 'center', marginTop: '10%' }}>
          <h1>We're sorry, but {error.message || "Something went wrong. Please try again!"}</h1>
          <p>If you are the application owner check the logs for more information.</p>
        </div>
      );
    }

    const { topicId, topicName, topicText, height, weight, ageY, ageM, ageD, gender,
      disease, questionPurpose, questionType, name, answerCount, createDate } = this.state.topic;
    return (
      <div className="container" id="topicContainer">
        <Row>
          <Card body id="topicCard">
            <Row>
              <Col md={10} xs={10} sm={10}>
                <CardTitle style={{ fontSize: '1.6em' }}>{isLoading ? <Skeleton width="40%" /> : topicName}</CardTitle>
                {isLoading ? <Skeleton width="30%" /> : (
                  <Label className="ml-2"> <FontAwesomeIcon icon="question" />{" " + questionType}</Label>
                )}

              </Col>
              <Col md={2} xs={2} sm={2}>
                <Link to={"/spam/" + topicId} ><div href="/" className="float-right" id="trash"> <FontAwesomeIcon icon="trash-alt" /></div>
                  <UncontrolledTooltip placement="right" target="trash">แจ้งลบ</UncontrolledTooltip>
                </Link>
              </Col>
            </Row>

            <hr />

            <Row className="mt-1 ml-1 mb-2 mr-1 topic-text-body" style={{ color: '#000000' }}>{isLoading ? <Skeleton count={3} /> : topicText}</Row>

            <div className="mt-1 ml-1 mb-4 mr-1">
              <Card>
                <CardBody>
                  <Row className="rowMargin">
                    <Col lg={2} md={3} sm={12} xs={12}>
                      <div className="topic-text-header">วัตถุประสงค์</div>
                    </Col>
                    <Col lg={10} md={9} sm={12} xs={12}>
                      <div className="topic-text-body">{isLoading ? <Skeleton width="40%" /> : questionPurpose}</div>
                    </Col>
                  </Row>
                  <Row className="rowMargin">
                    <Col lg={2} md={3} sm={12} xs={12}>
                      <div className="topic-text-header">เพศ</div>
                    </Col>
                    <Col lg={10} md={9} sm={12} xs={12}>
                      <div className="topic-text-body">{isLoading ? <Skeleton width="40%" /> : gender}</div>
                    </Col>
                  </Row>
                  <Row className="rowMargin">
                    <Col lg={2} md={3} sm={12} xs={12}>
                      <div className="topic-text-header">น้ำหนัก</div>
                    </Col>
                    <Col lg={10} md={9} sm={12} xs={12}>
                      <div className="topic-text-body">{isLoading ? <Skeleton width="40%" /> : weight}</div>
                    </Col>
                  </Row>
                  <Row className="rowMargin">
                    <Col lg={2} md={3} sm={12} xs={12}>
                      <div className="topic-text-header">ส่วนสูง</div>
                    </Col>
                    <Col lg={10} md={9} sm={12} xs={12}>
                      <div className="topic-text-body">{isLoading ? <Skeleton width="40%" /> : height}</div>
                    </Col>
                  </Row>
                  <Row className="rowMargin">
                    <Col lg={2} md={3} sm={12} xs={12}>
                      <div className="topic-text-header">อายุ</div>
                    </Col>
                    <Col lg={10} md={9} sm={12} xs={12}>
                      <div className="topic-text-body">{isLoading ? <Skeleton width="40%" /> : (ageY > 0 ? ageY + " ปี " : '') + (ageM > 0 ? ageM + " เดือน " : '' + (ageD > 0 ? ageD + " วัน " : '') + " (นับจากวันที่ถาม)")}</div>
                    </Col>
                  </Row>
                  <Row className="rowMargin">
                    <Col lg={2} md={3} sm={12} xs={12}>
                      <div className="topic-text-header">โรคประจำตัว</div>
                    </Col>
                    <Col lg={10} md={9} sm={12} xs={12}>
                      <div className="topic-text-body">{isLoading ? <Skeleton width="40%" /> : disease}</div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

            <hr />

            <div className="child">
              <div className="avatar">
                <div className="avatar__icon__user"></div>
                <div className="avatar__name">
                  {/* <p className="avatar__first">ถามโดย</p> */}
                  <p className="avatar__first">{name}</p>
                  <p className="avatar__second">{createDate}</p>
                </div>
              </div>
            </div>

          </Card>
        </Row>

        <div className="background-answer"><span><FontAwesomeIcon icon="comments" size="lg" /> ตอบคำถาม</span></div>
        <Answer isAuthenticated={this.props.isAuthenticated} currentUser={this.props.currentUser} />

        <div className="background"><span><FontAwesomeIcon icon="comments" size="lg" />  {answerCount} คำตอบ</span></div>
        <div>
          <AnswerCard comments={this.state.topic.comments} />
        </div>
      </div>
    );
  }
}