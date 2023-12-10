import React, { useEffect, useState } from 'react';
import { Row, Card, Table, Container, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import '../css/MySchedule.css';


function MySchedule(){
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const daysAbbr = ['L', 'M', 'W', 'J', 'V', 'S'];
    const hours = ['08:15-09:35', '09:50-11:10', '11:25-12:45', 
                    '13:45-15:05', '15:20:16:40', '16:55-18:15', 
                    '18:45-20:05', '20:05-21:25', '21:25-22:45'];

    const blocks = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const [schedules, setSchedules] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [subjectColors, setSubjectColors] = useState({});


    const generatePastelColor = () => {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 100%, 80%)`;
    };

    useEffect(() => {
        axios.get('http://localhost:8080/grades/enrolled_subjects/'+localStorage.getItem('rut'))
            .then(response => {
                const fetchedSubjects = response.data;
                setSubjects(fetchedSubjects);
                return axios.get('http://localhost:8080/schedules_studyplan/schedule/'+localStorage.getItem('rut'));
            })
            .then(response => {
                const mappedSchedules = mapSchedulesToSubjects(response.data, subjects);
                setSchedules(mappedSchedules);
            })
            .catch(error => {
                console.log(error);
            });
    
    }, []);

    useEffect(() => {
        // Solo generar colores si aún no se han asignado
        if (Object.keys(subjectColors).length === 0 && subjects.length > 0) {
            const newSubjectColors = {};
            subjects.forEach(subject => {
                newSubjectColors[subject.id_subject] = generatePastelColor();
            });
            setSubjectColors(newSubjectColors);
        }
    }, [subjects]);

    
    const mapSchedulesToSubjects = (schedules, subjects) => {
        return schedules.map(schedule => {
            const subject = subjects.find(sub => sub.id_subject === schedule.id_subject);
            return { 
                ...schedule, 
                subjectName: subject ? subject.subject_name : "Desconocido"
            };
        });
    };
    
    const getSubjectForBlock = (day, block) => {
        const uniqueBlockNumber = dayBlockToUniqueNumber(day, block);
        const schedule = schedules.find(sch => sch.block === uniqueBlockNumber);
        if (schedule) {
            const subject = subjects.find(sub => sub.id_subject === schedule.id_subject);
            if (subject) {
                const color = subjectColors[subject.id_subject];
                return (
                    <div className="subject-color" style={{ backgroundColor: color }}>
                        {subject.subject_name}
                    </div>
                );
            }
        }
        return "";
    };
    
    
    const dayBlockToUniqueNumber = (day, block) => {
        const dayMapping = { "L": 1, "M": 10, "W": 19, "J": 28, "V": 37, "S": 46 };
        return dayMapping[day] + block - 1;
    };

    
    
    const renderSubjectCards = () => {
        return subjects.map((subject, index) => (
            <Col key={index} xs={12} md={6} lg={4} xl={3}>
                <Card className="mb-3">
                    <Card.Body>
                        <div className="subject-color" style={{ backgroundColor: subjectColors[subject.id_subject] }}>
                            <span className="subject-code">{subject.id_subject}</span>
                        </div>
                        <Card.Title>{subject.subject_name}</Card.Title>
                        <Card.Text>
                            {subject.subject_name}
                            {/* Aquí puedes mostrar más información de la asignatura */}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ));
    };

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Container className="items-align-center text-center">
                        <h1>Mi horario</h1>
                        <div className="schedule-grid">
                            <div className="hour">#</div>
                            {days.map(day => <div className="hour" key={day}>{day}</div>)}
                            {blocks.map((block, index) => (
                                <React.Fragment key={block}>
                                    <div className="hour">{hours[index]}</div>
                                    {daysAbbr.map(day => (
                                        <div key={day + block} className="schedule-cell">
                                            {getSubjectForBlock(day, parseInt(block))}
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </Container>
                    {renderSubjectCards()}
                </Row>
            </Container>
        </>
    );
}

export default MySchedule;