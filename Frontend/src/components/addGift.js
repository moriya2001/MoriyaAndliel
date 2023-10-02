import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';

import axios from 'axios';
import DropdownOption from "./Dropdownption";
import { useNavigate } from "react-router-dom";
import { AGE_OPTIONS, GENDER_OPTIONS } from './constanst'

function AddGift() {

    const [gift, setGift] = useState({
        Cost: 0,
        Name: "",
        Url: ""

    });
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();
    const addVolunteering = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/gift', gift);
            // Clear the form after successful submission if needed
            setGift({});
            navigate('/gifts');
        } catch (error) {
            setMsg('An error occurred. Please try again later.');
        }

    };

    return (
        <Container className={"mt-5 mx-auto w-50 bg-light rounded border border-dark p-3"}>
            <h1 className={"text-center"}>הוספת מתנה</h1>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <Form onSubmit={addVolunteering}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">

                        <Form.Label>שם מתנה</Form.Label>
                        <Form.Control
                            placeholder="מתנה"
                            type="text"
                            onChange={(e) => setGift({ ...gift, Name: e.target.value })}
                        />
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridName">

                        <Form.Label>כמות לבבות</Form.Label>
                        <Form.Control
                            placeholder="לבבות"
                            type="Number"
                            onChange={(e) => setGift({ ...gift, Cost: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridName">

                        <Form.Label>כתובת קישור</Form.Label>
                        <Form.Control
                            placeholder="כתובת קישור"
                            type="text"
                            onChange={(e) => setGift({ ...gift, Url: e.target.value })}
                        />
                    </Form.Group>

                </Row>


                <Button type={'submit'} variant="primary"
                    style={{ backgroundColor: "#0FFE0" }}>
                    הוספת מתנה
                </Button>
            </Form>
        </Container>
    );
}

export default AddGift;
