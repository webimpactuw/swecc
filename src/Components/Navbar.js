import React, { useState } from 'react';
import '../CSS/Navbar.css';
import { CSSTransition } from 'react-transition-group';
import SWECClogo from '../Data/img/SWECClogo.jpg';
import { NavLink } from 'react-router-dom';

import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { FaInstagram, FaLinkedin, FaDiscord, FaUsers, FaChevronRight } from 'react-icons/fa';
import { FcShare, FcCalendar, FcAbout, FcHome } from 'react-icons/fc';
import { IoHome } from 'react-icons/io5';
import { RiCalendarTodoFill } from 'react-icons/ri';
import { MdGroupAdd } from 'react-icons/md';
import { BiInfoCircle } from 'react-icons/bi';

function Navbar() {

  const [expand, setExpand] = useState(false);

  const togglExpand = () => {
    setExpand(!expand);
  }

  const closeExpand = () => {
    setExpand(false);
  }

  return (
    <NavBar>
      <NavItem icon={<NavLink to="/"><img className="swecc-logo" src={SWECClogo} alt="SWECC Logo" ></img></NavLink>} route={"/"} closeExpand={closeExpand} />
      <NavItem icon={<FcHome />} route={"/"} closeExpand={closeExpand} />
      <NavItem icon={<FcCalendar />} route={"/Events"} closeExpand={closeExpand}  ></NavItem>
      <NavItem icon={<FcAbout />} route={"/About"} expand={expand} closeExpand={closeExpand} />
      <NavItem icon={<MdGroupAdd />} route={"/Join-Now"} expand={expand} closeExpand={closeExpand} />
      <NavExpandItem id="wow" icon={<CaretIcon />} expand={expand} togglExpand={togglExpand} closeExpand={closeExpand} >
        <DropdownMenu closeExpand={closeExpand} />
      </NavExpandItem>
    </NavBar>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  return (
    <li className="nav-item" onClick={props.closeExpand}>
      <NavLink to={props.route}>
        <div className="icon-button" data-tooltip="sample">
          {props.icon}
        </div>
      </NavLink>
    </li>
  );
}

function NavExpandItem(props) {

  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <div className="icon-button" onClick={props.togglExpand}>
        {props.icon}
      </div>
      {props.expand && props.children}
    </li>
  );
}

function DropdownMenu(props) {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function getHeight(elem) {
    const height = elem.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>

      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={getHeight}>
        <div className="menu">
          <NavLink to="/" onClick={props.closeExpand}>
            <DropdownItem leftIcon={<IoHome />}>Home</DropdownItem>
          </NavLink>
          <NavLink to="/About" onClick={props.closeExpand} >
            <DropdownItem leftIcon={<BiInfoCircle />} >About</DropdownItem>
          </NavLink>
          <NavLink to="/Events" onClick={props.closeExpand} >
            <DropdownItem leftIcon={<RiCalendarTodoFill />} >Events</DropdownItem>
          </NavLink>
          <NavLink to="/Join-Now" onClick={props.closeExpand} >
            <DropdownItem leftIcon={<FaUsers />} >Join Now</DropdownItem>
          </NavLink>
          <DropdownItem
            leftIcon={<BellIcon />}
            url={"http://mailman11.u.washington.edu/mailman/listinfo/sweccmailinglist"}>
            Subscribe to our newsletter
          </DropdownItem>
          <DropdownItem
            leftIcon={<FcShare />}
            rightIcon={<FaChevronRight style={{ padding: 10 }} />}
            goToMenu="socials">
            Social Media
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "socials"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={getHeight}>

        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main"></DropdownItem>
          <DropdownItem
            leftIcon={<FaDiscord />}
            url={"https://discord.gg/Pbk4sCEWDY"}>
            Discord
          </DropdownItem>

          <DropdownItem
            leftIcon={<FaInstagram />}
            url={"https://www.instagram.com/swecc.uw/"}>
            Instagram
          </DropdownItem>

          <DropdownItem
            leftIcon={<FaLinkedin />}
            url={"https://www.linkedin.com/company/software-engineering-career-club-at-uw/"}>
            LinkedIn
          </DropdownItem>

          <DropdownItem
            leftIcon={<MessengerIcon />}
            url={"mailto:swecc@uw.edu"}>
            Email
          </DropdownItem>
        </div>

      </CSSTransition>

    </div>
  )
}

export default Navbar;