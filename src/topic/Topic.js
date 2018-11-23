import React from 'react';

import {
  Card, CardTitle, CardText, Col, Row, Label, UncontrolledTooltip, CardBody
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from 'react-loading-skeleton';
// import AnswerCard from './AnswerCard';
import Answer from './Answer';
import './style.css';
import { beautyDate } from './DateUltils';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { getTopic, reportTopic, reportComment } from '../util/APIUtils';
import { Spin, Modal, Notification } from 'antd';

// const confirm = Modal.confirm;


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
      error: null,
      ModalReportText: 'คลิกที่ปุ่ม OK เพื่อแจ้งให้เจ้าหน้าที่รับทราบ',
      ModalReportVisible: false,
      isReportTopic: null,
      confirmLoading: false,
      reportCommentId: null,
    }
  }

  componentWillReceiveProps() {
    this.handleLoadData()
  }

  componentDidMount() {
    const smoothScroll = (h) => {
      let i = h || 0;
      if (i > 0) {
        setTimeout(() => {
          window.scrollTo(0, i);
          smoothScroll(i - 50);
        }, 10);
      }
    }

    smoothScroll((window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0));

    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.handleLoadData()
  }

  handleLoadData = () => {
    this.setState({
      isLoading: true
    });

    getTopic(this.props.match.params.id)
      .then(response => {
        this.setState({
          topic: response,
          isLoading: false
        });
      }).catch(error => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false
          });
        }
      });
  }

  confirmReportComment = (e) => {
    // console.log(e)
    this.setState({
      ModalReportVisible: true,
      isReportTopic: false,
      reportCommentId: e,
    });
  }

  confirmReportTopic = (e) => {
    this.setState({
      ModalReportVisible: true,
      isReportTopic: true,
    });
  }

  handleReportTopicOK = () => {
    this.setState({
      ModalReportText: 'กำลังดำเนินการ, กรุณารอสักครู่...',
      confirmLoading: true,
    });

    reportTopic(this.props.match.params.id)
      .then(response => {
        setTimeout(() => {

          this.setState({
            ModalReportVisible: false,
            confirmLoading: false,
            ModalReportText: 'คลิกที่ปุ่ม OK เพื่อแจ้งให้เจ้าหน้าที่รับทราบ',
          },
            Notification.success({
              message: 'Health QA',
              description: "แจ้งข้อความไม่เหมาะสมเรียบร้อย, เจ้าหน้าที่อาจจะใช้เวลา 1-2 วัน ในการตรวจสอบ",
            })
          );
        }, 1000);
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create Question.');
        } else {
          Notification.error({
            message: 'Health QA',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
        }
      });
  }

  handleReportCommentOK = () => {
    this.setState({
      ModalReportText: 'กำลังดำเนินการ, กรุณารอสักครู่...',
      confirmLoading: true,
    });

    reportComment(this.state.reportCommentId)
      .then(response => {
        setTimeout(() => {

          this.setState({
            ModalReportVisible: false,
            confirmLoading: false,
            ModalReportText: 'คลิกที่ปุ่ม OK เพื่อแจ้งให้เจ้าหน้าที่รับทราบ',
          },
            Notification.success({
              message: 'Health QA',
              description: "แจ้งข้อความไม่เหมาะสมเรียบร้อย, เจ้าหน้าที่อาจจะใช้เวลา 1-2 วัน ในการตรวจสอบ",
            })
          );
        }, 1000);
      })
      .catch(error => {
        if (error.status === 401) {
          this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create Question.');
        } else {
          Notification.error({
            message: 'Health QA',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
        }
      });
  }

  handleReportCancel = () => {
    // console.log('Clicked cancel button');
    this.setState({
      ModalReportVisible: false,
    });
  }

  render() {
    const { ModalReportVisible, confirmLoading, ModalReportText, isLoading } = this.state;

    if (this.state.notFound) {
      return <NotFound />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }

    const { topicName, topicText, height, weight, ageY, ageM, ageD, gender,
      disease, questionPurpose, questionType, name, answerCount, createDate } = this.state.topic;
    return (
      <div className="container" id="topicContainer">
        <Modal title="คุณต้องการแจ้งข้อความไม่เหมาะสมใช่หรือไม่ ?"
          visible={ModalReportVisible}
          centered
          onOk={this.state.isReportTopic ? this.handleReportTopicOK : this.handleReportCommentOK}
          confirmLoading={confirmLoading}
          onCancel={this.handleReportCancel}
        >
          <p>{ModalReportText}</p>
        </Modal>
        <Spin spinning={this.state.isLoading} size="large" delay={200}>
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
                  <div href="/" className="float-right" onClick={this.confirmReportTopic}> <FontAwesomeIcon icon="trash-alt" id="trash" /></div>
                  <UncontrolledTooltip placement="right" target="trash">แจ้งลบ</UncontrolledTooltip>

                </Col>
              </Row>

              <hr />

              <Row className="mt-1 ml-1 mb-2 mr-2 topic-text-body">
                <div className="topic-text">
                  {isLoading ? <Skeleton count={3} /> : topicText}
                </div>
              </Row>

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
                    <p className="avatar__second">{beautyDate(createDate)}</p>
                  </div>
                </div>
              </div>

            </Card>
          </Row>

          <div className="background-answer"><span><FontAwesomeIcon icon="comments" size="lg" /> ตอบคำถาม</span></div>
          <Answer isAuthenticated={this.props.isAuthenticated} currentUser={this.props.currentUser} {...this.props} />

          <div className="background"><span><FontAwesomeIcon icon="comments" size="lg" />  {answerCount} คำตอบ</span></div>
          <div>
            {
              this.state.topic.comments ? (
                this.state.topic.comments.map(
                  (comment, index) =>
                    <Row key={index}>
                      <Card body className={comment.userType === "USER" ? "ask__commentaries ask__commentaries--user ask__commentaries--type" : "ask__commentaries ask__commentaries--doctor ask__commentaries--type"}>

                        <div id="card-top-bar">
                          <div className="child">
                            <Row>
                              <Col md={10} xs={10} sm={10}>
                                <span className="ask__date">{beautyDate(comment.createDate)}</span>
                              </Col>
                              <Col md={2} xs={2} sm={2}>
                                <div className="float-right" key={comment.commentId} onClick={(e) => this.confirmReportComment(comment.commentId, "comment")}> <FontAwesomeIcon icon="trash-alt" id={"trash" + comment.commentId} /></div>
                                <UncontrolledTooltip placement="right" target={"trash" + comment.commentId}>แจ้งลบ</UncontrolledTooltip>
                              </Col>
                            </Row>

                            <div className="avatar">
                              <div className={comment.userType === "USER" ? "avatar__icon__user" : "avatar__icon__doctor"}></div>
                              <div className="avatar__name">
                                <p className="avatar__first">ตอบโดย</p>
                                <p className="avatar__second">{comment.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <Row className="mt-4 ml-2 mb-4">
                          <CardText className="answer-text">{comment.commentText}</CardText>
                        </Row>

                      </Card>
                    </Row>
                )
              ) : null
            }
          </div>
        </Spin>
      </div>
    );
  }
}