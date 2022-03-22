import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import { CommentContainer } from '../comment-container/index';
import { 
    CommentsContainer, 
    CommentsSectionContainer,
    MoreBtn
} from './style';
import { 
    CircularProgress,
    MenuItem, 
    Select, 
    SelectChangeEvent, 
    Stack 
} from '@mui/material';
import { Sort } from '@mui/icons-material';
import { 
    useEffect, 
    useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { Comments } from '../../interfaces/index';
import { Image } from '../image';
import { request } from '../../services';
import * as API from '../../const/youtube-api';

interface Props {
    commentCount?: string,
    videoId: string | null | undefined,
}

export const CommentsSection = ({commentCount, videoId}: Props) => {
    const [comments, setComments] = useState<{items: Comments[], nextPageToken: string | undefined | null} | null>(null);
    const [sortBy, setSort] = useState<string>(API.ORDER);
    const [pendingMore, setPendingMore] = useState<boolean>(false);
    const [pendingSort, setPendingSort] = useState<boolean>(false);

    useEffect(() => {
        if (!videoId) {
            return;
        }
        let controller: AbortController | null = new AbortController();

        const fetchApi = async () => {
            try {
                
                const commetsRespose = await request.get('commentThreads',
                        { 
                            params : {
                                maxResults: API.MAXRESULTS.COMMENTS,
                                part: API.PART.COMMENTS,
                                videoId,
                                order: sortBy,
                                textFormat: API.TEXTFORMAT,
                                key: API.KEY,
    
                            },
                            signal: controller?.signal
                        }
                    )
                
                setComments({items: commetsRespose.data.items, nextPageToken: commetsRespose.data.nextPageToken});
                
            } catch (error) {
                console.log(error);
            }
            controller = null;
        }

        fetchApi();
        return () => controller?.abort()
    }, [videoId])

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
        if (!comments?.nextPageToken) {
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
                            ...(comments?.nextPageToken ? { pageToken: comments?.nextPageToken } : {})
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
            {comments?.items?.length ?
                (<>
                    <Stack paddingTop={1} paddingBottom={1} flexDirection='row' alignItems='center'>
                        <Stack marginRight={2}>
                            <h4>
                                {commentCount ? `${commentCount} comments` : null} 
                            </h4>
                            
                        </Stack>
                        <Stack flexDirection='row' alignItems='center'>
                            <Stack flexDirection='row' marginRight={1}>
                                <Stack marginRight={1}>
                                    {pendingSort ? 
                                        <CircularProgress size={20}/>
                                    : <Sort/>}
                                </Stack>
                                <Stack display={{xs: 'none', sm: 'flex'}}>
                                    <p>
                                        Sort by
                                    </p>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sortBy}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='relevance'>Relevance</MenuItem>
                                    <MenuItem value='time'>Newest</MenuItem>
                                </Select>
                            </Stack>
                        </Stack>
                    </Stack>
                    <CommentsContainer>
                        {comments.items.map((comment: Comments) =>(
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
                    {comments.nextPageToken ?
                        <Stack justifyContent="center" alignItems="center">
                            <MoreBtn onClick={fethMoreComments}>
                                { pendingMore ? 
                                    <CircularProgress size={20}/>
                                    : "Load More Commets" }
                            </MoreBtn>
                        </Stack>
                    : null}
                </>)
            : null}
        </CommentsSectionContainer>
    )
}