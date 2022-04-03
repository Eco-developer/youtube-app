import { 
    ButtonsContainer,
    Container, 
    InfoContainer, 
    PlaylistIcons, 
    PlaylistInfoContainer, 
    PlaylistTittle,
    PlaylistItemsContainer,
    PlaylistItemsWrapper,
    MoreBtn,
    ControlsContainer,
} from "./style";
import { 
    CircularProgress, 
    IconButton 
} from "@mui/material";
import {
    Shuffle, 
    AllInclusive,
    PlaylistAdd,
    KeyboardArrowDown,
    KeyboardArrowUp,
    SkipNext,
    SkipPrevious
} from '@mui/icons-material';
import { Playlist } from "../../interfaces";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
    playlistData?: Playlist,
    children: any,
    position: string,
    pendingMore: boolean,
    fethMorePlaylistItems: () => void,
    nextPageToken: string | null | undefined,
    prevPosition: number | null,
    prevVideoId?: string | null,
    nextPosition: number | null,
    nextVideoId?: string | null,
}

export const PlaylistContainer = ({playlistData, children, position, pendingMore, nextPageToken, prevPosition, prevVideoId, nextPosition, nextVideoId, fethMorePlaylistItems}: Props) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [queries, setQueries] = useSearchParams();

    const handleClick = () => {
        setClicked((prevState: boolean) => !prevState);
    }

    const handlePrevControl = () => {
        if(!prevVideoId || prevPosition === null || !playlistData) {
            return;
        }
        setQueries({videoId: prevVideoId, playlistId:  playlistData.id, position: `${prevPosition}`});
    };

    const handleNextControl = () => {
        if(!nextVideoId || !nextPosition || !playlistData) {
            return;
        }
        setQueries({videoId: nextVideoId, playlistId:  playlistData.id, position: `${nextPosition}`});
    };

    return (
        <Container>
            <PlaylistInfoContainer>
                <InfoContainer>
                    <PlaylistTittle>
                        <h3>
                            {playlistData?.snippet.title}
                        </h3>
                    </PlaylistTittle>
                    <PlaylistTittle>    
                        <p>
                            {playlistData?.snippet.title} - {+position+1}/{playlistData?.contentDetails.itemCount}
                        </p>
                    </PlaylistTittle>
                    <PlaylistIcons>
                        <IconButton>
                            <AllInclusive/>
                        </IconButton>
                        <IconButton>
                            <Shuffle/>
                        </IconButton>
                    </PlaylistIcons>
                    
                </InfoContainer>
                <ButtonsContainer>
                    <IconButton onClick={handleClick}>
                        {clicked ?
                            <KeyboardArrowUp />
                            :
                            <KeyboardArrowDown />}
                    </IconButton>
                    <IconButton>
                        <PlaylistAdd/>
                    </IconButton>
                </ButtonsContainer>
            </PlaylistInfoContainer>
            <PlaylistItemsContainer clicked={clicked}>
                <PlaylistItemsWrapper>
                    {children}
                    {nextPageToken ? 
                        (<MoreBtn onClick={fethMorePlaylistItems}>
                            {pendingMore ? 
                                <CircularProgress size={15}/>
                            : 'Load more videos'}
                        </MoreBtn>)
                    : null}
                </PlaylistItemsWrapper>
            </PlaylistItemsContainer>
            <ControlsContainer>
                <IconButton onClick={handlePrevControl}>
                    <SkipPrevious/>
                </IconButton>
                <IconButton onClick={handleNextControl}>
                    <SkipNext/>
                </IconButton>
            </ControlsContainer>
        </Container>
    )
}