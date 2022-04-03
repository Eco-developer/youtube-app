import { 
    Skeleton, 
    Stack 
} from "@mui/material";


export const VideoPlaylistSkeleton = () => (
    <Stack 
        border={2} 
        borderColor="#e9e9e9" 
        height={550} 
        display="flex" 
        width='100%' 
        maxWidth={{md: 400}} 
        flexDirection='column' 
        margin={0} 
        marginLeft='auto' 
        marginRight='auto' 
        
    >
        <Stack 
            display="flex" 
            flexDirection="row" 
            width="100%" 
            padding={1.2}
        
            >
            <Stack 
                flexGrow={1}
                display="flex" 
                flexDirection='column' 
            >
                <Skeleton 
                    animation="wave" 
                    width='100%'
                    height={30}
                    style={{
                        transform:'scale(1)',
                        marginBottom: '5px',
                    }}
                />
                 <Skeleton 
                    animation="wave" 
                    width='80%'
                />
                <Stack 
                    display="flex" 
                    flexDirection="row" 
                    justifyContent='space-between'
                >
                    <Skeleton 
                        animation="wave" 
                        variant="circular" 
                        width={30} 
                        height={30}
                    />
                    <Skeleton 
                        animation="wave" 
                        variant="circular" 
                        width={30} 
                        height={30}
                    />
                </Stack>
            </Stack>
            <Stack 
                display="flex" 
                flexDirection="column" 
                justifyContent='space-between' 
                paddingLeft={1}
            >
                <Skeleton 
                    animation="wave" 
                    variant="circular" 
                    width={30} 
                    height={30}
                />
                <Skeleton 
                    animation="wave" 
                    variant="circular" 
                    width={30} 
                    height={30}
                />
            </Stack>
           
        </Stack>
        <Stack flexGrow={1}>
            <Skeleton 
                animation="wave" 
                width='100%'
                height={110}
                variant='rectangular'
                style={{
                    transform:'scale(1)',
                }}
            />
        </Stack>
        <Stack 
            display="flex" 
            flexDirection="row" 
            justifyContent='space-between'
            padding={1}
        >
            <Skeleton 
                animation="wave" 
                variant="circular" 
                width={30} 
                height={30}
            />
            <Skeleton 
                animation="wave" 
                variant="circular" 
                width={30} 
                height={30}
            />
        </Stack>
    </Stack>
)