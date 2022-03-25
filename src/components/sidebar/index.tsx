import { SidebarToggle } from '../sidebar-toggle';
import { CategoryComponent } from '../category-component';
import { 
    SidebarContainer,
    SidebarMain,
    CategoriesContainer, 
    CategoriesInnerContainer,
    LoaderContainer,
    SidebarBackground,
} from './style';
import { CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCategories } from '../../features/catergories/categoriesSlice';
import { v4 as uuid } from 'uuid';
import { Category } from '../../interfaces';
import { 
    selectShow, 
    setShowSidebar 
} from '../../features/sidebarSlice/sidebarSlice';

export const Sidebar = () => {
    const categories = useAppSelector(selectCategories);
    const show = useAppSelector(selectShow);
    const dispatch = useAppDispatch();
    const handleShow = () => {
        dispatch(setShowSidebar(false));
    }
    return (
        <SidebarContainer show={show}>
            <SidebarMain show={show}>
                <SidebarToggle menu={false}/>
                <CategoriesContainer>
                    {categories ?
                        <CategoriesInnerContainer>
                            {categories.map((category: Category) => (
                                <CategoryComponent
                                    key={uuid()}
                                    id={category.id}
                                    title={category.snippet.title}
                                />
                            ))}
                        </CategoriesInnerContainer>
                       : <LoaderContainer>
                           <CircularProgress/>
                        </LoaderContainer> }
                </CategoriesContainer>
            </SidebarMain>
            <SidebarBackground onClick={handleShow}>
            </SidebarBackground>
        </SidebarContainer>
    )
}

