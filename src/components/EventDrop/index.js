import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './eventdrop.css'
import RightBar from '../RightBar'
export default class EventDrop extends Component {
  static propTypes = {
    show: PropTypes.bool
  }
  static defaultProps = {
    show: true
  }
  constructor (props) {
    super(props)
    this.state = {
      eventtitle: 'defaulttitle'
    }
  }
  render() {
    const { show } = this.props
    const { eventtitle } = this.state
    return (
      <div>
        <div className="EventDrop">
          <RightBar></RightBar>
        </div>
      </div>
    )
  }
}

