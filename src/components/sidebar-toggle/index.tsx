import { Image } from '../image/index';
import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { SidebarToggleContainer } from './style';
import { 
    useLocation, 
    useNavigate 
} from 'react-router-dom';
import { 
    setShowSidebar, 
    setCategoryId,
    selectShow
} from '../../features/sidebarSlice/sidebarSlice';
import { logo } from '../../const/images';
import { 
    useAppDispatch,
    useAppSelector 
} from '../../hooks';

interface Props {
    menu? : boolean;
}

export const SidebarToggle = ({menu = true}: Props) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const show = useAppSelector(selectShow);
    const navigate = useNavigate();

    const goToHome = () => {
        if(pathname !== '/') {
            navigate('/');
        }   
        if (!menu) {
            dispatch(setShowSidebar(!show));
        }
        dispatch(setCategoryId('none'));
    }   

    const handleShow = () => {
        dispatch(setShowSidebar(!show));
    }
    return (
        <SidebarToggleContainer>
            <IconButton onClick={handleShow}>
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