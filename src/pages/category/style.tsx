import { Stack } from "@mui/material";
import styled from "styled-components";

export const CategoryContainer = styled.main`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
`

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