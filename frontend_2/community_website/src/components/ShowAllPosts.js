import React from 'react';
import axios from 'axios';
import { Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Container, Col, Row } from 'reactstrap';

import Pagination from '../components/Pagination'

import CommentBox from '../components/CommentBox'


class getAllPosts extends React.Component{

    constructor (props) {
        super(props)
        this.state = {
          isLoaded: false,
          items: [],
          currentPage: 1,
          postsPerPage: 4,
          showContent: false

        }
        this.toggleContent = this.toggleContent.bind(this)
    }
    
    componentDidMount() {
        const self = this
        axios.get('http://localhost:3200/posts')
            .then((response) => {
                self.setState({items: response.data})
              //  console.log("Response alle Posts "+response.data);
            })            
        }  

        toggleContent(e){
            e.preventDefault()
            this.setState({
                showContent: !this.state.showContent
            })
        }


        render () {
            var { currentPage, postsPerPage, items } = this.state

            const indexLastPost =currentPage*postsPerPage;
            const indexFirstPost=indexLastPost-postsPerPage;
            const currentPosts = items.slice(indexFirstPost,indexLastPost);
            
            const paginate = pageNum => this.setState({currentPage: pageNum});
            const nextPage = () => this.setState({currentPage:currentPage+1})
            const prevPage = () => this.setState({currentPage:currentPage-1})

            const showContent = this.state.showContent


            return (
                <div>
                   {currentPosts.map(item => {
                       return <div>
                              
                                    <Container style={{margin: '30px'}} >
                                            <Row>
                                                <Col></Col>
                                                <Col xs={12}>
                                                <Card>
                                                    <CardHeader tag="h10">gepostet von: unknown User am:<em>{item.date}</em> </CardHeader>
                                                    <CardBody>
                                                    <CardTitle  tag="h5">{item.title}</CardTitle>
                                                    <CardText tag="h4">{item.text}</CardText>
                                                    </CardBody>
                                                    <CardFooter onClick={this.toggleContent} className="text-muted">  
                                                    <em>Click to see comments...</em>
                                                    </CardFooter>
                                                </Card>
                                                </Col>
                                                <Col>
                                                {showContent === true ? <CommentBox postId={item._id} /> : ""}
                                                </Col>
                                            </Row>
                                        </Container>


                              </div>
                   })}
                   <Pagination postsPerPage={postsPerPage} totalPosts={this.state.items.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
                </div>
            )
        }        
}

export default getAllPosts;