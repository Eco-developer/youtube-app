import TextTruncate from "react-text-truncate";
import moment from "moment";
import { Image } from "../image";
import { Stack } from "@mui/material";
import { 
    MoreBtn, 
    RepliesBtn
} from "./style";
import { 
    ThumbDown, 
    ThumbUp, 
    ArrowDropDown,
    ArrowDropUp
} from "@mui/icons-material";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Replies, Comment } from '../../interfaces/index';


interface Props {
    authorProfileImageUrl: string,
    authorDisplayName: string,
    publishedAt: string,
    textDisplay: string,
    likeCount: number,
    replies: Replies | null | undefined,
}

export const CommentContainer = ({authorProfileImageUrl, authorDisplayName, publishedAt, textDisplay, likeCount, replies}: Props) => {
    const [more, setMore] = useState<boolean>(false);
    const [showReplies, setReplies] = useState<boolean>(false);

    const handleMore = () => {
        setMore((prevState: boolean) => !prevState);
    }
    const handleReplies = () => {
        setReplies((prevState: boolean) => !prevState);
    }
    return (
        <Stack flexDirection='row' marginBottom={2}>
            <Stack marginRight={2}>
                <Image 
                    width="50px" 
                    height={50} 
                    src={authorProfileImageUrl} 
                    alt='avatar-profile'
                    borderRadius='50%'
                />
            </Stack>
            <Stack flexDirection='column'>
                <Stack flexDirection='row' alignItems='center'>
                    <Stack marginRight={1}>
                        <TextTruncate
                            line={1}
                            element="h5"
                            truncateText="…"
                            text={`${authorDisplayName}`}
                        />  
                    </Stack>
                    <Stack>
                        <TextTruncate
                            line={1}
                            element="p"
                            truncateText="…"
                            text={moment(publishedAt, "YYYYMMDD").fromNow()}
                        /> 
                    </Stack>
                </Stack>
                <Stack>
                    <TextTruncate
                        line={more ? 50 : 5}
                        element="p"
                        truncateText="…"
                        text={textDisplay}
                        textTruncateChild={<MoreBtn onClick={handleMore}>read more</MoreBtn>}
                    /> 
                    
                    
                </Stack>
                <Stack flexDirection='row' alignItems="center" marginBottom={1}>
                    <Stack marginRight={1}>
                        <ThumbUp color='primary' fontSize='small'/>
                    </Stack>
                    {!!likeCount ?
                        <small>
                        {likeCount} 
                        </small>
                    : null}
                    <Stack marginLeft={1}>
                        <ThumbDown color='primary' fontSize='small'/>
                    </Stack>
                </Stack>
                {replies ?
                    <Stack alignItems="start">
                        <RepliesBtn onClick={handleReplies}>
                            {!showReplies ? 
                               <>
                                    <ArrowDropDown/>
                                    <p>
                                        Show {replies.comments.length} replies
                                    </p>
                               </>
                               :<>
                                    <ArrowDropUp/>
                                    <p>
                                        Hide {replies.comments.length} replies
                                    </p>
                                </>
                            }
                        </RepliesBtn>
                        
                    </Stack>
                : null}                
                {replies && showReplies ?
                    <Stack flexDirection='column'>
                        {replies.comments.map((comment: Comment) =>(
                            <CommentContainer 
                                key={uuid()}
                                authorProfileImageUrl={comment.snippet.authorProfileImageUrl}
                                authorDisplayName={comment.snippet.authorDisplayName}
                                publishedAt={comment.snippet.publishedAt}
                                textDisplay={comment.snippet.textDisplay}
                                likeCount={comment.snippet.likeCount}
                                replies={null}
                            /> ))}
                    </Stack>
                : null}
               
            </Stack>
        </Stack>
    )
}
