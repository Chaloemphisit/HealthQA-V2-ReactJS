import React from 'react';

import {
  Card, CardHeader, CardBody
} from 'reactstrap';
import { sendContactUs } from '../util/APIUtils';
import { Form, Input, Button, Notification, Spin } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

export default class ContactUs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: {
        value: ''
      },
      email: {
        value: ''
      },
      content: {
        value: ''
      },
      isSubmit: false,
      isLoading: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    // console.log(inputName)
    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });

  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      isSubmit: true,
      isLoading: true,
    },
      this.callSendContactus()
    )
  }

  callSendContactus = () => {
    const contactUsData = {
      "subject": this.state.subject.value,
      "email": this.state.email.value,
      "content": this.state.content.value,
    };

    sendContactUs(contactUsData)
      .then(response => {
        this.props.history.push("/");
        // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
        Notification.success({
          message: 'Health QA',
          description: "ส่งข้อความสำเร็จแล้ว",
        });
      })
      .then(response => {
        this.setState({
          isSubmit: false,
          isLoading: false,
        })
      }).catch(error => {
        this.setState({
          isSubmit: false,
          isLoading: false,
        })
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

  isFormInvalid() {
    return !(this.state.subject.validateStatus === 'success' && this.state.isSubmit === false);
  }


  render() {
    return (
      // Show Div Full Page => container-fluid
      <div className="container" id="card-margin-top-bottom">
        <Spin spinning={this.state.isLoading} size="large">
          <Card outline color="info">
            <CardHeader style={{ backgroundColor: '#17A2B8', color: '#FFF' }} tag="h3">ติดต่อสอบถาม</CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  label="เรื่อง"
                  validateStatus={this.state.subject.validateStatus}
                  help={this.state.subject.errorMsg}>
                  <Input
                    size="large"
                    name="subject"
                    placeholder="ระบุเรื่อง"
                    autoComplete="off"
                    value={this.state.subject.value}
                    onChange={(event) => this.handleInputChange(event, this.validateSubject)} />
                </FormItem>
                <FormItem
                  label="อีเมล"
                  validateStatus={this.state.email.validateStatus}
                  help={this.state.email.errorMsg}>
                  <Input
                    size="large"
                    name="email"
                    placeholder="ระบุอีเมล"
                    autoComplete="off"
                    value={this.state.email.value}
                    onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
                </FormItem>
                <FormItem
                  label="รายละเอียด"
                  validateStatus={this.state.content.validateStatus}
                  help={this.state.content.errorMsg}>
                  <TextArea
                    rows={4}
                    size="large"
                    name="content"
                    autoComplete="off"
                    value={this.state.content.value}
                    onChange={(event) => this.handleInputChange(event, this.validateContent)} />
                </FormItem>
                <div className="float-right">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="signup-form-button"
                    disabled={this.isFormInvalid()}>ส่งข้อความ</Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Spin>
      </div>
    );
  }

  validateSubject = (subject) => {
    if (subject.length === 0) {
      return {
        validateStatus: 'error',
        errorMsg: `กรุณาระบุเรื่อง.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateContent = (subject) => {
    if (subject.length === 0) {
      return {
        validateStatus: 'error',
        errorMsg: `กรุณาระบุรายละเอียด.`
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
        errorMsg: 'กรุณาระบุอีเมล'
      }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: 'error',
        errorMsg: 'อีเมลไม่ถูดต้อง'
      }
    }

    return {
      validateStatus: null,
      errorMsg: null
    }
  }
}