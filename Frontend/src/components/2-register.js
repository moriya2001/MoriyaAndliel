import react from "react"
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert, Container } from "react-bootstrap";

const Register = () => {
    const [user, setUser] = useState({})
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [msg, setMsg] = useState("");
    const [afterRegister, setAfterRegister] = useState(false);
    const validateStatus = (status) => status >= 200 && status < 300;
    // const register = async()=>{
    //      const {data}= await axios.post("/users" ,user)
    //         navigate("/login")
    //  }
    const register = async () => {
        if (validateForm()) {
            try {
                await axios.post('/users', user, { validateStatus });
                // navigate('/login');
                setAfterRegister(true);
            } catch (error) {
                setMsg(error);
            }
        }
    };
    const validateForm = () => {
        const newErrors = {};
        // Check for required fields
        if (!user.FirstName) newErrors.FirstName = 'שם פרטי הוא שדה חובה';
        if (!user.LastName) newErrors.LastName = 'שם משפחה הוא שדה חובה';
        if (!user.Email) newErrors.Email = 'אימייל הוא שדה חובה';
        if (!user.Password) newErrors.Password = 'סיסמא הוא שדה חובה';
        if (!user.Phone) newErrors.Phone = 'מספר נייד הוא שדה חובה';
        if (!user.Tz) newErrors.Tz = 'תעודת זהות הוא שדה חובה';


        if (user.Password.length < 8)
            newErrors.Password = 'סיסמא חייבת להכיל לפחות 8 תווים';

        // Check name length (between 3 and 20 characters)
        const nameRegex = /^.{2,20}$/;
        if (!nameRegex.test(user.FirstName))
            newErrors.FirstName = 'שם פרטי חייב להיות בין 2 ל-20 תווים';
        if (!nameRegex.test(user.LastName))
            newErrors.LastName = 'שם משפחה חייב להיות בין 2 ל-20 תווים';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Returns true if there are no errors
    };

    return (
        <Container className="p-3 my-5 d-flex flex-column w-50">
            {msg && <Alert variant="danger">{msg}</Alert>}
            {!afterRegister && <Form>
                {/* FirstName */}
                <Form.Group className="mb-4" controlId="formFirstName">
                    <Form.Label>שם פרטי *</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
                        isInvalid={!!errors.FirstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.FirstName}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* LastName */}
                <Form.Group className="mb-4 my-5" controlId="formLastName" >
                    <Form.Label>שם משפחה *</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setUser({ ...user, LastName: e.target.value })}
                        isInvalid={!!errors.LastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.LastName}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-4 my-5" controlId="formEmail">
                    <Form.Label>אימייל *</Form.Label>
                    <Form.Control
                        type="email"
                        onChange={(e) => setUser({ ...user, Email: e.target.value })}
                        isInvalid={!!errors.Email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Email}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-4 my-5" controlId="formPassword">
                    <Form.Label>סיסמא *</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setUser({ ...user, Password: e.target.value })}
                        isInvalid={!!errors.Password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Password}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Tz */}
                <Form.Group className="mb-4 my-5" controlId="formTz">
                    <Form.Label>ת.ז *</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setUser({ ...user, Tz: e.target.value })}
                        isInvalid={!!errors.Tz}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Tz}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* BirthYear */}
                <Form.Group className="mb-4 my-5" controlId="formBirthYear">
                    <Form.Label>שנת לידה *</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setUser({ ...user, BirthYear: e.target.value })}
                        isInvalid={!!errors.BirthYear}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.BirthYear}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Phone */}
                <Form.Group className="mb-4 my-5" controlId="formPhone">
                    <Form.Label>מס טלפון *</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setUser({ ...user, Phone: e.target.value })}
                        isInvalid={!!errors.Phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.Phone}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Status */}
                <Form.Group className="d-flex justify-content-center mb-4 my-5">
                    <Form.Check
                        type="checkbox"
                        label="האם אתה מתנדב?"
                        onChange={(e) => setUser({ ...user, Status: e.target.checked })}
                    />
                </Form.Group>

                <Button className="mb-4 w-100" variant="primary" onClick={register}>
                    הירשם
                </Button>
            </Form>}
            {afterRegister && <div>בקשתך נשלחה למנהל לאישור, תקבל הודעה למייל על סטטוס הבקשה.</div>}
        </Container>
    );
};
export default Register
