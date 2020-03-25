import styled from 'styled-components';

export const Nav = styled.aside.attrs(() => ({ className: 'vertical-nav' }))`
  position: fixed;
  top: 0;
  height: 100%;
  width: 300px;
  color: #fff;
  left: ${props => (props.show ? 0 : '-300px')};
  background-color: #494c52;
  padding: 20px;
  padding-top: 60px;
  transition: left 0.4s, width 0.5s;

  li {
    font-style: Verdana;
    font-size: 15px;
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
