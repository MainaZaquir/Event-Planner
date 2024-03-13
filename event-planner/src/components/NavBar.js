<<<<<<< HEAD
=======

>>>>>>> 6ba0557 (made changes)
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import { selectUser } from '../features/user/userSlice';

import {Navbar, Nav} from 'react-bootstrap';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Events' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

function UserMenu({ user }) {

  return (
    <Navbar>
       <Navbar.brand>
       <img src='' />
       </Navbar.brand>

    </Navbar>
  )
  return user ? (
    <>
      <span className="nav-item nav-link">{user.name}</span>
      <button
        className="nav-item nav-link btn btn-outline-danger"
        onClick={() => console.log('Logout')}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="nav-item nav-link">
        Login
      </Link>
      <Link to="/register" className="nav-item nav-link">
        Register
      </Link>
    </>
  );
}

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleSidebar}
        >
          <FaBars />
        </button>
        <Link to="/" className="navbar-brand">
          Event Time
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {routes.map((route) => (
              <li className="nav-item" key={route.path}>
                <Link to={route.path} className="nav-link">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-nav ml-auto">
          <UserMenu user={user} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
