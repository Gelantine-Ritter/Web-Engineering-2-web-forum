import React from 'react';
import Nav from 'react-bootstrap/Nav'
import NewPost from '../components/CreatePostModal'


class ForumNavbar extends React.Component{
    render(){
        return(
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">All Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color:'grey'}} eventKey="link-1"> Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link style={{color:'grey'}} eventKey="link-2">Meine Posts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" > 
                   <NewPost />
                    </Nav.Link>
                </Nav.Item>
            </Nav>
          
            )

        }
    }

export default ForumNavbar;





