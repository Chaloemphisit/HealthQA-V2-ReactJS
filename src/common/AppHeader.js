import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import './AppHeader.css';
import '../css/style.css';
// import pollIcon from '../poll.svg';
import { Menu, Dropdown, Icon } from 'antd';
import headerLogo from '../img/header-logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Navbar
} from 'reactstrap';

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick({ key }) {
    if (key === "logout") {
      this.props.onLogout();
    }
  }

  render() {
    let menuItems;
    let navTop;



    if (this.props.currentUser) {
      // navTop = [
      //   <Navbar dark expand="md" key={1} className={this.props.currentUser.authorities[0].authority === "ADMIN" ? "navbar-admin" : "navbar-default"}>
      //     <div className="top-logo"><Link to="/"><img src={headerLogo} className="inverted" alt="Header Logo" height="60" /></Link></div>
      //   </Navbar>
      // ]

      if (this.props.currentUser.authorities[0].authority === "USER" || this.props.currentUser.authorities[0].authority === "S_USER") {
        menuItems = [
          <Menu.Item key={1}>
            <Link to="/">หน้าหลัก</Link>
          </Menu.Item>,
          <Menu.Item key={2}>
            <Link to="/new-topic">ถามหมอ</Link>
          </Menu.Item>,
          <Menu.Item key={3}>
            <Link to="/contactus">ติดต่อเรา</Link>
          </Menu.Item>,
          <Menu.Item key={4} className="profile-menu">
            <ProfileDropdownMenu
              currentUser={this.props.currentUser}
              handleMenuClick={this.handleMenuClick} />
          </Menu.Item>
        ];

      } else if (this.props.currentUser.authorities[0].authority === "ADMIN") {

        navTop = [
          <Navbar dark expand="md" key={1} className="navbar-admin" >
            <div className="top-logo"><Link to="/admin"><img src={headerLogo} className="inverted" alt="Header Logo" height="60" /></Link></div>
          </Navbar>
        ]

        menuItems = [
          <Menu.Item key={1}>
            <Link to="/">หน้าหลัก</Link>
          </Menu.Item>,
          <Menu.Item key={2}>
            <Link to="/admin/request-remove">คำขอแจ้งลบ</Link>
          </Menu.Item>,
          <Menu.Item key={3}>
            <Link to="/admin/manage/user">จัดการผู้ใช้งาน</Link>
          </Menu.Item>,
          <Menu.Item key={4}>
            <Link to="/admin/manage/topic">จัดการคำถาม</Link>
          </Menu.Item>,
          <Menu.Item key={5} className="profile-menu">
            <ProfileDropdownMenu
              currentUser={this.props.currentUser}
              handleMenuClick={this.handleMenuClick} />
          </Menu.Item>
        ];
      }
    } else {
      navTop = [
        <Navbar dark expand="md" className="navbar-default" key={5}>
          <div className="top-logo"><Link to="/"><img src={headerLogo} className="inverted" alt="Header Logo" height="60" /></Link></div>
        </Navbar>
      ]

      menuItems = [
        <Menu.Item key={1}>
          <Link to="/">หน้าหลัก</Link>
        </Menu.Item>,
        <Menu.Item key={2}>
          <Link to="/new-topic">ถามหมอ</Link>
        </Menu.Item>,
        <Menu.Item key={3}>
          <Link to="/contactus">ติดต่อเรา</Link>
        </Menu.Item>,
        <Menu.Item key={4}>
          <Link to="/login">Login</Link>
        </Menu.Item>,
        <Menu.Item key={5}>
          <Link to="/signup">Signup</Link>
        </Menu.Item>
      ];
    }

    return (
      <div>
        <div className="app-header">
          {navTop}
          <div className="container">
            <div className="app-title" >
              {this.props.currentUser ? (this.props.currentUser.authorities[0].authority === "ADMIN" ? <Link to="/admin">Health QA [Admin]</Link> : <Link to="/">Health QA</Link>) : null}
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
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu" key={1}>
      {props.currentUser.authorities[0].authority !== "ADMIN" ? (
        [
          < Menu.Item key="user-info" className="dropdown-item" disabled>
            {/* <Link to={`/users/${props.currentUser.username}`}> */}
            <div className="user-full-name-info">
              {props.currentUser.firstname + " " + props.currentUser.lastname}
            </div>
            <div className="username-info">
              @{props.currentUser.username}
            </div>
            {/* </Link> */}
          </Menu.Item>,
          <Menu.Divider key={2} />,
          <Menu.Item key="profile" className="dropdown-item">
            <Link to={`/users/${props.currentUser.username}`}> <Icon type="user" /> Profile</Link>
          </Menu.Item>
        ]
      ) : null}
      <Menu.Item key="logout" className="dropdown-item">
        <Icon type="logout" />Sign out
      </Menu.Item>
    </Menu >
  );

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link" href="/">
        {
          props.currentUser.authorities[0].authority === "ADMIN" ?
            <div>
              {"Hi, " + props.currentUser.firstname + " " + props.currentUser.lastname} <Icon type="down" style={{ marginRight: 0 }} />
            </div>
            : <div>
              <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} /> <Icon type="down" />
            </div>
        }
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);