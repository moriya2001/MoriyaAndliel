import React from 'react';
import './1-login.css';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, Form, Button, Row } from 'react-bootstrap';
import { setCurrentUser } from '../Redux-toolkit/usersSlice';
import Col from 'react-bootstrap/Col';
const LoginPage = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    // const getHomeLink = () => {
    //     const user = localStorage['user'];
    //      if (user)
    //         return user.Status ? "/homeUser": "/homeDirector"  ;
    //  }
    const login = async () => {
        try {
            const { data } = await axios.get('/users');
            let user = data.find((user) => {
                return user.Email === userName && user.Password === password;
            });
            // console.log(user)
            if (user) {
                console.log("user.IsApproved ",user.IsApproved )
                if (user.IsApproved === 1) {
                    setMsg('יוזר עדיין מחכה לאישור מנהל')
                    console.log(msg)
                } else {
                    localStorage['user'] = JSON.stringify(user);
                    console.log(user)

                }

                dispatch(setCurrentUser(user));
                console.log("user.Status", user.Status)
                // navigate(user.Status?"/homeUser":"/homeDirector");
                // console.log(user)
                if (user.Status) {
                    navigate('/homeUser');
                } else {
                    navigate('/homeDirector');
                }
                
            } else {
                setMsg('שם משתמש או סיסמא שגויים');
            }
        } catch (error) {
            setMsg(error);
        }
    }

    return (
        <Row className="login align-items-center justify-content-center text-start">
            <Col xs={6} className="p-5 rounded-3 bg-white  shadow-lg">
                <h2 className="text-center mb-4 rouded-3 p-3 mb-5 bg-white rounded
                ">כניסה</h2>
               {msg&&<Alert variant="danger text-end">{msg}</Alert>}
                <Form className="form1">
                    <Form.Group className="mb-3" dir='rtl' controlId="formBasicEmail">
                        <Form.Label>אימייל</Form.Label>
                        <Form.Control
                            type="email"
                            id="form1"
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="הכנס אימייל"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label dir='rtl'>סיסמא</Form.Label>
                        <Form.Control
                            type="password"
                            id="form2"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="סיסמא"
                        />
                    </Form.Group>
                    <Button onClick={login}
                        className="btn btn-sm btn-primary mx-auto d-block w-100">
                        התחבר
                    </Button>
                </Form>
                <br />
                <Alert variant="info text-center">
                    משתמש חדש?{' '}
                    <Alert.Link href="/register">הירשם</Alert.Link>
                </Alert>
            </Col>
        </Row>
    );
};
export default LoginPage;
