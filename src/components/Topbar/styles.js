import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: #38627A;
  height: 50px;
  color: #fff;
  padding: 2px 0;
  z-index: 200;
  @include background-image(linear-gradient(45deg, #1becbf 0%, #1bece4 45%));

  button{
    cursor: pointer;
    color: #fff;
    height: 45px;
    width: 50px;
    background: transparent;
    border-right: 1px solid;
    margin-right: 15px;
    border-radius: 0;
    &:hover,
    &:focus,
    &.active{
      outline: none;
    }
    &:hover,
    &.active{
      background-color: rgba(0,0,0,.1);
    }
`;
