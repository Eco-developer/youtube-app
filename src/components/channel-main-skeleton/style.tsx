import styled from "styled-components";
import { 
    Skeleton, 
    Stack 
} from "@mui/material";

export const BannerSkeleton = styled(Skeleton)`
    height: 300px !important;
    margin: 0;
    padding: 0;
    border: none;
    transform: scale(1) !important;
    @media (min-width: 700px) {
        height: 400px !important;
    }
`

export const ChannelProfileSkeletonContainer = styled(Stack)`
    background-color: white;
    display: flex;
    flex-direction: row !important;
    align-items: center;
    padding: 20px;
    @media (min-width: 500px) {
        padding: 20px 40px;
    }
`

export const MenuBarSkeletonContainer = styled(Stack)`
    display: flex;
    flex-direction: row !important;
    background-color: #fff;
    padding: 0 20px;
    overflow-x: scroll;
    -ms-overflow-style: none; 
        scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (min-width: 500px) {
        padding: 0px 40px;
    }
`