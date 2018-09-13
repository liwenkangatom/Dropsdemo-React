import styled from 'styled-components';
import closeicon from '../../statics/close-icon.png';

export const Title = styled.div`
    width: 79px;
    height: 12px;
    margin-left:6px;
    margin-bottom: 15px;
    font-family: Arial-BoldMT;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #434343;
`
export const ContentWrapper = styled.div`
    width: 505px;
    height: 410px;
    padding: 30px 0px;
    overflow-y:auto;
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #eee
    }
    &::-webkit-scrollbar-button {
        display: none;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(169, 169, 169, .2);
        border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(169, 169, 169, .5);
    }
`
export const Content = styled.div`  
    position: relative;
    width: 100%;
    line-height: 32px;
    margin-bottom: 14px;
    
`
export const ContentTitle = styled.div`
    width:100%;
    font-family: ArialMT;
    font-size: 16px;
    margin-bottom:10px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    vertical-align: top;
    color: #aaaaaa;
    li{
        color:red
    }
    .ant-pagination-item{
        border:0px;
        &:hover a{
            color:#ff903d
        }
    }
    .ant-pagination-item-active{
        background: #f8fafb;
        a{
            color: #ff903d !important; 
        }
        &:hover a{
            color: #ff903d;
        }
    }
`
export const EventWrapper = styled.div`
    position: relative;
    width: 468px;
    height: 216px;
    background-color: #ffffff;
    padding-top: 16px;
    box-shadow: 0px 0px 5px 0px 
        rgba(124, 124, 124, 0.16);
    border-radius: 4px;
`
export const AddWrapper = styled.a`
    position: absolute;    
    top: 4px;            
    right: 35px;
    border: solid 1px #f58220;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 13px;
    &:hover {
        background-color: rgba(245, 130, 32, 0.15);
	    border: solid 1px rgba(245, 130, 32, 0.15);
    }
`
export const Close = styled.a`
    position: absolute;
    top: 5px;
    right: 6px;
    display: block;
    width: 9px;
    height: 9px;
    color: rgba(124, 124, 124, 0.5);
    background: url(${closeicon});
    background-size: contain;
`
export const ButtonWrapper = styled.div`
    position: relative;
    display: inline-block;
    right: 15px;
    .ant-btn-primary{
        &:hover{
            opacity: 0.85;
        }
    }
`
export const ButtonWrapperBack = styled.div`
    display: inline-block;
    .ant-btn{
        &:hover{
            color: #ff903d !important;
            border: #ff903d 1px solid !important;
        }
    }
`