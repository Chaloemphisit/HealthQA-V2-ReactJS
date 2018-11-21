import React, { Component } from 'react';
import { Button, Spin, Modal, notification } from 'antd';
import { Table } from 'reactstrap';
import './admin.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { getManageTopic, deleteTopic } from '../util/APIUtils';
import { Card, CardBody } from 'reactstrap';

class ManageTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: [],
            isLoading: false,
            error: null,
            ModalText: 'ท่านต้องการลบคำถามนี้ใช่หรือไม่ ?',
            ModalVisible: false,
            confirmLoading: false,
            topicId: null,
        }
    }

    componentDidMount() {
        this.handleLoadData();
    }

    handleLoadData = () => {
        this.setState({
            isLoading: true
        });

        getManageTopic()
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


    handleTopicViewButton = (e) => {
        this.props.history.push("/topic/" + e);
    }

    handleTopicDeleteButton = (e) => {
        // console.log(e)
        this.setState({
            ModalVisible: true,
            topicId: e,
        });
        // this.props.history.push("/topic/" + e);
    }

    handleModalCancel = () => {
        // console.log('Clicked cancel button');
        this.setState({
            ModalVisible: false,
        });
    }

    handleModalOK = () => {
        this.setState({
            ModalText: 'กำลังดำเนินการ, กรุณารอสักครู่...',
            confirmLoading: true,
        });

        deleteTopic(this.state.topicId)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        ModalVisible: false,
                        confirmLoading: false,
                        ModalText: 'ท่านต้องการลบคำถามนี้ใช่หรือไม่ ?',
                    },
                        this.handleLoadData(),
                        notification.success({
                            message: 'Health QA',
                            description: "ลบคำถามเรียบร้อยแล้ว",
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


        return (
            <Card outline color="danger">
                <Modal title="ยืนยันการทำรายการ"
                    visible={this.state.ModalVisible}
                    centered
                    onOk={this.handleModalOK}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleModalCancel}
                >
                    <p>{this.state.ModalText}</p>
                </Modal>
                <CardBody>

                    <div className="profile">
                        <Spin spinning={this.state.isLoading} size="large" delay={200}>
                            <div className="user-poll-details">
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
                                            this.state.topic ? (
                                                this.state.topic.map(
                                                    (topic, index) =>
                                                        <tr key={index}>
                                                            <th scope="row">{topic.id}</th>
                                                            <td>{topic.topicName.substring(0, 20)}{topic.topicName.length > 60 ? "..." : null}</td>
                                                            <td>{topic.topicText.substring(0, 60)}{topic.topicText.length > 60 ? "..." : null}</td>
                                                            <td style={{ width: '150px' }}>
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
                            </div>
                        </Spin>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default ManageTopic;