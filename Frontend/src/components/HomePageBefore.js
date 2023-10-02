import React, { useEffect, useState } from "react";
import animal from '../images/animal.jpg';
import food from '../images/food.jpg';
import helpFamily from '../images/helpFamily.jpg';
import old from '../images/old.jpg';
import patsient from '../images/patsient.jpg';
import './7-UserHome.css'
import './HomePageBefore.css'
import axios from "axios"
import { Row, Card } from "react-bootstrap";
import HelpMe from '../images/HelpMe.png'
import Truma from '../images/Truma.png'
import whyHelpMe from '../images/whyHelpMe.png'
import why from '../images/why.png'
const ITEMS = [
  
    {
        "title": "חיות",
        "image": animal,
        "description": "כלבים וחתולים זקוקים לך"
    },
    {
        "title": "מזון",
        "image": food,
        "description": "מזון למשפחות נזקקות"
    },
    {
        "title": "עזרה למשפחות",
        "image": helpFamily,
        "description": "עזרה למשפחות נזקקות"
    },
    {
        "title": "קשישים",
        "image": old,
        "description": "קשישים זקוקים לך"
    },
    {
        "title": "חולה",
        "image": patsient,
        "description": "חולים זקוקים לך"
    },
]

const HomePageBefore = () => {
    const [volunteering, setVolunteering] = useState([]);
    useEffect(() => {
        getVolunteering()
    }, []);
    const getVolunteering = async () => {
        const { data } = await axios.get("/volunteerType")
        console.log(data)
        setVolunteering(data)
        // console.log(volunteering)
    }


    return (
        <div className="container-fluid bg-white min-vh-100 p-5">
            <h2 className="text-center">הדרך הקלה ביותר להתנדב</h2>
            <div className="PageBody"></div>
            <Row className=' my-5 text-center'>
                {ITEMS.map((image, index) => (
                    <div className="col-md-6" key={index}>
                        <Card className="mb-4 shadow-sm">
                            <div className={"card-img-container"}>
                                <Card.Img
                                    className="bd-placeholder-img card-img-top img-fluid h-100 w-100"
                                    src={image.image}
                                    alt={image.title}

                                />
                            </div>
                            <div className="card-body">
                                <p className="card-text">{image.description}</p>
                            </div>
                        </Card>

                    </div>
                ))}
            </Row>
        </div>
    );

}
export default HomePageBefore;

