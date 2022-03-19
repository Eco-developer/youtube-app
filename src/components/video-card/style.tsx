import styled from "styled-components";
import { CardSkeletonContainer } from "../video-card-skeleton/styled"; 

export const VideoCardContainer = styled(CardSkeletonContainer)`
   cursor: pointer;
   transition: 0.3s all ease-in-out;
   &:hover { 
       transform: scale(1.1);
   }
`

export const Text = styled.p`
    font-family: 'monserrat';
    font-size: 13px;
    margin-bottom: 3px;
    color: #676565;
`