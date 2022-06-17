import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    
    handleSubmit = e => {
        e.preventDefault()
        const data = {
            username:this.username,
            password:this.password
        }
        
        axios.post('api/user/get_token/', data).then(
            res => {
                localStorage.setItem('token', res.data.token)
                console.log('Token', res.data.token)
            }
        ).catch(
            err => console.log(err)
        )
    }

    render() { 
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Авторизация</h3>
                <div className="form-group">
                    <label>username</label>
                    <input type="text" className="form-control" placeholder='username' 
                    onChange={e => this.username = e.target.value}/>
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input type="text" className="form-control" placeholder='password' 
                    onChange={e => this.password = e.target.value}/>
                </div>
                <button className="btn btn-primary btn-block">Ок!</button>
            </form>
        )
    }
}