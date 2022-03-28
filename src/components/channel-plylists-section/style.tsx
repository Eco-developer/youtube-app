import styled from "styled-components";

export const SectionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const PlaylistsWrapperContainer = styled.main`
    flex-grow: 1;
    display: grid;
    padding: 20px;
    gap: 20px;
    flex-direction: column;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 700px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (min-width: 1000px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
` 