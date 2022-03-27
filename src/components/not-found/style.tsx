import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  align-content: space-between;
  flex-direction: column;
`

export const MainContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  padding: 20px;
  align-items: center;
  @media (min-width: 700px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const Info = styled.div`
  h2 {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 71px;
    letter-spacing: -0.035em;
    color: #333333; 
    margin: 0 0 10px 0;

    @media (min-width: 768px) {
      font-size: 64px;
      line-height: 95px;
    }
    
  }

  p {
    display: block;
    width: 65%;
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.035em;
    color: #4F4F4F;
    margin: 0 0 10px 0;
    padding: 0 10px 0 0;

    @media (min-width: 768px) {
      width: 100%;  
      font-size: 18px;
      line-height: 27px;
    }
  }

  @media (min-width: 700px) {
    width: 70%;
  }
`