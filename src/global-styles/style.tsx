import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f9f9f9;
    padding-top: 120px !important;
    display: flex;
    overflow-y: scroll;
	-ms-overflow-style: none; 
  	scrollbar-width: none;
	&::-webkit-scrollbar {
  		display: none;
	}
    @media (min-width: 460px) {
        padding-top: 60px !important;
    }
`
