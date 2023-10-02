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
                        Object.values(selectedVolunteer).map(([item, key], index) => (
                            <tr key={index + item.FirstName}>
                                <td>{index + 1}</td>
                                <td>{item?.Name}</td>
                                <td>{item.FirstName}</td>
                                <td>{item.Age}</td>
                                <td>{item.Gender}</td>
                                <td>{item.Coins || 0}</td>
                                <td>
                                    <Button
                                        variant="light"
                                        className="btn btn-primary btn-sm"
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
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}