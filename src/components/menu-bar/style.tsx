import styled from "styled-components";


export const MenubarContainer = styled.nav`
    background-color: #fff;
`

export const MenubarItemsBase = styled.ul`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-start;
  margin: 0px;
  padding-bottom: 0;
  padding-top: 10px;
  padding-left: 40px;
  position: relative;
  margin-right: auto;
  list-style: none;
  
`;

export const Item = styled.li<{current: boolean}>`
  @media (max-width: 800px) {
    padding: 15px 0;
  }
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
  span {
    color: #030303;
    font-size: 15px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    padding: 8px 20px;
    white-space: nowrap;
    position: relative;
    margin-right: 5px;
    &:before {
      background-color: #030303a1;
      border-radius: 0px 0px 4px 4px;
      bottom: -6px;
      content: "";
      height: 2px;
      left: 0px;
      opacity:  ${props => props.current ? 1 : 0 };;
      position: absolute;
      right: 0px;
      transform-origin: left center;
      transform: ${props => props.current ? 'scaleX(1)' : 'scaleX(0)'  };
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      visibility: ${props => props.current ? 'visible' : 'hidden' };
      width: auto;
    }
  }
  &:hover {
    span:before {
      transform: scaleX(1);
      visibility: visible;
      opacity: 1 !important;
    }
  }
`