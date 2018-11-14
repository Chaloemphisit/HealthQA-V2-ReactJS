import React, { Component } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import { Form, Input, Button, Radio, Select, InputNumber, DatePicker, Notification } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const { TextArea } = Input;


class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "answerText": {
                value: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        console.log(inputName)
        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });

        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault();

        // if (!this.state.disease.value || !this.state.disease.value.trim()) {
        //   this.setState({
        //     disease: {
        //       value: '-'
        //     }
        //   });
        // }

        // const topicData = {
        //   "topicName": this.state.topicName.value,
        //   "topicText": this.state.topicText.value,
        //   "height": this.state.height.value,
        //   "weight": this.state.weight.value,
        //   "ageY": this.state.ageY.value,
        //   "ageM": this.state.ageM.value,
        //   "ageD": this.state.ageD.value,
        //   "sex": this.state.sex.value,
        //   "disease": this.state.disease.value,
        //   "questionType": this.state.questionType.value,
        //   "questionPurpose": this.state.questionPurpose.value
        // };

        // createTopic(topicData)
        //   .then(response => {
        //     this.props.history.push("/");
        //     Notification.success({
        //       message: 'Health QA',
        //       description: "ยินดีด้วย ตั้งคำถามสำเร็จแล้ว",
        //     });
        //   }).catch(error => {
        //     if (error.status === 401) {
        //       this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create poll.');
        //     } else {
        //       Notification.error({
        //         message: 'Health QA',
        //         description: error.message || 'Sorry! Something went wrong. Please try again!'
        //       });
        //     }
        //   });
    }


    isFormInvalid() {
        return !(this.state.answerText.validateStatus === 'success');
    }


    render() {

        let ansForm;
        if (this.props.currentUser) {
            ansForm = [
                <Form onSubmit={this.handleSubmit}>

                    <FormItem
                        label="รายละเอียดคำถาม"
                        validateStatus={this.state.answerText.validateStatus}
                        help={this.state.answerText.errorMsg}>
                        <TextArea
                            rows={4}
                            size="large"
                            name="answerText"
                            autoComplete="off"
                            value={this.state.answerText.value}
                            onChange={(event) => this.handleInputChange(event, this.validateAnswerText)} />
                    </FormItem>
                    <div className="float-right">
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="signup-form-button"
                            disabled={this.isFormInvalid()}>ตอบ</Button>
                    </div>
                </Form>
            ]
        } else {
            ansForm = [
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <h4>คุณยังไม่ได้เข้าสู่ระบบ, กรุณาเข้าสู่ระบบเพื่อตอบคำถาม</h4>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/login/">เข้าสู่ระบบ</Link> หรือคุณยังไม่ได้เป็นสมาชิกใช่ไหม <Link to="/signup">สมัครสมาชิก</Link> เลย!
                    </div>
                </div>
            ]
        }
        return (
            <div style={{ width: '100%' }}>
                <Card className="mt-4" className="answer">
                    <CardBody>
                        {ansForm}
                    </CardBody>
                </Card>
            </div>
        );
    }

    validateAnswerText = (answerText) => {
        if (answerText.length < 10) {
            return {
                validateStatus: 'error',
                errorMsg: `คำตอบสั้นเกินไปนะ.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }
}

export default Answer;