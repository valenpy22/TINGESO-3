import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Header from "./Header";

function Login() {
    return (
        <>
            <Container className="mt-5" style={{ backgroundColor: '#00a499', padding: '20px', borderRadius: '15px' }}>
                <Row className="justify-content-md-center">
                    <Col md={6} className="text-center">
                        <h1 className="text-white">Inicio de sesión</h1>
                        <img src="https://www.usach.cl/sites/default/files/Usach%20P1%20%281%29.png" alt="SAI Logo" className="img-fluid my-3 w-50" />
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type="rut" placeholder="Rut" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="password" placeholder="Contraseña" />
                            </Form.Group>
                            <Button type="submit" className="w-100" style={{backgroundColor: '#f0ad4e'}}>
                                Iniciar sesión
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;
