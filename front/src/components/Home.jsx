import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "./Header"; // Asumiendo que Header es tu componente de navegación

function Home() {
    return (
        <>
            <Header />
            <Container style={{ marginTop: '100px' }}>
                <Row>
                    <Col md={3}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/2247/2247728.png"/>
                            <Card.Body>
                                <Card.Title>Anuncios Importantes</Card.Title>
                                <Card.Text>
                                    Recuerda inscribir tus asignaturas para el próximo semestre.
                                </Card.Text>
                                <Button variant="primary">Leer más</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src="https://educacionprofesional.ing.uc.cl/wp-content/uploads/2021/10/curso-Evaluacion-proyectos-TI-online-a-tu-ritmo.webp" />
                            <Card.Body>
                                <Card.Title>Programas de Estudio</Card.Title>
                                <Card.Text>
                                    Información sobre los programas de ingeniería y tecnología disponibles.
                                </Card.Text>
                                <Button variant="primary">Explorar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src="https://scontent-scl2-1.xx.fbcdn.net/v/t39.30808-6/241433964_4586734041358184_707697274360322635_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_ohc=ilZv_iw0sDQAX-g2isY&_nc_ht=scontent-scl2-1.xx&oh=00_AfCpH_OzCKEFfu-lUPax4ZSKPYW0vY2hZAqoGAIWwA5ERg&oe=657884AC" />
                            <Card.Body>
                                <Card.Title>Noticias</Card.Title>
                                <Card.Text>
                                    Revisa las últimas noticias de la facultad.
                                </Card.Text>
                                <Button variant="primary">Leer más</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/2858/2858416.png" />
                            <Card.Body>
                                <Card.Title>Calendario Académico</Card.Title>
                                <Card.Text>
                                    Revisa las fechas importantes del semestre.
                                </Card.Text>
                                <Button variant="primary">Explorar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </>
    );
}

export default Home;
