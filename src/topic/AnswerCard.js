import React from 'react';
import {
    Card, CardTitle, CardText, Col, Row, UncontrolledTooltip
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

const AnswerCard = (props) => (
    props.comments.map(
        (comment, index) =>
            <Row key={index}>
                <Card body className={comment.userType === "USER" ? "ask__commentaries ask__commentaries--user ask__commentaries--type" : "ask__commentaries ask__commentaries--doctor ask__commentaries--type"}>

                    <div id="card-top-bar">
                        <div className="child">
                            <Row>
                                <Col md={10} xs={10} sm={10}>
                                    <span class="ask__date">{comment.createDate}</span>
                                </Col>
                                <Col md={2} xs={2} sm={2}>
                                    <Link to={"/spam/comment/" + comment.commentId} ><div className="float-right" id="trash"> <FontAwesomeIcon icon="trash-alt" /></div>
                                        <UncontrolledTooltip placement="right" target="trash">แจ้งลบ</UncontrolledTooltip>
                                    </Link>
                                </Col>
                            </Row>

                            <div className="avatar">
                                <div className={comment.userType === "USER" ?"avatar__icon__user":"avatar__icon__doctor"}></div>
                                <div className="avatar__name">
                                    <p className="avatar__first">ตอบโดย</p>
                                    <p className="avatar__second">{comment.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <Row className="mt-4 ml-2 mb-4">
                        <CardText>{comment.commentText}</CardText>
                    </Row>

                </Card>
            </Row>
    )
);

export default AnswerCard;