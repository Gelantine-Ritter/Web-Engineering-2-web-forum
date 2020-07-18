import React, {Component} from 'react'
import logo from '../pics/logo6.png'; // Tell webpack this JS file uses this image
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Form from 'react-bootstrap/Form'

import Navbar from 'react-bootstrap/Navbar'
import NavItems from '../components/NavItems'


import { connect } from 'react-redux';


const mapStateToProps = state => {
    return state;
}


class TopMenu extends Component {



render(){
    let user = this.props.user
    var sessionField ,insertNavElem

    if(user){
        sessionField = <LogoutButton />
        insertNavElem =""
    }else{
        sessionField = <LoginButton />
        insertNavElem= <NavItems />
      
        
    }

    return(
        
        <div>
            <Navbar className="fixed-top"
                 bg="dark" expand="lg">
                <Navbar.Brand href="#home">
                <img src={logo} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {insertNavElem}
                    <Form className="ml-auto" inline>
                        {sessionField}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
       )
    }
}

export default connect(mapStateToProps)(TopMenu)
