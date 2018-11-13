import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import './AppHeader.css';
import '../css/style.css';
import pollIcon from '../poll.svg';
import { Menu, Dropdown, Icon } from 'antd';
import headerLogo from '../img/header-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Navbar
} from 'reactstrap';

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  closeNav = () => {
    if (this.state.isOpen === true) {
      this.setState({
        isOpen: false
      });
    }
  }

  handleMenuClick({ key }) {
    if (key === "logout") {
      this.props.onLogout();
    }
  }

  render() {
    let menuItems;
    if (this.props.currentUser) {
      menuItems = [
        <Menu.Item key="/">
          <Link to="/">หน้าหลัก</Link>
        </Menu.Item>,
        <Menu.Item key="/new-topic">
          <Link to="/new-topic">ถามหมอ</Link>
        </Menu.Item>,
        <Menu.Item key="/contactus">
          <Link to="/contactus">ติดต่อเรา</Link>
        </Menu.Item>,
        <Menu.Item key="/profile" className="profile-menu">
          <ProfileDropdownMenu
            currentUser={this.props.currentUser}
            handleMenuClick={this.handleMenuClick} />
        </Menu.Item>
      ];
    } else {
      menuItems = [
        <Menu.Item key="/">
          <Link to="/">หน้าหลัก</Link>
        </Menu.Item>,
        <Menu.Item key="/contactus">
          <Link to="/contactus">ติดต่อเรา</Link>
        </Menu.Item>,
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>,
        <Menu.Item key="/signup">
          <Link to="/signup">Signup</Link>
        </Menu.Item>
      ];
    }

    return (
      <div>
        <div className="app-header">
          <Navbar dark expand="md" className="navbar-default">
            <div className="top-logo"><Link to="/"><img src={headerLogo} className="inverted" alt="Header Logo" height="60" /></Link></div>
          </Navbar>
          <div className="container">
            <div className="app-title" >
              <Link to="/">Health QA</Link>
            </div>
            <Menu
              className="app-menu"
              mode="horizontal"
              selectedKeys={[this.props.location.pathname]}
              style={{ lineHeight: '64px' }} >
              {menuItems}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.firstname + " " + props.currentUser.lastname}
        </div>
        <div className="username-info">
          @{props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
        <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);