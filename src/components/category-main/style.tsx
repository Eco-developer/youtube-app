import styled from "styled-components";
import { Stack } from "@mui/material";

export const CategoryTittle = styled.div`
background: #fff;
width: 100%;
height: 100px;
padding: 20px;
display: flex;
align-items: center;
h1 {
    font-size: 25px;
    color: #030303;
    font-family: 'montserrat';
    margin-left: 10px;
}
span {
    margin-left: 10px; 
}
@media (min-width: 600px) {
    padding: 20px 40px;
}
`

export const CarouselSkeleton = styled(Stack)`
span {
    transform: scale(1);
    flex-grow: 1;
}
`

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