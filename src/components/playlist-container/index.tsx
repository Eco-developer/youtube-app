import { 
    ButtonsContainer,
    Container, 
    InfoContainer, 
    PlaylistIcons, 
    PlaylistInfoContainer, 
    PlaylistTittle,
    PlaylistItemsContainer,
    PlaylistItemsWrapper,
} from "./style";

import { IconButton } from "@mui/material";
import {
    Shuffle, 
    AllInclusive,
    PlaylistAdd,
    KeyboardArrowDown,
    KeyboardArrowUp
} from '@mui/icons-material';
import { Playlist } from "../../interfaces";
import { useState } from "react";

interface Props {
    playlistData?: Playlist,
    children: any,
    position: string;
}

export const PlaylistContainer = ({playlistData, children, position}: Props) => {
    const [clicked, setClicked] = useState<boolean>(false);

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
                    <IconButton>
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
            <PlaylistItemsContainer>
                <PlaylistItemsWrapper>
                    {children}
                </PlaylistItemsWrapper>
            </PlaylistItemsContainer>
        </Container>
    )
}