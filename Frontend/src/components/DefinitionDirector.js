import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom"
import {ButtonToolbar, Card, Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
const DefinitionsDirector = () => {
  const navigate = useNavigate()

  return (<>
         <Container className={"justify-content-center justify-content-center my-5"}>
            <Row className={"justify-content-center justify-content-center my-5"}>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className={'text-center display-6'}>
                                <i className="bi bi-gear-fill"></i> הגדרות
                            </Card.Title>
                            <Card.Text>
                              
                                    <Row className={'justify-content-center'}>

                                <ButtonToolbar className={'justify-content-center mt-5'} id="buttonGroup">
                                        <Col xs={12} className={'mb-3'}>
                                            <a href="/volunteeringTable" className="btn btn-primary btn-lg w-100">
                                                <i className="fa fa-user-group"></i> התנדבויות 
                                            </a>
                                        </Col>

                                        <Col xs={12} className={'mb-3'}>
                                            <a href="/volunteers" className="btn btn-primary btn-lg w-100">
                                                <i className="fa fa-user-group"></i> מתנדבים 
                                            </a>
                                        </Col>
                                        <Col xs={12} className={'mx-3'}>
                                            <a href="/gifts" className="btn btn-primary btn-lg w-100">
                                                <i className="fa fa-gifts"></i> מתנות
                                            </a>
                                        </Col>
                                </ButtonToolbar>
                                    </Row>


                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
  </>

  )
}
export default DefinitionsDirector