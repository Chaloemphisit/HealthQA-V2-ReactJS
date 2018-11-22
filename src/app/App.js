import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';

// import NewPoll from '../poll/NewPoll';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import Home from '../home/Home';

import PrivateRoute from '../common/PrivateRoute';
import { library } from '@fortawesome/fontawesome-svg-core';

import Topic from '../topic/Topic';
import ContactUs from '../contactus/ContactUs';
import { Layout, notification } from 'antd';

import EditProfile from '../user/profile/EditProfile';
import RequestRemove from '../admin/RequestRemove';
import ManageUsers from '../admin/ManageUsers';
import NewTopic from '../topic/NewTopic';

/*---------------------------------------- FontAwesome ----------------------------------------*/
import { faEnvelope, faKey, faComments, faQuestion, faTrashAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ManageTopic from '../admin/ManageTopic';

library.add(faEnvelope, faKey, faComments, faQuestion, faTrashAlt, faUserCircle);
/*--------------------------------------------------------------------------------------------*/

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      authority: null,
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        },
          this.handleLoading()
        );
      })
      .catch(error => {
        this.setState({
          isLoading: false
        },
          this.handleLoading()
        );
      });
  }

  handleLoading = () => {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      // fade out
      ele.classList.add('available')
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = ''
      }, 1000)
    }
  }

  componentDidMount() {
    this.loadCurrentUser();
    // if (this.state.currentUser.username)
    // alert(this.state.currentUser.username)
  }

  handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false,
      authorities: null,
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'Health QA',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Health QA',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    // this.props.history.push("/");
    this.props.history.goBack();
  }

  render() {
    if (this.state.isLoading) {
      // return <LoadingIndicator/>
    }
    return (

      <Layout className="app-container">
        <AppHeader isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout} />
        <Content className="app-content" style={{ background: '#fff', minHeight: 280 }}>
          <div className="container">

            <Switch>
              {this.state.currentUser ?
                this.state.currentUser.authorities[0].authority === "ADMIN" ?
                  <Route exact path="/"
                    render={(props) => <RequestRemove isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
                  </Route>
                  :
                  <Route exact path="/"
                    render={() => <Home />}>
                  </Route>
                : <Route exact path="/"
                  render={() => <Home />}>
                </Route>
              }


              <Route path="/topic/:id"
                render={(props) => <Topic isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}></Route>

              <Route path="/contactus" component={ContactUs}></Route>

              <Route path="/login"
                render={(props) => <Login isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} onLogin={this.handleLogin} {...props} />}></Route>

              <Route path="/signup"
                render={(props) => <Signup isAuthenticated={this.state.isAuthenticated} {...props} />}></Route>

              <Route path="/users/:username"
                render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
              </Route>
              <Route path="/edit/users/:username"
                render={(props) => <EditProfile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
              </Route>

              <Route path="/new-topic"
                render={(props) => <NewTopic isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props} />}>
              </Route>
              <PrivateRoute authenticated={this.state.isAuthenticated} path="/admin/manage/user" currentUser={this.state.currentUser} component={ManageUsers} handleLogout={this.handleLogout}></PrivateRoute>
              <PrivateRoute authenticated={this.state.isAuthenticated} path="/admin/manage/topic" currentUser={this.state.currentUser} component={ManageTopic} handleLogout={this.handleLogout}></PrivateRoute>

              <Route path="/NotFound" component={NotFound}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center', bottom: 'calc()', position: 'absolute',width:'100%' }} >Health QA ©2018 Created by Chaloemphisit Sirichai</Footer> */}
      </Layout >
    );
  }
}

export default withRouter(App);
