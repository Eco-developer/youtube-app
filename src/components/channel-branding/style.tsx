import styled from "styled-components";
import { fallback } from "../../const/images";

export const ChannelBrandingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

interface Props {
    src: string;
}

export const Banner = styled.div<Props>`
    height: 300px;
    width: 100%;
    background-image: url(${props => props.src}), url(${fallback});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (min-width: 700px) {
        height: 400px;
    }
`

export const ChannelProfileContainer = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    @media (min-width: 500px) {
        padding: 20px 40px;
    }
`


export const ChannelNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 10px;
    h1 {
        margin-bottom: 6px;
        font-size: 25px;
        font-family: 'monserrat';
        color: #050505;
        @media (min-width:700px) {
            font-size: 30px;
        }
    }

    p {
        font-size: 15px;
        font-family: 'monserrat';
        color: #050505;
        @media (min-width:700px) {
            font-size: 20px;
        } 
    }
`