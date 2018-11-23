import React from 'react';
import { Tabs } from "@yazanaabed/react-tabs";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import QuestionsListLoading from '../common/QuestionsListLoading';
import { Notification, message, Spin, Button, Icon } from 'antd';
import { API_BASE_URL } from '../constants';
import LoadingIndicator from '../common/LoadingIndicator';
import './style.css';


class QuestionTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            topics: {
                allTopics: [],
                answeredTopics: [],
                noAnswerTopic: []
            },
            page: 0,
            size: 5,
            last: true,
            isLoading: false,
            error: null,
            isFirstLoading: false,
        }
    }

    handleSelect(e) {
        // console.log('Selected tab: ' + e.Tabs.activeTab);
    }

    componentDidMount() {
        this.setState({
            isFirstLoading: true,
        })
        this.loadTopics();
    }

    handleLoadMore = () => {
        this.loadTopics(this.state.page, this.state.size);
        // console.log(this.state.page + " <<>>" + this.state.size)
    }

    loadTopics = (page = this.state.page, size = this.state.size) => {
        this.setState({ isLoading: true });

        axios.all([
            axios.get(API_BASE_URL + '/topic/all?page=' + page + '&size=' + size),
            axios.get(API_BASE_URL + '/topic/ans?page=' + page + '&size=' + size),
            axios.get(API_BASE_URL + '/topic/noAns?page=' + page + '&size=' + size)
        ])
            .then(axios.spread((allTopicsRes, ansTopicsRes, noAnsTopicRes) => {
                const allTopics = this.state.topics.allTopics.slice();
                const ansTopics = this.state.topics.answeredTopics.slice();
                const noAnsTopics = this.state.topics.noAnswerTopic.slice();

                this.setState({
                    topics: {
                        allTopics: allTopics.concat(allTopicsRes.data.content),
                        answeredTopics: ansTopics.concat(ansTopicsRes.data.content),
                        noAnswerTopic: noAnsTopics.concat(noAnsTopicRes.data.content)
                    },
                    page: allTopicsRes.data.page,
                    size: allTopicsRes.data.size,
                    last: allTopicsRes.data.last,
                    isLoading: false,
                    isFirstLoading: false,
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
        const { error } = this.state;

        if (error) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h1>We're sorry, but {error.message || "Something went wrong. Please try again!"}</h1>
                    <p>If you are the application owner check the logs for more information.</p>
                </div>
            );
        }

        if (this.state.isFirstLoading) {
            // message.loading('กำลังโหลดข้อมูล...', 0);
            return (
                <div>
                    <Spin spinning={this.state.isFirstLoading} size="large">
                        <Tabs activeTab={{ id: "tab1" }}>
                            <Tabs.Tab id="tab1" title="คำถามทั้งหมด" ><div className="mt-3" > <QuestionsListLoading /></div> </Tabs.Tab>
                            <Tabs.Tab id="tab2" title="คำถามที่ตอบแล้ว"><div className="mt-3"> <QuestionsListLoading /></div> </Tabs.Tab>
                            <Tabs.Tab id="tab3" title="คำถามที่ยังไม่ได้ตอบ"> <div className="mt-3"><QuestionsListLoading /></div></Tabs.Tab>
                        </Tabs>
                    </Spin>
                </div>
            );
        } else {
            message.destroy()
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
                            <div className="mt-3" align="center">
                                {
                                    !this.state.isLoading && this.state.topics.allTopics.length === 0 ? (
                                        <div className="no-polls-found">
                                            <span>No Topic Found.</span>
                                        </div>
                                    ) : null
                                }
                                {
                                    !this.state.isLoading && !this.state.last ? (
                                        <div className="load-more-polls">
                                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                                <Icon type="plus" /> Load more
                            </Button>
                                        </div>) : null
                                }
                                {
                                    this.state.isLoading ?
                                        <LoadingIndicator /> : null
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
                            <div className="mt-3" align="center">
                                {
                                    !this.state.isLoading && this.state.topics.allTopics.length === 0 ? (
                                        <div className="no-polls-found">
                                            <span>No Topic Found.</span>
                                        </div>
                                    ) : null
                                }
                                {
                                    !this.state.isLoading && !this.state.last ? (
                                        <div className="load-more-polls">
                                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                                <Icon type="plus" /> Load more
                            </Button>
                                        </div>) : null
                                }
                                {
                                    this.state.isLoading ?
                                        <LoadingIndicator /> : null
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
                            <div className="mt-3" align="center">
                                {
                                    !this.state.isLoading && this.state.topics.allTopics.length === 0 ? (
                                        <div className="no-polls-found">
                                            <span>No Topic Found.</span>
                                        </div>
                                    ) : null
                                }
                                {
                                    !this.state.isLoading && !this.state.last ? (
                                        <div className="load-more-polls">
                                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                                <Icon type="plus" /> Load more
                            </Button>
                                        </div>) : null
                                }
                                {
                                    this.state.isLoading ?
                                        <LoadingIndicator /> : null
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