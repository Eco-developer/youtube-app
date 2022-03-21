import styled from "styled-components";

export const StatsInfo = styled.div`
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    padding: 8px 0;
    align-items: center;
    svg {
        color: #050505;
        font-size: 30px;
        margin-right: 15px;
        margin-left: 3px;
    }
    p {
        display: none;
        color: #050505;
    }
    @media (min-width: 400px) {
        p {
            display: block;
        }
    }
`

export const MoreContainer = styled.div`
    display: grid;
    place-items: center;
    svg {
        color: #050505;
    }
`