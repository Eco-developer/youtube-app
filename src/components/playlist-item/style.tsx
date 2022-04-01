import styled from "styled-components";

export const PositionContainer = styled.div`
    width: 20px;
    height: fill-available;
    display: grid;
    place-items: center;
    color: #030303;
`

export const PlaylistItemContainer = styled.div<{current: boolean}>`

    width: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: ${props => props.current ? '#e9e9e9' : 'transparent'};
    transition: 0.3s all ease-in-out;

    &:hover {
        background-color: #e9e9e9;
    }
`

export const ItemContainer = styled.div`
    flex-grow: 1;
    padding: 5px;
    padding-right: 0;
    display: flex;
`

export const InfoContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    width: calc(60% - 20px);
`

export const PlaylistTittle = styled.div`
    width: 100%;
    h4 {
        color: #050505;
        font-size: 20px;
        font-family: 'monserrat';

    }
    p {
        color: #1d1c1c;
        font-size: 15px;
        font-family: 'monserrat';
    }
    margin-bottom: 5px;
`