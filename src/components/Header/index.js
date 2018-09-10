import React, { Component } from 'react';
import {
	HeaderWrapper,
  Logo,
  Title,
  ExitIcon
} from './style'
class Header extends Component {

  render() {
 
    return ( 
      <HeaderWrapper>
				<Logo/>
        <Title>Event Track & Presentation System</Title>
        <ExitIcon/>
			</HeaderWrapper>
    );
  }
}

export default Header;