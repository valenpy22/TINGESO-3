import { Button, Table, Container, Row, Col } from "react-bootstrap";
import React from "react";
import Header from "./Header.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function Subjects(){
    const student = JSON.parse(localStorage.getItem('student'));
    const rut = student.rut;

    const [grades, setGrades] = useState([]);
    const [prerequisites, setPrerequisites] = useState([]);
    const [subjectsToEnroll, setSubjectsToEnroll] = useState([]);
    const [subjectsEnrolled, setSubjectsEnrolled] = useState([]);

    useEffect(() => {
        //Se obtiene la información de los prerrequisitos
        axios.get(`http://localhost:8080/prerequisites/${rut}`)
            .then(response => {
                console.log("Prerequisites: ", response.data);
                setPrerequisites(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [rut]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/grades/enrolled/'+rut)
            .then(response => {
                console.log("Grades: ", response.data);
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
                    console.log("Subjects to enroll: ", sortedSubjects);
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
                console.log("Subjects enrolled: ", response.data);
                setSubjectsEnrolled(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [grades]);

    const handleSubmit = (id_subject) => {
        //Se inscribe una asignatura según un rut y un id_subject
        axios.post(`http://localhost:8080/grades/grade/${rut}/${id_subject}`)
            .then(response => {
                console.log('Success:', response.data);

                const enrolledSubject = subjectsToEnroll.find(subject => subject.id_subject === id_subject);

                const updatedSubjectsToEnroll = subjectsToEnroll.filter(subject => subject.id_subject !== id_subject);
                setSubjectsToEnroll(updatedSubjectsToEnroll);

                if(enrolledSubject){
                    setSubjectsEnrolled([...subjectsEnrolled, enrolledSubject]);
                };
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                    setSubjectsToEnroll([...subjectsToEnroll, unenrolledSubject]);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return(
        <>
            <Header />
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
                                        <td>{subject.schedule}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </Table>
                            ) : (
                                <div>No hay asignaturas por inscribir</div>
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
                                        <td>{subject.schedule}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </Table>
                            ) : (
                                <div>No hay asignaturas inscritas</div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Subjects;
