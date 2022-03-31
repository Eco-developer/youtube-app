import styled from "styled-components";

export const Container = styled.div`
    height: 550px;
    width: 100%;
    border: 2px solid #e9e9e9;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
`

export const PlaylistInfoContainer = styled.div`
    width: 100%;
    border-bottom: 2px solid #e9e9e9;
    padding: 10px;
    display: flex;
`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    justify-content: space-between;
    button {
        svg {
            color: #050505;
        }
    }
`

export const PlaylistTittle = styled.div`
    width: 100%;
    h4 {
        color: #050505;
        font-size: 20px;
        font-family: 'monserrat';

    }
    p {
        color: #1d1c1c;
        font-size: 15px;
        font-family: 'monserrat';
    }
    margin-bottom: 5px;
`

export const PlaylistIcons = styled.div`
    width: 100%;
    button {
        margin-right: 5px;
        svg {
            color: #050505;
        }
    }
    
`

export const PlaylistItemsContainer = styled.div`
    flex-grow: 1;
    display: flex;
    overflow-y: scroll;
	-ms-overflow-style: none; 
  	scrollbar-width: none;
	&::-webkit-scrollbar {
  		display: none;
	}
`

export const PlaylistItemsWrapper = styled.div`
    height: fit-content;
`