import React from 'react';
import { Tabs } from "@yazanaabed/react-tabs";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Notification} from 'antd';
import { API_BASE_URL } from '../constants';
import './style.css';


class SearchResult extends React.Component {

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
            error: null
        }
    }

    handleSelect(e) {
        // console.log('Selected tab: ' + e.Tabs.activeTab);
    }

    componentDidMount() {
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
        return (

            <div>
                <Tabs
                    activeTab={{
                        id: 'tab1'
                    }}

                >
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
                </Tabs>
            </div>
        );
    }
}
export default SearchResult;