import React from 'react';
import { Tabs } from "@yazanaabed/react-tabs";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import QuestionsListLoading from '../common/QuestionsListLoading';
import { Notification } from 'antd';
import { API_BASE_URL } from '../constants';


class QuestionTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            topics: {
                allTopics: [],
                answeredTopics: [],
                noAnswerTopic: []
            },
            isLoading: false,
            error: null
        }
    }

    handleSelect(e) {
        console.log('Selected tab: ' + e.Tabs.activeTab);
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.all([
            axios.get(API_BASE_URL + '/topic/all'),
            axios.get(API_BASE_URL + '/topic/ans'),
            axios.get(API_BASE_URL + '/topic/noAns')
        ])
            .then(axios.spread((allTopicsRes, ansTopicsRes, noAnsTopicRes) => {
                this.setState({
                    topics: {
                        allTopics: allTopicsRes.data,
                        answeredTopics: ansTopicsRes.data,
                        noAnswerTopic: noAnsTopicRes.data
                    },
                    isLoading: false
                })
            }))
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
                <div style={{ textAlign: 'center' }}>
                    <h1>We're sorry, but {error.message || "Something went wrong. Please try again!"}</h1>
                    <p>If you are the application owner check the logs for more information.</p>
                </div>
            );
        }

        if (isLoading) {
            return (
                <div>
                    <Tabs activeTab={{ id: "tab1" }}>
                        <Tabs.Tab id="tab1" title="คำถามทั้งหมด" ><div className="mt-3" > <QuestionsListLoading /></div> </Tabs.Tab>
                        <Tabs.Tab id="tab2" title="คำถามที่ตอบแล้ว"><div className="mt-3"> <QuestionsListLoading /></div> </Tabs.Tab>
                        <Tabs.Tab id="tab3" title="คำถามที่ยังไม่ได้ตอบ"> <div className="mt-3"><QuestionsListLoading /></div></Tabs.Tab>
                    </Tabs>
                </div>
            );
        }
        return (

            <div>
                <Tabs
                    activeTab={{
                        id: 'tab1'
                    }}

                >
                    <React.Fragment>
                        <Tabs.Tab id="tab1" title="คำถามทั้งหมด" >
                            <div className="mt-3" >
                                {
                                    this.state.topics.allTopics.map(
                                        (question, index) =>
                                            < ListGroup key={index} >
                                                <ListGroupItem>
                                                    <ListGroupItemHeading ><Link to={"/topic/" + question.topicId} className="question-header">{question.topicName}</Link><Badge style={{ marginLeft: '2%' }} pill> ตอบแล้ว {question.answerCount}</Badge></ListGroupItemHeading>
                                                    <Label style={{ color: '#6C757D' }}> <FontAwesomeIcon icon="question" size="sm" />{"" + question.questionType}</Label>
                                                    <ListGroupItemText>
                                                        <Link to={"topic/" + question.topicId} className="question-body">
                                                            {question.topicText}
                                                        </Link>
                                                    </ListGroupItemText>
                                                </ListGroupItem>
                                            </ListGroup >
                                    )
                                }
                            </div>
                        </Tabs.Tab>
                        <Tabs.Tab id="tab2" title="คำถามที่ตอบแล้ว">
                            <div className="mt-3">
                                {
                                    this.state.topics.answeredTopics.map(
                                        (question, index) =>
                                            < ListGroup key={index}>
                                                <ListGroupItem>
                                                    <ListGroupItemHeading ><Link to={"/topic/" + question.topicId} className="question-header">{question.topicName}</Link><Badge style={{ marginLeft: '2%' }} pill> ตอบแล้ว {question.answerCount}</Badge></ListGroupItemHeading>
                                                    <Label style={{ color: '#6C757D' }}> <FontAwesomeIcon icon="question" size="sm" />{"" + question.questionType}</Label>
                                                    <ListGroupItemText>
                                                        <Link to={"/topic/" + question.topicId} className="question-body">
                                                            {question.topicText}
                                                        </Link>
                                                    </ListGroupItemText>
                                                </ListGroupItem>
                                            </ListGroup >
                                    )
                                }
                            </div>
                        </Tabs.Tab>
                        <Tabs.Tab id="tab3" title="คำถามที่ยังไม่ได้ตอบ">
                            <div className="mt-3">
                                {
                                    this.state.topics.noAnswerTopic.map(
                                        (question, index) =>
                                            < ListGroup key={index}>
                                                <ListGroupItem>
                                                    <ListGroupItemHeading ><Link to={"/topic/" + question.topicId} className="question-header">{question.topicName}</Link><Badge style={{ marginLeft: '2%' }} pill> ตอบแล้ว {question.answerCount}</Badge></ListGroupItemHeading>
                                                    <Label style={{ color: '#6C757D' }}> <FontAwesomeIcon icon="question" size="sm" />{"" + question.questionType}</Label>
                                                    <ListGroupItemText>
                                                        <Link to={"/topic/" + question.topicId} className="question-body">
                                                            {question.topicText}
                                                        </Link>
                                                    </ListGroupItemText>
                                                </ListGroupItem>
                                            </ListGroup >
                                    )
                                }
                            </div>
                        </Tabs.Tab>
                    </React.Fragment>
                </Tabs>
            </div>
        );
    }
}
export default QuestionTabs;