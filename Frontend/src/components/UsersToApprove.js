import React, { useEffect, useState } from 'react';
import {Table, Button, Row, Col, Alert} from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import {
    FETCH_ERROR,
    UPDATE_ERROR,
    APPROVED_STATUS,
    REJECTED_STATUS,
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID,
    EMAIL_USER_ID,
    APPROVED_SUCCESSFULLY,
} from './constanst';
const UsersToApprove = (props) => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const {setMsg} = props;
    const getPendingUsers = async () => {
        try {
            const {data} = await axios.get("/users/getPendingUsers");
            console.log(data)
            setPendingUsers(data)
        } catch (error) {
            setMsg(FETCH_ERROR);
        }
    }
    useEffect(() => {
        getPendingUsers()
    }, []);



    const updateStatus = async (id, isApproved) => {
        try {
            const selectedUser = pendingUsers.find((v) => v._id === id);
            const filteredApproves = pendingUsers.filter((v) => v._id !== id);
            await axios.put(`/users/updateUserApprove/${selectedUser._id}`, {isApproved});
            setPendingUsers(filteredApproves);
            const title = isApproved === APPROVED_STATUS ? 'אישור מתנדב' : 'הודעת סירוב';
            const noApproveContent = 'נפסלה מומעמדותך להתנדבות';
            const approvedContent = 'המשתמש נוצר בהצלחה במערכת\n תודה על הצטרפותך!!';
            emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, {
                to_user: selectedUser.FirstName,
                to_email: selectedUser.Email,
                title,
                content: isApproved === APPROVED_STATUS ? approvedContent : noApproveContent,
            }, EMAIL_USER_ID);
            setMsg(APPROVED_SUCCESSFULLY)
        } catch (error) {
            setMsg(UPDATE_ERROR);
        }

    }
    return<>
        <h2 className="text-center mb-4 rouded-3 p-3 mb-5 bg-white rounded">מתנדבים הממתינים לאישור</h2>
        {!pendingUsers.length && <Alert variant="info" className="text-center">אין מתנדבים הממתינים לאישור</Alert>}
        {pendingUsers.length && <>
        <Row>
            <Col xs={6} className={"p-5 mx-auto"}>
                <Table striped bordered responsive hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>שם מתנדב</th>
                            <th>גיל</th>
                            <th>טלפון</th>
                            <th>מייל</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingUsers.map((item, index) => {
                            const nowYear = new Date().getFullYear();
                            const age = nowYear - item.BirthYear;
                            return (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{`${item.FirstName} ${item.LastName}`}</td>
                                    <td>{age}</td>
                                    <td>{item.Phone}</td>
                                    <td>{item.Email}</td>
                                    <td>
                                    <div className={'mt-3'}>
                                        <Button className="btn btn-primary mx-2"
                                                onClick={() => updateStatus(item._id, 3)}>
                                            <i className="fas fa-check"></i>
                                        </Button>
                                        <Button className="btn btn-primary mx-2"
                                                onClick={() => updateStatus(item._id, 2)}>
                                            <i className="fas fa-times"></i>
                                        </Button>
                                    </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row></>}
    </>
}

export default UsersToApprove;