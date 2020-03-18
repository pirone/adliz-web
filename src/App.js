import React from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global';

import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Navbar';

function App() {
  return (
    <>
      <Menu />
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
