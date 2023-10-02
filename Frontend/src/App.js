import './App.css';
import Register from './components/2-register';
import UserHomepage from './components/7-UserHome';
import BasicExample from './components/NavbarApp';
// import ChooseSecioty from './components/choose';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './components/1-login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//fontawesome
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Row } from "react-bootstrap";
import React, { Suspense } from "react";
import  { AdminSecurity } from "./components/PrivateRoutes";
import NavbarApp from "./components/NavbarApp";
import OrderDetails2 from './components/3-DetailsVolunteering';
import GridComplexExample from './components/4-addVolunteering';
import SearchVolunteering from './components/6-searchVolunteer';
import AddVolunteering from './components/4-addVolunteering';
import VolunteeringTable from './components/9-volunteeringTable';
import HomeDirector from './components/8-homeDirector';
import User from './components/10-users';
import HomePageBefore from './components/HomePageBefore';
import Definitions from './components/Definitions';
import UpdateProfil from './components/UpdateProfile';
import MyVolunteerings from './components/11-myVolunteerings';
import DefinitionsDirector from './components/DefinitionDirector';
import Volunteers from './components/Volunteers';
import SelectGifts from "./components/SelectGifts";
import { PrivateRoutes, AuthenticationRoutes } from "./components/PrivateRoutes";
import AddGift from './components/addGift';
import About from './components/About';

function App() {
    return (
        <div className="App min-vh-100">
            <Row>
                <NavbarApp />
            </Row>
            <Row>
                <Routes>
                    <Route path="/" exact element={<HomePageBefore />} />
                    <Route exact element={<PrivateRoutes />}>
                        <Route path="/updateProfile" element={<UpdateProfil />} />
                        <Route path="/homeUser" element={<UserHomepage />} />
                        <Route path="/about" element={<About />} />

                        {/* <Route path="/homeDirector" element={<HomeDirector />} /> */}
                        <Route exact element={<AdminSecurity/>}>
                            <Route path="homeDirector" element={<HomeDirector/>}/>
                        </Route>
                        <Route path='/search' element={<SearchVolunteering />} />
                        <Route path='/Definitions' element={<Definitions />} />
                        <Route path='/DefinitionsDirector' element={<DefinitionsDirector />} />
                        <Route path='/gifts' element={<SelectGifts />} />
                        <Route path='addVolunteering' element={<AddVolunteering />} />
                        <Route path='addGift' element={<AddGift />} />

                        <Route path='volunteeringTable' element={<VolunteeringTable />} />
                        <Route path='myVolunteerings' element={<MyVolunteerings />} />
                        <Route path='volunteers' element={<Volunteers />} />

                        <Route path='users' element={<User />} />
                        <Route path="*" element={
                            <div className={'text-center p-5'}>
                                <h1>404</h1>
                                <h2>Page not found</h2>
                            </div>
                        } />
                    </Route>
                    <Route exact element={<AuthenticationRoutes />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </Row>
        </div>
    );
}

export default App;

