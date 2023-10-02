import axios from "axios";
import React from "react";
// import {useSelector, useDispatch} from 'react-redux'
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import image1 from "../images/1.png";
import image2 from '../images/2.png';
import image3 from '../images/3.png';
import image4 from '../images/4.png';

import image5 from '../images/5.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import store from "../Redux-toolkit/store";
// import {selectUserId} from "../Redux-toolkit/usersSlice";
import { Container, Row, Col } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";


const DEFAULT_VALUE = '-1';

const DEFAULT_FILTERS = {
    type: DEFAULT_VALUE,
    city: DEFAULT_VALUE,
    startDate: DEFAULT_VALUE,
    endDate: DEFAULT_VALUE
};


const IMAGES_TYPES = {
    'ילדים': image1,
    'מבוגרים': image2,
    'תנו לחיות לחיות': image3,
    'חלוקת מזון': image4,
    'רפואה': image5
}

const SearchVolunteering = () => {
    const defaultFilters = DEFAULT_FILTERS;
    const [show, setShow] = useState(false);
    const [selectedVolunteering, setSelectedVolunteering] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [VolunteerType, setVolunteerType] = useState([])
    const [volunteering, setVolunteering] = useState([])
    const [city, setCity] = useState("")
    // const [sTime, setSTime] = useState(new Date())
    // const [eTime, setETime] = useState(new Date())
    const [foundAllVolunteering, setAllFoundVolunteering] = useState([])
    const [foundFilterVolunteering, setFiletrFoundVolunteering] = useState([])
    const [filters, setFiletrs] = useState(defaultFilters);
    const currentUser = JSON.parse(localStorage["user"])//useSelector((state) => state.users.currentUser);

    const getVolunteeringType = async () => {
        const { data } = await axios.get("/volunteerType")
        console.log(data)
        setVolunteerType(data)
    }
    // const getVolunteering = async () => {
    //   const { data } = await axios.get("/volunteering")
    //   setVolunteering(data)
    // }
    const getCity = async () => {
        const { data } = await axios.get("/city")
        console.log(data)
        setCity(data)
    }

    const getAllVolunteerings = async () => {
        let { data } = await axios.get("/volunteering/search")
        console.log("data", data)
        setAllFoundVolunteering(data)
        setFiletrFoundVolunteering(data.msg);
    }
    useEffect(() => {
        getVolunteeringType()
        getCity()
        getAllVolunteerings()
    }, [])
    const search = () => {
        const filterVol = foundAllVolunteering.msg.filter(v => {
            if (filters.type === '-1' || (filters.type && v.idVolunteerType._id === filters.type)) {
                if (filters.city === '-1' || (filters.city && v.idCity._id === filters.city)) {
                    if (filters.startDate === '-1' || (filters.startDate && new Date(v.SDate) >= filters.startDate)) {
                        if (filters.endDate === '-1' || (filters.endDate && new Date(v.NDate) <= filters.endDate)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
        setFiletrFoundVolunteering(filterVol);
    }
    const confirmVlunteering = () => {
        alert("aaaa")
    }
    const sendVolunteeringRequest = async () => {
        handleClose();
        const newVol = { ...selectedVolunteering, Status: 3, idVolunteerUser: currentUser?._id }
        console.log("selectedVolunteerin",selectedVolunteering._id)
        await axios.put(`/volunteering/${selectedVolunteering?._id}`, newVol);
        // console.log(currentUser)

    }
    const selectVolunteering = (item) => {
        setSelectedVolunteering(item);
        console.log(item);
        handleShow()
    }
    const onChangeFilter = (e, type) => {
        const newFilters = { ...filters };
        if (['startDate', 'endDate'].includes(type)) {
            newFilters[type] = e;
        } else {
            newFilters[type] = e.target.value;
        }
        setFiletrs(newFilters);
    }
    const clearFilters = () => {
        setFiletrFoundVolunteering(foundAllVolunteering.msg);
        setFiletrs(defaultFilters);
    }
    return (
        <Container className={'p-5 min-vh-100 bg-dark bg-opacity-50'}>
         
            <Row className={'py-5 justify-content-center p-3'}>
            <Col xs={6} className={"p-3 bg-light shadow-lg rounded-3"}>
                    <h2 className={'text-center'}>חיפוש התנדבויות</h2>
                    <Form>
                        <Form.Group controlId="formType">
                            <Form.Label>תבחר את סוג ההתנדבות הרצויה</Form.Label>
                            <Form.Select value={filters.type} onChange={(e) => onChangeFilter(e, 'type')}>
                                <option value="-1">בחר סוג התנדבות</option>
                                {VolunteerType &&
                                    VolunteerType.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.Name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formCity" className={'my-3'}>
                            <Form.Label>תבחר את העיר</Form.Label>
                            <Form.Select value={filters.city} onChange={(e) => onChangeFilter(e, 'city')}>
                                <option value="-1">בחר עיר</option>
                                {city &&
                                    city.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.Name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formStartDate" className={'my-3'}>
                            <Form.Label>זמן התחלה</Form.Label>&nbsp;
                            <DateTimePicker
                                onChange={(e) => onChangeFilter(e, 'startDate')}
                                value={filters.startDate === '-1' ? new Date() : filters.startDate}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEndDate" className={'my-3'}>

                            <Form.Label>זמן סיום</Form.Label>&nbsp;
                            <DateTimePicker
                                onChange={(e) => onChangeFilter(e, 'endDate')}
                                value={filters.endDate === '-1' ? new Date() : filters.endDate}
                            />
                        </Form.Group>
                        <ButtonGroup aria-label="Basic example" className={'my-3 justify-content-center w-100'}>
                            <Button variant="primary" onClick={search} className={'mx-3'}>
                                <i className="fas fa-search"></i> חיפוש
                            </Button>
                            <Button variant="secondary" onClick={clearFilters}>
                                <i className="fas fa-trash-alt"></i> ניקוי החיפוש
                            </Button>
                        </ButtonGroup>
                    </Form>
                </Col>
            </Row>

            <Row className="volunteering-cards-wrapper">
                {foundFilterVolunteering && foundFilterVolunteering.map(item =>
                    <Col xs={12} md={6} lg={4} key={item._id}>
                        <Card style={{ width: '18rem' }} id={item?._id} key={item?._id} className={'m-3'}>
                            <Card.Img variant="top" src={IMAGES_TYPES[item.idVolunteerType.Name]}
                                className={'image-fluid'} alt={item.idVolunteerType.Name} />
                            <Card.Body>
                                <Card.Title>{item.idVolunteerType.Name}</Card.Title>
                                <Card.Text>
                                    {item.Description}
                                </Card.Text>
                                <Card.Text>
                                    שעת התחלה:{new Date(item.SDate).toLocaleString()}
                                </Card.Text>
                                <Card.Text>
                                    שעת סיום:{new Date(item.NDate).toLocaleString()}
                                </Card.Text>
                                <Card.Text>
                                    עיר:{item.idCity.Name}
                                </Card.Text>
                                <Button variant="primary" onClick={() => {
                                    selectVolunteering(item)
                                }}>אני רוצה להתנדב</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            <>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>בקשתך להתנדבות זו תשלח למנהל , אישור ישלח לך במייל </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            בטל
                        </Button>
                        <Button variant="primary" onClick={sendVolunteeringRequest}>
                            אישור
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Container>


    )
}
export default SearchVolunteering

