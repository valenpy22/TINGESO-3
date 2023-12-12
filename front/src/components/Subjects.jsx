import { Button, Table, Container, Row, Col, Alert } from "react-bootstrap";
import React from "react";
import Header from "./Header.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import '../css/Subjects.css';

function Subjects(){
    const student = JSON.parse(localStorage.getItem('student'));
    const rut = student.rut;

    const [maxSubjects, setMaxSubjects] = useState(0); //Se obtiene el máximo de asignaturas que puede inscribir un estudiante
    const [grades, setGrades] = useState([]);
    const [prerequisites, setPrerequisites] = useState([]);
    const [subjectsToEnroll, setSubjectsToEnroll] = useState([]);
    const [subjectsEnrolled, setSubjectsEnrolled] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showDangerMessage, setShowDangerMessage] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [fakeLoading, setFakeLoading] = useState(true);

    useEffect(() => {     
        setIsLoading(true);
        setFakeLoading(true);   
        //Se obtiene la información de los prerrequisitos
        axios.get(`http://localhost:8080/prerequisites/${rut}`)
            .then(response => {
                setPrerequisites(response.data);

                axios.get(`http://localhost:8080/students/maxsubjects/${rut}`)
                    .then(response => {

                        setMaxSubjects(response.data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });

        setTimeout(() => {
            setFakeLoading(false);
        }, 600);

    }, [rut]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/grades/enrolled/'+rut)
            .then(response => {
                setGrades(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        
    }, [rut]);

    useEffect(() => {
        if (prerequisites.length > 0) {
            //Se obtiene la información de las asignaturas por inscribir
            axios.post('http://localhost:8080/study_plans/prerequisites', prerequisites)
                .then(response => {
                    const sortedSubjects = response.data.sort((a, b) => a.level - b.level);
                    setSubjectsToEnroll(sortedSubjects);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [prerequisites]);

    useEffect(() => {
        if(grades.length > 0){
            //Se obtiene la información de las asignaturas inscritas
            axios.post('http://localhost:8080/study_plans/grades', grades)
            .then(response => {
                setSubjectsEnrolled(response.data);
                axios.get('http://localhost:8080/schedules_studyplan/schedule/'+rut)
                    .then(response => {

                    })
                    .catch(error => {
                        console.log(error);
                    });

            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [grades, rut]);

    useEffect(() => {
        const loadSchedules = async () => {
            let newSchedules = {};

            for (let subject of [...subjectsToEnroll, ...subjectsEnrolled]) {
                try {
                    const response = await axios.get(`http://localhost:8080/schedules_studyplan/${subject.id_subject}`);
                    newSchedules[subject.id_subject] = response.data;
                } catch (error) {
                    console.log(error);
                }
            }

            localStorage.setItem('schedules', JSON.stringify(newSchedules));
            setSchedules(newSchedules);

        };

        loadSchedules();
    }, [subjectsToEnroll, subjectsEnrolled]);

    const handleSubmit = (id_subject) => {

        //Se obtienen los horarios de las asignaturas inscritas
        axios.get('http://localhost:8080/schedules_studyplan/schedule/'+rut)
            .then(response => {
                const enrolledSchedules = response.data;

                //Se obtiene los horarios de la asignatura por inscribir
                axios.get(`http://localhost:8080/schedules_studyplan/${id_subject}`)
                    .then(response => {
                        const schedule = response.data;
                        if(compareSchedules(enrolledSchedules, schedule)){
                            alert("No puedes inscribir esta asignatura, ya que se cruza con otra asignatura inscrita");
                        }else{
                            //Se inscribe una asignatura según un rut y un id_subject
                            if(subjectsEnrolled.length < maxSubjects){

                                axios.post(`http://localhost:8080/grades/grade/${rut}/${id_subject}`)
                                    .then(response => {
                                        console.log('Success:', response.data);

                                        const enrolledSubject = subjectsToEnroll.find(subject => subject.id_subject === id_subject);

                                        const updatedSubjectsToEnroll = subjectsToEnroll.filter(subject => subject.id_subject !== id_subject);
                                        setSubjectsToEnroll(updatedSubjectsToEnroll);

                                        if(enrolledSubject){
                                            const newSubjectsEnrolled = [...subjectsEnrolled, enrolledSubject];
                                            newSubjectsEnrolled.sort((a, b) => a.level - b.level);
                                            localStorage.setItem('subjectsEnrolled', JSON.stringify(newSubjectsEnrolled));
                                            setSubjectsEnrolled(newSubjectsEnrolled);
                                        };

                                        setShowSuccessMessage(true);

                                        setTimeout(() => setShowSuccessMessage(false), 3000);
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                    });
                            }else{
                                alert("No puedes inscribir más asignaturas");
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });  
                    
                if(subjectsEnrolled.length >= maxSubjects){
                    setAlertMessage("No puedes inscribir más asignaturas");
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 3000);
                    return;
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const compareSchedules = (enrolledSchedules, newSubjectSchedules) => {
        for (let enrolledSchedule of enrolledSchedules) {
            for (let newSchedule of newSubjectSchedules) {
                if(enrolledSchedule.block === newSchedule.block){
                    return true; // Hay conflicto
                }
            }
        }
        return false; // No hay conflicto
    };


    const handleUnEnroll = (id_subject) => {
        //Se desinscribe una asignatura según un rut y un id_subject
        axios.delete(`http://localhost:8080/grades/delete/grade/${rut}/${id_subject}`)
            .then(response => {
                console.log('Success:', response.data);
                setGrades(response.data);

                const unenrolledSubject = subjectsEnrolled.find(subject => subject.id_subject === id_subject);

                const updatedEnrolledSubjects = subjectsEnrolled.filter(subject => subject.id_subject !== id_subject);
                setSubjectsEnrolled(updatedEnrolledSubjects);

                if(unenrolledSubject){
                    const newSubjectsToEnroll = [...subjectsToEnroll, unenrolledSubject];
                    newSubjectsToEnroll.sort((a, b) => a.level - b.level);
                    setSubjectsToEnroll(newSubjectsToEnroll);
                }

                setShowDangerMessage(true);

                setTimeout(() => setShowDangerMessage(false), 3000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const getDayNameFromBlockNumber = (blockNumber) => {
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

    const getBlockNameFromDayAndNumber = (block) => {
        const dayName = getDayNameFromBlockNumber(block);
        const blockNumber = getBlockNumberFromUniqueNumber(block);
        return dayName + blockNumber;
    };

    const getScheduleNameFromSubject = (subject) => {
        const subjectSchedules = schedules[subject.id_subject];
        if (!subjectSchedules) return null;
        const scheduleNames = subjectSchedules.map(schedule => getBlockNameFromDayAndNumber(schedule.block));
        const scheduleName = scheduleNames.join("-");
        localStorage.setItem('scheduleName', JSON.stringify(scheduleName));
        return scheduleName;
    };

    if(isLoading || fakeLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>
        );
    }

    return(
        <>
            <Header />
            {showAlert && (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <Container className="mt-4">
                <h1 className="text-center mb-4">Inscripción de asignaturas</h1>
                <Row>
                    <Col lg={6} className="mb-4">
                        <div className="p-4 bg-teal text-white rounded shadow">
                            <h2 className="text-center" style={{color: "#000000"}}>Asignaturas por inscribir</h2>
                            {subjectsToEnroll.length > 0 ? (
                                <Table hover variant="light">
                                <thead>
                                    <tr>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Inscribir</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Nombre</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Nivel</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Horario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjectsToEnroll.map(subject => (
                                    <tr key={subject.id_plan}>
                                        <td><Button variant="success" onClick={()=>handleSubmit(subject.id_subject)}>Agregar</Button></td>
                                        <td>{subject.subject_name}</td>
                                        <td>{subject.level}</td>
                                        <td>{getScheduleNameFromSubject(subject)}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </Table>
                            ) : (
                                <h4 style={{ color: 'black !important' }}>No hay asignaturas por inscribir</h4>
                            )}
                        </div>
                    </Col>
                    <Col lg={6} className="mb-4">
                        <div className="p-4 bg-teal text-white rounded shadow">
                            <h2 className="text-center" style={{color: "#000000"}}>Asignaturas inscritas</h2>
                            {subjectsEnrolled.length > 0 ? (
                                <Table hover variant="light">
                                <thead>
                                    <tr>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Desinscribir</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Nombre</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Nivel</th>
                                    <th style={{backgroundColor: '#f0ad4e'}}>Horario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjectsEnrolled.map(subject => (
                                    <tr key={subject.id_plan}>
                                        <td><Button variant="danger" onClick={() => handleUnEnroll(subject.id_subject)}>Desinscribir</Button></td>
                                        <td>{subject.subject_name}</td>
                                        <td>{subject.level}</td>
                                        <td>{getScheduleNameFromSubject(subject)}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </Table>
                            ) : (
                                <div>
                                    <h4 className="black-text text-center py-4">No hay asignaturas inscritas</h4>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            {showAlert && (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#ffc107', color: 'black', padding: '10px', borderRadius: '5px' }}>
                    {alertMessage}
                </div>
            )}
            {showSuccessMessage && (
                <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    ¡Asignatura inscrita con éxito!
                </div>
            )}

            {showDangerMessage && (
                <div style={{ position: 'fixed', bottom: '20px', left: '20px', backgroundColor: '#dc3545', color: 'white', padding: '10px', borderRadius: '5px' }}>
                    ¡Asignatura desinscrita con éxito!
                </div>
            )}
        </>
    );
}

export default Subjects;
