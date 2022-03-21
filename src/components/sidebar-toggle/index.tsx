import { Image } from '../image/index';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { SidebarToggleContainer } from './style';
import { useNavigate } from 'react-router-dom';
import { logo } from '../../const/images';

export const SidebarToggle = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }
    return (
        <SidebarToggleContainer>
            <IconButton>
                <Menu/>
            </IconButton>
            <Image 
                width='110px' 
                height={40} 
                src={logo} 
                alt="logo"
                onClick={goToHome}
            />
        </SidebarToggleContainer>
    )
}