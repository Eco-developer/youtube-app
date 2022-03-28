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