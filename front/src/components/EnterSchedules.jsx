import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Container, Row, Col } from 'react-bootstrap';
import HeaderTeacher from './HeaderTeacher.jsx';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function EnterSchedules() {

    const location = useLocation();
    const { selectedCareer } = location.state || {};

    const [subjects, setSubjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedSlots, setSelectedSlots] = useState({});
    const [originalSchedules, setOriginalSchedules] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/careers/'+selectedCareer)
        .then(response => {
            setSubjects(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [selectedCareer]);


    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const blockNumberMapping = {
        "Lunes": 1,
        "Martes": 10,
        "Miercoles": 19,
        "Jueves": 28,
        "Viernes": 37,
        "Sabado": 46
    };

    const getUniqueBlockNumber = (day, block) => {
        return blockNumberMapping[day] + block - 1;
    };

    const convertToScheduleFormat = () => {
        let scheduleStudyPlans = [];
    
        for (const day in selectedSlots) {
            for (const block in selectedSlots[day]) {
                if (selectedSlots[day][block]) {
                    const uniqueBlockNumber = getUniqueBlockNumber(day, parseInt(block));
                    scheduleStudyPlans.push({
                        id_subject: selectedSubject.id_subject,
                        block: uniqueBlockNumber
                    });
                }
            }
        }
    
        return scheduleStudyPlans;
    };
    

    function submitSchedule() {
        const scheduleStudyPlans = convertToScheduleFormat();

        axios.delete('http://localhost:8080/schedules_studyplan/' + selectedSubject.id_subject)
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
        axios.post('http://localhost:8080/schedules_studyplan', scheduleStudyPlans)
            .then(response => {
                console.log('Success:', response.data);
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleSelectSlot = (day, block) => {
        setSelectedSlots(prevSlots => ({
            ...prevSlots,
            [day]: {
                ...prevSlots[day],
                [block]: !prevSlots[day]?.[block]
            }
        }));
    };

    const handleOpenModal = (subject) => {
        setSelectedSubject(subject);
        axios.get('http://localhost:8080/schedules_studyplan/' + subject.id_subject)
            .then(response => {
                // Aquí debes transformar la respuesta a tu formato de `selectedSlots`
                const fetchedSchedules = response.data;
                const updatedSlots = transformFetchedSchedulesToSlots(fetchedSchedules);
                setSelectedSlots(updatedSlots);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setShowModal(true);
    };

    const getDayNameFromBlockNumber = (blockNumber) => {
        if(blockNumber >= 1 && blockNumber <= 9) return "Lunes";
        if(blockNumber >= 10 && blockNumber <= 18) return "Martes";
        if(blockNumber >= 19 && blockNumber <= 27) return "Miercoles";
        if(blockNumber >= 28 && blockNumber <= 36) return "Jueves";
        if(blockNumber >= 37 && blockNumber <= 45) return "Viernes";
        if(blockNumber >= 46 && blockNumber <= 54) return "Sabado";
        return null;
    };

    const getBlockNumberFromUniqueNumber = (uniqueBlockNumber) => {
        return uniqueBlockNumber % 9 === 0 ? 9 : uniqueBlockNumber % 9;
    };

    const transformFetchedSchedulesToSlots = (fetchedSchedules) => {
        let slots = {};
        fetchedSchedules.forEach(schedule => {
            const day = getDayNameFromBlockNumber(schedule.block);
            const block = getBlockNumberFromUniqueNumber(schedule.block);
            
            if(!slots[day]) {
                slots[day] = {};
            }
            slots[day][block] = true;
        });

        return slots;
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
                                    <tr key={subject.id_plan}>
                                        <td>{subject.subject_name}</td>
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
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
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
                            {blocks.map(block => (
                                <tr key={block}>
                                    <td style={{backgroundColor: '#00a499'}}>{block}</td>
                                    {days.map(day => (
                                        <td key={day}>
                                            <Button 
                                                variant="outline-primary" 
                                                style={{ 
                                                    backgroundColor: selectedSlots?.[day]?.[block] ? 'green' : 'transparent',
                                                    border: 'none',
                                                    width: '100%',
                                                    height: '30px'
                                                }}
                                                onClick={() => handleSelectSlot(day, block)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Container className="d-flex justify-content-end">
                        <Button variant="danger" className="me-2" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="success" onClick={submitSchedule}>
                            Guardar
                        </Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EnterSchedules;