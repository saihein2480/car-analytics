import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '/src/styles/ScrollToTop.css'; // Create this CSS file for styling

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="scroll-to-top">
            {visible && 
                <button onClick={scrollToTop} className="scroll-button">
                    <FaArrowUp />
                </button>
            }
        </div>
    );
};

export default ScrollToTop;
