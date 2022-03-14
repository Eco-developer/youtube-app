import styled from "styled-components";

interface Props {
    width: number;
    height: number;
}

export const ImageWrapper = styled.div<Props>`
    position: relative;
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};
`

export const ImageContainer = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    object-fit: cover;
`