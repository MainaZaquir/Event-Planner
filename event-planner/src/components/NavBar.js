// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaBars } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleSidebar } from '../features/sidebar/sidebarSlice';
// import { selectUser } from '../features/user/userSlice';

// import {Navbar, Nav} from 'react-bootstrap';

// const routes = [
//   { path: '/', label: 'Home' },
//   { path: '/events', label: 'Events' },
//   { path: '/services', label: 'Services' },
//   { path: '/about', label: 'About' },
//   { path: '/contact', label: 'Contact' },
// ];

// function UserMenu({ user }) {

//   return user ? (
//     <Navbar>
//        <Navbar.brand>
//        <img src='' />
//        </Navbar.brand>
//        <Nav.Item>
//         <Nav.Link href="/home">Active</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="link-1">Link</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="link-2">Link</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="disabled" disabled>
//           Disabled
//         </Nav.Link>
//       </Nav.Item>
//     </Navbar>
//   )
//   // return user ? (
//   //   <>
//   //     <span className="nav-item nav-link">{user.name}</span>
//   //     <button
//   //       className="nav-item nav-link btn btn-outline-danger"
//   //       onClick={() => console.log('Logout')}
//   //     >
//   //       Logout
//   //     </button>
//   //   </>
//   // ) : (
//   //   <>
//   //     <Link to="/login" className="nav-item nav-link">
//   //       Login
//   //     </Link>
//   //     <Link to="/register" className="nav-item nav-link">
//   //       Register
//   //     </Link>
//   //   </>
//   // );
//   :
// }

// // function NavBar() {
// //   const dispatch = useDispatch();
// //   const user = useSelector(selectUser);

// //   const handleToggleSidebar = () => {
// //     dispatch(toggleSidebar());
// //   };

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
// //       <div className="container">
// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           onClick={handleToggleSidebar}
// //         >
// //           <FaBars />
// //         </button>
// //         <Link to="/" className="navbar-brand">
// //           Event Time
// //         </Link>
// //         <div className="collapse navbar-collapse" id="navbarNav">
// //           <ul className="navbar-nav">
// //             {routes.map((route) => (
// //               <li className="nav-item" key={route.path}>
// //                 <Link to={route.path} className="nav-link">
// //                   {route.label}
// //                 </Link>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //         <div className="navbar-nav ml-auto">
// //           <UserMenu user={user} />
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

//  export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import  "./NavBar.css";

function NavBar() {
  const dispatch = useDispatch();

  // const handleToggleSidebar = () => {
  //   dispatch(toggleSidebar());
  // };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="left">
      <Navbar.Brand href="#home">
        {/* <img
          id='logo'
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="intasend logo"
        /> */}
        <button onClick={() => dispatch(toggleSidebar())}>Sidebar</button>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" id="links">
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
