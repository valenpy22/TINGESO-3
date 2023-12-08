import React, { useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

function Student() {
    const navigate = useNavigate();
    const [rut, setRut] = useState('');

    const handleRutChange = (e) => {
        setRut(e.target.value);
    };

    const handleLogin = (rut) => {
        axios.get('http://localhost:8080/students/exists/'+rut)
        .then(response => {
            if(response.data){
                navigate('/curriculum', {state: {rut}});
            }
        })
        .catch(error => {
            console.log(error);
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
                                <Form.Control type="text" placeholder="Ingrese su RUT" value={rut} onChange={handleRutChange} />
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
