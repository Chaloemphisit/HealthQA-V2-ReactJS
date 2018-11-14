import React, { Component } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import { Form, Input, Button, Radio, Select, InputNumber, DatePicker, Notification } from 'antd';
import { Link } from 'react-router-dom';
import { createComment } from '../util/APIUtils';

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

        const commentData = {
            "commentText": this.state.answerText.value
        };

        const smoothScroll = (h) => {
            let i = h || 0;
            let x = document.body.scrollHeight || document.documentElement.scrollHeight;
            if (i < x + 10) {
                setTimeout(() => {
                    window.scrollTo(0, i);
                    smoothScroll(i + 60);
                }, 10);
            }
        }

        createComment(commentData, this.props.match.params.id)
            .then(response => {
                this.props.history.push("/topic/" + this.props.match.params.id);
                // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
                this.setState({
                    "answerText": {
                        value: ''
                    }
                })
                Notification.success({
                    message: 'Health QA',
                    description: "ตอบคำถามสำเร็จแล้ว",
                });
                smoothScroll(0);
            }).catch(error => {
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