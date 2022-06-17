import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
    handleSubmit = e => {
        e.preventDefault()
        const data = {
            username:this.username,
            password:this.password
        }
        
        axios.post('api/user/create/', data).then(
            res => {
                console.log(res)
            }
        ).catch(
            err => console.log(err)
        )
    }
    
    render() { 
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Регистрация</h3>
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