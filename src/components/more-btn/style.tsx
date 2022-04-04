import styled from "styled-components";

export const MoreBtn = styled.button`
    margin-top: 10px;
    cursor: pointer;
    border: 2px solid #ff0000;
    border-radius: 5px;
    padding: 7px 15px;
    color: #ff0000;
    background-color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.5s ease-in-out;
    svg {
        color: #ff0000;
        transition: 0.5s all ease-in-out;
    }

   
   &:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: #ff0000;
    height: 250px;
    width: 1000px;
    border-radius: 50%;
   }
   
    &:before {
    top: 100%;
    left: 100%;
    transition: all .7s;
   }
   
   &:hover:before {
    top: -70px;
    left: -300px;
   }
   
    &:active:before {
    background: #ff0000;
    transition: background 0s;
    }
  
    &:hover {
        color: #fff;
        svg {
            color: #fff;
        }
    }
`

/* From cssbuttons.io */
