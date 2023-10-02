import React from "react";
import {Modal, Form, Button} from 'react-bootstrap'
import DateTimePicker from "react-datetime-picker";

const EditingModal = (props) => {
    const {item, setIsEditing , isEditing, setItem,handleUpdate} = props;
    const handleCancel = () => {
        setIsEditing(false);
    };
    return (
        <Modal show={isEditing} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>עריכת התנדבות</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId={`volunteeringType`}>
                        <Form.Label>סוג התנדבות</Form.Label>
                        <Form.Control type="text" defaultValue={item.idVolunteerType?.Name} onChange={(e) => {
                            setItem({...item, idVolunteerType: e.target.value})
                        }}/>
                    </Form.Group>
                    <Form.Group controlId={`startDate`}>
                        <Form.Label>תאריך התחלה</Form.Label>
                        <DateTimePicker value={new Date(item.SDate)}
                                        onChange={(e) => {
                                            setItem({...item, SDate: e.target.value})
                                        }}/>
                    </Form.Group>
                    <Form.Group controlId={`endDate`}>
                        <Form.Label>תאריך סיום</Form.Label>
                        <DateTimePicker value={new Date(item.NDate)}
                                        onChange={(e) => {
                                            setItem({...item, NDate: e.target.value})
                                        }}/>
                    </Form.Group>
                    <Form.Group controlId={`city`}>
                        <Form.Label>עיר</Form.Label>
                        <Form.Control type="text" defaultValue={item.idCity?.Name} onChange={(e) => {
                            setItem({...item, idCity: e.target.value})
                        }}/>
                    </Form.Group>
                    <Form.Group controlId={`address`}>
                        <Form.Label>רחוב</Form.Label>
                        <Form.Control type="text" defaultValue={item.Address} onChange={(e) => {
                            setItem({...item, Address: e.target.value})
                        }}/>
                    </Form.Group>
                    <Form.Group controlId={`description`}>
                        <Form.Label>תאור</Form.Label>
                        <Form.Control as="textarea" defaultValue={item.Description} onChange={(e) => {
                            setItem({...item, Description: e.target.value})
                        }}/>
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpdate}>
                        עדכן
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditingModal;
