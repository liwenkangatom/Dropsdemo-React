import styled from 'styled-components'

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
    min-width: 50px;
    font-family: ArialMT;
    font-size: 16px;
    margin-bottom:10px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    vertical-align: top;
    color: #aaaaaa;
`
export const EventWrapper = styled.div`
    width: 468px;
    height: 216px;
    background-color: #ffffff;
    padding-top: 16px;
    box-shadow: 0px 0px 5px 0px 
        rgba(124, 124, 124, 0.16);
    border-radius: 4px;
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
export const ButtonWrapperDelete = styled.div`
    position: absolute;
    left: 29;
    .ant-btn{
        &:hover{
            color: #ff3d3d;
            background: rgba(255, 61, 61, 0.15) !important;
        }
    }
`

export const DisplayWrapper = styled.div`
    position: relative;
    height: 43px;
    display: inline-block;
`
export const Number = styled.span`
    font-family: ArialMT;
    font-size: 20px;
    color: #ff903d;
`
export const Text = styled.span`
    font-family: ArialMT;
    font-size: 14px;
    &.deep{
        color: #7c7c7c;
    }
    &.shallow{
        color: #aaaaaa
    }
`

export const EventDrops = styled.div`
    .line-separator{
        stroke: #e5e5e5;
        fill: none;
        stroke-width: 1px;
    }
`