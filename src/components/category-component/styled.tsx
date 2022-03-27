import styled from "styled-components";

interface Props {
    isCurrentId: boolean;
}

export const CategoryContainer = styled.div<Props>`
    width: 100%;
    padding: 5px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px 20px;
    background-color: ${(props) => props.isCurrentId ? '#e2e1e1' : 'transparent'};
    transition: 0.3s all ease-in-out;
    svg {
        margin-right: 8px;
        color: #ff0000;
        font-size: 25px;
    }
    p {

        font-size: 18px;
        color: #050505;
        font-weight: 500;
    }
    &:hover {
        background-color: #e2e1e1;
    }
`