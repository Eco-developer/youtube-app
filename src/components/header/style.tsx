import styled from "styled-components";

export const HeaderContainer = styled.header`
    position: fixed;
    background-color: white;
    height: 120px;
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 3;
    border-bottom: 2px solid whitesmoke;
    @media (min-width: 400px) {
        height: 60px;
        flex-direction: row;
        justify-content: space-between;
    }
`

export const HeaderButtons = styled.div`
    display: none;
    height: fill-available;
    button {
        margin: 0 10px;
        svg {
            color: #050505;
        }
    }
    @media (min-width: 700px) {
        display: flex;
        align-items: center;
    }
`