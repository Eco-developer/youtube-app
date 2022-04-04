import styled from "styled-components";

export const SectionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    @media (min-width: 600px) {
        flex-direction: row;
        padding: 40px;
    }
`;

export const SectionLeftContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 20px;
    flex-direction: column;
    @media (min-width: 600px) {
        width: 65%;
    }
`;

export const SectionRightContainer = styled(SectionLeftContainer)`
    @media (min-width: 600px) {
        width: 35%;
    }
`;

export const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e2e2e2;

    h4 {    
        font-size: 25px;
        font-family: 'monserrat';
        color: #050505;
        margin-bottom: 10px;
    }

    p {
        font-size: 20px;
        font-family: 'monserrat';
        color: #272727;
        margin: 5px 0;
    }
`;