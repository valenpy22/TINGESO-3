import React, { useState } from 'react';
import { Button, Table, Modal, Container, Row, Col, Spinner } from 'react-bootstrap';
import HeaderTeacher from './HeaderTeacher.jsx';

function EnterSchedules() {

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [showModal, setShowModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    // Simulando una lista de asignaturas
    const subjects = [
        { id: 1, name: 'Matemáticas' },
        { id: 2, name: 'Física' },
        // ... otras asignaturas
    ];

    const handleOpenModal = (subject) => {
        setSelectedSubject(subject);
        setShowModal(true);
    };

    const handleSaveSchedule = () => {
        // Aquí iría la lógica para guardar el horario
        setShowModal(false);
    };


    const [selectedSlots, setSelectedSlots] = useState({});

    const handleSelectSlot = (day, hour) => {
        setSelectedSlots({
            ...selectedSlots,
            [day]: {
                ...selectedSlots[day],
                [hour]: !selectedSlots[day]?.[hour]
            }
        });
    };

    return(
        <>
            <HeaderTeacher />
            <Container className="mt-4 d-flex flex-column align-items-center justify-content-center">
                <h1 className="text-center mb-4">Ingreso de horarios</h1>
                <Row className="justify-content-center" style={{width: '1500px'}}>
                    <Col lg={6} className="mb-4">
                        <div className="p-4 bg-teal text-white rounded shadow">
                            <h2>Asignaturas</h2>
                            {subjects.length > 0 ? (
                                <Table hover variant="light">
                                <thead>
                                    <tr>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Nombre</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Ingresar horario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects.map(subject => (
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td><Button variant="primary" onClick={() => handleOpenModal(subject)}>Ingresar horario</Button></td>
                                    </tr>
                                    ))}
                                </tbody>
                                </Table>
                            ) : (
                                <div>No hay asignaturas</div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Ingreso de horario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{selectedSubject?.name}</h4>
                    <Table bordered variant="light" style={{textAlign: 'center'}}>
                        <thead>
                            <tr>
                                <th style={{backgroundColor: '#00a499', width: '80px'}}>Bloque / Día</th>
                                {days.map(day => (
                                    <th key={day} style={{backgroundColor: '#00a499'}}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map(hour => (
                                <tr key={hour}>
                                    <td style={{backgroundColor: '#00a499'}}>{hour}</td>
                                    {days.map(day => (
                                        <td key={day}>
                                            <Button 
                                                variant="outline-primary" 
                                                style={{ 
                                                    backgroundColor: selectedSlots?.[day]?.[hour] ? 'green' : 'transparent',
                                                    border: 'none',
                                                    width: '100%',
                                                    height: '30px'
                                                }}
                                                onClick={() => handleSelectSlot(day, hour)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Container className="d-flex justify-content-end">
                        <Button variant="danger" className="me-2">
                            Cancelar
                        </Button>
                        <Button variant="success">
                            Guardar
                        </Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EnterSchedules;