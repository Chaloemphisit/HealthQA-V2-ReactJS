import React from 'react';
import {
    Card, CardTitle, CardText, Col, Row, UncontrolledTooltip
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AnswerCard = (props) => (
    props.comments.map(
        (comment, index) =>
            <Row key={index}>
                <Card body id="answerCard">
                    <Row>
                        <Col md={10} xs={10} sm={10}>
                            <CardTitle style={{ fontSize: '0.9em' }}>คำตอบที่ {index + 1}</CardTitle>
                        </Col>
                        <Col md={2} xs={2} sm={2}>
                            <Link to={"/spam/comment/" + comment.commentId} ><div className="float-right" id="trash"> <FontAwesomeIcon icon="trash-alt" /></div>
                                <UncontrolledTooltip placement="right" target="trash">แจ้งลบ</UncontrolledTooltip>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="mt-4 ml-2 mb-4">
                        <CardText>{comment.commentText}</CardText>
                    </Row>
                    <hr/>
                    <div id="cardBottomBar">
                        <div className="child">
                            bbbbb
              </div>
                    </div>
                </Card>
            </Row>
    )
);

export default AnswerCard;