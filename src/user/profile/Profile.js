import React, { Component } from 'react';
// import PollList from '../../poll/PollList';
import { getUserProfile } from '../../util/APIUtils';
import { Avatar, Button, Spin } from 'antd';
import { getAvatarColor } from '../../util/Colors';
// import { formatDate } from '../../util/Helpers';
// import LoadingIndicator from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import UserQuestionTabs from './UserQuestionTabs';
import Skeleton from 'react-loading-skeleton';
import { Card, CardBody } from 'reactstrap';

// const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                    isLoading: false
                });
            }).catch(error => {
                // console.log("---------->"+error.status)
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
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }
    }

    handleButtonClick = () => {
        this.props.history.push("/edit/users/" + this.props.match.params.username);
    }

    render() {
        // if (this.state.isLoading) {
        //     return <LoadingIndicator />;
        // }

        if (this.state.notFound) {
            return <NotFound />;
        }

        if (this.state.serverError) {
            return <ServerError />;
        }



        return (
            <div className="profile">
                <Spin spinning={this.state.user ? false : true} size="large" delay={200}>
                    {
                        // this.state.user ? (
                        <div className="user-profile">
                            <Card outline color="info">
                                <CardBody>
                                    <div className="user-details">
                                        <div className="user-avatar">
                                            <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(!this.state.user ? 'wait' : this.state.user.username), fontSize: '2em' }}>
                                                {!this.state.user ? 'x' : this.state.user.username[0]}
                                            </Avatar>
                                        </div>
                                        <div className="user-summary">
                                            <div className="full-name">{!this.state.user ? <Skeleton width="300px" /> : this.state.user.firstname + " " + this.state.user.lastname}</div>
                                            <div className="username">{!this.state.user ? <Skeleton width="250px" /> : "@" + this.state.user.username}</div>
                                            <div className="user-joined">{!this.state.user ? <Skeleton width="200px" /> : this.state.user.email}</div>
                                            <div className="mt-3">
                                                {!this.state.user ? <Skeleton width="100px" /> : <Button type="primary" icon="edit" ghost onClick={this.handleButtonClick}>แก้ไขข้อมูล</Button>}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <div id="card-margin-top-bottom">
                                <Card outline color="info">
                                    <CardBody>
                                        <UserQuestionTabs />
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                        // ) : null
                    }
                </Spin>
            </div>
        );
    }
}

export default Profile;