import styled from 'styled-components';

export const ButtonWrapper = styled.div`
    position: absolute;
    display: inline-block;
    right: 24px;
    margin-top: 40px;
    .ant-btn{
        &:hover {
            color: rgb(255,144,62);
            border-color: rgb(255,144,62);
        }
        &:focus {
            color: rgb(255,144,62);
            border-color: rgb(255,144,62);
        }
    }
`