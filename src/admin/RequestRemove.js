import React, { Component } from 'react';
import { Tabs, Button, Notification, Spin } from 'antd';
import { Table } from 'reactstrap';
import LoadingIndicator from '../common/LoadingIndicator';
import './RequestRemove.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import axios from 'axios';
import { getReportTopic } from '../util/APIUtils';

const TabPane = Tabs.TabPane;

const { Column } = Table;

class RequestRemove extends Component {
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

        getReportTopic()
            .then(response => {
                this.setState({
                    topic: response,
                    isLoading: false
                },
                    console.log(this.state)
                );
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

    handleViewButton = (e) => {
        this.props.history.push("/topic/" + e);
    }

    handleDeleteButton = (e) => {
        console.log(e)
        // this.props.history.push("/topic/" + e);
    }

    render() {
        const { isLoading, error } = this.state;
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
            <div className="profile">
                <Spin spinning={this.state.isLoading} size="large" delay={200}>
                    <div className="user-poll-details">
                        <Tabs defaultActiveKey="1"
                            animated={false}
                            tabBarStyle={tabBarStyle}
                            size="large"
                            className="profile-tabs">
                            <TabPane tab="รายการแจ้งลบคำถาม" key="1">
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
                                            this.state.topic.map(
                                                (topic, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{topic.id}</th>
                                                        <td>{topic.topicName}</td>
                                                        <td>{topic.topicText.substring(1, 100)}{topic.topicText.length > 100 ? "..." : null}</td>
                                                        <td style={{ width: '100px' }}>
                                                            <div>
                                                                <Button
                                                                    type="primary"
                                                                    ghost
                                                                    shape="circle"
                                                                    icon="select"
                                                                    onClick={(e) => this.handleViewButton(topic.id)} />
                                                                <Button
                                                                    type="danger"
                                                                    ghost
                                                                    className="ml-2"
                                                                    shape="circle"
                                                                    icon="delete"
                                                                    onClick={(e) => this.handleDeleteButton(topic.id)} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </TabPane>
                            <TabPane tab="รายการแจ้งลบคำตอบ" key="2">

                            </TabPane>
                        </Tabs>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default RequestRemove;