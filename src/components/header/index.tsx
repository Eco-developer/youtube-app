import { SidebarToggle } from '../sidebar-toggle';
import { InputSearch } from '../input-search';
import { 
    HeaderContainer, 
    HeaderButtons 
} from './style';
import { IconButton } from '@mui/material';
import {
    VideoCall, 
    NotificationsActive, 
    Apps,
} from '@mui/icons-material';


export const Header = () => {
    return (
        <HeaderContainer>
            
            <SidebarToggle/>
            <InputSearch/>
            <HeaderButtons>
                <IconButton>
                    <VideoCall/>
                </IconButton>
                <IconButton>
                    <Apps/>
                </IconButton>
                <IconButton>
                    <NotificationsActive/>
                </IconButton>
            </HeaderButtons>
        </HeaderContainer>
    )
}