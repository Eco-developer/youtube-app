import styled from "styled-components";
import { Stack } from "@mui/material";

export const MoreBtn = styled.span`
    text-transform: none;
    color: #606060;
    font-family: "Roboto","Arial",sans-serif;
    font-size: 1rem;
    line-height: 2rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

export const RepliesBtn = styled.span`
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    p {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.75;
        letter-spacing: 0.02857em;
        color: rgb(25, 118, 210);  
    }

    svg {
        color: rgb(25, 118, 210); 
        margin-right: 5px;
    }  
`

export const DisplayName = styled(Stack)`
    p {
        word-break: break-word;
    }
    h5 {
        word-break: break-word;
    }
`