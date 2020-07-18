import React, { Component } from 'react'
import {  Card, CardBody,
    CardTitle, CardText, Container, Col, Row } from 'reactstrap';
import axios from 'axios';
import AddComment from '../components/AddComment'

 class CommentBox extends Component {

    constructor(props){
        super(props)
        this.state={
            items: []
        }
    }

    componentDidMount() {
        const self = this
        const myId = this.props.postId
        axios.get('http://localhost:3200/posts/' + myId +'/comments')
        .then((response) => {
            self.setState({items: response.data})
          //  console.log("Response Post mit Comment: "+response.data);
        })            
    }  

    render() {
        
        var { items } = this.state;
      //  console.log(this.state+'AAAAAAAAAAAAAAAAA');
        return (
            <div>
                   <Container>
                            <Row>
                                <Col></Col>
                                <Col xs={12}>
                                {items.map(item =>{
                                    return <div>
                                        <Card>
                                            <CardBody>
                                            <CardTitle><em>{item.date}</em></CardTitle>
                                            <CardText>{item.text}</CardText>
                                            </CardBody>                                           
                                        </Card>
                                    </div>
                                })}  
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
               <AddComment postID={this.props.postId}/>  
            </div>
        )
    }
}

export default CommentBox
