import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Card, Row, Col } from 'react-bootstrap';
import Header from './Header';
import axios from 'axios';

function Record () {
    const student = JSON.parse(localStorage.getItem('student'));
    const savedApprovedSubjects = JSON.parse(localStorage.getItem('approvedSubjects'));
    const savedReprovedSubjects = JSON.parse(localStorage.getItem('reprovedSubjects'));

    const [subjects, setSubjects] = useState([]);

    const numberApprovedSubjects = savedApprovedSubjects.length;
    const numberReprovedSubjects = savedReprovedSubjects.length;
    const numberSubjects = subjects.length;

    const [averageScore, setAverageScore] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8080/students/average_score/'+localStorage.getItem('rut'))
            .then(response => {
                let numeroAproximado = parseFloat(response.data.toFixed(2));
                localStorage.setItem('averageScore', numeroAproximado);
                setAverageScore(numeroAproximado);
            })
            .catch(error => {
                console.log(error);
            });

        setSubjects(JSON.parse(localStorage.getItem('subjectsEnrolled')));
    }, []);

    return(
        <>
            <Header/>
            <Container>
                <h1 style={{paddingTop: '20px', paddingBottom: '10px'}}>Historial académico</h1>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header style={{backgroundColor: 'rgb(240, 173, 78)'}}><strong>Información del estudiante</strong></Card.Header>
                            <Card.Body>
                                <p><strong>Nombre:</strong> {student.student_name}</p>
                                <p><strong>Rut:</strong> {student.rut}</p>
                                <p><strong>Código carrera:</strong> {student.id_career}</p>
                                <p><strong>Promedio general: </strong>{averageScore}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header style={{backgroundColor: 'rgb(240, 173, 78)'}}><strong>Resumen académico</strong></Card.Header>
                            <Card.Body>
                                <p><strong>Asignaturas aprobadas:</strong> {numberApprovedSubjects}</p>
                                <p><strong>Asignaturas reprobadas:</strong> {numberReprovedSubjects}</p>
                                <p><strong>Asignaturas inscritas: </strong> {numberSubjects}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <h2 style={{paddingTop: '20px'}}>Lista de asignaturas inscritas</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Nivel</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subject => (
                            <tr key={subject.id_subject}>
                                <td>{subject.subject_name}</td>
                                <td>{subject.level}</td>
                                <td>Inscrita</td>
                                <td><Button variant="primary">Ver información</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default Record;