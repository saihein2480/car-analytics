import { Container, Row, Col } from 'react-bootstrap';

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
                            <li><a href="/" className="text-light">Dashboard</a></li>
                            <li><a href="/highlighted-cars" className="text-light">Hightlighted Cars</a></li>
                            <li><a href="/statistics" className="text-light">Statistics</a></li>
                            <li><a href="/about" className="text-light">About</a></li>
                            <li><a href="/contact" className="text-light">Contact Us</a></li>
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
