import styled from "styled-components";

export const PlaylistMiniaturContainer = styled.div`
    cursor: pointer;
`

export const CountContainer = styled.div`
    position: absolute;
    background: #03030388;
    width: 40%;
    height: 100%;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-size: 25px;
        color: #fff;
    }
    svg {
        font-size: 30px;
        color: #fff;
    }
`