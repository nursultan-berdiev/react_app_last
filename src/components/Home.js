import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            tasks:[],
            activeItem: {
                id: null,
                title: '',
                completed: false
            },
            editing:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.startEdit = this.startEdit.bind(this);
    }
    
    config = {
        headers: {
            Authorization: 'Token ' + localStorage.token
        }
    }

    getTaskURL(id=0) {
        if (id != 0) {
            return 'api/task/' + id + '/'
        } else {
            return 'api/task/'
        }
    }

    fetchTasks(url) {
        
        axios.get(url, this.config).then(
            res => {
                this.setState({
                    tasks: res.data
                });
            }
        ).catch(
            err => console.log(err)
        )
    }

    componentWillMount() {
        this.fetchTasks(this.getTaskURL())
    }

    deleteItem(task) {
        axios.delete(this.getTaskURL(task.id), this.config)
        .then((response) => {
            this.fetchTasks('api/task/')
        })
    }

    strikeUnstrike(task) {
        var data = 
            {
                'title': task.title,
                'completed' : !task.completed
            }
        axios.put(this.getTaskURL(task.id), data=data, this.config).then((response) => {
            this.fetchTasks(this.getTaskURL())
        }).catch(
            err => console.log(err.response)
        )
    }

    handleChange(e) {
        var value = e.target.value
    
        this.setState({
          activeItem:{
            ...this.state.activeItem,
            title:value
          }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.editing) {
            var data = JSON.stringify(this.state.activeItem)
            axios.put(this.getTaskURL(this.state.activeItem.id), data=data, this.config)
                .then((response) => {
                    this.fetchTasks(this.getTaskURL())
                }).catch(err => console.log(err.response))
            this.setState({
                editing:false
            })
        } else {
            var data = JSON.stringify(this.state.activeItem)
            axios.post(this.getTaskURL(), data=data, this.config)
                .then((response) => {
                this.fetchTasks(this.getTaskURL())
                }).catch(
                    err => console.log(err.response)
                )
                this.setState({
                    activeItem: {
                    id: null,
                    title: '',
                    completed: false
                }
            })
        }
    }

    handleClick123 = () => {
        console.log(123123123123);
    }
    
    startEdit = (task) => {
        console.log("clicked")
        // this.setState({
        //     activeItem:task,
        //     editing:true
        // })
    }

    render() { 
        console.log(this.state)
        var tasks = this.state.tasks
        // var self = this
        return (
            <div>
                <div className="container">
                <div id="task-container">
                    <div id="form-wrapper">
                    <form onSubmit={this.handleSubmit} id="form">
                        <div className="flex-wrapper">
                        <div style={{flex:6}}>
                            <input className="form-control" 
                            onChange={this.handleChange}
                            type="text" id="title" 
                            value={this.state.activeItem.title} 
                            name="title" 
                            placeholder="Добавить таск"/>
                        </div>
                        <div style={{flex:6}}>
                            <input className="btn btn-warning" type="submit" id="submit" name="Add"/>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div id="list-wrapper">
                        {tasks && tasks.map(function(task, index) {
                        return(
                            <div key={index} className="task-wrapper flex-wrapper">
                                <div onClick={() => this.strikeUnstrike(task)} style={{flex:7}}>
                                    {task.completed == false ? (
                                    <span>{task.title}</span>
                                    ) : (
                                    <strike>{task.title}</strike>
                                    )}
                                    
                                </div>
                                <div style={{flex:1}}>
                                    <button onClick={() => this.handleClick123(task)} className="btn btn-sm btn-outline-info">Изменить</button>
                                </div>
                                <div style={{flex:1}}>
                                    <button onClick={() => this.deleteItem(task)} className="btn btn-sm btn-outline-info">-</button>
                                </div>
                            </div>
                        )
                        })}
                    </div>
                </div>
        
                </div>
            </div>
        )
    }
}