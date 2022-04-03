import styled from "styled-components";

export const SearchContainer = styled.div`
    flex-grow: 1;
    padding: 10px;
    display: flex;
    max-width: 600px;
    align-items: center;
    button {
        margin: 0 10px;
        svg {
            color: #050505;
        }
    }
`

export const SearchBox = styled.form`
    flex-grow: 1;    
    display: flex;
`

export const InputContainer = styled.div`
    flex-grow: 1;   
    background-color: white;
    border: 1px solid ${(props: {hasFocus: Boolean}) => props.hasFocus ? "#316ebb" : "#ccc"};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 5px 12px;
    transition: all 0.3s ease-in-out;
`

export const Input = styled.input`
    outline: none;
    padding: 0;
    margin: 0;
    color: #050505;
    border: none;
    width: 100%;
`

export const SearchButtonContainer = styled.div`
    height: 38px;
    width: 38px;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: all 0.3s ease-in-out;
    svg {
        color: #050505;
    }
    &:hover {
        background-color: #f0f0f0;
    }
`