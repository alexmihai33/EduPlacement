import { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material"
import { styled } from '@mui/material/styles';

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #6610f2 30%, #9d4edd 90%)',
  border: 0,
  borderRadius: '10px',
  color: 'white',
  padding: '12px 28px',
  fontWeight: 700,
  letterSpacing: '1px',
  boxShadow: '0 3px 5px 2px rgba(102, 16, 242, .3)',
  backgroundSize: '200% auto',
  transition: '0.5s',
  '&:hover': {
    backgroundPosition: 'right center',
    boxShadow: '0 5px 10px 3px rgba(102, 16, 242, .4)',
    transform: 'translateY(-2px)'
  },
  '&:active': {
    transform: 'translateY(0)'
  }
});

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  const getNavLinkClass = ({ isActive }: any) =>
    isActive ? "nav-link active-link" : "nav-link";

  return (
    <div className="nav-container">
      <Navbar 
        className="custom-navbar" // Added custom class
        expand="md" 
        container={false} 
        fixed="top"
      >
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              {isAuthenticated?(<NavItem>
                <RouterNavLink
                  to="/dashboard"
                  className={getNavLinkClass}
                >
                  Dashboard
                </RouterNavLink>
              </NavItem>):null}
              {isAuthenticated ? (<NavItem>
                <RouterNavLink
                  to="/profile"
                  className={getNavLinkClass}
                >
                  Profile
                </RouterNavLink>
              </NavItem>) : null}
              <NavItem>
                <RouterNavLink
                  to="/"
                  className={getNavLinkClass}
                >
                  Home
                </RouterNavLink>
              </NavItem>
              <NavItem>
                <RouterNavLink
                  to="/news"
                  className={getNavLinkClass}
                >
                  News
                </RouterNavLink>
              </NavItem>
              <NavItem>
                <RouterNavLink
                  to="/support"
                  className={getNavLinkClass}
                >
                  Support
                </RouterNavLink>
              </NavItem>
              <NavItem>
                <RouterNavLink
                  to="/guide"
                  className={getNavLinkClass}
                >
                  Ghid
                </RouterNavLink>
              </NavItem>
            </Nav>

            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <GradientButton
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin login-btn" // Added class
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </GradientButton>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user?.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-purple"> {/* Added class */}
                    <DropdownItem header>{user?.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                      out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>

            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <GradientButton
                    id="qsLoginBtn"
                    color="primary"
                  
                    className="login-btn" // Added class
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </GradientButton>
                </NavItem>
              </Nav>
            )}

            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user?.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle ms-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user?.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="ms-3" />
                  <RouterNavLink
                    to="/profile"
                    className={getNavLinkClass}
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="ms-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;