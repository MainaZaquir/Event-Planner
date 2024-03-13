import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/sidebar/sidebarSlice'; // Import toggleSidebar action
import { selectUser } from '../features/user/userSlice';

import { Navbar } from 'react-bootstrap'; // Only importing Navbar from react-bootstrap since Nav is not used

const routes = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Events' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

function UserMenu({ user }) {
  // Render user menu based on user authentication
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
    dispatch(toggleSidebar()); // Dispatch the toggleSidebar action
  };

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <div className="container">
        <Navbar.Toggle aria-controls="navbarNav" onClick={handleToggleSidebar}>
          <FaBars />
        </Navbar.Toggle>
        <Link to="/" className="navbar-brand">
          Event Time
        </Link>
        <Navbar.Collapse id="navbarNav">
          <ul className="navbar-nav">
            {routes.map((route) => (
              <li className="nav-item" key={route.path}>
                <Link to={route.path} className="nav-link">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </Navbar.Collapse>
        <div className="navbar-nav ml-auto">
          <UserMenu user={user} />
        </div>
      </div>
    </Navbar>
  );
}

export default NavBar;
