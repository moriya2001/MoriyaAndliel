import React, {useState} from 'react';
import {Table, Button, Container} from 'react-bootstrap';
import ProfileModal from "./ProfileModal";

const VolunteerTable = ({volunteers, user, updateStatus}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const handleOpenModal = (volunteer) => {
        setSelectedVolunteer(volunteer);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container>
            <Table striped bordered responsive hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>התנדבות</th>
                    <th>מתנדב</th>
                    <th>גיל</th>
                    <th>מין</th>
                    <th>לבבות</th>
                    <th>צפייה בפרטים</th>
                    <th>אישור</th>
                </tr>
                </thead>
                <tbody>
                {volunteers.map((item, index) => {
                    return (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.idVolunteerType.Name}</td>
                            <td>{item.idVolunteerUser?.FirstName}</td>
                            <td>{item.idVolunteerUser?.Age}</td>
                            <td>{item.idVolunteerUser?.Gender}</td>
                            <td>{item.idVolunteerUser?.Coins || 0}</td>
                            <td>
                                <Button variant="light" className="btn btn-primary btn-sm"
                                        onClick={() => handleOpenModal(item)}
                                >
                                    <i className="fa fa-light fa-user fa-sm"></i>
                                </Button>
                            </td>
                            <td>
                                <Button
                                    variant="primary"
                                    className="btn btn-primary btn-sm btn-light"
                                    onClick={() => updateStatus(item._id)}
                                >
                                    <i className={'fa fa-check fa-sm'}></i>
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            <ProfileModal handleCloseModal={handleCloseModal} showModal={showModal} selectedVolunteer={selectedVolunteer.idVolunteerUser}/>
        </Container>
    );
};

export default VolunteerTable;