
// import React from 'react';
// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink,
// } from './NavbarElements';
// import styles from "../Main/styles.module.css"
// const handlelogout = () => {
//   localStorage.removeItem("token")
//    window.location.reload()
// }

// const Navbar = () => {
//   return (
//     <>
//       <Nav>
//         <Bars />
  
//         <NavMenu>
//         <NavLink to='/dashboard' activeStyle>
//             Dashboard
//           </NavLink>
//           <NavLink to='/home' activeStyle>
//             Profile
//           </NavLink>
//           <NavLink to="/subgreddiit" activeStyle>
//             My Subgreddiits
//           </NavLink>
//           <NavLink to="/allsubgreddiit" activeStyle>
//             Subgreddiits
//           </NavLink>
//           <NavLink to="/savedposts" activeStyle>
//             SavedPosts
//           </NavLink>
//           {/* Second Nav */}
//           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//         </NavMenu>
//         <NavBtn>
//           <NavBtnLink to="/" onClick={handlelogout}>Logout</NavBtnLink>
//         </NavBtn>
//       </Nav>
//       <nav className={styles.navbar}>
// 					<h1>GREDDIIT</h1>
// 				</nav>
//     </>
//   );
// };
  
// export default Navbar;


import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import styles from '../Main/styles.module.css';

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
        <nav className={styles.navbar}>
          <h1>ForumFlow</h1>
        </nav>
          <NavLink to='/dashboard' activeStyle>
            <i className='fas fa-chart-line' /> Dashboard
          </NavLink>
          <NavLink to='/home' activeStyle>
            <i className='fas fa-user' /> Profile
          </NavLink>
          <NavLink to='/subgreddiit' activeStyle>
            <i className='fas fa-folder' /> My Subforums
          </NavLink>
          <NavLink to='/allsubgreddiit' activeStyle>
            <i className='fas fa-th-list' /> Subforums
          </NavLink>
          <NavLink to='/savedposts' activeStyle>
            <i className='fas fa-save' /> SavedPosts
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/' onClick={handleLogout}>
            Logout
          </NavBtnLink>
        </NavBtn>
      </Nav>

    </>
  );
};

export default Navbar;