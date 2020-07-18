
import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'

import { connect } from 'react-redux'

import {getShowRegisterDialogAction} from '../actions/RegisterAction'


class RegisterButton extends Component {

    constructor(props){
        super(props);
        this.showRegisterDialog=this.showRegisterDialog.bind(this)
    }

    showRegisterDialog(){
        const dispatch = this.props.dispatch;
        dispatch(getShowRegisterDialogAction())
     

    }

    render(){
        return(
            <div>
                <Button variant = 'dark' onClick={this.showRegisterDialog}>
                    sign up
                </Button>
            </div>
        )
    }
}

export default connect()(RegisterButton)