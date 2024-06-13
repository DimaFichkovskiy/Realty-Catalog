import React from 'react';
import leftArrowIcon from '../assets/images/left-arrow.png'
import rightArrowIcon from '../assets/images/right-arorw.png'
import tripleDotIcon from '../assets/images/triple-dot.png'

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const createPageNumbers = () => {
        const pages = [];

        if (currentPage > 3) {
            pages.push(1);
            if (currentPage > 4) {
                pages.push(<img className="triple-dot-icon" src={tripleDotIcon} alt='tripleDot'/>);
            }
        }

        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i > 0 && i <= totalPages) {
                pages.push(i);
            }
        }

        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
                pages.push(<img className="triple-dot-icon" src={tripleDotIcon} alt='tripleDot'/>);
            }
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                className="prev"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img src={leftArrowIcon} alt='leftArrow'/>
            </button>
            {createPageNumbers().map((page, index) =>
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            className={`page ${page === currentPage ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="dots">
            {page}
          </span>
                    )
            )}
            <button
                className="next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <img src={rightArrowIcon} alt='rightArrow'/>
            </button>
        </div>
    );
};

export default Pagination;