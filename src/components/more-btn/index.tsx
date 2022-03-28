import { 
    CircularProgress, 
    Stack 
} from "@mui/material";
import { MoreBtn } from "./style";

interface Props {
    nextPageToken: string | null | undefined,
    pendingMore: boolean,
    handleClick: () => void,
    btnName?: string,
}

export const MoreBtnContainer = ({nextPageToken, pendingMore, btnName="Load More Videos", handleClick}: Props) => {
    return (
        nextPageToken ?
            <Stack justifyContent="center" alignItems="center" padding={3}>
                <MoreBtn onClick={handleClick}>
                    { pendingMore ? 
                        <CircularProgress size={20}/>
                        : btnName }
                </MoreBtn>
            </Stack>
        : null
    )
}