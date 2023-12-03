import React, { useState } from 'react';
import { Button, Table, Modal, Container, Row, Col } from 'react-bootstrap';

function Curriculum() {
    const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const [subjects, setSubjects] = useState({
        1: [
            {name: 'Cálculo I', status: 'Aprobada'},
            {name: 'Álgebra I', status: 'Aprobada'},
            {name: 'Física I', status: 'Aprobada'},
            {name: 'Química y Sociedad', status: 'Aprobada'},
            {name: 'Introducción a la Ingeniería', status: 'Aprobada'}
        ],
        2: [
            {name: 'Cálculo II', status: 'Aprobada'},
            {name: 'Álgebra II', status: 'Aprobada'},
            {name: 'Física II', status: 'Aprobada'},
            {name: 'Programación', status: 'Aprobada'}
        ],
        3: [
            {name: 'Cálculo III', status: 'Inscrita'},
            {name: 'Ecuaciones Diferenciales', status: 'Inscrita'},
            {name: 'Física III', status: 'Inscrita'},
            {name: 'Estadística y Probabilidades', status: 'Inscrita'},
            {name: 'Métodos Numéricos', status: 'Inscrita'},
            {name: 'Mecánica I', status: 'Desaprobada'}
        ],
        4: [
            {name: 'Cálculo IV', status: 'Por inscribir'},
            {name: 'Mecánica II', status: 'Por inscribir'},
            {name: 'Mecánica III', status: 'Por inscribir'},
            {name: 'Mecánica de Fluidos', status: 'Por inscribir'},
            {name: 'Termodinámica', status: 'Por inscribir'}
        ],
        5: [
            {name: 'Cálculo V', status: ''},
            {name: 'Mecánica de Sólidos', status: ''},
            {name: 'Mecánica de Materiales', status: ''},
            {name: 'Mecánica de Vibraciones', status: ''},
            {name: 'Mecánica de Máquinas', status: ''}
        ],
        6: [
            {name: 'Cálculo VI', status: ''},
            {name: 'Mecánica de Materiales II', status: ''},
            {name: 'Mecánica de Fluidos II', status: ''},
            {name: 'Mecánica de Sólidos II', status: ''},
            {name: 'Mecánica de Vibraciones II', status: ''}
        ],
        7: [
            {name: 'Cálculo VII', status: ''},
            {name: 'Mecánica de Sólidos III', status: ''},
            {name: 'Mecánica de Fluidos III', status: ''},
            {name: 'Mecánica de Vibraciones III', status: ''},
            {name: 'Mecánica de Máquinas II', status: ''}
        ],
        8: [
            {name: 'Cálculo VIII', status: ''},
            {name: 'Mecánica de Sólidos IV', status: ''},
            {name: 'Mecánica de Fluidos IV', status: ''},
            {name: 'Mecánica de Vibraciones IV', status: ''},
            {name: 'Mecánica de Máquinas III', status: ''}
        ],
        9: [
            {name: 'Cálculo IX', status: ''},
            {name: 'Mecánica de Sólidos V', status: ''},
            {name: 'Mecánica de Fluidos V', status: ''},
            {name: 'Mecánica de Vibraciones V', status: ''},
            {name: 'Mecánica de Máquinas IV', status: ''}
        ],
        10: [
            {name: 'Cálculo X', status: ''},
            {name: 'Mecánica de Sólidos VI', status: ''},
            {name: 'Mecánica de Fluidos VI', status: ''},
            {name: 'Mecánica de Vibraciones VI', status: ''},
            {name: 'Mecánica de Máquinas V', status: ''}
        ],
        11: [
            {name: 'Trabajo de título', status: ''},
        ]
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Aprobada':
                return 'bg-success text-white'; // Verde pastel
            case 'Inscrita':
                return 'bg-warning text-dark'; // Amarillo pastel
            case 'Desaprobada':
                return 'bg-danger text-white'; // Rojo pastel
            case 'Por inscribir':
                return 'bg-primary text-white'; // Azul pastel
            default:
                return 'bg-light';
        }
    };

    return (
        <>
            <Container>
                <h1 className="text-center my-4">Malla curricular</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gridTemplateRows: 'repeat(7, 1fr)', textAlign: 'center', gap: '1px' }}>
                    {levels.map(level => (
                        <div key={`header-${level}`} style={{ gridColumn: level, gridRow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00a499'}}>
                            Nivel {level}
                        </div>
                    ))}
                    {levels.map(level => (
                        <React.Fragment key={level}>
                            {subjects[level].map((subject, index) => (
                                <div style={{
                                    gridColumn: level,
                                    gridRow: index + 2,
                                    border: '1px solid black', // Solo para visualización
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100px'
                                }} className={getStatusColor(subject.status)}>
                                    {subject.name}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </Container>
        </>
    );
}

export default Curriculum;
