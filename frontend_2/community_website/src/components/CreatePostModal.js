import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios'


 class CreatePostModal extends Component {

    constructor(props){
        super(props)
        this.state={
            show:false,
            postedBy: '',
            title:'',
            text:'',
            date:'',
            category:'',
            comment:''
        };
        this.handleShow=this.handleShow.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }

    handleChange=(event)=>{
        const {name, value} = event.target; //4
        this.setState({[name]:value})    
    };
  

    handleShow(e){
        this.setState({show:true})
    }

    handleClose(e){
        this.setState({show:false})
    }

  

    handleSubmit = (event) => {
        event.preventDefault();

        const headers = {
            'Authtoken' : localStorage.getItem('token')
        }
    
        console.log(this.state)
        axios.post('http://localhost:3200/posts/new',  this.state, {headers : headers })
        .then(response =>{
          //  this.setState({title:'',text:''})
          console.log(response);
        })
        .catch(error => {
          console.log('Daten nicht an den Server gesendet');
        })
        
      };

    render() {
        return (
            <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <button onClick={this.handleShow} type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#login">Create new Post</button>
                    </li>
                </ul>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{margin:"0 auto"}}>Create Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <Form.Control  className="mb-2"  name="title" type="text" placeholder="Enter Titel" onChange={this.handleChange}/>
                            <Form.Group  controlId="exampleForm.ControlTextarea1">
                                <Form.Control name="text" placeholder="Enter text" as="textarea" rows="3" onChange={this.handleChange}/>
                            </Form.Group>              
                        </Modal.Body>
                        <Modal.Footer>
                        <button onClick={this.handleSubmit} type="button" className="btn btn-outline-dark" data-toggle="modal">Teilen!</button>
                        </Modal.Footer>
                    </Modal> 
                    </div>
        )
    }
}

export default CreatePostModal