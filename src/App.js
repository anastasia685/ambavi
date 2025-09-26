import React, { useRef } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/UI/Navbar/Navbar';
import LandingPage from './components/Landing/Landing';
import AboutPage from './components/About/About';
import StorePage from './components/Store/Store';
import ProductPage from './components/Store/Product/Product';
import ProjectsPage from './components/Projects/Projects';
import ArtPage from './components/Art/Art';
import TeamPage from './components/Team/Team';
import ContactPage from './components/Contact/Contact';

import DaigvianesPage from './components/Art/Daigvianes/Daigvianes';
import GantiadiPage from './components/Art/Gantiadi/Gantiadi';

import Daigvianes from './components/3D/Daigvianes/Daigvianes';

import './App.css';

const App = () => {

  const contactRef = useRef();
  return (
      <BrowserRouter>
        <Navbar contactRef={contactRef} />
        <Switch>
          <Route path='/test'>
            <Daigvianes />
          </Route>
          <Route path='/about'>
            <AboutPage />
          </Route>
          <Route path='/projects'>
            <ProjectsPage />
          </Route>
          <Route path='/art/daigvianes'>
            <DaigvianesPage />
          </Route>
          <Route path='/art/gantiadi'>
            <GantiadiPage />
          </Route>
          <Route path='/art'>
            <ArtPage />
          </Route>
          <Route path='/team'>
            <TeamPage />
          </Route>
          <Route path='/contact'>
            <ContactPage />
          </Route>
          <Route path='/store/product/:id'>
            <ProductPage />
          </Route>
          <Route path='/store'>
            <StorePage />
          </Route>
          <Route path='/'>
            <LandingPage contactRef={contactRef} />
          </Route>
        </Switch>
      </BrowserRouter>
  );
};

export default App;
