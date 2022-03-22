import styled from "styled-components";

export const CommentsSectionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    @media (min-width: 500px) {
        padding: 0 20px;
    }

`

export const CommentsContainer = styled.div`
    width: 100%;
`

export const MoreBtn = styled.div`
    cursor: pointer;
    border: 1.5px solid #1976d2;
    border-radius: 5px;
    padding: 7px 15px;
    color: #1976d2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
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