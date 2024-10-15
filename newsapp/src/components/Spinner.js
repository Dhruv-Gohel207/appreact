import React, { Component } from 'react'
import loading from './loading.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-4' src={loading} alt='loading'></img>
      </div>
    )
  }
}

export default Spinner