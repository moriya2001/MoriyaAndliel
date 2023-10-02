import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';

const ProfileModal = ({ showModal, handleCloseModal, selectedVolunteer }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal} centered className="text-white rounded-3 shadow-lg" fullscreen={'xl-down'}>
            <Modal.Header closeButton className="bg-dark">
                <Modal.Title>
                    פרטי מתנדב: {selectedVolunteer?.FirstName} {selectedVolunteer?.LastName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
                <div className="d-flex justify-content-between">
                    <div>
                        <p>
                            <strong>שם פרטי:</strong> {selectedVolunteer?.FirstName}
                        </p>
                        <p>
                            <strong>שם משפחה:</strong> {selectedVolunteer?.LastName}
                        </p>
                        <p>
                            <strong>גיל:</strong> {selectedVolunteer?.Age}
                        </p>
                        <p>
                            <strong>מין:</strong> {selectedVolunteer?.Gender}
                        </p>
                        <p>
                            <strong>לבבות:</strong> {selectedVolunteer?.Coins || 0}
                        </p>
                        <p>
                            <strong>סטטוס מנהל:</strong>{' '}
                            {selectedVolunteer?.Status ? <i className={'fa fa-user'}></i> : <i className={'fa fa-user-shield'}></i>}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>כתובת אימייל:</strong> {selectedVolunteer?.Email}
                        </p>
                        <p>
                            <strong>תאריך לידה:</strong> {moment(selectedVolunteer?.Birthday).format('DD/MM/YYYY')}
                        </p>
                        <p>
                            <strong>טלפון:</strong> {selectedVolunteer?.Phone}
                        </p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <Button variant="secondary" onClick={handleCloseModal}>
                    סגור
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;