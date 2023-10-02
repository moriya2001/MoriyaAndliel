// const VolunteeringsToApprove = () => {

//     const [userToDisplay, setUserToDisplay] = useState(null);
//     const [volunteeringTovolunteer, setVolunteeringTovolunteer] = useState([])
//     const getVolunteeringToVolunteer = async () => {
//         const { data } = await axios.get("/volunteering/getPendingVolunteerings")
//         // let data2=data.filter(user=>user.Status==true)
//         console.log(data)
//         console.log("11111")
//         setVolunteeringTovolunteer(data)


//     }
//     const updateStatus = async (id) => {
//         console.log("id", id)
//         const selectedVol = volunteeringTovolunteer.find(v => v._id === id);
//         const filteredApproves = volunteeringTovolunteer.filter(v => v._id !== id);
//         await axios.put(`/volunteering/updateVolunteeringApprove/${selectedVol._id}`)
//         setVolunteeringTovolunteer(filteredApproves);
//         console.log("selectedVol", selectedVol)
//         emailjs.send("service_7rzvtwg", "approve", {
//             to_user: selectedVol.idVolunteerUser?.FirstName,
//             vol_type: selectedVol.idVolunteerType.Name,
//             vol_adress: selectedVol.Address,
//             vol_date: moment(selectedVol.SDate).format('DD-MM-YYYY HH:mm'),
//             vol_endDate: moment(selectedVol.NDate).format('DD-MM-YYYY HH:mm'),
//             userEmail: selectedVol.idVolunteerUser.Email,
//         }, 'cubY8Y-jimY937YfV');
//         console.log("url", `/users/${selectedVol.idVolunteerUser._id}/volunteer-approved`)
//         axios.put(`/users/${selectedVol.idVolunteerUser._id}/volunteer-approved`)
//     }


//     useEffect(() => {
//         getVolunteeringToVolunteer()
//     }, [])
//     const sortByDate = () => {
//         return volunteeringTovolunteer.sort((a,b)=>{
//             return new Date(a.SDate).getTime() - new Date(b.SDate).getTime()
//         })
//     }
//     return<>
//     {sortByDate().length&&
//         // <Container className="align-items-center justify-content-center bg-light min-vh-100">
//            <> <h2 className="text-center mb-4 rounded-3 p-3 mb-5 bg-white rounded">התנדבויות ממתינות לאישור</h2>
//                 <Row>
//                     <Col xs={8} className={"p-5 mx-auto"}>
//                         <Table striped bordered responsive hover variant="dark">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>התנדבות</th>
//                                     <th>מתנדב</th>
//                                     <th>עיר</th>
//                                     <th>רחוב</th>
//                                     <th>תאריך התחלה</th>
//                                     <th>תאריך סיום</th>
//                                     <th></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {volunteeringTovolunteer.map((item, index) => {
//                                     return (
//                                         <tr key={item._id}>
//                                             {console.log("item",item.Address)}
//                                             <td>{index + 1}</td>
//                                             <td>{item.idVolunteerType.Name}</td>
//                                             <td>{item.idVolunteerUser?.FirstName}</td>
//                                             <td>{item.idCity.Name}</td>
//                                             <td>{item.Address}</td>
//                                             <td>{item.SDate}</td>
//                                             <td>{item.NDate}</td>
//                                             <td>
//                                                 <button className="btn btn-primary" onClick={() => updateStatus(item._id)}>אישור
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </Table>
//                     </Col>
//                 </Row></>}
//                 </>
//         //                      <VolunteerModal selectedVolunteer={selectedVolunteer} onHide={() => setSelectedVolunteer(null)}
//         //                     handleOpenModal={handleShowProfile} updateStatus={updateStatus}/>
//         //    <ProfileModal handleCloseModal={handleCloseModal} showModal={!!userToDisplay}
//         //                 selectedVolunteer={userToDisplay}/>

//     //    </Container>}
                            
    
// }

// const VolunteerModal = ({selectedVolunteer, handleOpenModal, updateStatus, onHide}) => {
//     return (
//         <Modal show={!!selectedVolunteer} onHide={onHide}>
//             <Modal.Body>
//                 <Modal.Title>רשימת המתנדבים</Modal.Title>
//                 <Table striped color={'dark'}>
//                     <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>התנדבות</th>
//                         <th>מתנדב</th>
//                         <th>גיל</th>
//                         <th>מין</th>
//                         <th>לבבות</th>
//                         <th>צפייה בפרטים</th>
//                         <th>אישור</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {selectedVolunteer &&
//                         Object.values(selectedVolunteer.users).map(([item, key], index) => (
//                             <tr key={index + item.FirstName}>
//                                 <td>{index + 1}</td>
//                                 <td>{item?.Name}</td>
//                                 <td>{item.FirstName}</td>
//                                 <td>{item.Age}</td>
//                                 <td>{item.Gender}</td>
//                                 <td>{item.Coins || 0}</td>
//                                 <td><Button
//                                     variant="light"
//                                     className="btn btn-primary btn-sm"
//                                     onClick={() => handleOpenModal(item)}
//                                 ><i className="fa fa-light fa-user fa-sm"></i>
//                                 </Button></td>
//                                 <td><Button
//                                     variant="primary"
//                                     className="btn btn-primary btn-sm btn-light"
//                                     onClick={() => updateStatus(item._id)}
//                                 ><i className={'fa fa-check fa-sm'}></i>
//                                 </Button></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Modal.Body>
//         </Modal>
//     );
// }

// const VolunteerTable = ({volunteer, handleOpenModal}) => {
//     return (
//         <Table striped bordered hover responsive>
//             <thead>
//             <tr>
//                 <th>#</th>
//                 <th>סוג התנדבות</th>
//                 <th>תאריך התחלה</th>
//                 <th>שעת התחלה</th>
//                 <th>תאריך סיום</th>
//                 <th>שעת סיום</th>
//                 <th>עיר</th>
//                 <th>רחוב</th>
//                 <th>תאור</th>
//                 <th>צפייה</th>
//             </tr>
//             </thead>
//             <tbody>
//             {volunteer.volunteers.map((item, index) => {
//                 return (
//                     <tr key={item._id}>
//                         <td>{index + 1}</td>
//                         <td>{item.idVolunteerType?.Name}</td>
//                         <td>{getDate(item.SDate)}</td>
//                         <td>{getHour(item.SDate)}</td>
//                         <td>{getDate(item.NDate)}</td>
//                         <td>{getHour(item.NDate)}</td>
//                         <td>{item.idCity?.Name}</td>
//                         <td>{item.Address}</td>
//                         <td>
//                             {item.Description?.slice(0, MAX_DESCRIPTION_LEN)}{' '}
//                             {item.Description?.length > MAX_DESCRIPTION_LEN ? '...' : ''}
//                         </td>
//                         <td>
//                             <Button
//                                 variant="light"
//                                 className="btn btn-primary btn-sm"
//                                 onClick={() => handleOpenModal(volunteer.users, item)}
//                             >
//                                 <i className="fa fa-inbox"></i>
//                             </Button>
//                         </td>
//                     </tr>
//                 );
//             })}
//             </tbody>
//         </Table>
//     )
// }

// export default VolunteeringsToApprove;
                
//     </>
// }
// export default VolunteeringsToApprove; 