import React, { Component } from 'react';
import { Tabs, Button, Spin } from 'antd';
import { Table } from 'reactstrap';
import './admin.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { getReports } from '../util/APIUtils';
import { Card, CardBody } from 'reactstrap';

const TabPane = Tabs.TabPane;

class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: [],
            comment: [],
            isLoading: false,
            error: null,
        }
    }

    componentDidMount() {
        this.handleLoadData();
    }

    handleLoadData = () => {
        this.setState({
            isLoading: true
        });

        getReports()
            .then(response => {
                console.log(response.topic)
                this.setState({
                    topic: response.topic,
                    comment: response.comment,
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

    handleTopicViewButton = (e) => {
        this.props.history.push("/topic/" + e);
    }

    handleTopicDeleteButton = (e) => {
        console.log(e)
        // this.props.history.push("/topic/" + e);
    }

    handleCommentDeleteButton = (e) => {
        console.log(e)
        // this.props.history.push("/topic/" + e);
    }

    render() {
        const { error } = this.state;
        if (this.state.notFound) {
            return <NotFound />;
        }

        if (this.state.serverError) {
            return <ServerError />;
        }

        if (error) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <h1>We're sorry, but {error.message || "Something went wrong. Please try again!"}</h1>
                    <p>If you are the application owner check the logs for more information.</p>
                </div>
            );
        }


        const tabBarStyle = {
            textAlign: 'center'
        };
        return (
            <Card outline color="danger">
                <CardBody>
                    <div className="profile">
                        <Spin spinning={this.state.isLoading} size="large" delay={200}>
                            <div className="user-poll-details">
                                <Tabs defaultActiveKey="1"
                                    animated={false}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs">
                                    <TabPane tab="หมอ" key="1">
                                        <div className="mb-2">
                                            <Button type="primary" ghost icon="user-add">เพิ่มผู้ใช้งาน</Button>
                                        </div>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>คำถาม</th>
                                                    <th>รายละเอียด</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.props.currentUser ? (
                                                        this.state.topic.map(
                                                            (topic, index) =>
                                                                <tr key={index}>
                                                                    <th scope="row">{topic.id}</th>
                                                                    <td>{topic.topicName.substring(0, 60)}{topic.topicName.length > 60 ? "..." : null}</td>
                                                                    <td>{topic.topicText.substring(0, 60)}{topic.topicText.length > 60 ? "..." : null}</td>
                                                                    <td style={{ width: '100px' }}>
                                                                        <div>
                                                                            <Button
                                                                                type="primary"
                                                                                ghost
                                                                                shape="circle"
                                                                                icon="select"
                                                                                onClick={(e) => this.handleTopicViewButton(topic.id)} />
                                                                            <Button
                                                                                type="danger"
                                                                                ghost
                                                                                className="ml-2"
                                                                                shape="circle"
                                                                                icon="delete"
                                                                                onClick={(e) => this.handleTopicDeleteButton(topic.id)} />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                        )
                                                    ) : null
                                                }
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                    <TabPane tab="ผู้ดูแลระบบ" key="2">
                                        <div className="mb-2">
                                            <Button type="primary" ghost icon="user-add">เพิ่มผู้ใช้งาน</Button>
                                        </div>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>Topic ID</th>
                                                    <th>Comment ID</th>
                                                    <th>รายละเอียดคำตอบ</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.props.currentUser ? (
                                                        this.state.comment.map(
                                                            (comment, index) =>
                                                                <tr key={index}>
                                                                    <th>{comment.topicId}</th>
                                                                    <th scope="row">{comment.id}</th>
                                                                    <td>{comment.commentText.substring(0, 60)}{comment.commentText.length > 60 ? "..." : null}</td>
                                                                    <td style={{ width: '100px' }}>
                                                                        <div>
                                                                            <Button
                                                                                type="primary"
                                                                                ghost
                                                                                shape="circle"
                                                                                icon="select"
                                                                                onClick={(e) => this.handleTopicViewButton(comment.topicId)} />
                                                                            <Button
                                                                                type="danger"
                                                                                ghost
                                                                                className="ml-2"
                                                                                shape="circle"
                                                                                icon="delete"
                                                                                onClick={(e) => this.handleCommentDeleteButton(comment.id, comment.topicId)} />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                        )
                                                    ) : null
                                                }
                                            </tbody>
                                        </Table>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Spin>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default ManageUsers;