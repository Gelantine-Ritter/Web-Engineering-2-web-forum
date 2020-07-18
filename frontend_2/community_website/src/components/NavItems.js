import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'

export default class NavItems extends Component {
    render() {
        return (
            <div>
            <Nav >
            <Nav.Link style= {{color:"white"}} href="#about">about</Nav.Link>
            <Nav.Link style={{color:"white"}} href="#faq">faq</Nav.Link>
            <Nav.Link style={{color:"white"}} href="#kontakt">kontakt</Nav.Link>
            </Nav>
            </div>
        )
    }
}
