import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	HeaderWrapper,
  Logo,
  Title,
  ExitIcon
} from './style'
export default class Header extends Component {
  static propTypes = {
    handlexit: PropTypes.func
  }
  static defaultProps = {
    handlexit: ()=> 0
  }
  constructor(props) {
    super(props)
  }
  render() {
    const { handlexit } = this.props
    return (
      <HeaderWrapper>
				<Logo/>
        <Title>Event Track & Presentation System</Title>
        <ExitIcon/>
			</HeaderWrapper>
    )
  }
}
