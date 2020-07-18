import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

class Register extends Component {
    constructor(props){

        super(props)
        this.state={
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            password:'',
    

        }
        this.state = {show: false}
        this.handleShow=this.handleShow.bind(this) 
        this.handleClose=this.handleClose.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }

    handleShow(e){
        e.preventDefault();
        this.setState({show:true});
     }
     
 
     handleClose(e){
        this.setState({show:false});
     }

     handleSubmit(e){ //7
        e.preventDefault()
        console.log("Pushed Submit");
       // const { firstname,lastname,username,email, password}=this.state;
       // const{authenticateUserAction}=this.props;
       // authenticateUserAction(email,password);

    }

    render(){
        return(
            <div>
            <button onClick={this.handleShow} type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#signup">sign up</button>
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                    <Modal.Title style={{margin:"0 auto"}}> Komm ins Lab!</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Vorname</Form.Label>
                                    <Form.Control type="text" placeholder="Vorname" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nachname</Form.Label>
                                    <Form.Control type="text" placeholder="Nachname" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Achtung! Du kannst deinen username nicht ändern" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' onChange={this.handleChange}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                    <Modal.Footer>
                    Bereits ein Konto?
                    </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

export default Register