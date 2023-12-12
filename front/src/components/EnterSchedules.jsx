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

    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("");

    const [sortOption, setSortOption] = useState("level");
    const [schedules, setSchedules] = useState({});

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);



    useEffect(() => {
        
        axios.get('http://localhost:8080/careers/'+selectedCareer)
        .then(response => {
            setSubjects(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }, [selectedCareer]);

    useEffect(() => {
        const loadSchedules = async () => {
            let newSchedules = {};

            for (let subject of subjects) {
                try {
                    const response = await axios.get(`http://localhost:8080/schedules_studyplan/${subject.id_subject}`);
                    newSchedules[subject.id_subject] = response.data;
                } catch (error) {
                    console.log(error);
                }
            }

            setSchedules(newSchedules);
        };

        loadSchedules();
    }, [subjects]);



    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const blockNumberMapping = {
        "Lunes": 1,
        "Martes": 10,
        "Miércoles": 19,
        "Jueves": 28,
        "Viernes": 37,
        "Sábado": 46
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

        axios.delete('http://localhost:8080/schedules_studyplan/delete/' + selectedSubject.id_subject)
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

                setShowSuccessMessage(true);

                setSchedules(prevSchedules => ({
                    ...prevSchedules,
                    [selectedSubject.id_subject]: scheduleStudyPlans
                }));

                setTimeout(() => setShowSuccessMessage(false), 3000);

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

    const initializeEmptySlots = () => {
        let slots = {};
        days.forEach(day => {
            slots[day] = {};
            blocks.forEach(block => {
                slots[day][block] = false;
            });
        });
        return slots;
    };

    const handleOpenModal = (subject) => {
        setSelectedSubject(subject);
        axios.get('http://localhost:8080/schedules_studyplan/' + subject.id_subject)
            .then(response => {
                // Aquí debes transformar la respuesta a tu formato de `selectedSlots`
                const fetchedSchedules = response.data;
                const updatedSlots = fetchedSchedules.length > 0
                    ? transformFetchedSchedulesToSlots(fetchedSchedules)
                    : initializeEmptySlots();

                
                setSelectedSlots(updatedSlots);
            })
            .catch(error => {
                console.error('Error:', error);
                setSelectedSlots(initializeEmptySlots());
            });
        setShowModal(true);
    };

    const getDayNameFromBlockNumber = (blockNumber) => {
        if(blockNumber >= 1 && blockNumber <= 9) return "Lunes";
        if(blockNumber >= 10 && blockNumber <= 18) return "Martes";
        if(blockNumber >= 19 && blockNumber <= 27) return "Miércoles";
        if(blockNumber >= 28 && blockNumber <= 36) return "Jueves";
        if(blockNumber >= 37 && blockNumber <= 45) return "Viernes";
        if(blockNumber >= 46 && blockNumber <= 54) return "Sábado";
        return null;
    };

    const getDayNameFromBlockNumber2 = (blockNumber) => {
        if(blockNumber >= 1 && blockNumber <= 9) return "L";
        if(blockNumber >= 10 && blockNumber <= 18) return "M";
        if(blockNumber >= 19 && blockNumber <= 27) return "W";
        if(blockNumber >= 28 && blockNumber <= 36) return "J";
        if(blockNumber >= 37 && blockNumber <= 45) return "V";
        if(blockNumber >= 46 && blockNumber <= 54) return "S";
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
    
    const sortSubjects = (subjects) => {
        switch(sortOption) {
            case "name":
                return subjects.sort((a, b) => a.subject_name.localeCompare(b.subject_name));
            case "level":
                return subjects.sort((a, b) => a.level - b.level);
            default:
                return subjects;
        }
    };

    const filteredSubjects = sortSubjects(subjects.filter(subject => {
        return subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterLevel ? subject.level === parseInt(filterLevel) : true);
    }));

    const getBlockNameFromDayAndNumber = (block) => {
        const dayName = getDayNameFromBlockNumber2(block);
        const blockNumber = getBlockNumberFromUniqueNumber(block);
        return dayName + blockNumber;
    };

    const getScheduleNameFromSubject = (subject) => {
        const subjectSchedules = schedules[subject.id_subject];
        if (!subjectSchedules) return null;
        const scheduleNames = subjectSchedules.map(schedule => getBlockNameFromDayAndNumber(schedule.block));
        return scheduleNames.join("");
    };

    return(
        <>
            <HeaderTeacher />
            <Container className="mt-4 d-flex flex-column align-items-center justify-content-center">
                <h1 className="text-center mb-4">Ingreso de horarios</h1>
                <Row>
                    <Col>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1"><i className="bi bi-search"></i></span>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar asignatura..." 
                                aria-label="Buscar"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <select className="form-select" onChange={(e) => setFilterLevel(e.target.value)}>
                            <option value="">Seleccionar Nivel</option>
                            {[...Array(11).keys()].map(n => (
                                <option key={n+1} value={n+1}>{n+1}</option>
                            ))}
                        </select>
                    </Col>
                    <Col>
                        <select className="form-select" onChange={(e) => setSortOption(e.target.value)}>
                            <option value="level">Ordenar por Nivel</option>
                            <option value="name">Ordenar por Nombre</option>
                            {/* Agrega aquí más opciones si es necesario */}
                        </select>
                    </Col>
                </Row>

                <Row className="justify-content-center" style={{width: '1800px'}}>
                    <Col lg={6} className="mb-4">
                        <div className="p-4 bg-teal text-white rounded shadow">
                            <h2>Asignaturas</h2>
                            {filteredSubjects.length > 0 ? (
                                <Table hover variant="light">
                                <thead>
                                    <tr>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Nombre asignatura</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Nivel</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Horario actual</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Ingresar horario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSubjects.map(subject => (
                                    <tr key={subject.id_plan}>
                                        <td>{subject.subject_name}</td>
                                        <td>{subject.level}</td>
                                        <td>{getScheduleNameFromSubject(subject)}</td>
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
                                        <td key={day} style={{padding: 0, }}>
                                            <Button 
                                                variant="outline-primary" 
                                                style={{ 
                                                    backgroundColor: selectedSlots?.[day]?.[block] ? 'green' : 'transparent',
                                                    border: 'none',
                                                    width: '100%',
                                                    height: '40px',
                                                    borderRadius: '0px'
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
            {showSuccessMessage && (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    ¡Horario guardado con éxito!
                </div>
            )}
        </>
    );
}

export default EnterSchedules;