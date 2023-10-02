import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Col, Button, Form, Container, Image, Row, Modal, Alert } from "react-bootstrap";

const SelectGifts = () => {
    const [msg, setMsg] = useState("")
    const [isDone, setIsDone] = useState(false)
    const user = JSON.parse(localStorage['user']);
    const [userVolunteer, setUserVolunteer] = useState({})
    const [gift, setGift] = useState([])
    const [users, setUsers] = useState()
    const [selectedGift, setSelectedGift] = useState(null)
    const clear = () => {
        setSelectedGift(null)
        setMsg("")
    }
    const getUser = async () => {
        const { data } = await axios.get("/users")
        let id = user._id
        const data2 = data.filter(i => i._id === id)
        //    setUsers(data2)
        setUsers(data2[0].Coins)
    }
    const getGift = async () => {
        const { data } = await axios.get("/gift")
        setGift(data)
        console.log(data)

    }
    const buyGift = async (selectedGift) => {
        if (user.Coins >= selectedGift.Cost) {
            console.log(selectedGift.Cost)
            user.Coins -= selectedGift.Cost;//update in db
            await axios.put(`/users/${user._id}`, user)
            setUserVolunteer(user)
            console.log(user)
            setMsg(`תודה רבה על הקניה ,המשלוח יגיע בקרוב לכתובת ${selectedGift.address}`)
            setIsDone(true)
            selectedGift = null;

        } else {
            setMsg("אין לך מספיק מטבעות");
        }
    }
    useEffect(() => {
        getGift()
        getUser()
    }, []);

    return (
        <div className="mt-5 container-fluid mx-auto bg-light rounded border border-dark">
            <h1 className="text-center my-5"> בחירת מתנות &#128522;</h1>
            <h3 className="text-center my-5"> יש לך {users} &#128176;</h3>
            {/* {console.log(user.Coins)} */}
            <Row>
                {gift ? gift.map((item) =>
                    <Col sm={6} md={3} key={item._id} className={"mx-5 my-3"}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.Url} className={" mx-auto"} alt={item.Name} />
                            <Card.Body>
                                <Row>
                                    <Col sm={6}>
                                        <Row>
                                            <Card.Text>
                                                <label htmlFor={item._id}>{item.Name}</label>
                                            </Card.Text>
                                        </Row>
                                    </Col>
                                    <Col sm={6} className={"text-start"}>

                                        {item.Cost} <i className="fas fa-coins fa-2x"></i>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="primary" onClick={() => {
                                    setSelectedGift(item)
                                }}>קנה</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
                    : <h1>אין מתנות זמינות</h1>}
            </Row>
            <Modal show={selectedGift} onHide={() => {
                setSelectedGift(null);
                setMsg("");
            }}>
                <Modal.Header closeButton>
                    <Modal.Title> קניית מתנה </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <Image src={selectedGift?.Url} alt={selectedGift?.Name} fluid />
                                <p>מטבעות: {selectedGift?.Cost} <i className="fas fa-coins fa-lg"></i></p>
                            </Col>
                            {!isDone &&
                                <Col sm={6}>
                                    <p>{selectedGift?.Name}</p>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>כתובת מגורים</Form.Label>
                                        <Form.Control type="text" placeholder="הכנס כתובת מגורים" required
                                            value={selectedGift?.address} onChange={(e) => {
                                                selectedGift.address = e.target.value
                                            }} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className={'my-2'} size={'sm'} disabled={msg !== ""}
                                        onClick={() => {
                                            buyGift(selectedGift)
                                        }}>
                                        <i className="fas fa-shopping-cart"></i> קנה</Button>
                                    {/* {console.log(user.Coins)} */}
                                </Col>}

                        </Row>
                        <Row>
                            <Alert variant="success" show={msg !== ""}>
                                {msg}
                            </Alert>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit" onClick={clear}>
                        סגור
                    </Button>

                </Modal.Footer>
            </Modal>
            {
                user.Status ? "" : <a href={'/addGift'} className={'btn shadow-lg border-info'}><i className={'fa fa-add'}></i></a>

            }

        </div>
    )
}

export default SelectGifts;
