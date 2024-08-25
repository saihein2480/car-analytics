import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import carDataJson from '/src/data/cars.json'; // Adjust the path according to your project structure

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const data = carDataJson;
        const selectedCar = data.Cars.find((car) => car.Cid === parseInt(id));
        setCar(selectedCar);
    }, [id]);

    if (!car) return <div className="text-center my-5">Loading...</div>;

    return (
        <Container fluid style={{ margin: "60px auto", maxWidth: "1200px" }}>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-lg border-0 rounded" style={{ backgroundColor: '#fff', padding: '20px', position: 'relative' }}>
                        <Card.Body>
                            <Card.Title className="mb-4" style={{ fontSize: '2.5rem', color: '#1e2a38', fontWeight: '700', textAlign: 'center' }}>
                                {car.NameMMT} {car.Model}
                            </Card.Title>
                            <Row>
                                <Col md={6} className="d-flex align-items-center justify-content-center">
                                    {car.Img300 && (
                                        <img 
                                            src={car.Img300} 
                                            alt={car.Model} 
                                            style={{ 
                                                width: '100%', 
                                                maxWidth: '400px', 
                                                height: 'auto', 
                                                borderRadius: '15px',
                                                border: '5px solid #28a745',
                                                boxShadow: '0 8px 16px rgba(8, 8, 8, 0.2)',
                                                transition: 'transform 0.3s ease-in-out'
                                            }}
                                            className="hover-effect"
                                        />
                                    )}
                                </Col>
                                <Col md={6}>
                                    <Card.Text style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444', paddingLeft: '20px' }}>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Car ID:</strong> {car.Cid}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Is Car Expired:</strong> {car.IsCExp ? 'Yes' : 'No'}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Model:</strong> {car.Model}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Year:</strong> {car.Yr}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Price:</strong> {car.Prc} {car.Currency}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Province:</strong> {car.Province}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>MkID:</strong> {car.MkID}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>MdID:</strong> {car.MdID}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>BdID:</strong> {car.BdID}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Update:</strong> {car.Upd}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Page Views:</strong> {car.PagesViews}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Down Payment:</strong> {car.DPmt}
                                        </div>
                                        <div className="mb-3">
                                            <strong style={{ color: '#28a745' }}>Status:</strong> {car.Status}
                                        </div>
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CarDetails;
