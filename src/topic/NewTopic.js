import React from 'react';

import {
  Card, CardHeader, CardBody, Col, Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';
// import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { createTopic } from '../util/APIUtils';
// import axios from 'axios';
import { Form, Input, Button, Radio, Select, InputNumber, DatePicker, Notification } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class NewTopic extends React.Component {
  constructor(props) {
    super(props);

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
        value: 'disabled'
      },
      "disease": {
        value: '',
        validateStatus: 'success',
        errorMsg: null,
      },
      "questionType": {
        value: ''
      },
      "questionPurpose": {
        value: ''
      },
      "birthDate": {
        value: ''
      }
    }
    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

    // console.log(this.state)
  }


  handleChange(event, name, validationFun) {
    // console.log(event + "----->>>" + name + " ---->>>" + validationFun(event).validateStatus)

    this.setState({
      [name]: {
        value: event,
        ...validationFun(event)
      }
    });
  }


  handleSubmit(event) {
    event.preventDefault();



    if (!this.state.disease.value || !this.state.disease.value.trim()) {
      this.setState({
        disease: {
          value: '-'
        }
      }
      );
    }
    const topicData = {
      "topicName": this.state.topicName.value,
      "topicText": this.state.topicText.value,
      "height": this.state.height.value,
      "weight": this.state.weight.value,
      "ageY": this.state.ageY.value,
      "ageM": this.state.ageM.value,
      "ageD": this.state.ageD.value,
      "sex": this.state.sex.value,
      "disease": this.state.disease.value,
      "questionType": this.state.questionType.value,
      "questionPurpose": this.state.questionPurpose.value
    };

    createTopic(topicData)
      .then(response => {
        this.props.history.push(response.redirect);

        Notification.success({
          message: 'Health QA',
          description: "ยินดีด้วย ตั้งคำถามสำเร็จแล้ว",
        });
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

  isFormInvalid() {
    return !(this.state.topicName.validateStatus === 'success' &&
      this.state.topicText.validateStatus === 'success' &&
      this.state.height.validateStatus === 'success' &&
      this.state.weight.validateStatus === 'success' &&
      this.state.birthDate.validateStatus === 'success' &&
      this.state.sex.validateStatus === 'success' &&
      this.state.questionType.validateStatus === 'success' &&
      this.state.questionPurpose.validateStatus === 'success' &&
      this.state.disease.validateStatus === 'success'
    );
  }

  render() {
    let newTopicForm;
    if (this.props.currentUser) {
      newTopicForm = [
        <Card outline color="info">
          <CardHeader style={{ backgroundColor: '#17A2B8', color: '#FFF' }} tag="h3">รายละเอียด</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                label="คำถาม"
                validateStatus={this.state.topicName.validateStatus}
                help={this.state.topicName.errorMsg}>
                <Input
                  size="large"
                  name="topicName"
                  autoComplete="off"
                  placeholder="ระบุคำถาม"
                  value={this.state.topicName.value}
                  onChange={(event) => this.handleInputChange(event, this.validateTopicName)} />
              </FormItem>
              <FormItem
                label="รายละเอียดคำถาม"
                validateStatus={this.state.topicText.validateStatus}
                help={this.state.topicText.errorMsg}>
                <TextArea
                  rows={4}
                  size="large"
                  name="topicText"
                  autoComplete="off"
                  value={this.state.topicText.value}
                  onChange={(event) => this.handleInputChange(event, this.validateTopicText)} />
              </FormItem>
              <FormItem
                label="วัตถุประสงค์"
                validateStatus={this.state.questionPurpose.validateStatus}
                help={this.state.questionPurpose.errorMsg}>
                <Input
                  size="large"
                  name="questionPurpose"
                  autoComplete="off"
                  placeholder="ระบุวัตถุประสงค์ที่ถาม"
                  value={this.state.questionPurpose.value}
                  onChange={(event) => this.handleInputChange(event, this.validatePurpose)} />
              </FormItem>
              <FormItem
                label="ประเภทคำถาม"
                validateStatus={this.state.questionType.validateStatus}
                help={this.state.questionType.errorMsg}>
                <RadioGroup
                  name="questionType"
                  size="large"
                  onChange={(event) => this.handleInputChange(event, this.validateQuestionType)}
                  value={this.state.questionType.value}>
                  <Radio value="D">คำถามเฉพาะทางแพทย์</Radio>
                  <Radio value="P">คำถามเฉพาะทางเภสัชกร</Radio>
                </RadioGroup>
              </FormItem>
              <legend>ข้อมูลผู้ป่วย</legend>
              <Row form>
                <Col md={2}>
                  <FormItem
                    label="เพศ"
                    validateStatus={this.state.sex.validateStatus}
                    help={this.state.sex.errorMsg}>
                    <Select
                      size="large"
                      name="sex"
                      value={this.state.sex.value}
                      // onChange={this.handleChange}
                      onChange={(event) => this.handleChange(event, "sex", this.validateSex)}
                    >
                      <Option value="disabled" disabled>เลือกเพศ</Option>
                      <Option value="M">ชาย</Option>
                      <Option value="F">หญิง</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col md={3}>
                  <FormItem
                    label="น้ำหนัก (กก.)"
                    validateStatus={this.state.weight.validateStatus}
                    help={this.state.weight.errorMsg}>
                    <InputNumber
                      value={this.state.weight.value}
                      style={{ width: '100%' }}
                      name="weight"
                      size="large"
                      min={1}
                      onChange={(event) => this.handleChange(event, "weight", this.validateWeight)} />
                  </FormItem>
                </Col>
                <Col md={3}>
                  <FormItem
                    label="ส่วนสูง (ซม.)"
                    validateStatus={this.state.height.validateStatus}
                    help={this.state.height.errorMsg}>
                    <InputNumber
                      value={this.state.height.value}
                      style={{ width: '100%' }}
                      size="large"
                      name="height"
                      min={1}
                      onChange={(event) => this.handleChange(event, "height", this.validateHeight)} />
                  </FormItem>
                </Col>
                <Col md={4}>
                  <FormItem
                    label="วันเกิด"
                    validateStatus={this.state.birthDate.validateStatus}
                    help={this.state.birthDate.errorMsg}>
                    <DatePicker
                      // value={this.state.birthDate.value}
                      style={{ width: '100%' }}
                      size="large"
                      // onChange={(event) => this.handleChange(event, "birthDate", this.validateBirthDate)}
                      onChange={(date, dateString) => {
                        this.handleBirthdayChange(date, dateString)
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              <FormItem
                label="โรคประจำตัว"
                validateStatus={this.state.disease.validateStatus}
                help={this.state.disease.errorMsg}>
                <Input
                  size="large"
                  name="disease"
                  autoComplete="off"
                  placeholder="ระบุโรคประจำตัว"
                  value={this.state.disease.value}
                  onChange={(event) => this.handleInputChange(event, this.validateDisease)} />
              </FormItem>
              <FormItem>
                <Button type="primary"
                  htmlType="submit"
                  size="large"
                  className="signup-form-button"
                  disabled={this.isFormInvalid()}>ตั่งคำถาม</Button>
              </FormItem>
            </Form>
          </CardBody>
        </Card>
      ]
    } else {
      newTopicForm = [
        <div>
          <div style={{ textAlign: 'center' }}>
            <h4>คุณยังไม่ได้เข้าสู่ระบบ, กรุณาเข้าสู่ระบบเพื่อสร้างคำถาม</h4>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/login/">เข้าสู่ระบบ</Link> หรือคุณยังไม่ได้เป็นสมาชิกใช่ไหม <Link to="/signup">สมัครสมาชิก</Link> เลย!
                    </div>
        </div>
      ]
    }
    return (
      // Show Div Full Page => container-fluid
      <div className="container" id="card-margin-top-bottom">
        {newTopicForm}
      </div>
    );
  }
  // Validation Functions

  validateTopicName = (topicName) => {
    if (topicName.length === 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'กรุณาระบุคำถาม!'
      }
    } else if (topicName.length < 10) {
      return {
        validateStatus: 'error',
        errorMsg: `คำถามสั้นเกินไปนะ.`
      }
    } else if (topicName.length > 255) {
      return {
        validateStatus: 'error',
        errorMsg: `คำถามยาวเกินไปนะ.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }

  }

  validateTopicText = (topicText) => {
    if (topicText.length === 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'กรุณาระบุรายละเอียด!'
      }
    } else if (topicText.length < 10) {
      return {
        validateStatus: 'error',
        errorMsg: `รายละเอียดสั้นเกินไปนะ.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateHeight = (height) => {
    if (!height) {
      return {
        validateStatus: 'error',
        errorMsg: `กรุณาระบุส่วนสูง.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateWeight = (weight) => {
    if (!weight) {
      return {
        validateStatus: 'error',
        errorMsg: `กรุณาระบุน้ำหนัก.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  handleBirthdayChange = (date, dateString) => {
    const CurrentDate = new Date();
    const GivenDate = new Date(dateString);

    if (GivenDate > CurrentDate) {
      this.setState({
        birthDate: {
          value: dateString,
          validateStatus: 'error',
          errorMsg: `วันเกิดไม่ถูกต้อง.`
        }
      });
    } else {

      var mdate = dateString;
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

      this.setState({
        birthDate: {
          value: dateString,
          validateStatus: 'success',
          errorMsg: null
        },
        ageY: {
          value: ageYears
        },
        ageM: {
          value: ageMonths
        },
        ageD: {
          value: ageDays
        }
      });
    }
  }

  validateSex = (sex) => {
    if (sex === "disabled") {
      return {
        validateStatus: 'error',
        errorMsg: `กรุณาระบุเพศ.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateQuestionType = (questionType) => {
    if (!questionType) {
      return {
        validateStatus: 'error',
        errorMsg: `กรุณาเลือกประเภทคำถาม.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validatePurpose = (purpose) => {
    if (purpose.length === 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'กรุณาระบุวัตถุประสงค์!'
      }
    } else if (purpose.length < 5) {
      return {
        validateStatus: 'error',
        errorMsg: `วัตถุประสงค์สั้นเกินไปนะ.`
      }
    } else if (purpose.length > 255) {
      return {
        validateStatus: 'error',
        errorMsg: `วัตถุประสงค์ยาวเกินไปนะ.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateDisease = (disease) => {
    if (disease.length > 255) {
      return {
        validateStatus: 'error',
        errorMsg: `ข้อความยาวเกินไปนะ.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

}