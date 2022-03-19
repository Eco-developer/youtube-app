import { 
    Skeleton, 
    Stack } from '@mui/material';
import { CardSkeletonContainer } from './styled';

export const VideoSkeleton = () => {
    return (
        <CardSkeletonContainer>
            <Stack spacing={1} style={{maxWidth: "300px"}} width="100%">
                <Skeleton 
                    animation="wave" 
                    variant="rectangular" 
                    width='100%' 
                    height={160}
                />
                <Stack width="100%" flexDirection='row'>
                    <Skeleton 
                        animation="wave" 
                        variant="circular" 
                        width={40} 
                        height={40}
                    />
                    <Stack flex={1} flexDirection='column' marginLeft={1}>
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </Stack>
                </Stack>
            </Stack>
        </CardSkeletonContainer>
        
        
    )
}