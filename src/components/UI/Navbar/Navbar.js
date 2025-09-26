import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import classes from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faWikipediaW,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  const history = useHistory();
  const [isExtended, setIsExtended] = useState(false);
  const toggleNavbar = () => {
    setIsExtended((prevState) => !prevState);
  };
  const closeNavbar = () => {
    if (isExtended) {
      setIsExtended(false);
    }
  };
  const scroll = (ref, id) => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    } else {
      history.push(`/#${id}`);
    }
    closeNavbar();
  };
  return (
    <>
      <nav
        className={classNames(classes.navbar, !isExtended && classes.collapsed)}
      >
        <div className={classNames(classes.container, classes.tabs)}>
          <div className={classes.tabWrapper} onClick={closeNavbar}>
            <NavLink
              className={classes.tab}
              activeClassName={classes.active}
              to='/'
              exact
            >
              მთავარი
            </NavLink>
          </div>
          <div className={classes.tabWrapper} onClick={closeNavbar}>
            <NavLink
              className={classes.tab}
              style={{
                whiteSpace: 'nowrap',
              }}
              activeClassName={classes.active}
              to='/about'
            >
              ჩვენ შესახებ
            </NavLink>
          </div>
          <div className={classes.tabWrapper} onClick={closeNavbar}>
            <NavLink
              className={classes.tab}
              activeClassName={classes.active}
              to='/art'
            >
              ხელოვნება
            </NavLink>
          </div>
          <div className={classes.tabWrapper} onClick={closeNavbar}>
            <NavLink
              className={classes.tab}
              activeClassName={classes.active}
              to='/projects'
            >
              პროექტები
            </NavLink>
          </div>
          <div className={classes.tabWrapper} onClick={closeNavbar}>
            <NavLink
              className={classes.tab}
              activeClassName={classes.active}
              to='/store'
            >
              მაღაზია
            </NavLink>
          </div>
          <div className={classes.tabWrapper} onClick={closeNavbar}>
            <NavLink
              className={classes.tab}
              activeClassName={classes.active}
              to='/team'
            >
              ჩვენი გუნდი
            </NavLink>
          </div>
          {/*<div
            className={classes.tabWrapper}
            onClick={() => scroll(props.contactRef, 'contact')}
            style={{ textAlign: 'center' }}
          >
            <label className={classes.tab}>კონტაქტი</label>
          </div>*/}
          <div className={classes.tabWrapper} onClick={closeNavbar}>
            <NavLink
              className={classes.tab}
              activeClassName={classes.active}
              to='/contact'
            >
              კონტაქტი
            </NavLink>
          </div>
          <button className={classes.buttonDropdown} onClick={toggleNavbar}>
            <FontAwesomeIcon className={classes.icon} icon={faBars} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
