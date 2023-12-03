import React, { useState } from 'react';
import { Button, Table, Modal, Container, Row, Col } from 'react-bootstrap';
import Header from './Header.jsx';

function EnterSchedules() {

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const hours = ["08:15", "09:50", "11:25", "13:45", "15:20", "16:55", "18:45", "20:20", "21:55"];

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
            <Container className="mt-4">
                <h1 className="text-center mb-4">Ingreso de horarios</h1>
                <Row>
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
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ingreso de horario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{selectedSubject?.name}</h4>
                    <Table variant="light">
                        <thead>
                            <tr>
                                <th style={{backgroundColor: '#00a499'}}>Hora/Día</th>
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
                                            <input
                                                type="checkbox"
                                                checked={selectedSlots?.[day]?.[hour]}
                                                onChange={() => handleSelectSlot(day, hour)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EnterSchedules;