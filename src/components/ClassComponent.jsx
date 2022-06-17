import axios from 'axios';
import { Component } from 'react'

export default class ClassComponent extends Component {
  state = {
    task: '',
    currentTask: null,
    tasks: [],
    config: {
      headers: {
        "Authorization": "Token 6611afd5d7552dbb83d4bbe55e7b08dc29073dbf"
      }
    }
  }

  componentDidMount() {
    this.getTasks()
  }

  handleChange = (e) => {
    this.setState({task: e.target.value});
  }
  handleClick = () => {
    axios.post('api/task/', { title: this.state.task}, this.state.config)
      .then(() => this.getTasks())
  }

  handleUpdate = (task) => {
    console.log(task)
    this.setState({currentTask: task})
  }

  handleSaveTask = () => {
    axios.patch('api/task/' + this.state.currentTask.id + '/', this.state.currentTask, this.state.config)
      .then(() => this.getTasks())
      .then(() => this.setState({ 
        currentTask:null
      }))
  }

  handleChangeCurrentTask = (e) => {
    this.setState({currentTask: {...this.state.currentTask, title: e.target.value}});
  }

  getTasks = () => {
    axios.get('api/task/', this.state.config).then((response) => {
      console.log(response);
      this.setState({ tasks: response.data})
    })
  }
  render() {
    return (
      <div>
        <input
          onChange={this.handleChange}
          value={this.state.task}
        />
        <button onClick={this.handleClick}>Save</button>
        {
          this.state.tasks.map((task, index) => { 
            return (
              <div key={index}>
                {
                this.state.currentTask?.id===task.id ? (
                  <>
                  <input onChange={this.handleChangeCurrentTask} value={this.state.currentTask.title} />
                  <button onClick={this.handleSaveTask}>Сохранить</button>
                  </>
                ) : (
                  <div>{task.title} - {JSON.stringify(task.completed)}
                  <button onClick={() => this.handleUpdate(task)}>Изменить</button>
                  </div>
                )
              }
                
              </div>
            )
          })
        }
      </div>
    )
  }
}
