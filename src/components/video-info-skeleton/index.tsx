import { 
    Skeleton, 
    Stack 
} from '@mui/material';

export const VideoInfoSkeleton = () => (
    <Stack flexDirection='column' width="100%" spacing={1} marginTop={1} borderBottom={1} paddingBottom={1} borderColor='#e5e5e5'>
        <Stack>
            <Skeleton animation="wave" />
        </Stack>
        <Stack borderBottom={1} paddingBottom={1} paddingTop={1} borderColor='#e5e5e5'>
            <Skeleton animation="wave" />
        </Stack>
        <Stack flexDirection='row' spacing={1} alignItems='flex-start'>
            <Stack marginRight={2}>
                <Skeleton 
                    animation="wave" 
                    variant="circular" 
                    width={50} 
                    height={50}
                />
            </Stack>
            <Stack spacing={1} width="calc(100% - 66px);">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" height={40} />
            </Stack>
        </Stack>
    </Stack>
)