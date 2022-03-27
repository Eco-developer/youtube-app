import styled from "styled-components";

export const CarouselContainer = styled.div`
    width: 100%;    
    height: fit-content;
    image {
        @media (min-width: 600px) {
            height: 600px;
        }
    }
`
export const CarouselInfo = styled.div`
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #030303a1;
    display: grid;
    place-items: center;
`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    max-width: 900px;
`

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const TitleContainer = styled.div`
    margin-bottom: 6px;
    display: flex;
    justify-content: flex-start;
    h3 {
        font-family: 'montserrat';
        font-size: 25px;
        color: #fff;
        text-align: left;
        @media (min-width: 600px) {
            font-size: 50px;
        }
    }
`

export const DitailsContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    p {
        font-family: 'montserrat';
        font-size: 15px;
        color: #fff;
        text-align: left;
        @media (min-width: 600px) {
            font-size: 20px;
        }
    }

`

export const WatchBtn = styled.button`
    background-color: transparent;
    color: #fff;
    border-radius: 5px;
    padding: 10px 20px;
    width: 100px;
    border: 1px solid #fff;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: #000;
        background-color: #fff;
    }
`