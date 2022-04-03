import TextTruncate from "react-text-truncate"
import { Image } from "../image"
import { 
    InfoContainer, 
    ItemContainer, 
    PlaylistItemContainer, 
    PlaylistTittle, 
    PositionContainer 
} from "./style"
import { ArrowRight } from '@mui/icons-material';
import { logo } from '../../const/images';
import { useSearchParams } from "react-router-dom";

interface Props {
    position: number,
    thumbnail?: string,
    title?: string,
    channelTitle?: string,
    currentPosition: string,
    playlistId: string,
    videoId?: string,
}

export const PlaylistItem = ({position, thumbnail, title, channelTitle, currentPosition, playlistId, videoId}: Props) => {
    const [queries, setQueries] = useSearchParams();

    const handlePlayListItem = () => {
        if(!videoId || !playlistId) {
            return;
        }
        setQueries({videoId, playlistId, position: `${position}`});
    };

    return (
        <PlaylistItemContainer onClick={handlePlayListItem} current={+currentPosition === +position}>
            <PositionContainer>
                {+currentPosition === +position ? 
                    <ArrowRight/>
                :  position + 1} 
            </PositionContainer>
            <ItemContainer>
                <Image src={thumbnail || logo} alt='item' height={90} width='calc(40% - 20px)' />
                <InfoContainer>
                    <PlaylistTittle>
                        <TextTruncate
                            line={2}
                            element="h4"
                            truncateText="…"
                            text={title}
                        /> 
                    </PlaylistTittle>
                    <PlaylistTittle>
                        <TextTruncate
                            line={1}
                            element="p"
                            truncateText="…"
                            text={channelTitle}
                        /> 
                    </PlaylistTittle>
                </InfoContainer>
            </ItemContainer>
        </PlaylistItemContainer>
    )
}