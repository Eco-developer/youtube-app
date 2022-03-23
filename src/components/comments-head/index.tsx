import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import { 
    CircularProgress,
    MenuItem, 
    Select, 
    SelectChangeEvent, 
    Stack 
} from '@mui/material';
import { Sort } from '@mui/icons-material';

interface Props {
    commentCount: string | undefined;
    pendingSort: boolean;
    sortBy: string;
    handleChange: (event: SelectChangeEvent<string>) => Promise<void>;
}

export const CommentsSectionHead = ({commentCount, pendingSort, sortBy, handleChange}: Props) => (
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
)