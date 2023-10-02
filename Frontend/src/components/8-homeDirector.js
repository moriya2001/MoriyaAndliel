import React, { useState, useEffect } from "react";
import { Table, Container, Row } from 'react-bootstrap';
import VolunteeringsToApprove from "./VolunteeringsToApprove";
import UsersToApprove from "./UsersToApprove";
import {Modal} from 'react-bootstrap';

const HomeDirector = () => {
    const statuses = [
        {
            id: 1,
            name: 'approve'
        },
        {
            id: 2,
            name: 'not approve'
        },
        {
            id: 3,
            name: 'pending'
        }
    ];
    const getDate = (date) => date.slice(0, 10)
    const getHour = (date) => date.slice(11, 16)
    const [msg, setMsg] = useState('');
    return (<Container  className="align-items-center justify-content-center bg-light min-vh-100" aria-labelledby="contained-modal-title-vcenter">
        {/* <VolunteeringsToApprove setMsg={setMsg}/> */}
        <UsersToApprove setMsg={setMsg} />
        <Modal show={!!msg} onHide={() => setMsg('')} className="text-right text-white" centered>
            <Modal.Header closeButton className="bg-dark">
                    <Modal.Title>הודעה</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {msg}
                </Modal.Body>
            </Modal>
    </Container>

    )
}



export default HomeDirector
