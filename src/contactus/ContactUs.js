import React from 'react';

import {
  Card, CardHeader, CardBody, Button
} from 'reactstrap';
// import { Link } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

export default class ContactUs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        question: '',
        email: '',
        detail: '',
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(value)
    const { name } = target;
    await this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    console.log(this.state)
  }


  render() {
    const { header, email, detail } = this.state;
    return (
      // Show Div Full Page => container-fluid
      <div className="container" id="card-margin-top-bottom">
        <Card outline color="info">
          <CardHeader style={{ backgroundColor: '#17A2B8', color: '#FFF' }} tag="h3">ติดต่อสอบถาม</CardHeader>
          <CardBody>
            <AvForm onSubmit={(e) => { this.handleSubmit(e) }}>
              <AvField label="เรื่อง" type="text" name="question" id="question" placeholder="ระบุเรื่อง"
                onChange={(e) => {
                  this.handleChange(e)
                }}
                value={header}
                validate={{
                  required: { value: true, errorMessage: 'กรุณาระบุเรื่อง' }
                }} />

              <AvField label="อีเมลผู้ส่ง" type="email" name="email" id="email" placeholder="อีเมล"
                onChange={(e) => {
                  this.handleChange(e)
                }}
                value={email}
                validate={{
                  email: { value: true, errorMessage: 'กรุณาระบุอีเมลให้ถูกต้อง' },
                  required: { value: true, errorMessage: 'กรุณาระบุอีเมล' }
                }} />

              <AvField label="รายละเอียด" type="textarea" name="detail" id="question"
                style={{ height: 200 }}
                onChange={(e) => {
                  this.handleChange(e)
                }}
                value={detail}
                validate={{
                  required: { value: true, errorMessage: 'กรุณาระรายละเอียด' }
                }} />
              <Button size="lg" color="danger" className="float-right" style={{ width: 100 }} type="submit">ส่ง</Button>{' '}
            </AvForm>
          </CardBody>
        </Card>
      </div>
    );
  }
}