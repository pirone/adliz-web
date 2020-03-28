import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #97B5C7;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
    color: #000;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    border-radius: .25rem;
    font-size: 1rem;
  }

  .blue {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

`;
