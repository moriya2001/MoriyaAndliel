import React, {useEffect, useState} from 'react';
import {Container, Row, Table, Col, Modal, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import moment from 'moment';
import {
    STATUSES, DATE_FORMATE,
    MAX_DESCRIPTION_LEN, FETCH_ERROR, UPDATE_ERROR,
    APPROVED_SUCCESSFULLY, EMAIL_SERVICE_ID, EMAIL_USER_ID
} from './constanst'
import ProfileModal from "./ProfileModal";
 const getDate = (date) => date.slice(0, 10)
 const getHour = (date) => date.slice(11, 16)

const VolunteerToApprove = (props) => {
    const [volunteeringVolunteer, setVolunteeringVolunteer] = useState([]);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [userToDisplay, setUserToDisplay] = useState(null);
    const {setMsg} = props;
    const getVolunteeringToVolunteer = async () => {
        try {
            const volunteersResponse = await axios.get('/volunteering/getPendingVolunteerings');
            const typesResponse = await axios.get('/volunteerType');

            const volunteers = volunteersResponse.data;
        //    const x= volunteers.filter(v=>v.Status!==3)
            const types = typesResponse.data;//volunteerType
console.log("volunteer",volunteers )
console.log("types",types )
            const volunteerTypesMap = {};

            types.forEach((type) => {
                volunteerTypesMap[type._id] = {
                    idVolunteerType: type,
                    volunteers: [],
                    users: {}
                };
            });
            volunteers.forEach((volunteer) => {
                const typeId = volunteer.idVolunteerType._id;
                if (volunteerTypesMap[typeId]) {
                    volunteerTypesMap[typeId].volunteers.push(volunteer);
                    console.log("volunteerTypesMap", volunteerTypesMap)
                    // Group users within each category
                    const userId = volunteer.idVolunteerUser?._id;
                     // check if user was pending and push him to the array
                     if (volunteer.idVolunteerUser?.Status === STATUSES.pending) {
                        if (!volunteerTypesMap[typeId].users[userId]) {
                            volunteerTypesMap[typeId].users[userId] = [];
                        }
                        volunteerTypesMap[typeId].users[userId].push(volunteer.idVolunteerUser);
                    }
                    volunteerTypesMap[typeId].users[userId].push(volunteer.idVolunteerUser);
                }
            });

            for (const typeId in volunteerTypesMap) {
                const usersObj = volunteerTypesMap[typeId].users;
                for (const userId in usersObj) {
                    usersObj[userId].sort((a, b) => a.idVolunteerUser?.FirstName.localeCompare(b.idVolunteerUser?.FirstName));
                }
            }

            const groupedVolunteersArray = Object.values(volunteerTypesMap);
            setVolunteeringVolunteer(groupedVolunteersArray);
            const initialOpenSections = {};
            volunteeringVolunteer.forEach((volunteer, index) => {
                initialOpenSections[index] = false;
            });
            setOpenSections(initialOpenSections);
        } catch (error) {
            setMsg(FETCH_ERROR);
        }
    };

    // const updateStatus = async (id) => {
    //     console.log("id", id)
    //     // const selectedVol = volunteeringTovolunteer.find(v => v._id=== id);
    //     // console.log("selectedVol", selectedVol)
    //     console.log("volunteeringtovolenteer", volunteeringTovolunteer)
    //     const selectedVol=Object.values(volunteeringTovolunteer.users).find(v=>v._id===id)
    //     // const selectedVol = volunteeringTovolunteer.find(volunteer => {
    //     //     return Object.keys(volunteer.users).includes(id);
    //     //   });
    //       console.log("selectedVol", selectedVol)
    //     //   if (!selectedVol) {
    //     //     console.log(`User with ID ${id} not found in volunteeringTovolunteer array.`);
    //     //     return;
    //     //   }
    //     const filteredApproves = volunteeringTovolunteer.filter(v => v._id !== id);
    //     console.log("filteredApproves",filteredApproves)
    //     console.log("selectedVol._id",selectedVol.users.id)
    //     await axios.put(`http://localhost:8000/volunteering/updateVolunteeringApprove/${selectedVol._id}`)
    //     setVolunteeringTovolunteer(filteredApproves);
    //     emailjs.send("service_7rzvtwg", "approve", {
    //         to_user: selectedVol.idVolunteerUser?.FirstName,
    //         vol_type: selectedVol.idVolunteerType.Name,
    //         vol_adress: selectedVol.Address,
    //         vol_date: moment(selectedVol.SDate).format('DD-MM-YYYY HH:mm'),
    //         vol_endDate: moment(selectedVol.NDate).format('DD-MM-YYYY HH:mm'),
    //         userEmail: selectedVol.idVolunteerUser.Email,
    //     }, 'cubY8Y-jimY937YfV');
    //     console.log("url", `http://localhost:8000/users/${selectedVol.idVolunteerUser._id}/volunteer-approved`)
    //     axios.put(`http://localhost:8000/users/${selectedVol.idVolunteerUser._id}/volunteer-approved`)
    // }
    const handleToggleSection = (index) => {
        setOpenSections((prevOpenSections) => ({
            ...prevOpenSections,
            [index]: !prevOpenSections[index],
        }));
    };
  
    const updateStatus = async (id) => {
        try {
            // Update the volunteer status to "approve"
            await axios.put(`/volunteering/${id}`, {"Status": STATUSES.approved});
            // Find the volunteer with the given id and update the status in the local state
            setVolunteeringVolunteer((prevVolunteers) =>
                prevVolunteers.map((volunteer) =>
                    volunteer._id === id ? {...volunteer, "Status": STATUSES.approved} : volunteer
                )
            );
  console.log("VolunteeringVolunteer",volunteeringVolunteer)
            // Send the approval email
            console.log("selected ", selectedVolunteer);
            const selectedVol = selectedVolunteer?.volunteer;
            const user = selectedVolunteer?.users[id]
            console.log("user", user[0].FirstName)
            if (!selectedVol || !user) {
                setMsg(UPDATE_ERROR);
                return;
            }
            try {
                await emailjs.send(
                    EMAIL_SERVICE_ID, 'approve', {
                        to_user: user[0]?.FirstName,
                        vol_type: selectedVol.idVolunteerType.Name,
                        vol_address: selectedVol.Address,
                        vol_date: moment(selectedVol.SDate).format(DATE_FORMATE),
                        vol_endDate: moment(selectedVol.NDate).format(DATE_FORMATE),
                        userEmail: user[0].Email,
                    }, EMAIL_USER_ID
                );
                        // update the users (remove the user that was approved)
                        setSelectedVolunteer({
                            ...selectedVolunteer,
                            users: selectedVolunteer?.users[id].filter((user) => user._id !== id)
                        });
                        // update the volunteers (remove the user that was approved)
                        setVolunteeringVolunteer((prevVolunteers) =>
                            prevVolunteers.map((volunteer) =>
                                volunteer._id === selectedVol._id ? {...volunteer, users: selectedVolunteer.users} : volunteer
                            ));
                        setMsg(APPROVED_SUCCESSFULLY);
            } catch (error) {
                setMsg(error.message)
            }
            axios.put(`http://localhost:8000/users/${user[0]._id}/volunteer-approved`)
           
        } catch (error) {
            console.log(error);
            setMsg(UPDATE_ERROR);
        }
    }
    

    useEffect(() => {
        getVolunteeringToVolunteer();
    }, []);

    // Group volunteers by user ID
    const volunteersByUser = volunteeringVolunteer.reduce((groups, volunteer) => {
        const userId = volunteer.idVolunteerUser?._id;
        if (!groups[userId]) {
            groups[userId] = [];
        }
        groups[userId].push(volunteer);
        return groups;
    }, {});

    const handleOpenModal = (users, volunteer) => setSelectedVolunteer({users: users, volunteer: volunteer});
    const handleCloseModal = () => setUserToDisplay(null);
    const handleShowProfile = (user) => setUserToDisplay(user);

    return (
        <Container className="align-items-center justify-content-center bg-light min-vh-100">
            <h2 className="text-center mb-4 rounded-3 p-3 mb-5 bg-white rounded">התנדבויות ממתינות לאישור</h2>
            <Button className={'btn-sm shadow-lg mx-5'} onClick={() => setOpenSections((prevOpenSections) => {
                const allOpen = Object.values(prevOpenSections).every((isOpen) => isOpen);
                const newOpenState = Object.keys(prevOpenSections).reduce((acc, index) => {
                    acc[index] = !allOpen;
                    return acc;
                }, {});
                return newOpenState;
            })}>
                {/* {Object.values(openSections).every((isOpen) => isOpen) ? "Collapse All" : "Expand All"} */}
            </Button> 
            {/* <Row> */}
        {/* </Row> */}
            <Row>
                <Col xs={10} className={'p-5 mx-auto'}>
                    <>
                        {volunteeringVolunteer.map((volunteer, index) => {
                            return (
                                <section key={index}>
                                    <h4 className={'text-center'}>{volunteer.idVolunteerType?.Name}
                                    </h4>
                                    <Button size={'sm'} onClick={() => handleToggleSection(index)} variant="secondary">
                                        <i className={`fa fa-${openSections[index] ? 'minus' : 'plus'}`}></i>
                                    </Button>
                                    {openSections[index] && (
                                        <VolunteerTable volunteer={volunteer} handleOpenModal={handleOpenModal}/>)}
                                    <hr/>
                                </section>
                            );
                        })}
                    </>
                </Col>
            </Row>
            <VolunteerModal selectedVolunteer={selectedVolunteer} onHide={() => setSelectedVolunteer(null)}
                            handleOpenModal={handleShowProfile} updateStatus={updateStatus}/>
            <ProfileModal handleCloseModal={handleCloseModal} showModal={!!userToDisplay}
                          selectedVolunteer={userToDisplay}/>

        </Container>
    );
};
const VolunteerModal = ({selectedVolunteer, handleOpenModal, updateStatus, onHide}) => {
    return (
        <Modal show={!!selectedVolunteer} onHide={onHide}>
            <Modal.Body>
                <Modal.Title>רשימת המתנדבים</Modal.Title>
                <Table striped color={'dark'}>
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
                    {selectedVolunteer &&
                        Object.values(selectedVolunteer.users).map(([item, key], index) => (
                            <tr key={index + item.FirstName}>
                                <td>{index + 1}</td>
                                <td>{item?.Name}</td>
                                <td>{item.FirstName}</td>
                                <td>{2023-item.BirthYear}</td>
                                <td>{item.Gender}</td>
                                <td>{item.Coins || 0}</td>
                                <td><Button
                                    variant="light"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleOpenModal(item)}
                                ><i className="fa fa-light fa-user fa-sm"></i>
                                </Button></td>
                                <td><Button
                                    variant="primary"
                                    className="btn btn-primary btn-sm btn-light"
                                    onClick={() => updateStatus(item._id)}
                                ><i className={'fa fa-check fa-sm'}></i>
                                </Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}

const VolunteerTable = ({volunteer, handleOpenModal}) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>סוג התנדבות</th>
                <th>תאריך התחלה</th>
                <th>שעת התחלה</th>
                <th>תאריך סיום</th>
                <th>שעת סיום</th>
                <th>עיר</th>
                <th>רחוב</th>
                <th>תאור</th>
                <th>צפייה</th>
            </tr>
            </thead>
            <tbody>
            {volunteer.volunteers.map((item, index) => {
                return (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.idVolunteerType?.Name}</td>
                        <td>{getDate(item.SDate)}</td>
                        <td>{getHour(item.SDate)}</td>
                        <td>{getDate(item.NDate)}</td>
                        <td>{getHour(item.NDate)}</td>
                        <td>{item.idCity?.Name}</td>
                        <td>{item.Address}</td>
                        <td>
                            {item.Description?.slice(0, MAX_DESCRIPTION_LEN)}{' '}
                            {item.Description?.length > MAX_DESCRIPTION_LEN ? '...' : ''}
                        </td>
                        <td>
                            <Button
                                variant="light"
                                className="btn btn-primary btn-sm"
                                onClick={() => handleOpenModal(volunteer.users, item)}
                            >
                                <i className="fa fa-inbox"></i>
                            </Button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </Table>
    )
}
export default VolunteerToApprove;