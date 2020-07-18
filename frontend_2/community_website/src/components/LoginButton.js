import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import {connect} from 'react-redux'

import * as authenticationAction from '../actions/AuthenticationAction'
import { bindActionCreators } from 'redux'

const mapStateProps = state => {
return state;
}

class LoginButton extends Component {

    constructor(props){
        super(props)
        this.state = { //1
            email: '',
            password:''
            }
        //Funktionen werden registriert
        this.handleShow=this.handleShow.bind(this) 
        this.handleClose=this.handleClose.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }

    handleShow(e){
       // e.preventDefault();
      /*  this.setState({show:true});*/
        const {showLoginDialogAction} = this.props;
        showLoginDialogAction();
    }
    

    handleClose(){
       
       /* this.setState({show:false});*/
       const {hideLoginDialoAction}= this.props;
       hideLoginDialoAction();
    }

    handleChange(e){  //3
    /*console.log("event: "+e);*/
    const {name, value} = e.target; //4
    this.setState({[name]:value})   //5
   /* console.log(JSON.stringify(this.state));  */  //6
    
    
    }

    handleSubmit(e){ //7
        e.preventDefault()
        console.log("Pushed Submit");
        const { email, password}=this.state;
        const{authenticateUserAction}=this.props;
        authenticateUserAction(email,password);

        

    }



    render() {
        var showDialog = this.props.showLoginDialog;
        if (showDialog === undefined){
            showDialog=false;
        }
       
      return (
            <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <button onClick={this.handleShow} type="button" className="btn btn-outline-light" data-toggle="modal" data-target="#login">log in</button>
                    </li>
                </ul>

               <Modal show={showDialog} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title style={{margin:"0 auto"}}>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleChange}/>
                        </Form.Group>
                        <button  onClick={this.handleSubmit} type="button" className="btn btn-outline-dark" >submit</button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                Passwort vergessen?
                </Modal.Footer>
            </Modal>
        </div>
        ) 
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationAction.getShowLoginDialogAction,
    hideLoginDialoAction: authenticationAction.getHideLoginDialogAction,
    authenticateUserAction: authenticationAction.authenticateUser
},dispatch)

const ConnectedUser = connect(mapStateProps,mapDispatchToProps)(LoginButton)

export default ConnectedUser

