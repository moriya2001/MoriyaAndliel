import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Button, Table, Col, Form, Row, Alert } from 'react-bootstrap';
const Volunteers = () => {
    //   const navigate = useNavigate()
    const [volunteer, setVolunteer] = useState([])
  
    //    const [volunteerType, setVolunteerType] = useState([])
    const getVolunteer = async () => {
        const { data } = await axios.get("/users")
        const vol = data.filter(v => v.IsApproved === 3)
        vol.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
        vol.sort((a, b) => String(a).localeCompare(String(b)))
        setVolunteer(vol)
    }

    //    const deleteVolunteering = async (id) => {
    //       const { data } = await axios.delete("/volunteering/" +id)
    //       getVolunteering()
    //    }
    // const updateVolunteering = async (id)=>{
    //    navigate("/updateVolunteer")
    // }
    //    const addVolunteering = async ()=>{
    //       navigate("/addVolunteering")
    //    }

    useEffect(() => {
        getVolunteer()
    }, [])
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={10} className={'p-3 mx-auto shadow-lg bg-light mt-5 rounded'}>
                        <h1>מתנדבים</h1>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>שם פרטי</th>
                                    <th>שם משפחה</th>
                                    <th>ת.ז</th>
                                    <th>טלפון</th>
                                    <th>אימייל</th>
                                    <th>מטבעות</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteer && volunteer.map((item) => {
                                    return <tr>
                                        <td></td>
                                        <td>{item.FirstName}</td>
                                        <td>{item.LastName}</td>
                                        <td>{item.Tz}</td>
                                        <td>{item.Phone}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.Coins}</td>
                                        {/* {volunteerTypeById(item.idVolunteerType)} */}
                                        {/* <td>{}</td> */}
                                        {/* <td><button onClick={()=>deleteVolunteering(item._id)}>מחיקה</button></td> */}
                                        {/* <td><button onClick={()=>updateVolunteering(item._id)}>עריכה</button></td> */}

                                    </tr>
                                })}

                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>

    )

}
export default Volunteers
