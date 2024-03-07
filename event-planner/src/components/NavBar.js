import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import { selectUser } from '../features/user/userSlice';

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
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-nav ml-auto">
          {user ? (
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
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
