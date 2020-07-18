import React, { Component } from 'react'

export default class LogoutButton extends Component {



    handleLogout(){
        localStorage.removeItem('token')
        window.location.reload()
    }

    render() {
        return (
            <div>
            <button onClick={this.handleLogout} type="button" className="btn btn-outline-light" data-toggle="modal" data-target="#login">logout</button>
            </div>
        )
    }
}
