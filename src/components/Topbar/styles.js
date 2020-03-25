import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: #000;
  height: 50px;
  line-height: 50px;
  color: #fff;
  @include background-image(linear-gradient(45deg, #1becbf 0%, #1bece4 45%));

  button{
    cursor: pointer;
    color: #fff;
    -webkit-appearance: none;
    margin:0;
    padding: 0;
    border: none;
    height: 50px;
    width: 50px;
    vertical-align: top;
    background: transparent;
    border-right: 1px solid rgba(255,255,255,.7);
    margin-right: 15px;
    @include transition(background-color .3s linear);
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
