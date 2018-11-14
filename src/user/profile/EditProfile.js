import React from 'react';

import {
    Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button
} from 'reactstrap';
// import { Link } from 'react-router-dom';

export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            validate: {
                emailState: '',
                textState: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    }

    render() {
        const { firstName, lastName, username, email } = this.state;

        return (
            // Show Div Full Page => container-fluid
            <div className="container" id="card-margin-top-bottom">
                <Card outline color="info">
                    <CardHeader style={{ backgroundColor: '#17A2B8', color: '#FFF' }} tag="h3">แก้ไขข้อมูล</CardHeader>
                    <CardBody>
                        <Form onSubmit={(e) => this.submitSignUpForm(e)}>
                            <FormGroup>
                                <Label for="firstName" className="float-left">ชื่อ</Label>
                                <Input
                                    value={firstName}
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name"
                                    required
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName" className="float-left">นามสกุล</Label>
                                <Input
                                    value={lastName}
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name"
                                    required
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="username" className="float-left">ชื่อผู้ใช้งาน</Label>
                                <Input
                                    value={username}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    required
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="regisEmail" className="float-left">อีเมล</Label>
                                <Input
                                    value={email}
                                    type="email"
                                    name="email"
                                    id="regisEmail"
                                    placeholder="E-Mail"
                                    required
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }} />
                            </FormGroup>
                            <Button outline color="info">บันทึก</Button>{' '}
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}