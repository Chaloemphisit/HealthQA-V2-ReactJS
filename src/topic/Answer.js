import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, FormGroup, Label, Input } from 'reactstrap';
import {Link} from 'react-router-dom';

class Answer extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <Button color="" onClick={this.toggle} style={{ width: '100%' }}>ตอบคำถาม</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Label for="detail">รายละเอียดคำตอบ</Label>
                                <Input type="textarea" name="detail" id="detail" />
                                <Link to="#" className="back404page"><div className="button3 mt-3 float-right" color="" onClick={this.toggle} >ส่งคำตอบ</div></Link>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default Answer;