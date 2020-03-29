import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  .pagination {
    z-index: 1;
  }

  li a {
    color: #000;
  }

  && li.active span {
    color: #fff;
    background-color: #494c52;
    border-color: #494c52;
  }
`;
