import styled from 'styled-components';

export const SearchWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 71px;
    top: 24px;
    left: 24px;
`
export const Search = styled.input `
    position: absolute;
    padding: 0 30px;
    width: 179px;
	height: 32px;
	border-radius: 6px;
	border: solid 1px #e5e5e5;
`
export const Tags = styled.div`
    width: 100%;
    height: 40px;
    background-color: rgba(170, 170, 170, 0.08);
    margin-bottom: 22px;
`
export const TagsWrapper = styled.div`
    position: absolute;
    width: 226px;
    height: 40px;
    left: 50%;
    transform: translateX(-50%);
`
export const Text = styled.div`
    position: absolute;
    width: 35px;
    height: 15px;
    left: 24px;
    font-family: ArialMT;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #434343;
`
export const Add = styled.a`
    position: absolute;
    width: 12px;
    height: 12px;
    right: 14px;
    line-height: 40px;
    color: #aaaaaa
    &:hover {
        color:#f58220
    }
`
export const Menu = styled.div`
    position: absolute;
    left: 1010px;
    width: 118px;
	height: 88px;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px 
		rgba(124, 124, 124, 0.29);
    border-radius: 4px;
`
export const MenuItem = styled.div`
    width: 118px;
    height: 27px;
    line-height: 27px;
    padding-left: 21px;
    font-family: ArialMT;
    font-size: 14px;
    color: #7c7c7c;
    &:hover{
        background-color: rgba(124, 124, 124, 0.1);
    }
`
