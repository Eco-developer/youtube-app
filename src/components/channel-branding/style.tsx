import styled from "styled-components";

export const ChannelBrandingContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
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