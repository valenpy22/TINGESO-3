import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function LoginPage() {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (role === 'estudiante') {
            navigate('/estudiante'); // Asegúrate de tener esta ruta configurada en tu enrutador
        } else {
            navigate('/enterschedules');
        }
    };

    return (
        <>
            <Header />
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card style={{ width: '18rem', borderRadius: '15px' }}>
                    <Card.Body className="text-center">
                        <Card.Title>Seleccione su Rol</Card.Title>
                        <Button variant="secondary" className="m-2" onClick={() => handleRoleSelection('docente')}>
                            Docente
                        </Button>
                        <Button variant="primary" className="m-2" onClick={() => handleRoleSelection('estudiante')}>
                            Estudiante
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;
