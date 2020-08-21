import React, { useState } from 'react';
//import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';

const NavComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle onClick={toggle} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" navbar>
                        <Nav.Link href="/Registration">Registration</Nav.Link>
                        <Nav.Link href="/Profile">Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavComponent;