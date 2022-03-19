import { Image } from '../image/index';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { SidebarToggleContainer } from './style';
import { logo } from '../../const/images';

export const SidebarToggle = () => {
    return (
        <SidebarToggleContainer>
            <IconButton>
                <Menu/>
            </IconButton>
            <Image width='110px' height={40} src={logo} alt="logo"/>
        </SidebarToggleContainer>
    )
}