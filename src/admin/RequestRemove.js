import React, { Component } from 'react';
import { Tabs, Button, Spin, Notification, Modal } from 'antd';
import { Table } from 'reactstrap';
import './admin.css';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { getReports, deleteComment, deleteTopic, cancelTopic, cancelComment } from '../util/APIUtils';
import { Card, CardBody, UncontrolledTooltip } from 'reactstrap';

const TabPane = Tabs.TabPane;

class RequestRemove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: [],
            comment: [],
            isLoading: false,
            error: null,
            ModalText: 'ท่านต้องการลบรายการนี้ใช่หรือไม่ ?',
            ModalVisible: false,
            confirmLoading: false,
            topicId: null,
            commentId: null,
            isTopic: null,

            ModalTextM1: 'ท่านต้องการยกเลิกรายการนี้ใช่หรือไม่ ?',
            ModalVisibleM1: false,
            confirmLoadingM1: false,
            topicIdM1: null,
            commentIdM1: null,
            isTopicM1: null,
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
                // console.log(response.topic)
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
        // console.log(e)
        this.setState({
            ModalVisible: true,
            topicId: e,
            isTopic: true,
        });
        // this.props.history.push("/topic/" + e);
    }

    handleCommentDeleteButton = (e) => {
        // console.log(e)
        this.setState({
            ModalVisible: true,
            commentId: e,
            topicId: null,
            isTopic: false,
        });
        // this.props.history.push("/topic/" + e);
    }

    handleModalCancel = () => {
        // console.log('Clicked cancel button');
        this.setState({
            ModalVisible: false,
        });
    }

    handleModalTopicOK = () => {
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
                        ModalText: 'ท่านต้องการลบรายการนี้ใช่หรือไม่ ?',
                    },
                        this.handleLoadData(),
                        Notification.success({
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

    handleModalCommentOK = () => {
        this.setState({
            ModalText: 'กำลังดำเนินการ, กรุณารอสักครู่...',
            confirmLoading: true,
        });

        deleteComment(this.state.commentId)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        ModalVisible: false,
                        confirmLoading: false,
                        ModalText: 'ท่านต้องการลบคำถามนี้ใช่หรือไม่ ?',
                    },
                        this.handleLoadData(),
                        Notification.success({
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


    //handle cancel modal

    handleTopicCanccelButton = (e) => {
        this.setState({
            ModalVisibleM1: true,
            topicIdM1: e,
            isTopicM1: true,
        });
    }

    handleCommentCancelButton = (e) => {
        this.setState({
            ModalVisibleM1: true,
            commentIdM1: e,
            topicIdM1: null,
            isTopicM1: false,
        });
    }

    handleModalCancelM1 = () => {
        this.setState({
            ModalVisibleM1: false,
        });
    }

    handleModalCancelTopicOK = () => {
        this.setState({
            ModalTextM1: 'กำลังดำเนินการ, กรุณารอสักครู่...',
            confirmLoadingM1: true,
        });

        cancelTopic(this.state.topicIdM1)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        ModalVisibleM1: false,
                        confirmLoadingM1: false,
                        ModalTextM1: 'ท่านต้องการยกเลิกรายการนี้ใช่หรือไม่ ?',
                    },
                        this.handleLoadData(),
                        Notification.success({
                            message: 'Health QA',
                            description: "ยกเลิกรายการนี้เรียบร้อยแล้ว",
                        })
                    );
                }, 0);
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

    handleModalCancelCommentOK = () => {
        this.setState({
            ModalTextM1: 'กำลังดำเนินการ, กรุณารอสักครู่...',
            confirmLoadingM1: true,
        });

        cancelComment(this.state.commentIdM1)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        ModalVisibleM1: false,
                        confirmLoadingM1: false,
                        ModalTextM1: 'ท่านต้องการยกเลิกรายการนี้ใช่หรือไม่ ?',
                    },
                        this.handleLoadData(),
                        Notification.success({
                            message: 'Health QA',
                            description: "ยกเลิกรายการนี้เรียบร้อยแล้ว",
                        })
                    );
                }, 0);
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

    handleModalCancelM1 = () => {
        this.setState({
            ModalVisibleM1: false,
        });
    }

    // -------------------------------------------------

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
            <div className="app-content-admin mb-4">
                <Card outline color="danger">
                    <Modal title="ยืนยันการทำรายการ"
                        visible={this.state.ModalVisible}
                        centered
                        onOk={this.state.isTopic ? this.handleModalTopicOK : this.handleModalCommentOK}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleModalCancel}
                        okText="ใช่"
                        cancelText="ไม่ใช่"
                    >
                        <p>{this.state.ModalText}</p>
                    </Modal>

                    <Modal title="ยืนยันการทำรายการ"
                        visible={this.state.ModalVisibleM1}
                        centered
                        onOk={this.state.isTopicM1 ? this.handleModalCancelTopicOK : this.handleModalCancelCommentOK}
                        confirmLoading={this.state.confirmLoadingM1}
                        onCancel={this.handleModalCancelM1}
                        okText="ใช่"
                        cancelText="ไม่ใช่"
                    >
                        <p>{this.state.ModalTextM1}</p>
                    </Modal>
                    <CardBody>
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
                                                        this.props.currentUser ? (
                                                            this.state.topic.map(
                                                                (topic, index) =>
                                                                    <tr key={index}>
                                                                        <th scope="row">{topic.id}</th>
                                                                        <td>{topic.topicName.substring(0, 60)}{topic.topicName.length > 60 ? "..." : null}</td>
                                                                        <td>{topic.topicText.substring(0, 60)}{topic.topicText.length > 60 ? "..." : null}</td>
                                                                        <td style={{ width: '150px' }}>
                                                                            <div>
                                                                                <Button
                                                                                    id={"view_TopicID" + topic.id}
                                                                                    type="primary"
                                                                                    ghost
                                                                                    shape="circle"
                                                                                    icon="select"
                                                                                    onClick={(e) => this.handleTopicViewButton(topic.id)} />
                                                                                <UncontrolledTooltip placement="right" target={"view_TopicID" + topic.id}>ไปที่คำถามนี้</UncontrolledTooltip>
                                                                                <Button
                                                                                    id={"delete_TopicID" + topic.id}
                                                                                    type="danger"
                                                                                    ghost
                                                                                    className="ml-2"
                                                                                    shape="circle"
                                                                                    icon="delete"
                                                                                    onClick={(e) => this.handleTopicDeleteButton(topic.id)} />
                                                                                <UncontrolledTooltip placement="right" target={"delete_TopicID" + topic.id}>ลบคำถามนี้</UncontrolledTooltip>
                                                                                <Button
                                                                                    id={"cancel_topicID" + topic.id}
                                                                                    type="danger"
                                                                                    ghost
                                                                                    className="ml-2"
                                                                                    shape="circle"
                                                                                    icon="close"
                                                                                    onClick={(e) => this.handleTopicCanccelButton(topic.id)} />
                                                                                <UncontrolledTooltip placement="right" target={"cancel_topicID" + topic.id}>ยกเลิกการแจ้งลบ</UncontrolledTooltip>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                            )
                                                        ) : null
                                                    }
                                                </tbody>
                                            </Table>
                                            {
                                                !this.state.isLoading && this.state.topic.length === 0 ? (
                                                    <div className="no-polls-found">
                                                        <span>No Data Found.</span>
                                                    </div>
                                                ) : null
                                            }
                                        </TabPane>
                                        <TabPane tab="รายการแจ้งลบคำตอบ" key="2">
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
                                                                        <td style={{ width: '150px' }}>
                                                                            <div>
                                                                                <Button
                                                                                    id={"view_commentTopicID" + comment.topicId}
                                                                                    type="primary"
                                                                                    ghost
                                                                                    shape="circle"
                                                                                    icon="select"
                                                                                    onClick={(e) => this.handleTopicViewButton(comment.topicId)} />
                                                                                <UncontrolledTooltip placement="right" target={"view_commentTopicID" + comment.topicId}>ไปที่คำถามของคำตอบนี้</UncontrolledTooltip>
                                                                                <Button
                                                                                    id={"delete_commentID" + comment.id}
                                                                                    type="danger"
                                                                                    ghost
                                                                                    className="ml-2"
                                                                                    shape="circle"
                                                                                    icon="delete"
                                                                                    onClick={(e) => this.handleCommentDeleteButton(comment.id)} />
                                                                                <UncontrolledTooltip placement="right" target={"delete_commentID" + comment.id}>ลบคำตอบนี้</UncontrolledTooltip>
                                                                                <Button
                                                                                    id={"cancel_topicID" + comment.id}
                                                                                    type="danger"
                                                                                    ghost
                                                                                    className="ml-2"
                                                                                    shape="circle"
                                                                                    icon="close"
                                                                                    onClick={(e) => this.handleCommentCancelButton(comment.id)} />
                                                                                <UncontrolledTooltip placement="right" target={"cancel_topicID" + comment.id}>ยกเลิกการแจ้งลบ</UncontrolledTooltip>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                            )
                                                        ) : null
                                                    }
                                                </tbody>
                                            </Table>
                                            {
                                                !this.state.isLoading && this.state.comment.length === 0 ? (
                                                    <div className="no-polls-found">
                                                        <span>No Data Found.</span>
                                                    </div>
                                                ) : null
                                            }
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </Spin>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default RequestRemove;