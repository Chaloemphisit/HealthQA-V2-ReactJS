import React, { Component } from 'react';
import { Tabs, Button, Notification } from 'antd';
import { Table } from 'reactstrap';
import LoadingIndicator from '../common/LoadingIndicator';
import './RequestRemove.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { API_BASE_URL } from '../constants';
import axios from 'axios';

const TabPane = Tabs.TabPane;

const { Column } = Table;

class RequestRemove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,

        }
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


        const tabBarStyle = {
            textAlign: 'center'
        };
        return (
            <div className="profile">
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>
                                            <div>
                                                <Button type="primary" ghost shape="circle" icon="select" />
                                                <Button type="danger" ghost className="ml-2" shape="circle" icon="delete" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>
                                            <div>
                                                <Button type="primary" ghost shape="circle" icon="select" />
                                                <Button type="danger" ghost className="ml-2" shape="circle" icon="delete" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>
                                            <div>
                                                <Button type="primary" ghost shape="circle" icon="select" />
                                                <Button type="danger" ghost className="ml-2" shape="circle" icon="delete" />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </TabPane>
                        <TabPane tab="รายการแจ้งลบคำตอบ" key="2">

                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default RequestRemove;