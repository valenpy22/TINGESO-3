import { Button, Table, Container, Row, Col } from "react-bootstrap";
import React from "react";
import Header from "./Header.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function Subjects(){

    const [maxSubjects, setMaxSubjects] = useState([]);
    const [prerequisites, setPrerequisites] = useState([]);
    const [subjectsToEnroll, setSubjectsToEnroll] = useState([]);
    const [subjectsEnrolled, setSubjectsEnrolled] = useState([]);
    const [grades, setGrades] = useState([]);

    const student = JSON.parse(localStorage.getItem('student'));
    const rut = student.rut;

    useEffect(() => {
        axios.get('http://localhost:8080/students/maxsubjects/'+rut)
        .then(response => {
            console.log("Max subjects: ", response.data);
            setMaxSubjects(response.data);
        })
        .catch(error => {
            console.log(error);
        });

        axios.get('http://localhost:8080/prerequisites/'+rut)
        .then(response => {
            console.log("Prerequisites: ", response.data);
            setPrerequisites(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }, [rut]);

    useEffect(() => {
        if(prerequisites.length > 0){
            axios.post('http://localhost:8080/study_plans/prerequisites', prerequisites)
            .then(response => {
                const sortedSubjects = response.data.sort((a, b) => a.level - b.level)
                console.log("Subjects to enroll: ", response.data);
                setSubjectsToEnroll(sortedSubjects);
            })
            .catch(error => {
                console.log(error);
            });
        }
        
    }, [prerequisites]);

    useEffect(() => {
        axios.post('http://localhost:8080/study_plans/grades', grades)
        .then(response => {
            console.log("Subjects enrolled: ", response.data);
            setSubjectsEnrolled(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [grades]);

    const handleSubmit = (id_subject) => {
        
        const year = new Date().getFullYear() + 1;

        axios.post(`http://localhost:8080/grades/grade/${year}/1/${rut}/${id_subject}`)
        .then(response => {
            console.log("Grade:", response.data);

            axios.get('http://localhost:8080/grades/'+rut)
            .then(response => {
                console.log("Total grades: ", response.data);
            });
            
            axios.get('http://localhost:8080/grades/enrolled/'+rut)
            .then(response => {
                console.log("Enrolled grades: ", response.data);
                setGrades(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    };
    

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
                                        <td><Button variant="danger">Desinscribir</Button></td>
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
