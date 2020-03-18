import styled from 'styled-components';

export const Nav = styled.div.attrs(() => ({ className: 'vertical-nav' }))`
  min-width: 17rem;
  width: 17rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
  background-color: #494c52;

  li {
    font-style: Verdana;
    font-size: 20px;
    border-bottom: 1px solid;
    border-color: #fff;
    i {
      margin-right: 1rem;
      text-align: center;
    }
    * {
      color: #fff;
    }
  }
`;
