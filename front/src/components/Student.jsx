import React, { useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

function Student() {
    const navigate = useNavigate();
    const [rut, setRut] = useState('');
    const [error, setError] = useState('');

    const handleRutChange = (e) => {
        setRut(e.target.value);

        if(error){
            setError('');
        }
    };

    const handleLogin = (rut) => {
        axios.get('http://localhost:8080/students/exists/'+rut)
        .then(response => {
            const exists = response.data;
            if(exists){
                axios.put('http://localhost:8080/students/status/'+rut)
                .then(response => {
                    axios.get('http://localhost:8080/students/get_status/'+rut)
                        .then(response => {
                            const regular = response.data;
                            if(!regular){
                                localStorage.setItem('rut', rut);
                                navigate('/curriculum');
                            }else{
                                alert('Estimado estudiante, usted se encuentra eliminado de la carrera, por lo que no puede acceder a su curriculum');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
                
            }else{
                setError('Ingrese un RUT válido')
            }
        })
        .catch(error => {
            console.log(error);
            setError('Ingrese un RUT');
        });
    };

    const handleBack = () => {
        navigate('/login'); // Cambia '/login' por la ruta correcta de tu página de login
    };

    return (
        <>
            <Header />
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card style={{ width: '18rem', borderRadius: '15px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>RUT</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese su RUT" 
                                    value={rut} 
                                    onChange={handleRutChange}
                                    isInvalid={!!error} />
                                    <Form.Control.Feedback type="invalid">
                                        {error}
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <Container className="d-flex justify-content-center">
                                <Button variant="secondary" onClick={handleBack} className="me-2">
                                    Volver
                                </Button>
                                <Button variant="primary" onClick={() => handleLogin(rut)}>
                                    Ingresar
                                </Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Student;
