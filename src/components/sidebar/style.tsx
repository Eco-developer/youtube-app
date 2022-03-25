import styled from "styled-components";

interface Props {
    show: boolean;
}

export const SidebarContainer = styled.div<Props>`
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: row;
    background-color: #7e7e7e8a;
    z-index: 5;
    overflow: hidden;
    visibility: ${(props) => props.show ? 'visible' : 'hidden'};
    opacity: ${(props) => props.show ? '1' : '0'};
    transition: 0.3s all ease-in-out;
`

export const SidebarMain = styled.div<Props>`
    width: 100%;
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    transition: 0.3s all ease-in-out;
    transform: ${(props)=> props.show ? 'translate(0)' :'translate(-100%)'};
    @media (min-width: 400px) {
        width: 260px;
    }
`

export const CategoriesContainer = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
	-ms-overflow-style: none; 
  	scrollbar-width: none;
	&::-webkit-scrollbar {
  		display: none;
	}

`
export const CategoriesInnerContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
`

export const LoaderContainer = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
    position: relative;
`

export const SidebarBackground = styled.div`
    flex-grow: 1;
    display: none;
    @media (min-width: 400px) {
        display: block;
    }
`