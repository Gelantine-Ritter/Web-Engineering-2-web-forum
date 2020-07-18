import React, {Component} from 'react';

import axios from 'axios';


class Post extends Component {


constructor(props){
  super(props)
  this.state = {
    title:'',
    text:''
  }
}

  handleChange=(event)=>{
    const {name, value} = event.target; //4
    this.setState({[name]:value}) 
    
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state)
    axios.post('http://localhost:3200/posts/new', this.state)
    .then(response =>{
      console.log(response);
    })
    .catch(error => {
      console.log('Daten nicht an den Server gesendet');
    })
  };


  render() {
    const {title, text} = this.state;
    console.log('State: ', this.state);

    return (
      <div>
       <h1>hallo</h1>
      <form onSubmit={this.handleSubmit}></form>
       <form>
         <div className='form-input'>
           <input type='text' name='title' placeholder='Enter Title' value={title} onChange={this.handleChange} />
         </div>
       </form>
       <form>
         <div className='form-input'>
         <input type='text' name='text' cols='30' rows='10' value={text} onChange={this.handleChange} />
         </div>
         <button onClick={this.handleSubmit} type='submit'>Submit</button>
       </form>
      </div>
    );
  }
}

export default Post;


