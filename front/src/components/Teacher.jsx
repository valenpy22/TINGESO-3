import React, { useEffect, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HeaderTeacher from './HeaderTeacher';
import axios from 'axios';

function Teacher(){
    const [selectedCareer, setSelectedCareer] = useState('');

    const [careers, setCareers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/careers')
        .then(response => {
            setCareers(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const handleSelect = (event) => {
        setSelectedCareer(event.target.value);
    };

    const navigate = useNavigate();

    const handleCareerSelection = () => {
        navigate('/enterschedules', {state: {selectedCareer}});
    };

    const handleBack = () => {
        navigate('/login'); // Cambia '/login' por la ruta correcta de tu página de login
    };

    return(
        <>
            <HeaderTeacher/>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '150vh' }}>
                <Container style={{ width: '30rem', borderRadius: '15px' }}>
                    <h1>Ingrese a su facultad:</h1>
                    <Form>
                        <Form.Group className="mb-3">
                        <Form.Label>Carrera</Form.Label>
                            <Form.Select aria-label="Seleccione su carrera" onChange={handleSelect}>
                                <option>Seleccione su carrera</option>
                                {careers.map((career, index) => (
                                    <option key={index} value={career.career_name}>
                                        {career.career_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Container className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={handleBack}>
                                Volver
                            </Button>
                            <Button variant="primary" onClick={handleCareerSelection}>
                                Ingresar
                            </Button>
                        </Container>
                        
                    </Form>
                </Container>
            </Container>
        </>
    );
}

export default Teacher;