import React from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import Header from './Header';

function Record () {
    const student = JSON.parse(localStorage.getItem('student'));
    const savedApprovedSubjects = JSON.parse(localStorage.getItem('approvedSubjects'));
    const savedReprovedSubjects = JSON.parse(localStorage.getItem('reprovedSubjects'));

    const subjects = JSON.parse(localStorage.getItem('subjects'));

    const numberApprovedSubjects = savedApprovedSubjects.length;
    const numberReprovedSubjects = savedReprovedSubjects.length;
    const numberSubjects = subjects.length;

    console.log(subjects);

    return(
        <>
            <Header/>
            <Container>
                <h1>Historial académico</h1>
                <Container>
                    <h2>Información del estudiante</h2>
                    <p>Nombre: {student.student_name}</p>
                    <p>Rut: {student.rut}</p>
                    <p>Carrera: {student.id_career}</p>
                    <p>Promedio general: </p>
                    <p>Asignaturas aprobadas: {numberApprovedSubjects}</p>
                    <p>Asignaturas reprobadas: {numberReprovedSubjects}</p>
                    <p>Total de asignaturas: {numberSubjects}</p>
                </Container>
                <h2>Lista de asignaturas inscritas</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Nivel</th>
                            <th>Horario</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subject => (
                            <tr key={subject.id_subject}>
                                <td>{subject.subject_name}</td>
                                <td>{subject.level}</td>
                                <td>{subject.status}</td>
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