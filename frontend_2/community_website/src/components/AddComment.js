import React, { Component } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import {  Card, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';

class AddComment extends Component {

    state={
        text:''
    }

    handleChange = (event) =>{
        const target= event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]:value
        })

    }

    handleSubmit = (event) => {
        event.preventDefault();

        const headers = {
            'Authtoken' : localStorage.getItem('token')
        }

        const myId = this.props.postID.toString()
       // console.log('Post ID um Comment zu adden '+myId);
        //console.log(typeof myId);
        
        axios.post('http://localhost:3200/posts/'+ myId +'/add/comments',this.state, {headers : headers })
        .then(response =>{
            console.log(response);
        })
        .catch(error =>{
            console.log('Daten nicht an Server gesendet');
        })

    }

    render() {

       // console.log('Comment State: ',this.state);
        return (
            <div>
                <Card style={{margin: '30px'}}>
                    <CardBody>
                        <CardTitle>add comment</CardTitle>
                            <CardText>
                                <Form.Group onSubmit={this.handleSubmit} controlId="exampleForm.ControlTextarea1">
                                <Form.Control 
                                    name="text" 
                                    value={this.state.text} 
                                    onChange={this.handleChange} 
                                    placeholder="Enter Comment" 
                                    as="textarea" 
                                    rows="8" />
                                </Form.Group> 
                            </CardText>
                    </CardBody>
                    <CardFooter className="text-muted"> 
                    <button  type="button" className="btn btn-outline-dark" data-toggle="modal"  onClick={this.handleSubmit}>Teilen!</button>
                    </CardFooter>
                </Card> 
            </div>
        )
    }
}

export default AddComment
