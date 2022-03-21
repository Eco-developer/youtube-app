import styled from "styled-components";

export const VideoWrapperContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin-top: 10px;
    @media (min-width: 500px) {
         padding: 20px 10px;
    }

`


export const VideoWrapper = styled.div`
    width: 100%;
	position: relative;
    padding-top: 100%;
	overflow: hidden;
    max-width: 1200px;
	iframe, span {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

    span {
        transform: scale(1) !important;
        border-radius: 0 !important;
    }

    @media (min-width: 400px) {
        padding-top: 60%;
    }

    @media (min-width: 800px) {
        padding-top: 50%;
    }

`