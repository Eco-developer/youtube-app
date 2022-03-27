import { CategoryContainer } from "./styled";
import { Subscriptions, SubscriptionsOutlined } from "@mui/icons-material";
import { 
    useAppDispatch, 
    useAppSelector 
} from "../../hooks";
import { 
    selectId, 
    setCategoryId,
    setShowSidebar,
} from '../../features/sidebarSlice/sidebarSlice';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { CATEGORY } from '../../const/routes';

interface Props {
    title: string;
    id: string,
}

export const CategoryComponent = ({title, id}: Props) => {
    const [queries, setQueries] = useSearchParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const currentId = useAppSelector(selectId);
    const dispatch = useAppDispatch();
    const isCurrentId = currentId === id;
    const handleSelect = () => {
        dispatch(setCategoryId(id));
        dispatch(setShowSidebar(false));
        if (!pathname.includes(CATEGORY.slice(1))) {
            navigate(`${CATEGORY}?categoryId=${id}`)
            return;
        }
        setQueries({categoryId: id})
    }


    
    
    
    return (
        <CategoryContainer onClick={handleSelect} isCurrentId={isCurrentId}>
            {isCurrentId ? <Subscriptions/> : <SubscriptionsOutlined/>}
            <p>{title}</p>
        </CategoryContainer>
    )
}