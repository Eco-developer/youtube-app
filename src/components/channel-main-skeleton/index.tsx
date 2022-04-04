import { VideosWrapper } from "../videos-wrapper";
import { 
    BannerSkeleton, 
    ChannelProfileSkeletonContainer, 
    MenuBarSkeletonContainer
} from "./style";
import { 
    Skeleton, 
    Stack 
} from "@mui/material";


export const ChannelMainSkeleton = () => (

    <Stack 
        display="flex" 
        width='100%' 
        flexDirection='column' 
        margin={0} 
        padding={0}
        
    >
        <Stack 
            flexGrow={1}
            display="flex" 
            flexDirection='column' 
        >
            <BannerSkeleton
                animation="wave" 
                width='100%'
                variant='rectangular'
            />
        </Stack>
        <ChannelProfileSkeletonContainer>
            <Skeleton
                animation="wave" 
                width={70}
                height={70}
                variant='circular'
            />
            <Stack 
                marginLeft={1}
                flexGrow={1}
                maxWidth={500}
            >
                <Skeleton
                    animation="wave" 
                    width='100%'
                    height={30}
                />
                <Skeleton
                    animation="wave" 
                    width={150}
                    height={15}
                />
            </Stack>
        </ChannelProfileSkeletonContainer>
        <MenuBarSkeletonContainer>
            <Skeleton
                sx={{padding: '8px 20px', marginRight: '10px'}}
                animation="wave" 
                width={70}
                height={15}
            />
            <Skeleton
                sx={{padding: '8px 20px', marginRight: '10px'}}
                animation="wave" 
                width={55}
                height={15}
            />
             <Skeleton
                sx={{padding: '8px 20px', marginRight: '10px'}}
                animation="wave" 
                width={50}
                height={15}
            />
        </MenuBarSkeletonContainer>
        <VideosWrapper videos={null}/>
         
    </Stack>
)