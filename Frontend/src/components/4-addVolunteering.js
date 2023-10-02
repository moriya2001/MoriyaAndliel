import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';

import axios from 'axios';
import DropdownOption from "./Dropdownption";
import { useNavigate } from "react-router-dom";
import { AGE_OPTIONS, GENDER_OPTIONS } from './constanst'
// const AGE_OPTIONS = [
//     {label: 'כל הגילאים', value: 'all'},
//     {label: '18-30', value: '18-30'},
//     {label: '31-40', value: '31-40'},
//     {label: '41-50', value: '41-50'},
//     // Add more age options as needed
// ];

// const GENDER_OPTIONS = [
//     {label: 'כל המינים', value: 'all'},
//     {label: 'גבר', value: 'male'},
//     {label: 'אישה', value: 'female'},
//     // Add more gender options as needed
// ];
function AddVolunteering() {

    const [VolunteerType, setVolunteerType] = useState()
    const [city, setCity] = useState()
    const [volunteering, setVolunteering] = useState({
        idVolunteerType: "",
        idCity: "",
        SDate: new Date(),
        NDate: new Date(),
        Gender: "כל המינים",
        Description: "כל הגילאים",
    });
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();
    const validateForm = () => {
        if (!volunteering.idVolunteerType || !volunteering.idCity || !volunteering.SDate || !volunteering.NDate) {
            if (volunteering.idVolunteerType && volunteering.idCity && volunteering.SDate && volunteering.NDate) setMsg('כל השדות חובה.');
            else if (!volunteering.idVolunteerType) setMsg('סוג ההתנדבות חובה.');
            else if (!volunteering.idCity) setMsg('עיר ההתנדבות חובה.');
            else if (!volunteering.SDate) setMsg('תאריך התחלה חובה.');
            else if (!volunteering.NDate) setMsg('תאריך סיום חובה.');
            return false;
        }
        if (volunteering.SDate > volunteering.NDate) {
            setMsg('תאריך התחלה חייב להיות לפני תאריך סיום.');
            return false;
        }

        setMsg(''); // Clear error message if everything is valid
        return true;
    };

    const addVolunteering = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post('/volunteering', volunteering);
                // Clear the form after successful submission if needed
                setVolunteering({});
                navigate('/volunteeringTable');
            } catch (error) {
                setMsg('An error occurred. Please try again later.');
            }
        } else
            return false;
    };



    const getVolunteering = async () => {
        const { data } = await axios.get("/volunteerType")
        console.log(data)
        setVolunteerType(data)
    }
    const getCity = async () => {
        const { data } = await axios.get("/city")
        console.log(data)
        setCity(data)
    }
    useEffect(() => {
        getVolunteering()
        getCity()
    }, [])
    return (
        <Container className={"mt-5 mx-auto w-50 bg-light rounded border border-dark p-3"}>
            <h1 className={"text-center"}>הוספת התנדבות</h1>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <Form onSubmit={addVolunteering}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Select aria-label="Default select example" onChange={(e) => setVolunteering({
                            ...volunteering,
                            idVolunteerType: e.target.value
                        })}>
                            <option>סוג התנדבות</option>
                            {VolunteerType && VolunteerType.map((item) => {
                                return <option key={item._id} value={item._id}>{item.Name}</option>
                            }
                            )}
                        </Form.Select>
                        {/* לשאול האם כדאי לעשות select */}
                        {/* <Form.Control type="text" placeholder="Enter type volunteering" onChange={e=>setNameVolunteering({Name:e.target.value})}/> */}
                    </Form.Group>
                    <Form.Select aria-label="Default select example"
                        onChange={(e) => setVolunteering({ ...volunteering, idCity: e.target.value })}>
                        <option>בחר עיר</option>
                        {city && city.map((item) => {
                            return <option key={item._id} value={item._id}>{item.Name}</option>
                        }
                        )}
                    </Form.Select>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Row} controlId="formGridEmail">
                        <Form.Label>זמן התחלה:</Form.Label>
                        <DateTimePicker value={volunteering.SDate} onChange={e => setVolunteering({ ...volunteering, SDate: e })} />
                    </Form.Group>


                    <Form.Group as={Row} controlId="formGridPassword">
                        <Form.Label>זמן סיום:</Form.Label>
                        <DateTimePicker value={volunteering.NDate} onChange={e => setVolunteering({ ...volunteering, NDate: e })} />                    </Form.Group>

                </Row>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>כתובת</Form.Label>
                    <Form.Control
                        placeholder="1234 Main St"
                        type="text"
                        onChange={(e) => setVolunteering({ ...volunteering, Address: e.target.value })}
                    />
                </Form.Group>
                <div>
                    <h6>גיל</h6>
                    <DropdownOption options={AGE_OPTIONS} value={volunteering?.Age} handleChange={(e) => {
                        setVolunteering({ ...volunteering, Age: e.target.value })
                    }} />
                </div>
                <div>
                    <h6>מין:</h6>
                    <DropdownOption options={GENDER_OPTIONS} value={volunteering?.Gender} handleChange={(e) => {
                        setVolunteering({ ...volunteering, Gender: e.target.value })
                    }} />
                </div>

                <Row className="mb-3">


                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>תאור</Form.Label>
                        <Form.Control as="textarea" rows={3} type='text'
                            onChange={e => setVolunteering({ ...volunteering, Description: e.target.value })} />
                    </Form.Group>
                </Row>
                <Button type={'submit'} variant="primary"
                    style={{ backgroundColor: "#0FFE0" }}>
                    הוספת התנדבות
                </Button>
            </Form>
        </Container>
    );
}

export default AddVolunteering;
