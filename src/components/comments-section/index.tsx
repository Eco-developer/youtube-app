import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import { CommentContainer } from '../comment-container/index';
import { 
    CommentsContainer, 
    CommentsSectionContainer

} from './style';
import { 
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
    const [sortBy, setSort] = useState<string>('relevance');
    const handleChange = (event: SelectChangeEvent<string>) => {
        setSort(event.target.value)
    }
    console.log(comments)
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
                                order: API.ORDER,
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

    const fethMoreComments = async () => {
        if (!comments?.nextPageToken) {
            return;
        }
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
                            <Stack display={{xs: 'none', sm: 'flex'}} flexDirection='row' marginRight={1}>
                                <Stack marginRight={1}>
                                    <Sort/>
                                </Stack>
                                <Stack>
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
                                    <MenuItem value='newest'>Newest</MenuItem>
                                </Select>
                            </Stack>
                        </Stack>
                    </Stack>
                    <CommentsContainer>
                        {comments.items.slice(0,5).map((comment: Comments) =>(
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
                        <Stack onClick={fethMoreComments}>
                            Load More Commets 
                        </Stack>
                    : null}
                </>)
            : null}
        </CommentsSectionContainer>
    )
}