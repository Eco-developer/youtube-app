import styled from "styled-components";
import { PageContainer } from "../../global-styles/style";

export const VideoPageConatiner = styled(PageContainer)`
    padding: 20px;
    flex-direction: column;
    @media (min-width: 1000px) {
        flex-direction: row;
    }
`

export const VideoMainSection = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(min-width: 1000px) {
        width: 70%;
    }
`

export const VideoSideSection = styled.aside`
    width: 100%;
    @media(min-width: 1000px) {
        width: 30%;
    }
`