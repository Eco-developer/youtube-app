import styled from "styled-components";

export const MoreBtn = styled.div`
    margin-top: 10px;
    cursor: pointer;
    border: 1.5px solid #1976d2;
    border-radius: 5px;
    padding: 7px 15px;
    color: #1976d2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px;
    transition: 0.3s all ease-in-out;
    svg {
        transition: 0.3s all ease-in-out;
    }
    &:hover {
        color: #fff;
        background-color: #1976d2;
        svg {
            color: #fff;
        }
    }
`