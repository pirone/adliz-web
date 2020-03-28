import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  li a {
    color: #000;
  }

  && li.active span {
    color: #fff;
    background-color: #494c52;
    border-color: #494c52;
  }
`;
