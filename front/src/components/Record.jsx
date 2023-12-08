import React from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import Header from './Header';

function Record () {
    const subjects = [
        {id: 1, name: "Matemáticas", level: 1, status: "Inscrita", schedule: "W1W2"},
        {id: 2, name: "Física", level: 1, status: "Inscrita", schedule: "L1L2"},
        {id: 3, name: "Química", level: 2, status: "Inscrita", schedule: "M1M2"},
        {id: 4, name: "Biología", level: 1, status: "Inscrita", schedule: "J1J2"}
    ];

    return(
        <>
            <Header/>
            <Container>
                <h1>Historial académico</h1>
                Promedio general: 6.5
                Asignaturas aprobadas: 40
                Asignaturas reprobadas: 5

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
                            <tr key={subject.id}>
                                <td>{subject.name}</td>
                                <td>{subject.level}</td>
                                <td>{subject.schedule}</td>
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