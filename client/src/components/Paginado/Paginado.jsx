import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  // Generar los números de página
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          disabled={number === currentPage}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
