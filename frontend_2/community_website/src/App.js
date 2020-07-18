
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import React, { Component} from "react";
import TopMenu from './components/TopMenu'
import PublicPage1 from './components/PublicPage1'
import PrivatePage from './components/PrivatePage';



import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state
}


class App extends Component {
  render(){

    const user = this.props.user

    let workspace;

    if(user){
      workspace = <PrivatePage />
    }
    else {
      workspace = <PublicPage1 />
    }

    return (
      <div>
        <TopMenu /> 
       {workspace}
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)