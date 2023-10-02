import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Row, Alert } from 'react-bootstrap';
import DateTimePicker from "react-datetime-picker";
import Modal from "react-bootstrap/Modal";
const MAX_DESCRIPTION_LEN = 100;
const MyVolunteerings = () => {
    const [msg, setMsg] = useState('');
    const [volunteering, setVolunteering] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [volunteerType, setVolunteerType] = useState([]);
    const [filteredVolunteering, setFilteredVolunteering] = useState([]);
    const [searchType, setSearchType] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [item, setItem] = useState({});//update volunteer
    const user = JSON.parse(localStorage['user']);

    const sortByIncOrderByDate = (data, date = new Date()) => {
        // let upcomingVolunteerings = data.filter((item) => new Date(item.SDate) > date);
        const upcomingVolunteerings = data.sort((a, b) => new Date(a.SDate) - new Date(b.SDate));
        return upcomingVolunteerings;
    }
    const getVolunteering = async () => {
        let { data } = await axios.get(`/volunteering/getVolunteeringsByUserId/${user._id}`);
        data = sortByIncOrderByDate(data);
        setVolunteering(data);
        setFilteredVolunteering(data);
    };

    const deleteVolunteering = async (id) => {
        try {
            const userId = user._id;
            await axios.put(`/volunteering/updateVolunteeringRemoveUser/${id}`, { userId });
            const filteredVols = volunteering.filter((v) => v._id !== id);
            setVolunteering(filteredVols);
            setFilteredVolunteering(filteredVolunteering.filter((v) => v._id !== id));
            setMsg('ההתנדבות נמחקה בהצלחה');
        } catch (e) {
            setMsg(e.message);
        }
    };
    // const handleEdit = (item) => {
    //     setIsEditing(true);
    //     setItem(item);
    // };
    /*  const handleCancel = () => {
         setIsEditing(false);
     }; */
    useEffect(() => {
        getVolunteering();
        const getVolunteerType = async () => {
            const { data } = await axios.get('/volunteerType');
            setVolunteerType(data);
        };
        getVolunteerType()
    }, []);
    const handleSearch = () => {
        let filteredData = volunteering;
        if (searchType !== '') {
            if (searchType === 'all') {
                filteredData = getVolunteering()
            } else {
                filteredData = filteredData.filter((item) => item.idVolunteerType?.Name === searchType);
            }
        }
        if (searchDate !== '') {
            const currentDate = new Date(searchDate);
            filteredData = sortByIncOrderByDate(filteredData, currentDate)
        }
        setFilteredVolunteering(filteredData);
    };
    /*  const handleUpdate = async () => {
         try {
             await axios.put(`/volunteering/updateVolunteer/${item._id}`, item);
             let index = volunteering.findIndex((v) => v._id === item._id);
             volunteering[index] = item;
             setVolunteering(volunteering);
             index = filteredVolunteering.findIndex((v) => v._id === item._id);
             filteredVolunteering[index] = item;
             setFilteredVolunteering(filteredVolunteering);
             setMsg('התנדבות עודכנה בהצלחה');
             setIsEditing(false);
         } catch (e) {
             console.log(e);
         }
     }; */
    return (
        <Container className="p-3 shadow-lg bg-light w-75 mt-5 rounded">
            <h1>התנדבויות שלי</h1>
            <>
                <Form>
                    <Row>
                        <Form.Group controlId="searchType" className={'col-6'}>
                            <Form.Label>חיפוש לפי סוג התנדבות:</Form.Label>
                            <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                <option value="" disabled={false}>בחר סוג התנדבות</option>
                                <option value={"all"}>הכל</option>
                                {volunteerType.map((type) => (
                                    <option key={type._id} value={type.Name}>
                                        {type.Name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="searchDate" className={'col-6'}>
                            <Form.Label>חיפוש לפי תאריך:</Form.Label>
                            <Form.Control type="date" value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="searchButton">
                            <Button variant="primary" onClick={handleSearch}
                                disabled={!(searchDate || searchType)}>
                                חיפוש
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </>
            <Alert variant="success" show={msg !== ''} onClose={() => setMsg('')} dismissible>
                {msg}
            </Alert>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>סוג התנדבות</th>
                        <th>תאריך התחלה</th>
                        <th>תאריך סיום</th>
                        <th>עיר</th>
                        <th>רחוב</th>
                        <th>תאור</th>
                        {/* <th>מחיקה</th> */}
                        {/* <th>עריכה</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredVolunteering.map((item, index) => {
                        const isPast = (new Date(item.SDate)) < (new Date());
                        return <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.idVolunteerType?.Name}</td>
                            <td>{item.SDate}</td>
                            <td>{item.NDate}</td>
                            <td>{item.idCity?.Name}</td>
                            <td>{item.Address}</td>
                            <td>{item.Description.substring(0, MAX_DESCRIPTION_LEN)} {item.Description.length > MAX_DESCRIPTION_LEN ? "..." : ""}</td>
                            <td>
                                {!isPast && <Button size='sm' onClick={() => deleteVolunteering(item._id)}>בטל</Button>}
                            </td>
                            {/* <td>
                                <Button size='sm' onClick={() => handleEdit(item)}>עריכה</Button>
                            </td> */}
                        </tr>
                    })}
                </tbody>
            </Table>
            {/* <Modal show={isEditing} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>עריכת התנדבות</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId={`volunteeringType`}>
                            <Form.Label>סוג התנדבות</Form.Label>
                            <Form.Control type="text" defaultValue={item.idVolunteerType?.Name} onChange={(e) => {
                                setItem({ ...item, idVolunteerType: e.target.value })
                            }} />
                        </Form.Group>
                        <Form.Group controlId={`startDate`}>
                            <Form.Label>תאריך התחלה</Form.Label>
                            <DateTimePicker value={new Date(item.SDate)}
                                onChange={(e) => {
                                    setItem({ ...item, SDate: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group controlId={`endDate`}>
                            <Form.Label>תאריך סיום</Form.Label>
                            <DateTimePicker value={new Date(item.NDate)}
                                onChange={(e) => {
                                    setItem({ ...item, NDate: e.target.value })
                                }} />
                        </Form.Group>
                        <Form.Group controlId={`city`}>
                            <Form.Label>עיר</Form.Label>
                            <Form.Control type="text" defaultValue={item.idCity?.Name} onChange={(e) => {
                                setItem({ ...item, idCity: e.target.value })
                            }} />
                        </Form.Group>
                        <Form.Group controlId={`address`}>
                            <Form.Label>רחוב</Form.Label>
                            <Form.Control type="text" defaultValue={item.Address} onChange={(e) => {
                                setItem({ ...item, Address: e.target.value })
                            }} />
                        </Form.Group>
                        <Form.Group controlId={`description`}>
                            <Form.Label>תאור</Form.Label>
                            <Form.Control as="textarea" defaultValue={item.Description} onChange={(e) => {
                                setItem({ ...item, Description: e.target.value })
                            }} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleUpdate}>
                            עדכן
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal> */}
        </Container>
    );
};
export default MyVolunteerings;