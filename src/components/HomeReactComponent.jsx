import React, { Component } from 'react'

export default class HomeReactComponent extends Component {
    handleClick = () => {
        console.log('123123')
    }
  render() {
    return (
      <div>
        <button onClick={() => this.handleClick()}>QWE</button>
      </div>
    )
  }
}
