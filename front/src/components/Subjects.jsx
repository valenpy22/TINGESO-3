import { Button, Table, Container, Row, Col } from "react-bootstrap";
import React from "react";
import Header from "./Header.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function Subjects(){

    const [maxSubjects, setMaxSubjects] = useState([]);
    const [subjectsToEnroll, setSubjectsToEnroll] = useState([]);
    const [subjectsEnrolled, setSubjectsEnrolled] = useState([]);

    const student = JSON.parse(localStorage.getItem('student'));
    const rut = student.rut;

    useEffect(() => {
        axios.get('http://localhost:8080/students/maxsubjects/'+rut)
        .then(response => {
            console.log(response.data);
            setMaxSubjects(response.data);
        })
        .catch(error => {
            console.log(error);
        });

        axios.get('http://localhost:8080/prerequisites/'+rut)
        .then(response => {
            console.log(response.data);
            setSubjectsToEnroll(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    }, [rut]);

    

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
                                    <tr key={subject.id_generated}>
                                        <td><input type="checkbox" /></td>
                                        <td>{subject.id_subject}</td>
                                        <td>{subject.level}</td>
                                        <td>{subject.schedule}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </Table>
                            ) : (
                                <div>No hay asignaturas por inscribir</div>
                            )}
                            <div className="text-center">
                                <Button variant="success" className="w-15 mt-3">Inscribir asignaturas</Button>
                            </div>
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
                                    <tr key={subject.id}>
                                        <td><input type="checkbox" /></td>
                                        <td>{subject.name}</td>
                                        <td>{subject.level}</td>
                                        <td>{subject.schedule}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </Table>
                            ) : (
                                <div>No hay asignaturas inscritas</div>
                            )}
                            <div className="text-center">
                                <Button variant="danger" className="w-15 mt-3">Desinscribir asignaturas</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Subjects;
