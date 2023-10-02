import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const UpdateProfile = () => {
    const userBeforeChanges = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(userBeforeChanges);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const saveChanges = async (form) => {
        form.preventDefault();
        console.log("postdata")
        if(validForm()){
        try {
            const { data } = await axios.put(`/users/${user._id}`, user);
            console.log("postdata")
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/Definitions');
        } catch (error) {

            console.error(error);
            return false;
        }
        }

    };
    const validForm = () => {
        const newErrors = {};
        if (user.Password.length < 8)
            newErrors.Password = 'סיסמא חייבת להכיל לפחות 8 תווים';
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        <div className="container-fluid py-3 my-5 min-vh-100">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h3 className="text-center">עדכון פרטים</h3>
                            <Form onSubmit={saveChanges}>
                                <Form.Group className="mb-3" controlId="formBasicFirstName">
                                    <Form.Label>שם פרטי</Form.Label>
                                    <Form.Control type="text" placeholder="שם פרטי" value={user?.FirstName || ''}
                                        id={"firstName"}
                                        onChange={(e) => setUser({ ...user, FirstName: e.target.value })} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>שם משפחה</Form.Label>
                                    <Form.Control type="text" placeholder="שם משפחה" value={user?.LastName || ''}
                                        id={"lastName"}
                                        onChange={(e) => setUser({ ...user, LastName: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>סיסמא</Form.Label>
                                    <Form.Control type="text" placeholder="סיסמא" value={user?.Password || ''}
                                                  id={"Password"}
                                                  onChange={(e) => setUser({...user, Password: e.target.value})}/>
                                                    <Form.Control.Feedback type="invalid">
                        {errors.Password}
                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="mb-3 form-check">

                                    <Button variant="primary" type="submit" >
                                        שמור שינויים
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default UpdateProfile;

