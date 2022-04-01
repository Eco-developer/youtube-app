import styled from "styled-components";

export const Container = styled.div`
    max-height: 550px;
    width: 100%;
    border: 2px solid #e9e9e9;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    @media (min-width: 1000px) {
        max-width: 400px;
    }
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
        word-break: break-all;
    }
    p {
        color: #1d1c1c;
        font-size: 15px;
        font-family: 'monserrat';
        word-break: break-all;
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

export const PlaylistItemsContainer = styled.div<{clicked: boolean}>`
    height: ${props => props.clicked ? '0' : 'auto'};
    flex-grow: ${props => props.clicked ? '0' : '1'};
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
    width: 100%;
`

export const MoreBtn = styled.div`
    cursor: pointer;
    padding: 7px 15px;
    background-color: #050505;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    transition: 0.3s all ease-in-out;
    svg {
        color: #fff;
        transition: 0.3s all ease-in-out;
    }
    &:hover {
        color: #050505;
        background-color: #fff;
        svg {
            color: #050505;
        }
    }

`

export const ControlsContainer = styled.div`
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: space-between; 
    button {
        svg {
            color: #050505;
        }
    }
        
`