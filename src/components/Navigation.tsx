import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'rsuite'

export default function Navigation() {
  return (
    <Navbar>
      <Navbar.Brand >MLEKARA</Navbar.Brand>
      <Nav>
        <Nav.Item as={NavLink} to='/'>Internal complaint rules</Nav.Item>
        <Nav.Item as={NavLink} to='/orders'>Orders</Nav.Item>
      </Nav>
    </Navbar>
  )
}
