import styled from 'styled-components'

export const ConetentTextWrapper = styled.div`
    .scroll{
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
    }

`