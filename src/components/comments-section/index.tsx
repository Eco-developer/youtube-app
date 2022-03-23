import { CommentContainer } from '../comment-container/index';
import { CommentsSectionHead } from '../comments-head';
import { CommentsSectionSkeleton } from '../comments-section-skeleton';
import { 
    CommentsContainer, 
    CommentsSectionContainer,
    MoreBtn
} from './style';
import { 
    CircularProgress,
    SelectChangeEvent, 
    Stack 
} from '@mui/material';
import { 
    Dispatch,
    SetStateAction,
    useEffect, 
    useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { Comments } from '../../interfaces/index';
import { request } from '../../services';
import * as API from '../../const/youtube-api';

interface Props {
    commentCount?: string,
    videoId: string | null | undefined,
    comments?: Comments[],
    nextPageToken?: string | null | undefined,
    setComments: Dispatch<SetStateAction<{ items: Comments[]; nextPageToken: string | null | undefined; } | null>>,
}

export const CommentsSection = ({commentCount, videoId, nextPageToken, comments, setComments}: Props) => {
    const [sortBy, setSort] = useState<string>(API.ORDER);
    const [pendingMore, setPendingMore] = useState<boolean>(false);
    const [pendingSort, setPendingSort] = useState<boolean>(false);

    const handleChange = async (event: SelectChangeEvent<string>) => {
        const { target: { value } } = event;
        setSort(value)
        setPendingSort(true);
        console.log(value)
        try {
                
            const commetsRespose = await request.get('commentThreads',
                    { 
                        params : {
                            maxResults: API.MAXRESULTS.COMMENTS,
                            part: API.PART.COMMENTS,
                            videoId,
                            order: value,
                            textFormat: API.TEXTFORMAT,
                            key: API.KEY,

                        }
                    }
                )
            
            setComments({items: commetsRespose.data.items, nextPageToken: commetsRespose.data.nextPageToken});
            
        } catch (error) {
            console.log(error);
        }
        setPendingSort(false);
    }

    const fethMoreComments = async () => {
        if (!nextPageToken) {
            return;
        }
        setPendingMore(true);
        try {
            const commetsRespose = await request.get('commentThreads',
                    { 
                        params : {
                            maxResults: API.MAXRESULTS.COMMENTS,
                            part: API.PART.COMMENTS,
                            videoId,
                            order: API.ORDER,
                            textFormat: API.TEXTFORMAT,
                            key: API.KEY,
                            ...(nextPageToken ? { pageToken: nextPageToken } : {})
                        },
                    }
                )
            console.log(commetsRespose.data)
            setComments((prevState:{items: Comments[], nextPageToken: string | undefined | null} | null) => ({items: [...(prevState ? prevState.items : []), ...commetsRespose.data.items], nextPageToken: commetsRespose.data.nextPageToken || null}))
        } catch (error) {
            console.log(error)
        }
        setPendingMore(false);
    } 
    return (
        <CommentsSectionContainer>
            {comments ?
                ( comments.length ?
                <>
                    <CommentsSectionHead 
                        commentCount={commentCount} 
                        pendingSort={pendingSort}
                        sortBy={sortBy}
                        handleChange={handleChange}
                    />
                    <CommentsContainer>
                        {comments.map((comment: Comments) =>(
                            <CommentContainer
                                key={uuid()}
                                authorProfileImageUrl={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                authorDisplayName={comment.snippet.topLevelComment.snippet.authorDisplayName}
                                publishedAt={comment.snippet.topLevelComment.snippet.publishedAt}
                                textDisplay={comment.snippet.topLevelComment.snippet.textDisplay}
                                likeCount={comment.snippet.topLevelComment.snippet.likeCount}
                                replies={comment.replies}
                            />
                        ))}
                    </CommentsContainer>
                    {nextPageToken ?
                        <Stack justifyContent="center" alignItems="center">
                            <MoreBtn onClick={fethMoreComments}>
                                { pendingMore ? 
                                    <CircularProgress size={20}/>
                                    : "Load More Commets" }
                            </MoreBtn>
                        </Stack>
                    : null}
                </> 
                : null)
            : <CommentsSectionSkeleton/>}
        </CommentsSectionContainer>
    )
}