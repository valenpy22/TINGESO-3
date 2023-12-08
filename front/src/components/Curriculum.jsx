import React, { useEffect, useState } from 'react';
import { Container} from 'react-bootstrap';
import {createGlobalStyle} from 'styled-components';
import Header from './Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function Curriculum() {
    const location = useLocation();
    const { rut } = location.state || {};

    const [subjects, setSubjects] = useState([]);
    const [maxLevels, setMaxLevels] = useState([]);
    const [student, setStudent] = useState([]);

    const [approvedSubjects, setApprovedSubjects] = useState([]);
    const [reprovedSubjects, setReprovedSubjects] = useState([]);

    useEffect(() => {
        //Student
        axios.get('http://localhost:8080/students/student/'+rut)
        .then(response => {
            console.log(response.data);
            setStudent(response.data);
            return axios.get('http://localhost:8080/careers/subjects/' + response.data.id_career);
        })
        //Subjects
        .then(response => {
            console.log(response.data);
            setSubjects(response.data);
            axios.get('http://localhost:8080/grades/approved/' + rut)
            .then(response => {
                setApprovedSubjects(response.data);
                console.log(response.data);

                axios.get('http://localhost:8080/grades/failed/' + rut)
                .then(response => {
                    setReprovedSubjects(response.data);
                    console.log(response.data);
                });
            });
        })
        .catch(error => {
            console.log(error);
        });
    
        //Max levels
        axios.get('http://localhost:8080/students/'+rut)
        .then(response => {
            console.log(response.data);
            setMaxLevels(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    
    }, [rut]);

    let levels = [];
    for (let i = 1; i <= maxLevels; i++) {
        levels.push(i);
    };

    const getStatusColor = (subject) => {
        const approved = approvedSubjects.some(approvedSubject => approvedSubject.id_subject === subject.id_subject);
        const reproved = reprovedSubjects.some(reprovedSubject => reprovedSubject.id_subject === subject.id_subject);

        if (approved) {
            return 'bg-pastel-green';   
        } else if (reproved) {
            return 'bg-pastel-red';
        } else {
            return 'bg-pastel-white';
        }
    };

    console.log(levels);

    return (
        <>
            <Header/>
            <GlobalStyles />
            <Container>
                <h1 className="text-center my-4">Malla curricular</h1>
                <div style={{ display: 'grid', textAlign: 'center', gap: '1px'}}>
                    {levels.map(level => (
                        <div key={`header-${level}`} style={{ gridColumn: level, gridRow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00a499', border: '1px solid black',  height: '40px'}}>
                            Nivel {level}
                        </div>
                    ))}
                    {levels.map(level => (
                        <React.Fragment key={level}>
                            {subjects.filter(subject => subject.level === level).map((subject, index) => (
                                <div style={{
                                    gridColumn: level,
                                    gridRow: index + 2,
                                    border: '1px solid black', 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '120px'
                                }} className={getStatusColor(subject)}>
                                    {subject.subject_name}
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

const GlobalStyles = createGlobalStyle`
.bg-pastel-green {
    background-color: #429642; /* Ejemplo de Verde pastel */
    color: white;
}

.bg-pastel-yellow {
    background-color: #f78e43; /* Ejemplo de Amarillo pastel */
    color: white;
}

.bg-pastel-red {
    background-color: #f74343; /* Ejemplo de Rojo pastel */
    color: white;
}

.bg-pastel-blue {
    background-color: #4361f7; /* Ejemplo de Azul pastel */
    color: white;
}

.bg-pastel-white {
    background-color: #ffffff; /* Blanco */
    color: black;
}

`