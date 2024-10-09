import React, { useState, useEffect } from "react";
import { Link as LinkR } from "react-router-dom";
import styled from "styled-components";
import { MenuRounded } from "@mui/icons-material";

const Nav = styled.div`
  background-color: #333;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  color: white;
  position: relative;
`;

const NavLogo = styled(LinkR)`
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: white;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  gap: 32px;
  position: relative;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(LinkR)`
  color: white;
  text-decoration: none;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: #ff6347;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px; /* Height of the box animation */
    background: #ff6347;
    bottom: -10px; /* Positioning it below the link */
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
    z-index: -1; /* Place it behind the text */
  }

  &:hover::before {
    transform: scaleX(1); /* Expand the box on hover */
  }

  &.active::before {
    transform: scaleX(1); /* Keep the box expanded for active link */
  }
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    cursor: pointer;
    font-size: 28px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  position: absolute;
  top: 80px;
  right: 0;
  background: #444;
  padding: 12px;
  width: 100%;
  border-radius: 5px;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 10;

  &.open {
    opacity: 1;
  }
`;

const MobileMenuItem = styled(NavLink)`
  padding: 10px 16px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false); // Close mobile menu when switching to desktop view
      }
    };

    window.addEventListener("resize", handleResize);
    
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Nav>
      <NavLogo to="/">Tourism</NavLogo>
      <NavItems>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/accommodations" className={({ isActive }) => (isActive ? "active" : "")}>Accommodation</NavLink>
        <NavLink to="/transport" className={({ isActive }) => (isActive ? "active" : "")}>Transportation</NavLink>
        <NavLink to="/dining" className={({ isActive }) => (isActive ? "active" : "")}>Dining</NavLink>
        <NavLink to="/sightseeing" className={({ isActive }) => (isActive ? "active" : "")}>Sightseeing</NavLink>
        <NavLink to="/activities" className={({ isActive }) => (isActive ? "active" : "")}>Activities</NavLink>
        <NavLink to="/safety-health" className={({ isActive }) => (isActive ? "active" : "")}>Safety & Health</NavLink>
        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>
        <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>Register</NavLink>
      </NavItems>

      <MobileIcon onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <MenuRounded style={{ color: "white" }} />
      </MobileIcon>

      <MobileMenu className={isOpen ? "open" : ""} isOpen={isOpen}>
        <MobileMenuItem onClick={handleLinkClick} to="/">Home</MobileMenuItem>
        <MobileMenuItem onClick={handleLinkClick} to="/accommodation">Accommodation</MobileMenuItem>
        <MobileMenuItem onClick={handleLinkClick} to="/transport">Transportation</MobileMenuItem>
        <MobileMenuItem onClick={handleLinkClick} to="/dining">Dining</MobileMenuItem>
        <MobileMenuItem onClick={handleLinkClick} to="/sightseeing">Sightseeing</MobileMenuItem>
        <MobileMenuItem onClick={handleLinkClick} to="/activities">Activities</MobileMenuItem>
        <MobileMenuItem onClick={handleLinkClick} to="/safety-health">Safety & Health</MobileMenuItem>
        <MobileMenuItem onClick={handleLinkClick} to="/login">Login</MobileMenuItem>
        <MobileMenuItem onClick={handleLinkClick} to="/register">Register</MobileMenuItem>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
