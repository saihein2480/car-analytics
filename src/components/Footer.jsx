import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Car Analytics</h5>
                        <p>Providing the best car analytics and insights to help you make informed decisions.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-light">Dashboard</Link></li>
                            <li><Link to="/highlighted-cars" className="text-light">Hightlighted Cars</Link></li>
                            <li><Link to="/statistics" className="text-light">Statistics</Link></li>
                            <li><Link to="/about" className="text-light">About</Link></li>
                            <li><Link to="/contact" className="text-light">Contact Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Information</h5>
                        <p>Email: u6520283@au.edu </p>
                        <p>Email: u6520189@au.edu </p>
                        <p>Email: u6520051@au.edu </p>
                    </Col>
                </Row>
                <div className="text-center mt-3">
                    <p>&copy; 2024 Car Analytics. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
