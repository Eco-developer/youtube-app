import styled from "styled-components";

interface Props {
  display: string;
}

export const VideosWrapperContainer = styled.main<Props>`
    flex-grow: 1;
    display: ${props => props.display};
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