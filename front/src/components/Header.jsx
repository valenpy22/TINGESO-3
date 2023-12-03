import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login"); // Navega a la ruta /login
    };
    
    return (
        <Navbar style={{backgroundColor: '#00a499'}} variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/home">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Escudo_USACH.svg/1200px-Escudo_USACH.svg.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Logo de Universidad de Santiago de Chile"
                    />
                    FING
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Inicio</Nav.Link>
                        <Nav.Link href="/enterschedules">Ingreso horarios</Nav.Link>
                        <Nav.Link href="/subjects">Inscripción asignaturas</Nav.Link>
                        <Nav.Link href="/curriculum">Malla curricular</Nav.Link>
                        <Nav.Link href="/schedule">Mi horario</Nav.Link>
                        <Nav.Link href="/historial">Historial académico</Nav.Link>
                        <Nav.Link href="/soporte">Ayuda y soporte</Nav.Link>
                    </Nav>
                    <Button variant="outline-light" style={{ borderRadius: '20px' }} onClick={handleLoginClick}>Iniciar sesión</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
