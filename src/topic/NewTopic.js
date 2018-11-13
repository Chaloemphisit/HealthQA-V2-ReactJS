import React from 'react';

import {
  Card, CardHeader, CardBody, Col, Row, Button
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { createTopic } from '../util/APIUtils';
// import axios from 'axios';
import { notification } from 'antd';

export default class NewTopic extends React.Component {
  constructor(props) {
    super(props);
    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    this.state = {
      question: '',
      detail: '',
      objective: '',
      questionType: '',
      gender: '1',
      weight: '',
      height: '',
      ageY: '0',
      ageM: '0',
      ageD: '0',
      congenitalDisease: ''
    }
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // console.log(value)
    const { name } = target;
    await this.setState({
      [name]: value,
    });
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

  handleSubmit = event => {
    event.preventDefault();

    const topicData = {
      "topicName": this.state.question,
      "topicText": this.state.detail,
      "height": this.state.height,
      "weight": this.state.weight,
      "ageY": this.state.ageY,
      "ageM": this.state.ageM,
      "ageD": this.state.ageD,
      "sex": this.state.gender,
      "disease": this.state.congenitalDisease,
      "questionType": this.state.questionType,
      "questionPurpose": this.state.objective
    };

    createTopic(topicData)
      .then(response => {
        this.props.history.push("/");
      }).catch(error => {
        if (error.status === 401) {
          this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
        } else {
          notification.error({
            message: 'Health QA',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
        }
      });
  }


  render() {
    const { question, detail, objective, questionType, gender, weight, height, birthDate, congenitalDisease } = this.state

    return (
      // Show Div Full Page => container-fluid
      <div className="container" id="card-margin-top-bottom">
        <Card outline color="info">
          <CardHeader style={{ backgroundColor: '#17A2B8', color: '#FFF' }} tag="h3">รายละเอียด</CardHeader>
          <CardBody>
            <AvForm onSubmit={this.handleSubmit}>
              <AvField
                label="คำถาม"
                type="text"
                name="question"
                id="question"
                placeholder="ระบุคำถาม"
                value={question}
                onChange={(e) => {
                  this.handleChange(e)
                }}
                validate={{
                  required: { value: true, errorMessage: 'กรุณาระบุคำถาม' }
                }} />
              <AvField
                label="รายละเอียดคำถาม"
                type="textarea"
                name="detail"
                id="detail"
                value={detail}
                onChange={(e) => {
                  this.handleChange(e)
                }}
                validate={{
                  required: { value: true, errorMessage: 'กรุณาระบุรายละเอียด' }
                }} />

              <AvField
                label="วัตถุประสงค์"
                ttype="text"
                name="objective"
                id="objective"
                placeholder="ระบุวัตถุประสงค์ที่ถาม"
                value={objective}
                onChange={(e) => {
                  this.handleChange(e)
                }}
                validate={{
                  required: { value: true, errorMessage: 'กรุณาระบุรายละเอียด' }
                }} />

              <AvRadioGroup
                inline
                name="questionType"
                label="ประเภทคำถาม"
                value={questionType}
                onInput={(e) => { this.handleChange(e) }}
                validate={{
                  required: { value: true, errorMessage: 'กรุณาเลือกประเภทของคำถาม' }
                }}>
                <AvRadio customInput label="คำถามเฉพาะทางแพทย์" value="1" />
                <AvRadio customInput label="คำถามเฉพาะทางเภสัชกร" value="2" />
              </AvRadioGroup>
              <Row form>
                <legend>ข้อมูลผู้ป่วย</legend>
                <Col md={2}>
                  <AvField type="select" id="gender" name="gender" label="เพศ" helpMessage="กรุณาเลือกเพศของท่าน!"
                    value={gender}
                    onInput={(e) => {
                      this.handleChange(e)
                    }}
                  >
                    <option value="1">ชาย</option>
                    <option value="2">หญิง</option>
                    >
                  </AvField>
                </Col>
                <Col md={3}>
                  <AvField
                    label="น้ำหนัก (กก.)"
                    type="number"
                    name="weight"
                    id="weight"
                    value={weight}
                    onChange={(e) => {
                      this.handleChange(e)
                    }}
                    validate={{
                      required: { value: true, errorMessage: 'กรุณาระบุน้ำหนัก' }
                    }} />

                </Col>
                <Col md={3}>
                  <AvField
                    label="ส่วนสูง (ซม.)"
                    type="number"
                    name="height"
                    id="height"
                    value={height}
                    onChange={(e) => {
                      this.handleChange(e)
                    }}
                    validate={{
                      required: { value: true, errorMessage: 'กรุณาระบุส่วนสูง' }
                    }} />

                </Col>
                <Col md={4}>
                  <AvField name="birthDate" id="birthDate" label="วันเกิด" type="date"
                    value={birthDate}
                    onInput={(e) => {
                      this.handleBirthdayChange(e)
                    }}
                    validate={{
                      required: { value: true, errorMessage: 'กรุณาระบุวันเกิด' }
                    }} />
                </Col>
              </Row>
              <AvField
                label="โรคประจำตัว"
                type="text"
                name="congenitalDisease"
                id="congenitalDisease"
                placeholder="ระบุโรคประจำตัว"
                value={congenitalDisease}
                onChange={(e) => {
                  this.handleChange(e)
                }}
              />
              <Button size="lg" color="danger" className="float-right">ตั้งคำถาม</Button>{' '}
            </AvForm>
          </CardBody>
        </Card>
      </div>
    );
  }
}