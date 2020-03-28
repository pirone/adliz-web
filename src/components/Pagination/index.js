/* eslint-disable react/prop-types */
import { Pagination } from 'react-bootstrap';
import React from 'react';

import { Container } from './styles';

export default function PaginationUtil(props) {
  const { totalPages, currentPage, setCurrentPage } = props;

  const pageItems = [];

  for (let index = 0; index < totalPages; index += 1) {
    pageItems.push(
      <Pagination.Item
        key={index}
        active={index === currentPage}
        onClick={() => setCurrentPage(index)}
      >
        {index + 1}
      </Pagination.Item>
    );
  }

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(currentPage);
    }
  };

  return (
    <Container>
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(0)} />
        <Pagination.Prev onClick={previousPage} />
        {pageItems}
        <Pagination.Next onClick={nextPage} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages - 1)} />
      </Pagination>
    </Container>
  );
}
