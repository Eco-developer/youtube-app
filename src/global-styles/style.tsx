import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f0f0f0bd;
    padding-top: 120px;
    display: flex;
    overflow-y: scroll;
	-ms-overflow-style: none; 
  	scrollbar-width: none;
	&::-webkit-scrollbar {
  		display: none;
	}
    @media (min-width: 460px) {
        padding-top: 60px;
    }
`
