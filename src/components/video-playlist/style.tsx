import styled from "styled-components";

export const PlaylistWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin-top: 10px;
    main {
        padding: 0 !important;
    }
    @media (min-width: 1000px) {
        padding: 20px 10px;
        padding-bottom: 0;
    }

`

export const PlaylistItem = styled.div`
    width: 100%;
    padding: 5px;
    display: flex;
    align-items: center;
`

export const ItemContainer = styled.div`
    flex-grow: 1;
    height: 90px;
    padding: 5px;
    padding-right: 0;
    display: flex;
`

export const InfoContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
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