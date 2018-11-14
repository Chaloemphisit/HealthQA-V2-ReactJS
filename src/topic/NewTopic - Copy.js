import React from 'react';

import {
  Card, CardHeader, CardBody, Col, Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { createTopic } from '../util/APIUtils';
// import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';

import { 
  NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
  USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../constants';


const FormItem = Form.Item;

export default class NewTopic extends React.Component {
  constructor(props) {
    super(props);
    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);

    this.state = {
      "topicName": {
        value: ''
      },
      "topicText": {
        value: ''
      },
      "height": {
        value: ''
      },
      "weight": {
        value: ''
      },
      "ageY": {
        value: ''
      },
      "ageM": {
        value: ''
      },
      "ageD": {
        value: ''
      },
      "sex": {
        value: ''
      },
      "disease": {
        value: ''
      },
      "questionType": {
        value: ''
      },
      "questionPurpose": {
        value: ''
      },
    }
  }

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const signupRequest = {
      firstname: this.state.firstname.value,
      lastname: this.state.lastname.value,
      email: this.state.email.value,
      username: this.state.username.value,
      password: this.state.password.value
    };
  }

  isFormInvalid() {
    return !(this.state.firstname.validateStatus === 'success' &&
      this.state.lastname.validateStatus === 'success' &&
      this.state.username.validateStatus === 'success' &&
      this.state.email.validateStatus === 'success' &&
      this.state.password.validateStatus === 'success'
    );
  }

  handleBirthdayChange = (event) => {
    const { target } = event;
    var mdate = target.value;
    var yearThen = parseInt(mdate.substring(0, 4), 10);
    var monthThen = parseInt(mdate.substring(5, 7), 10);
    var dayThen = parseInt(mdate.substring(8, 10), 10);

    var bthDate, curDate, days;
    var ageYears, ageMonths, ageDays;
    bthDate = new Date(yearThen, monthThen - 1, dayThen);
    curDate = new Date();
    if (bthDate > curDate) return;
    days = Math.floor((curDate - bthDate) / (1000 * 60 * 60 * 24));
    ageYears = Math.floor(days / 365);
    ageMonths = Math.floor((days % 365) / 31);
    ageDays = days - (ageYears * 365) - (ageMonths * 31);
    if (ageYears > 0) {
      this.setState({ AgeY: ageYears })
      // console.log(ageYears)
    }
    if (ageMonths > 0) {
      this.setState({ AgeM: ageMonths })
      // console.log(ageMonths)
    }
    if (ageDays > 0) {
      this.setState({ AgeD: ageDays })
      // console.log(ageDays)
    }

  }

  // handleSubmit = event => {
  //   event.preventDefault();

  //   const topicData = {
  //     "topicName": this.state.question,
  //     "topicText": this.state.detail,
  //     "height": this.state.height,
  //     "weight": this.state.weight,
  //     "ageY": this.state.ageY,
  //     "ageM": this.state.ageM,
  //     "ageD": this.state.ageD,
  //     "sex": this.state.gender,
  //     "disease": this.state.congenitalDisease,
  //     "questionType": this.state.questionType,
  //     "questionPurpose": this.state.objective
  //   };

  //   createTopic(topicData)
  //     .then(response => {
  //       this.props.history.push("/");
  //     }).catch(error => {
  //       if (error.status === 401) {
  //         this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
  //       } else {
  //         notification.error({
  //           message: 'Health QA',
  //           description: error.message || 'Sorry! Something went wrong. Please try again!'
  //         });
  //       }
  //     });
  // }


  render() {
    const { question, detail, objective, questionType, gender, weight, height, birthDate, congenitalDisease } = this.state

    return (
      // Show Div Full Page => container-fluid
      <div className="container" id="card-margin-top-bottom">
        <Card outline color="info">
          <CardHeader style={{ backgroundColor: '#17A2B8', color: '#FFF' }} tag="h3">รายละเอียด</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit} className="signup-form">
              <FormItem
                label="First Name"
                validateStatus={this.state.firstname.validateStatus}
                help={this.state.firstname.errorMsg}>
                <Input
                  size="large"
                  name="firstname"
                  autoComplete="off"
                  placeholder="ชื่อ"
                  value={this.state.firstname.value}
                  onChange={(event) => this.handleInputChange(event, this.validateName)} />
              </FormItem>
              <FormItem
                label="Last Name"
                validateStatus={this.state.lastname.validateStatus}
                help={this.state.lastname.errorMsg}>
                <Input
                  size="large"
                  name="lastname"
                  autoComplete="off"
                  placeholder="นามสกุล"
                  value={this.state.lastname.value}
                  onChange={(event) => this.handleInputChange(event, this.validateName)} />
              </FormItem>
              <FormItem label="Username"
                hasFeedback
                validateStatus={this.state.username.validateStatus}
                help={this.state.username.errorMsg}>
                <Input
                  size="large"
                  name="username"
                  autoComplete="off"
                  placeholder="A unique username"
                  value={this.state.username.value}
                  onBlur={this.validateUsernameAvailability}
                  onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
              </FormItem>
              <FormItem
                label="Email"
                hasFeedback
                validateStatus={this.state.email.validateStatus}
                help={this.state.email.errorMsg}>
                <Input
                  size="large"
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Your email"
                  value={this.state.email.value}
                  onBlur={this.validateEmailAvailability}
                  onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
              </FormItem>
              <FormItem
                label="Password"
                validateStatus={this.state.password.validateStatus}
                help={this.state.password.errorMsg}>
                <Input
                  size="large"
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="A password between 8 to 26 characters"
                  value={this.state.password.value}
                  onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
              </FormItem>
              <FormItem>
                <Button type="primary"
                  htmlType="submit"
                  size="large"
                  className="signup-form-button"
                  disabled={this.isFormInvalid()}>Sign up</Button>
                Already registed? <Link to="/login">Login now!</Link>
              </FormItem>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
  // Validation Functions

  validateName = (name) => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
      }
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateEmail = (email) => {
    if (!email) {
      return {
        validateStatus: 'error',
        errorMsg: 'Email may not be empty'
      }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: 'error',
        errorMsg: 'Email not valid'
      }
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
      }
    }

    return {
      validateStatus: null,
      errorMsg: null
    }
  }

  validateUsername = (username) => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
      }
    } else if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
      }
    } else {
      return {
        validateStatus: null,
        errorMsg: null
      }
    }
  }

  validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
      }
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

}