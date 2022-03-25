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

interface Props {
    title: string;
    id: string,
}

export const CategoryComponent = ({title, id}: Props) => {
    const dispatch = useAppDispatch();
    const currentId = useAppSelector(selectId);
    const isCurrentId = currentId === id;
    const handleSelect = () => {
        dispatch(setCategoryId(id));
        dispatch(setShowSidebar(false));
    }
    
    return (
        <CategoryContainer onClick={handleSelect} isCurrentId={isCurrentId}>
            {isCurrentId ? <Subscriptions/> : <SubscriptionsOutlined/>}
            <p>{title}</p>
        </CategoryContainer>
    )
}