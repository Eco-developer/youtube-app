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