import styled from "styled-components";

interface Props {
    width: string;
    height: number;
    borderRadius: string;
    objectFit: string;
    objectPosition: string;
    heightMid: number; 
    heightHigh: number;
}

export const ImageWrapper = styled.div<Props>`
    position: relative;
    width: ${(props) => `${props.width}`};
    height: ${(props) => `${props.height}px`};
    border-radius: ${(props) => `${props.borderRadius}`};
    cursor: pointer;
    overflow: hidden;
    @media (min-width: 500px) {
            height: ${(props) => `${props.heightMid}px`}
        }
    @media (min-width: 900px) {
        height: ${(props) => `${props.heightHigh}px`}
    }
    img {
        object-fit: ${(props) => `${props.objectFit}`};
        object-position: ${(props) => `${props.objectPosition}`};
        
    }
`

export const ImageContainer = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`