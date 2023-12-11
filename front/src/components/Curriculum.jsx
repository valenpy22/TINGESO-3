import React, { useEffect, useState } from 'react';
import { Container} from 'react-bootstrap';
import {createGlobalStyle} from 'styled-components';
import Header from './Header';
import axios from 'axios';

function Curriculum() {
    const rut = localStorage.getItem('rut');

    const [subjects, setSubjects] = useState([]);
    const [maxLevels, setMaxLevels] = useState([]);
    const [student, setStudent] = useState([]);

    const [approvedSubjects, setApprovedSubjects] = useState([]);
    const [reprovedSubjects, setReprovedSubjects] = useState([]);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [subjectsToEnroll, setSubjectsToEnroll] = useState([]);
    const [careerName, setCareerName] = useState('');

    useEffect(() => {
        //Student
        axios.get('http://localhost:8080/students/student/'+rut)
        .then(response => {
            setStudent(response.data);
            axios.get('http://localhost:8080/careers/id/'+response.data.id_career)
                .then(response => {
                    setCareerName(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            return axios.get('http://localhost:8080/careers/subjects/' + response.data.id_career);
        })
        //Subjects
        .then(response => {
            setSubjects(response.data);
            axios.get('http://localhost:8080/grades/approved/' + rut)
                .then(response => {
                    setApprovedSubjects(response.data);

                    axios.get('http://localhost:8080/grades/failed/' + rut)
                        .then(response => {
                            setReprovedSubjects(response.data);

                            axios.get('http://localhost:8080/grades/enrolled/' + rut)
                                .then(response => {
                                    setEnrolledSubjects(response.data);

                                    //Se obtienen los prerequisitos
                                    axios.get('http://localhost:8080/prerequisites/' + rut)
                                        .then(response => {
                                            const prerequisites = response.data;
                                            axios.post('http://localhost:8080/study_plans/prerequisites', prerequisites)
                                                .then(response => {
                                                    const sortedSubjects = response.data.sort((a, b) => a.level - b.level);
                                                    setSubjectsToEnroll(sortedSubjects);
                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                });
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                })
                            .catch(error => {
                                console.log(error);
                            });
                    });
            });
        })
        .catch(error => {
            console.log(error);
        });
    
        //Max levels
        axios.get('http://localhost:8080/students/'+rut)
        .then(response => {
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
        const enrolled = enrolledSubjects.some(enrolledSubject => enrolledSubject.id_subject === subject.id_subject);
        const toEnroll = subjectsToEnroll.some(subjectToEnroll => subjectToEnroll.id_subject === subject.id_subject);

        if (approved) {
            return 'bg-pastel-green';   
        } else if (reproved) {
            return 'bg-pastel-red';
        } else if (enrolled) {
            return 'bg-pastel-yellow';
        } else if (toEnroll){
            return 'bg-pastel-blue';
        } else {
            return 'bg-pastel-white';
        }
    };

    localStorage.setItem('student', JSON.stringify(student));
    localStorage.setItem('subjects', JSON.stringify(subjects));
    localStorage.setItem('approvedSubjects', JSON.stringify(approvedSubjects));
    localStorage.setItem('reprovedSubjects', JSON.stringify(reprovedSubjects));

    return (
        <div>
            <Header/>
            <GlobalStyles />
            <Container>
                <h1 className="text-center my-4">Malla curricular</h1>
                <h3 className="text-center my-4">{student.id_career} - {careerName}</h3>
                <div style={{ display: 'grid', textAlign: 'center', gap: '1px'}}>
                    {levels.map(level => (
                        <div key={`header-${level}`} style={{ gridColumn: level, gridRow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00a499', border: '1px solid black',  height: '40px'}}>
                            Nivel {level}
                        </div>
                    ))}
                    {levels.map((level, levelIndex) => (
                        <React.Fragment key={`level-${level}`}>
                            {subjects.filter(subject => subject.level === level).map((subject, subjectIndex) => (
                                <div style={{
                                    gridColumn: level,
                                    gridRow: subjectIndex + 2,
                                    border: '1px solid black', 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '120px'
                                }} className={getStatusColor(subject)} key={`subject-${levelIndex}-${subjectIndex}`}>
                                    {subject.subject_name}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Curriculum;

const GlobalStyles = createGlobalStyle`
.bg-pastel-green {
    background-color: #64b369; /* Verde pastel suave */
    color: white;
}

.bg-pastel-yellow {
    background-color: #F8CA00; /* Amarillo pastel suave */
    color: black;
}

.bg-pastel-red {
    background-color: #ff6f6f; /* Rojo pastel suave */
    color: white;
}

.bg-pastel-blue {
    background-color: #517cf0; /* Azul pastel suave */
    color: white;
}

.bg-pastel-white {
    background-color: #f5f5f5; /* Blanco pastel suave */
    color: black;
}
`;
