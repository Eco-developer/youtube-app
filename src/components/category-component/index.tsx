import { CategoryContainer } from "./styled";
import { Subscriptions, SubscriptionsOutlined } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks";
import { setShowSidebar } from '../../features/sidebarSlice/sidebarSlice';
import { 
    useLocation, 
    useNavigate, 
    useSearchParams 
} from "react-router-dom";
import { CATEGORY } from '../../const/routes';

interface Props {
    title: string;
    id: string,
}

export const CategoryComponent = ({title, id}: Props) => {
    const [queries, setQueries] = useSearchParams();
    const navigate = useNavigate();
    const currentId = queries.get('categoryId');
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const isCurrentId = currentId === id;
    
    const handleSelect = () => {
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