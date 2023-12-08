import { Button, Table, Container, Row, Col } from "react-bootstrap";
import React from "react";
import Header from "./Header.jsx";

function Subjects(){

    const subjectsToEnroll = [
        {id: 1, name: "Matemáticas", level: 1, schedule: "W1W2"},
        {id: 2, name: "Física", level: 1, schedule: "L1L2"},
        {id: 3, name: "Química", level: 2, schedule: "M1M2"},
        {id: 4, name: "Biología", level: 1, schedule: "J1J2"}
    ];

    const subjectsEnrolled = [
        {id: 5, name: "Lenguaje", level: 1, schedule: "V1V2"},
        {id: 6, name: "Historia", level: 1, schedule: "S1S2"},
        {id: 7, name: "Inglés", level: 2, schedule: "W1W2"},
        {id: 8, name: "Artes", level: 1, schedule: "L1L2"}
    ];

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
