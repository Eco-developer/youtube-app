import { 
    Skeleton, 
    Stack 
} from '@mui/material';
import {v4 as uuid} from 'uuid';

export const CommentsSectionSkeleton = () => {
    const skeletons = new Array(5).fill(null);
    return (
        <Stack flexDirection='column' width="100%" >
            <Stack marginBottom={2}>
                <Skeleton animation="wave" width={250}/>
            </Stack>
            {skeletons.map((_:any) => (
                <Stack flexDirection='row' spacing={1} alignItems='flex-start' key={uuid()}>
                    <Stack marginRight={2} marginTop={1}>
                        <Skeleton 
                            animation="wave" 
                            variant="circular" 
                            width={50} 
                            height={50}
                        />
                    </Stack>
                    <Stack flexDirection='column' width='100%'>
                        <Skeleton animation="wave" width={150}/>
                        <Skeleton animation="wave" width='100%' height={80} />

                    </Stack>
                </Stack>
            ))}
        </Stack>
    )
}