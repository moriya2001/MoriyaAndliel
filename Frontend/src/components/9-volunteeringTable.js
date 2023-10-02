import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Table, Col, Form, Row, Alert } from 'react-bootstrap';
import EditingModal from "./EditingModal";
import { MAX_DESCRIPTION_LEN } from './constanst'



const VolunteeringTable = () => {
    const [msg, setMsg] = useState('');
    const [volunteering, setVolunteering] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [volunteerType, setVolunteerType] = useState([]);
    const [filteredVolunteering, setFilteredVolunteering] = useState([]);
    const [searchType, setSearchType] = useState('');
    const [searchDate, setSearchDate] = useState(new Date().toISOString().split('T')[0])
    const [item, setItem] = useState({});//update volunteer


    const sortByIncOrderByDate = (data) => data.sort((a, b) => new Date(a.SDate) - new Date(b.SDate));
    // const filterByCurrentDate = (data) => data.filter((item) => item.SDate.slice(0, 10) >= new Date().toISOString().slice(0, 10));
    const getVolunteering = async () => {
        let { data } = await axios.get(`/volunteering`);
        data = sortByIncOrderByDate(data);
        // data = sortByIncOrderByDate(filterByCurrentDate(data));
        setVolunteering(data);
        setFilteredVolunteering(data);
    };

    const getDate = (date) => date.slice(0, 10)
    const getHour = (date) => date.slice(11, 16)

    const deleteVolunteering = async (id) => {
        try {
            await axios.delete(`/volunteering/${id}`);
            const filteredVols = volunteering.filter((v) => v._id !== id);
            setVolunteering(filteredVols);
            setFilteredVolunteering(filteredVolunteering.filter((v) => v._id !== id));
            setMsg('ההתנדבות נמחקה בהצלחה');
        } catch (e) {
            setMsg(e.message);
        }
    };


    const handleEdit = (item) => {
        console.log('editing')
        setIsEditing(true);
        setItem(item);
    };



    useEffect(() => {

        const getVolunteerType = async () => {
            const { data } = await axios.get('/volunteerType');
            setVolunteerType(data);
        };
        getVolunteering();
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
            filteredData = filteredData.filter((item) => new Date(item.SDate) >= currentDate);
            sortByIncOrderByDate(filteredData)
        }
        setFilteredVolunteering(filteredData);
    };

    const handleUpdate = async () => {
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
            setMsg(e.message);
        }
    };



    return (
        <Container>
            <Row>
                <Col xs={10} className={'p-3 mx-auto shadow-lg bg-light mt-5 rounded'}>
                    <h1> התנדבויות</h1>
                    <>
                        <Form>
                            <Row>
                                <Form.Group controlId="searchType" className={'col-6'}>
                                    <Form.Label>חיפוש לפי סוג התנדבות:</Form.Label>
                                    <Form.Select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="" disabled>בחר סוג התנדבות</option>
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
                                <Form.Group controlId="searchButton" className={'my-2'}>
                                    <Button variant="primary" onClick={handleSearch} size={"sm"}
                                        disabled={!(searchDate || searchType)}>
                                        <i className={'fa fa-search'}></i>
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
                                <th></th>
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
                                    <td>{item.Description}</td>
                                    {!isPast && <>
                                        <td>
                                            <Button size='sm' variant={'danger'} onClick={() => deleteVolunteering(item._id)}>
                                                <i className={'fa fa-times'}></i></Button>
                                        </td>
                                        <td>
                                            <Button size='sm' onClick={() => handleEdit(item)}>
                                                <i className={'fa fa-edit'}></i></Button>
                                        </td>

                                    </>}
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    <a href={'/addVolunteering'} className={'btn shadow-lg border-info'}><i className={'fa fa-add'}></i></a>

                    <EditingModal item={item} setIsEditing={setIsEditing} isEditing={isEditing} setItem={setItem}
                        handleUpdate={handleUpdate} />
                </Col>
            </Row>
        </Container>
    );
};

export default VolunteeringTable;


