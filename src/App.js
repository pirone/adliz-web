import React, { useState } from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global';

import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Navbar';
import Topbar from './components/Topbar';

function App() {
  const [navBar, setShowNavBar] = useState(true);

  function showHideNavBar() {
    setShowNavBar(!navBar);
    console.log(navBar);
  }
  return (
    <>
      <Topbar handleNavBar={showHideNavBar} />
      <Menu handleNavBar={navBar} />
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
