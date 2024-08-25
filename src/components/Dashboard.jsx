import { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Pagination, Form, Button } from 'react-bootstrap';
import FilterSearch from './FilterSearch';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaStar, FaRegStar } from 'react-icons/fa';
import ScrollToTop from './ScrollToTop';
import { useMediaQuery } from 'react-responsive';
import carDataJson from '/src/data/cars.json'; // Adjust the path according to your project structure

const Dashboard = () => {
    const [carData, setCarData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [visibleItems, setVisibleItems] = useState(30); // State for Load More
    const itemsPerPage = 21;

    // Determine if the device is mobile
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        const data = carDataJson;
        const carsWithHighlight = data.Cars.map(car => ({
            ...car,
            highlighted: localStorage.getItem(`highlighted_${car.Cid}`) === 'true'
        }));
        setCarData(carsWithHighlight);
        setFilteredData(carsWithHighlight);
    }, []);

    const handleFilter = (query) => {
        const normalizedQuery = query.replace(/,/g, '').toLowerCase();
        const filtered = carData.filter(car => {
            const normalizedPrice = (car.Prc || '').replace(/,/g, '');
            return (car.NameMMT || '').toLowerCase().includes(normalizedQuery) ||
                (car.Model || '').toLowerCase().includes(normalizedQuery) ||
                (car.Yr || '').toString().includes(normalizedQuery) ||
                normalizedPrice.includes(normalizedQuery) ||
                (car.Province || '').toLowerCase().includes(normalizedQuery);
        });
        setFilteredData(filtered);
        setCurrentPage(1);
        setVisibleItems(itemsPerPage); // Reset visible items on filter change
    };

    const handleSortChange = (criteria) => {
        const newDirection = sortCriteria === criteria && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortCriteria(criteria);
        setSortDirection(newDirection);
        sortData(criteria, newDirection);
    };

    const sortData = (criteria, direction) => {
        let sortedData = [...filteredData];
        const compare = (a, b) => {
            if (criteria === 'price') {
                const priceA = parseFloat(a.Prc.replace(/,/g, ''));
                const priceB = parseFloat(b.Prc.replace(/,/g, ''));
                return direction === 'asc' ? priceA - priceB : priceB - priceA;
            } else if (criteria === 'year') {
                return direction === 'asc' ? a.Yr - b.Yr : b.Yr - a.Yr;
            } else if (criteria === 'name') {
                return direction === 'asc' ? a.NameMMT.localeCompare(b.NameMMT) : b.NameMMT.localeCompare(a.NameMMT);
            } else if (criteria === 'model') {
                return direction === 'asc' ? a.Model.localeCompare(b.Model) : b.Model.localeCompare(a.Model);
            }
            return 0;
        };
        sortedData.sort(compare);
        setFilteredData(sortedData);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
            setCurrentPage(page);
            setVisibleItems(page * itemsPerPage); // For non-mobile, set the visible items based on the current page
        }
    };

    const handleLoadMore = () => {
        setVisibleItems(prev => prev + itemsPerPage);
    };

    // Toggle the highlight status of a car
    const toggleHighlight = (Cid) => {
        const updatedCarData = carData.map(car => {
            if (car.Cid === Cid) {
                const updatedHighlightStatus = !car.highlighted;
                localStorage.setItem(`highlighted_${Cid}`, updatedHighlightStatus);
                return { ...car, highlighted: updatedHighlightStatus };
            }
            return car;
        });

        setCarData(updatedCarData);
        setFilteredData(updatedCarData);
    };

    // Determine items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = isMobile ? filteredData.slice(0, visibleItems) : filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <Container style={{ marginTop: '130px' }}>
                <h2 className="text-center" style={{ color: '#023047', fontWeight: 'bold' }}>Car Analytics Dashboard</h2>
                <div className="d-flex justify-content-center my-4">
                    <FilterSearch onFilter={handleFilter} />
                </div>
                <Form.Group controlId="sortSelect" className="mt-3 d-flex align-items-center justify-content-center">
                    <Form.Label className="me-2" style={{ fontWeight: 'bold', color: '#023047' }}>Sort By:</Form.Label>
                    <Button
                        variant="link"
                        onClick={() => handleSortChange('name')}
                        className="text-decoration-none"
                        style={{ color: '#28a745', fontWeight: 'bold' }}
                    >
                        Brand {sortCriteria === 'name' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => handleSortChange('model')}
                        className="text-decoration-none"
                        style={{ color: '#28a745', fontWeight: 'bold' }}
                    >
                        Model {sortCriteria === 'model' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => handleSortChange('year')}
                        className="text-decoration-none"
                        style={{ color: '#28a745', fontWeight: 'bold' }}
                    >
                        Year {sortCriteria === 'year' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => handleSortChange('price')}
                        className="text-decoration-none"
                        style={{ color: '#28a745', fontWeight: 'bold' }}
                    >
                        Price {sortCriteria === 'price' && (sortDirection === 'asc' ? <FaArrowUp /> : <FaArrowDown />)}
                    </Button>
                </Form.Group>
                <Row className="mt-3 gy-5">
                    {currentItems.length > 0 ? (
                        currentItems.map((car) => (
                            <Col sm={12} md={6} lg={4} key={car.Cid} className="d-flex align-items-stretch">
                                <Card
                                    className="w-100 shadow-lg rounded-3 hover-card"
                                    style={{
                                        borderColor: car.highlighted ? '#de1a52' : '#ffffff',
                                        overflow: 'hidden',
                                        borderRadius: '15px',
                                        backgroundImage: `linear-gradient(135deg, #f5f7fa 0%, ${car.highlighted ? '#ffdde1' : '#ffffff'} 100%)`,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        transform: car.highlighted ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                >
                                    <Link to={`/car/${car.Cid}`}>
                                        <Card.Img
                                            variant="top"
                                            src={car.Img300} // Adjust based on your image field
                                            alt={car.NameMMT}
                                            style={{
                                                maxHeight: '200px',
                                                objectFit: 'cover',
                                                borderTopLeftRadius: '15px',
                                                borderTopRightRadius: '15px',
                                            }}
                                        />
                                    </Link>

                                    <Card.Body
                                        className="d-flex flex-column"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px' }}
                                    >
                                        <Card.Title
                                            className="text-center"
                                            style={{
                                                color: '#023047',
                                                fontWeight: 'bold',
                                                fontSize: '1.5rem',
                                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                                                marginBottom: '15px',
                                            }}
                                        >
                                            <Link
                                                to={`/car/${car.Cid}`}
                                                className="text-decoration-none"
                                                style={{ color: '#023047', transition: 'color 0.3s ease' }}
                                                onMouseEnter={e => e.target.style.color = '#28a745'}
                                                onMouseLeave={e => e.target.style.color = '#023047'}
                                            >
                                                {car.NameMMT}
                                            </Link>
                                        </Card.Title>
                                        <Card.Text
                                            className="text-center"
                                            style={{
                                                color: '#666',
                                                fontSize: '20px',
                                                minHeight: '60px',
                                            }}
                                        >
                                            {car.Model} - {car.Yr}
                                        </Card.Text>
                                        <div
                                            className="text-center"
                                            style={{
                                                color: '#28a745',
                                                fontSize: '1.3rem',
                                                fontWeight: 'bold',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            {car.Prc} THB
                                        </div>
                                        <div className="d-flex justify-content-center mt-auto">
                                            <Button
                                                variant="outline-danger"
                                                className="px-3 py-2 rounded-3"
                                                onClick={() => toggleHighlight(car.Cid)}
                                                style={{
                                                    backgroundColor: car.highlighted ? '#de1a52' : 'transparent',
                                                    borderColor: car.highlighted ? '#de1a52' : '#28a745',
                                                    color: car.highlighted ? '#ffffff' : '#28a745',
                                                    transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease'
                                                }}
                                            >
                                                {car.highlighted ? 'Remove Highlight' : 'Highlight'} {car.highlighted ? <FaStar /> : <FaRegStar />}
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No data found</p>
                    )}
                </Row>

                {!isMobile && (
                    <div className="d-flex justify-content-center my-4">
                        <Pagination>
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                        </Pagination>
                    </div>
                )}

                {isMobile && visibleItems < filteredData.length && (
                    <div className="d-flex justify-content-center" style={{marginTop: '30px'}}>
                        <Button onClick={handleLoadMore} variant='success'>Load More</Button>
                    </div>
                )}
            </Container>
            <ScrollToTop />
        </>
    );
};

export default Dashboard;
