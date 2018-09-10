import styled from 'styled-components'
import logopic from '../../statics/logo.png';
import exiticon from '../../statics/exit-icon.png';

export const HeaderWrapper = styled.div`
    position: relative;
    height: 86px;
    border-bottom: 1px solid #f0f0f0;
`
export const Logo = styled.a`
    position: absolute;
    top: 20px;
    left: 23px;
    display:block;
    width: 125px;
    height: 48px;
    background: url(${logopic});
    background-size: contain;
`
export const ExitIcon = styled.a`
    position: absolute;
    top: 32px;
    right: 38px;
    display:block;
    width: 22px;
	height: 22px;
	background-image: linear-gradient(
		rgba(124, 124, 124, 0.5), 
		rgba(124, 124, 124, 0.5)), 
	linear-gradient(
		rgba(170, 170, 170, 0.5), 
		rgba(170, 170, 170, 0.5));
	background-blend-mode: normal, 
		normal;
	opacity: 0.5;
    background: url(${exiticon});
    background-size: contain;
    &:hover {
        opacity: 0.8;
    }
`
export const Title = styled.div`
    position:absolute;
    display:block;
    margin-left: 225px;
    padding-left: 37px;
    font-family: ArialMT;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 86px;
    letter-spacing: 0px;
    color: #434343;
    border-left: 1px solid #f0f0f0
`