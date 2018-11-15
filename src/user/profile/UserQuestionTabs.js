import React from 'react';
import { Tabs } from "@yazanaabed/react-tabs";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QuestionsListLoading from '../../common/QuestionsListLoading';
import { getUserTopics, getUserAnsTopics } from '../../util/APIUtils';


class UserQuestionTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userTopics: [],
            userAnsTopics: [],
            isLoading: false,
            error: null
        }

        this.loadUserTopics = this.loadUserTopics.bind(this);
    }

    handleSelect(e) {
        console.log('Selected tab: ' + e.Tabs.activeTab);
    }

    loadUserTopics() {
        this.setState({
            isLoading: true
        });

        getUserTopics()
            .then(response => {
                this.setState({
                    userTopics: response,
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

        getUserAnsTopics()
            .then(response => {
                this.setState({
                    userAnsTopics: response,
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

    componentDidMount() {
        this.setState({ isLoading: true });
        this.loadUserTopics();
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
                        <Tabs.Tab id="tab1" title="คำถามที่ฉันตั้ง" ><div className="mt-3" > <QuestionsListLoading /></div> </Tabs.Tab>
                        <Tabs.Tab id="tab2" title="คำถามที่ฉันตอบ"><div className="mt-3"> <QuestionsListLoading /></div> </Tabs.Tab>
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
                        <Tabs.Tab id="tab1" title="คำถามที่ฉันตั้ง" >
                            <div className="mt-3" >
                                {
                                    this.state.userTopics.map(
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
                        <Tabs.Tab id="tab2" title="คำถามที่ฉันตอบ">
                            <div className="mt-3">
                                {
                                    this.state.userAnsTopics.map(
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
export default UserQuestionTabs;